import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate, useSearchParams } from "react-router-dom";

export const ResetPassword = () => {
    const { actions } = useContext(Context);
    const [searchParams] = useSearchParams();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    
    
    const token = searchParams.get("token");

    const onSubmit = async (event) => {
        event.preventDefault();
        
        
        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match.");
            return;
        }

        try {
            const response = await actions.resetPassword({
                email,
                password,
                token, 
            });

           
            if (response.message === "Password has been reset successfully.") {
                navigate("/login");
            } else {
                setErrorMessage(response.message);
            }
        } catch (error) {
           
            setErrorMessage("An error occurred while resetting the password.");
        }
    };

    return (
        <div className="container">
            <h1>Reset Password</h1>
            {errorMessage && <p className="text-danger">{errorMessage}</p>}
            <form onSubmit={onSubmit}>
                {/* Email input */}
                <label htmlFor="emailInput">Email</label>
                <input
                    id="emailInput"
                    className="form-control m-3"
                    type="email"
                    value={email}
                    placeholder="Enter your email"
                    onChange={(event) => setEmail(event.target.value)}
                    required
                />

                
                <label htmlFor="passwordInput">New Password</label>
                <input
                    id="passwordInput"
                    className="form-control m-3"
                    type="password"
                    value={password}
                    placeholder="New Password"
                    onChange={(event) => setPassword(event.target.value)}
                    required
                />

                
                <label htmlFor="confirmPasswordInput">Confirm New Password</label>
                <input
                    id="confirmPasswordInput"
                    className="form-control m-3"
                    type="password"
                    value={confirmPassword}
                    placeholder="Confirm New Password"
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    required
                />
               

                
                <button className="btn btn-success" type="submit">
                    Reset Password
                </button>
            </form>
        </div>
    );
};
