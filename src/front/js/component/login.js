import React, { useContext, useState, useEffect, useRef } from "react";
import { Context } from "../store/appContext";
import { Navigate, useNavigate } from "react-router-dom";

export const Login = (props) => {
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginVisible, setLoginVisible] = useState(false);

  const onSubmit = async (event) => {
    const success = await actions.logIn({
      email: email,
      hashed_password: password
    });
    if (success) {
      navigate("/profile");
    }
  };

  const onSignup = () => {
    navigate("/sign-up");
  };

  const toggleLoginVisibility = () => {
    setLoginVisible(!loginVisible);
  };

  const containerStyle = {
    position: "absolute",
    top: "0",
    right: "0",
    padding: "10px",
    backgroundColor: "#000",
    boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
    zIndex: "1000",
  };

  const loginContainerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (loginContainerRef.current && !loginContainerRef.current.contains(event.target)) {
        // Clicked outside the login container, so close it
        setLoginVisible(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleButtonClick = (event) => {
    event.stopPropagation(); // Prevent the click event from propagating to the document
    toggleLoginVisibility();
  };

  const handleLoginFormClick = (event) => {
    // Prevent clicks inside the login form from closing the box
    event.stopPropagation();
  };

  return (
    <div>
      <div style={containerStyle} ref={loginContainerRef}>
        <button className="hamburger-button" onClick={handleButtonClick}>
          <i className={`fa ${loginVisible ? "fa-times" : "fa-bars"}`} aria-hidden="true"></i>
        </button>
        {loginVisible && (
          <div onClick={handleLoginFormClick}>
            <h1>Log in</h1>
            <input
              className="form-control m-3"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <input
              className="form-control m-3"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <button className="btn btn-primary m-2" onClick={onSubmit}>
              Log in
            </button>
            <button className="btn btn-success m-2" onClick={onSignup}>
              Sign Up!
            </button>
          </div>
        )}
      </div>
    </div>
  );
};







