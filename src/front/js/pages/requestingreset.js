import React,{ useState }  from "react"
import { Navigate, useNavigate } from "react-router-dom";
export const Sendtoken = ()=>{
    const baseApiUrl = process.env.BACKEND_URL || "http://127.0.0.1:3001";
    const[email,setEmail]=useState("")
    const navigate = useNavigate();
    const onReset =() =>{
       navigate("/request_reset")
    }
    function send_email(){
    //  check to see if no email is typed
        fetch(`${baseApiUrl}api/request_reset` ,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify({
                email: email
            })})
            .then((response) => response.json())

            .then((data) => {console.log(data)})
            localStorage.getItem("token")
    }
 return(<div> <button onClick={send_email}>send email</button>
   <button onClick={onReset}>go to reset password</button>

   
   <input
                    id="confirmemail"
                    className="form-control m-3"
                    type="email"
                    value={email}
                    placeholder="Confirm email"
                    onChange={(event) => setEmail(event.target.value)}
                    required
                />
    </div>
)}