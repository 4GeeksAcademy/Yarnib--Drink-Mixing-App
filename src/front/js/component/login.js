import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Navigate, useNavigate } from "react-router-dom";

export const Login = (props) => {
	const navigate = useNavigate();
	const { store, actions } = useContext(Context);
	const [ email, setEmail] = useState("");
	const [ password, setPassword ] = useState("");
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
		navigate("/sign-up")
	}

	return (
		<div className="text-center mt-5">
			<h1>Log in</h1>
			<input className="form-control m-3" type="email" placeholder="email" value={email} onChange={(event) => setEmail(event.target.value)}></input>
			<input className="form-control m-3" type="password" placeholder="password" value={password} onChange={(event) => setPassword(event.target.value)}></input>
			<button 
				className="btn btn-primary m-2"
				onClick={onSubmit}
				>log in</button>
			<button className="btn btn-primary m-2" onClick={onSignup}>Sign Up!</button>
		</div>
	);
};