import React from "react";
import { useNavigate } from "react-router-dom";


export const Footer = () => {
	const navigate = useNavigate();
	const onSubmit = (event) => {
		navigate('/contactform');
	}
	return(
		<footer className="footer mt-auto py-3 text-center">
		<button className="btn btn-primary" onClick={onSubmit}>Contact us!</button>
	</footer>
	)

};
