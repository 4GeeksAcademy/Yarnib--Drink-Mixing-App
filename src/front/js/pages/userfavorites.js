import React, { useEffect, useState, useContext } from "react";
import '../../styles/userFavorites.css';
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";


export const UserFavorites = () => {

    const [favs, setFavs] = useState([])
    const [update, setUpdate] = useState(false)
    const { store, actions } = useContext(Context);

    useEffect(() => {
        console.log(store)

        console.log(store.user != undefined)

        if (store.user != undefined) {
            console.log(store)
            let id = store.user.id
            actions.getAllFavorites(id).then(favDrinks => {
                console.log(favDrinks.favs)
                setFavs(favDrinks.favs)
            });
        }

    }, [update]);


    return (
        <div className="sidebar container" >
            <div className="row justify-content-center">
                <h1 className="text-center">
                    <i style={{ color: "white" }} className="fas fa-glass-martini-alt me-2"></i>
                    <i style={{ color: "white" }} className="fas fa-wine-glass me-2"></i>
                    <i style={{ color: "white" }} className="fas fa-beer me-2"></i>
                    <text style={{ color: "white" }}>Favorites</text>
                    <i style={{ color: "white" }} className="fas fa-beer ms-2"></i>
                    <i style={{ color: "white" }} className="fas fa-wine-glass ms-2"></i>
                    <i style={{ color: "white" }} className="fas fa-glass-martini-alt ms-2"></i>
                </h1>
            </div>
            {
                favs.length == 0 ? (
                    <div>
                        <p className="text-center">
                            <text style={{ color: "white" }}>No Favorites, yet! Click below to find your favorite drink</text><br />
                            <Link to="/">
                                <span>Search For Drinks</span>
                            </Link>
                        </p>
                    </div>
                ) : (favs.map((fav) => (
                    <div style={{ backgroundColor: "white" }} className="row" key={fav.id}>
                        <div className="col-8 list-group-item list-group-item-action">
                            <a href={"/" + fav.name} className="" aria-current="true" style={{ background: "inherit" }}>
                                <div className="d-flex w-100 align-items-center justify-content-between">
                                    <strong className="mb-1">{fav.name}</strong>
                                </div>
                                <img className="float-start" style={{ width: 100, height: 100 }} src={fav.img}></img>
                            </a>
                            <div className="float-end">
                                <button onClick={() => {
                                    actions.deleteFavorites(fav.id).then(e => {
                                        setUpdate(!update)
                                    })
                                }
                                }>
                                    <i className="fa-solid fa-trash-can"></i>
                                </button>
                            </div>

                        </div>
                    </div>
                )))
            }

        </div >
    )
}

export default UserFavorites;