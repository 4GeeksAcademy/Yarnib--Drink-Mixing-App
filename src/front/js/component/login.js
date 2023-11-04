import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";

export const Login = (props) => {
    const navigate = useNavigate();
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = async (event) => {
        const success = await actions.logIn({ email: email, hashed_password: password });
        if (success) {
            navigate("/profile");
        }
    };

    const onSignup = () => {
        navigate("/sign-up");
    };

    return (
        <div className="text-center mt-5 top-right-nav">
            <h1>Log in</h1>
            <input
                className="form-control m-3"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
            ></input>
            <input
                className="form-control m-3"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
            ></input>
            <button className="btn btn-primary m-2" onClick={onSubmit}>
                Log in
            </button>
            <button className="btn btn-success m-2" onClick={onSignup}>
                Sign Up!
            </button>
            <a>Forgot Password?</a>
        </div>
    );
};
