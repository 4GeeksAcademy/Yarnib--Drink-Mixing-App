import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const ResetPassword = () => {
    const { actions } = useContext(Context);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState(""); // Add a state for the new password
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await actions.resetPassword({
                email: email,
                password: password, // Pass the new password to the resetPassword action
            });

            // Check response for success message
            if (response.message === "Password reset successfully") {
                navigate("/login"); // Redirect to the login page or another appropriate page
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage("An error occurred while resetting the password.");
            }
        }
    };

    return (
        <div className="container">
            <h1>Reset Password</h1> {/* Update the title */}
            {errorMessage && <p className="text-danger">{errorMessage}</p>}
            <form onSubmit={onSubmit}>
                <input
                    className="form-control m-3"
                    type="email"
                    value={email}
                    placeholder="Email"
                    onChange={(event) => setEmail(event.target.value)}
                ></input>
                <input
                    className="form-control m-3"
                    type="password"
                    value={password}
                    placeholder="New Password" // Update the placeholder
                    onChange={(event) => setPassword(event.target.value)}
                ></input>
                <button className="btn btn-success" type="submit">Reset Password</button> {/* Update the button text */}
            </form>
        </div>
    );
};
