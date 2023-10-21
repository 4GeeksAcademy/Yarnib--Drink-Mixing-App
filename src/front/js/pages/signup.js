import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
    const { store, actions } = useContext(Context)
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ name, setName ] = useState("");
    const navigate = useNavigate();
    const onSubmit = (event) => {
		actions.signUp({
			email: email,
			hashed_password: password,
            name: name
            
		});
		navigate("/");
	};
    return (
        <div className="container">
            <h1>Sign up below!</h1>
            <input 
                className="form-control m-3" 
                type="name" value={name} 
                placeholder="Username"
                onChange={(event) => setName(event.target.value)}
                ></input>
            <input 
                className="form-control m-3" 
                type="email" value={email} 
                placeholder="Email"
                onChange={(event) => setEmail(event.target.value)}
                ></input>
            <input 
                className="form-control m-3" 
                type="password" value={password} 
                placeholder="Password"
                onChange={(event) => setPassword(event.target.value)}
                ></input>
            <button className="btn btn-success" onClick={onSubmit}>Submit</button>

        </div>
    )
}