import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const LoggedIn = (props) => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const onSubmit = async (event) => {
        await actions.logOut(); 
        navigate('/');
    }
    const onFavorites = (event) => {
        navigate('/userfavorites')
    }
    return (
        <div className="text-center">
            <div className="row">
                <div className="col-6">
                    <img src="https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg" className="profile-pic"/>
                </div>
                <div className="col-6">
                    <h6>{"Welcome " + store?.user?.name + "!"}</h6>
                    <button 
                        onClick={onFavorites}
                        className="btn btn-primary"
                        >Favorites</button>
                    <button 
                        className="btn btn-danger"
                        onClick={onSubmit}
                        >Log Out</button>
                </div>
            </div>
        </div>
    )
}