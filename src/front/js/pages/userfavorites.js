import React, { useEffect, useState, useContext } from "react";
import '../../styles/userFavorites.css';
import { Context } from "../store/appContext";


export const UserFavorites = () => {

    const [favs, setFavs] = useState([])
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.getAllFavorites(1);
    }, [])

    const addToFavorites = (cocktailId) => {
        actions.addToFavorites(1, cocktailId).then(res => {
            console.log(res)
        })
    }


    return (
        <div className="sidebar float-right container" >
            <h1>Favorites</h1>
            <div className="row">
                <div className="col-10">
                    <a href="#" className="list-group-item list-group-item-action py-3 lh-tight" aria-current="true" style={{ background: "inherit" }}>
                        <div className="d-flex w-100 align-items-center justify-content-between">
                            <strong className="mb-1">List group item heading</strong>
                            <small>Wed</small>
                        </div>
                        <div className="col-10 mb-1 small">Some placeholder content in a paragraph below the heading and date.</div>
                    </a>
                </div>
                <div className="col-2">
                    <i className="fa-solid fa-trash-can"></i>
                </div>
            </div>
            <div className="row">
                <div className="col-10">
                    <a href="#" className="list-group-item list-group-item-action py-3 lh-tight" aria-current="true" style={{ background: "inherit" }}>
                        <div className="d-flex w-100 align-items-center justify-content-between">
                            <strong className="mb-1">List group item heading</strong>
                            <small>Wed</small>
                        </div>
                        <div className="col-10 mb-1 small">Some placeholder content in a paragraph below the heading and date.</div>
                    </a>
                </div>
                <div className="col-2">
                    <button onClick={() => addToFavorites(1)}>
                        <i className="fa-solid fa-trash-can"></i>
                    </button>
                </div>
            </div>
        </div >
    )
}

export default UserFavorites;