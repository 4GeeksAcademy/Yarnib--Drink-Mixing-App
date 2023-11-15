import React, { useState } from "react"
import { Navigate, useNavigate } from "react-router-dom";

export const Sendtoken = () => {
    const baseApiUrl = process.env.BACKEND_URL || "http://127.0.0.1:3001";
    const [email, setEmail] = useState("")
    const navigate = useNavigate();
    const onReset = () => {
        navigate("/request_reset")
    }
    return (<div>


        <input
            id="confirmemail"
            className="form-control m-3"
            type="email"
            value={email}
            placeholder="Confirm email"
            onChange={(event) => setEmail(event.target.value)}
            required
        />
        <div className="flex">
            <button onClick={onReset}>send email</button>
            {/* <button onClick={onReset}>go to reset password</button> */}
        </div>
    </div>
    )
}