import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Chatbot from "../pages/chatbot";
import { Context } from "../store/appContext";
import NoChatBot from "../pages/nochatbot";


export const Footer = () => {
	const { store } = useContext(Context);
	const navigate = useNavigate();
	const onSubmit = (event) => {
		navigate('/contactform');
	}
	return(
		<footer className="footer mt-auto py-3 text-center">
		<button className="btn btn-primary" onClick={onSubmit}>Contact us!</button>
		{store.accessToken !== undefined ? (
                                <Chatbot />
                            ) : (
                                <NoChatBot />
							)}
		</footer>
	)

};
