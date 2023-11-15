import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const LoggedIn = (props) => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const onSubmit = async (event) => {
        await actions.logOut();
        localStorage.clear()
        props.toggleDropdown()
        await navigate('/');
        alert("Succesfully Logged Out")
    }
    const onProfile = (event) => {
        props.toggleDropdown()
        navigate('/profile')
    }
    const onSocial = (event) => {
        props.toggleDropdown()
        navigate('/social');
    }
    return (
        <div className="container text-center">
            <div className="row">
                <div className="col-4">
                    <img src="https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg" className="profile-pic" />
                </div>
                <div className="col-7">
                    <div className="row">
                        <h6>{"Welcome " + store?.user?.name + "!"}</h6>
                        <div>
                            <button
                                onClick={onProfile}
                                className="btn btn-button"
                            >My Profile!</button>
                        </div>
                        <div>
                            <button
                                className="btn btn-button"
                                onClick={onSocial}
                            >Social</button>
                        </div>
                        <div>
                            <button
                                className="btn btn-button"
                                onClick={onSubmit}
                            >Log Out</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}