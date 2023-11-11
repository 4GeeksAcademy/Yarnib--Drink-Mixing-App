import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import UserFavorites from "./userfavorites";


export const Profile = (props) => {
    const { store, actions } = useContext(Context);


    return(
       <div> <div className="container">
            <h1>{"Welcome " + store?.user?.name + "!"}</h1>
            <br></br>
            <UserFavorites />
        </div>
    
        </div>
    );
};