import React, { useContext,useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Context } from "../store/appContext";
export const ResetPassword = () => {
    const { store,actions} = useContext(Context);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [token, setToken] = useState(searchParams.get("token") || "");
    const [errorMessage, setErrorMessage] = useState("");
    const baseApiUrl = process.env.BACKEND_URL || "http://127.0.0.1:3001";
    const onSubmit = async (event) => {
        event.preventDefault();
        if (!token) {
            setErrorMessage("Token is required.");
            return;
        }
        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match.");
            return;
        }
        try {
            // const token = localStorage.getItem('token');
            const response = await fetch(`${baseApiUrl}/api/reset-password`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`  // Add JWT here
                },
                body: JSON.stringify({
                    email: email,
                    new_password: password,
                }),
            });
            // const response = await actions.ResetPassword({
            //     email:email,
            //     token:token,
            //     newpassword:password
            // })
            // Check the success condition based on your API's response structure
            if (response.ok) {
                navigate("/home"); // Redirect to login page
            } else {
                setErrorMessage(response.message || "An error occurred during password reset.");
            }
        } catch (error) {
            setErrorMessage("An error occurred while resetting the password.");
            console.log("testing")
        }
    };
    return (
        <div className="container">
            <h1>Reset Password</h1>
            {errorMessage && <p className="text-danger">{errorMessage}</p>}
            <form onSubmit={onSubmit}>
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
                <input
                    id="tokenInput"
                    className="form-control token-input m-3"
                    type="text"
                    value={token}
                    placeholder="Enter your token"
                    onChange={(event) => setToken(event.target.value)}
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
                <button className="btn btn-button" type="submit">
                    Reset Password
                </button>
            </form>
        </div>
    );
};