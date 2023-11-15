import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../store/appContext';
import rigoImageUrl from '../../img/rigo-baby.jpg';

import Chatbot from './chatbot';
import Blogsidebar from './Blogsidebar';
import { fetchCocktails, fetchCocktailsByIngredient, fetchCocktailByName } from './api';
import Homebarprotopsplashnotitle from "../../img/Headerimages/Homebarprotopsplashnotitle.jpg";
import { useLocation, useParams } from "react-router-dom";

export const Home = () => {
  const { location } = useLocation()
  const { store, actions } = useContext(Context);
  const [cocktails, setCocktails] = useState([]);
  const [selectedDrink, setSelectedDrink] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [showDrinkList, setShowDrinkList] = useState(true);
  const [previousSearchResults, setPreviousSearchResults] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false)
  const [showAgeVerificationModal, setShowAgeVerificationModal] = useState(true);
  let { drinkId } = useParams();

  useEffect(() => {
    if (drinkId != undefined) {
      handleDrinkClick({ strDrink: drinkId })
    } else {
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=`)
        .then((response) => response.json())
        .then((data) => {
          setCocktails(data.drinks);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }
  }, [showAgeVerificationModal, location]);
  const handleDrinkClick = (drink) => {
    fetchCocktailByName(drink.strDrink)
      .then((data) => {
        const result = {
          ...drink,
          ...data,
        };
        console.log(result)
        setSelectedDrink(result);
        setShowDrinkList(false);
      })
      .catch((error) => {
        console.error('Error fetching cocktail details:', error);
      });
  };
  const toggleFavorite = (drink) => {
    console.log(drink)
    console.log(favorites)
    if (favorites.includes(drink.idDrink)) {
      const updatedFavorites = favorites.filter((fav) => fav != drink.idDrink);
      let id = store.user.id;
      actions.deleteFavorites(id, drink.idDrink).then((result) => {
        setFavorites(updatedFavorites);
      })
    } else {
      if (store.user != undefined) {
        let id = store.user.id
        actions.addToFavorites(id, drink.idDrink, drink.strDrink, drink.strDrinkThumb).then((result) => {
          setFavorites([...favorites, drink.idDrink]);
        })
      }
    }
  };
  const handleIngredientSearch = () => {
    if (keywords.length > 0) {
      const ingredientsString = keywords.join(',');
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredientsString}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.drinks && data.drinks.length > 0) {
            setPreviousSearchResults([...searchResults]);
            setSearchResults(data.drinks);
            setShowDrinkList(true);
          } else {
            alert('No search results found.');
          }
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }
  };
  const backToCocktailList = () => {
    if (previousSearchResults.length > 0) {
      setSearchResults(previousSearchResults);
      setShowDrinkList(true);
    } else {
      alert('No previous search results available.');
    }
  };
  const handleStarClick = (event, drink) => {
    event.stopPropagation();
    toggleFavorite(drink);
  };
  return (
    <div style={{ background: `url(${Homebarprotopsplashnotitle})`, backgroundSize: 'cover', height: '100vh' }}>
      <div className="text-center">
        <div className="search-bar" style={{ paddingTop: "30px", margin: 'auto', textAlign: 'center', width: "25vw" }}>
          <input
            className="form-control"
            type="text"
            style={{
              textAlign: 'center', // Center the text inside the input field
            }}
            placeholder="Type Ingredient Here"
            value={keywords.join(' ')}
            onChange={(e) => setKeywords(e.target.value.split(' '))}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleIngredientSearch();
              }
            }}
          />
          <button
            className='btn btn-button'
            
            onClick={handleIngredientSearch}
          >
            Search
          </button>
        </div>

        <div className="search-results-container">
          {showDrinkList && searchResults.length > 0 ? (
            <ul className="cocktail-list">
              {searchResults.map((cocktail) => (
                <li key={cocktail.idDrink} className="cocktail-item" onClick={() => handleDrinkClick(cocktail)}>
                  <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} className="cocktail-image" />
                  <div className="drink-info">
                    <p className="drink-name">
                      {cocktail.strDrink}
                      <br></br>
                      {store.user != undefined ? ((<button
                        className={favorites.includes(cocktail.idDrink) ? 'favorite active' : 'favorite'}
                        onClick={(e) => handleStarClick(e, cocktail)}
                      >
                        ★
                      </button>)) :
                        (<button
                          className="favorite disabled" disabled data-toggle="tooltip" data-placement="left" title="Login to add to favorites!">
                          ★
                        </button>)
                      }
                    </p>
                    <p className="other-info">
                      <button className="btn" style={{ color: "white" }} onClick={() => handleDrinkClick(cocktail)}>
                        Details
                      </button>
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        {selectedDrink && (
          <div
            style={{
              backgroundColor: 'black',
              color: 'white',
              maxWidth: '500px',
              margin: '0 auto',
              padding: '20px',
              border: '1px solid white',
            }}
            className="drink-details"
          >
            <img src={selectedDrink.Image} alt={selectedDrink.strDrink} className="cocktail-image" />
            <p className="drink-name">
              {selectedDrink.strDrink}
              <button
                className={favorites.includes(selectedDrink.idDrink) ? 'favorite active' : 'favorite'}
                onClick={() => toggleFavorite(selectedDrink)}
              >
                ★
              </button>
            </p>
            <div>
              <div className="drink-ingredients">
                <strong>Ingredients:</strong>
                <ul>
                  {selectedDrink.Ingredients.map((ingredient, index) => (
                    <li key={index}>
                      {ingredient.ingredient} ({ingredient.measure})
                    </li>
                  ))}
                </ul>
              </div>
              <p className="drink-instructions">
                <strong>Instructions:</strong> {selectedDrink.Instructions}
              </p>
            </div>
            <p className="other-info">
              <button className="btn" style={{ color: "blue" }} onClick={() => setSelectedDrink(null)}>
                Back to search results
              </button>
            </p>
          </div>
        )}
      </div>
      <div className="sidebar">
        <Blogsidebar />
      </div>

    </div>
  );
};