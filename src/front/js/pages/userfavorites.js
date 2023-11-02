import React, { useEffect, useState, useContext } from "react";
import '../../styles/userFavorites.css';
import { Context } from "../store/appContext";


export const UserFavorites = () => {

    const [favs, setFavs] = useState([])
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.getAllFavorites(1).then(favDrinks => {
            console.log(favDrinks.favs)
            getCocktailDetails(favDrinks.favs[0].cocktail_id).then(data => {
                console.log(data)
                return data;
            }).then(e => {
                console.log(e)
                setFavs([e])
            })
        });

    }, [])

    const addToFavorites = (cocktailId) => {
        actions.addToFavorites(1, cocktailId).then(res => {
            console.log(res)
        })
    }

    const getCocktailDetails = async (id) => {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`, {
            method: "GET",
        }).then(response => {
            return response.json()
        }).then(data => {
            console.log(data)
            return data.drinks[0]
        })
        return response
    }


    return (
        <div className="sidebar float-right container" >
            <h1>Favorites</h1>
            {favs.map((fav) => (
                <div className="row" key={fav.idDrink}>
                    <div className="col-10">
                        <a href="#" className="list-group-item list-group-item-action py-3 lh-tight" aria-current="true" style={{ background: "inherit" }}>
                            <div className="d-flex w-100 align-items-center justify-content-between">
                                <strong className="mb-1">{fav.strDrink}</strong>
                                <small>Wed</small>
                            </div>
                            <div className="col-10 mb-1 small"> </div>
                        </a>
                        <img style={{ width: 100, height: 100 }} src={fav.strDrinkThumb}></img>
                    </div>
                    <div className="col-2">
                        <div className="col-2">
                            <button onClick={() => addToFavorites(1)}>
                                <i className="fa-solid fa-trash-can"></i>
                            </button>
                        </div>
                    </div>
                </div>
            ))}

        </div >
    )
}

export default UserFavorites;