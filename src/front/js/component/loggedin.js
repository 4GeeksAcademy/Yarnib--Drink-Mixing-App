import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

// const { store, actions } = useContext(Context);
// const navigate = useNavigate();
// const onSubmit = async (event) => {
//     await actions.logOut(); 
//     navigate('/');
// }
export const LoggedIn = (props) => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const onSubmit = async (event) => {
    await actions.logOut(); 
    navigate('/');
}
    return (
        <div className="container">
            <div className="row">
                <div className="col-6">
                    <img src="https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg"/>
                </div>
                <div className="col-6">
                    <h6>{"Welcome " + store?.user?.name + "!"}</h6>
                    <button 
                        className="btn btn-danger"
                        onClick={onSubmit}
                        >Log Out</button>
                </div>
            </div>
        </div>
    )
}