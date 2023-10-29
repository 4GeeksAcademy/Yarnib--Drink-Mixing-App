import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
    const { actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await actions.signUp({
                email: email,
                hashed_password: password,
                name: name,
                age: age
            });

            // Check response for success message
            if (response.message === "User registered successfully") {
                navigate("/");
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage("An error occurred while signing up.");
            }
        }
    };

    return (
        <div className="container">
            <h1>Sign up below!</h1>
            {errorMessage && <p className="text-danger">{errorMessage}</p>}
            <form onSubmit={onSubmit}>
                <input
                    className="form-control m-3"
                    type="name"
                    value={name}
                    placeholder="Username"
                    onChange={(event) => setName(event.target.value)}
                ></input>
                <input
                    className="form-control m-3"
                    type="email"
                    value={email}
                    placeholder="Email"
                    onChange={(event) => setEmail(event.target.value)}
                ></input>
                <input
                    className="form-control m-3"
                    type="number"
                    value={age}
                    placeholder="Age"
                    onChange={(event) => setAge(event.target.value)}
                ></input>
                <input
                    className="form-control m-3"
                    type="password"
                    value={password}
                    placeholder="Password"
                    onChange={(event) => setPassword(event.target.value)}
                ></input>
                <button className="btn btn-success" type="submit">Submit</button>
            </form>
        </div>
    );
};