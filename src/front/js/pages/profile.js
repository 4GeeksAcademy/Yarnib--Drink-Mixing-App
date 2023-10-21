import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Profile = (props) => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const onSubmit = async (event) => {
        await actions.logOut(); 
        navigate('/');
    }
    return(
        <div className="container">
            <h1>{"Hello " + store?.user?.email}</h1>
            <button 
                className="btn btn-danger"
                onClick={onSubmit}
                >Log Out</button>
        </div>
    );
};