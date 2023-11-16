import React, { useState } from "react"
import { Navigate, useNavigate } from "react-router-dom";

export const Sendtoken = () => {
    const baseApiUrl = process.env.BACKEND_URL || "http://127.0.0.1:3001";
    const [email, setEmail] = useState("")
    const navigate = useNavigate();
    // const onReset = () => {
    //     navigate("/request_reset")
    // }
    function send_email() {
        //  check to see if no email is typed
        fetch(`${baseApiUrl}/api/request_reset`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email
            })
        })
            .then((response) => response.json())
            .then((data) => { console.log(data) })
        localStorage.getItem("token")
    }
    return (<div className="row">
        <div className="col-4"></div>
        <div className="col-4">
        <input
            id="confirmemail"
            className="form-control text-center mt-3 send-email"
            type="email"
            value={email}
            placeholder="Confirm email"
            onChange={(event) => setEmail(event.target.value)}
            required
        />
            <center>

            <button className="btn-button mt-3" onClick={send_email}>send email</button>
            </center>
            {/* <button onClick={onReset}>go to reset password</button> */}
        

        </div>
        <div className="col-4"></div>
    </div>
    )
}