import React, { useEffect, useState, useContext } from "react";

import { Context } from "../store/appContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import img from "../../img/Headerimages/Homebarprotopsplash1080.jpg"

export const UserFavorites = () => {

    const [favs, setFavs] = useState([])
    const [update, setUpdate] = useState(false)
    const { store, actions } = useContext(Context);
    const { state } = useLocation();
    const navigate = useNavigate();

    const onSearch = () => {
        navigate("/")
    }

    const backgroundStyle = {
        backgroundImage: `url(${img})`,
        backgroundPosition: 'center',
        height: '100vh'
    };


    useEffect(() => {
        console.log(store)

        console.log(store.user != undefined)

        if (store.user != undefined) {
            console.log(store)
            let id = store.user.id
            actions.getAllFavorites(id).then(favDrinks => {
                console.log(favDrinks.favs[0])
                console.log(favDrinks.favs)
                setFavs(favDrinks.favs)
            });
        }

    }, [update, state]);


    return (
        <div className="container" style={backgroundStyle}>
            <div className="titleBox row justify-content-center">
                <h1 className="text-center">
                    <i className="fas fa-glass-martini-alt me-2"></i>
                    <i className="fas fa-wine-glass me-2"></i>
                    <i className="fas fa-beer me-2"></i>
                    <text>Favorites</text>
                    <i className="fas fa-beer ms-2"></i>
                    <i className="fas fa-wine-glass ms-2"></i>
                    <i className="fas fa-glass-martini-alt ms-2"></i>
                </h1>
            </div>
            {
                favs.length == 0 ? (
                    <div className="container-class">
                        <p className="text-center">
                            <h4>No Favorites, yet! Click below to find your favorite drink</h4><br />
                            <button className="btn btn-button" onClick={onSearch}>Search for Drinks</button>
                        </p>
                    </div>
                ) : (favs.map((fav) => (
                    <div className="row" key={fav.id} style={{ margin: "auto", width: "500px" }}>
                        <div className="col-12 list-group-item listItem">
                            <Link to={"/" + fav.name}>
                                <div className="d-flex w-100 align-items-center justify-content-between">
                                    <strong className="mb-1">{fav.name}</strong>
                                </div>
                                <img className="float-start" style={{ width: 100, height: 100 }} src={fav.img}></img>
                            </Link>
                            <div className="float-end">

                                <i className="btn trash-btn fa-solid fa-trash-can" onClick={() => {
                                    console.log(store.user)
                                    actions.deleteFavorites(store.user.id, fav.cocktail_id,).then(e => {
                                        setUpdate(!update)
                                    })
                                }}>
                                </i>
                            </div>

                        </div>
                    </div>
                )))
            }

        </div >
    )
}

export default UserFavorites;