import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Navigate, useNavigate } from "react-router-dom";

export const Home = (props) => {
	const navigate = useNavigate();
	const { store, actions } = useContext(Context);
	const [ email, setEmail] = useState("");
	const [ password, setPassword ] = useState("");
	const onSubmit = async (event) => {
		const success = await actions.logIn({
			email: email,
			hashed_password: password
		});
		if (success) {
		navigate("/profile");
		}
	};
	const onSignup = () => {
		navigate("/sign-up")
	}

	return (
		<div className="text-center mt-5">
			<h1>Hello Rigo!!</h1>
			<input className="form-control m-3" type="email" placeholder="email" value={email} onChange={(event) => setEmail(event.target.value)}></input>
			<input className="form-control m-3" type="password" placeholder="password" value={password} onChange={(event) => setPassword(event.target.value)}></input>
			<button 
				className="btn btn-primary m-2"
				onClick={onSubmit}
				>log in</button>
			<button className="btn btn-primary m-2" onClick={onSignup}>Sign Up!</button>
		</div>
	);
};
import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../store/appContext';
import rigoImageUrl from '../../img/rigo-baby.jpg';
import '../../styles/home.css';
import ChatBot from './ChatBot';
import { fetchCocktails, fetchCocktailsByIngredient } from './api';
import ingredients from './ingredients';

export const Home = () => {
  const { store, actions } = useContext(Context);
  const [cocktails, setCocktails] = useState([]);
  const [selectedDrink, setSelectedDrink] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [showDrinkList, setShowDrinkList] = useState(true); // Set it to true initially
  const [previousSearchResults, setPreviousSearchResults] = useState([]);

  useEffect(() => {
    fetchCocktails()
      .then((data) => {
        setCocktails(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleDrinkClick = (drink) => {
    setSelectedDrink(drink);
    setShowDrinkList(false);
  };

  const toggleFavorite = (drink) => {
    if (favorites.includes(drink.idDrink)) {
      const updatedFavorites = favorites.filter((fav) => fav !== drink.idDrink);
      setFavorites(updatedFavorites);
    } else {
      setFavorites([...favorites, drink.idDrink]);
    }
  };

  const getDrinkDetails = (drinkName) => {
    return ingredients[drinkName] || { Ingredients: [], Instructions: 'Instructions not available' };
  };

  const handleIngredientSearch = () => {
    if (keywords.length > 0) {
      const ingredientsString = keywords.join(',');
      fetchCocktailsByIngredient(ingredientsString)
        .then((data) => {
          if (data.length > 0) {
            setPreviousSearchResults([...searchResults]);
            setSearchResults(data);
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

  return (
    <div className="text-center mt-5">
      <h1>Hello Rigo!!</h1>
      <p>
        <img src={rigoImageUrl} alt="Rigo Baby" />
      </p>
      <div className="alert alert-info">
        {store.message || 'Loading message from the backend (make sure your python backend is running)...'}
      </div>
      <p>
        This boilerplate comes with lots of documentation:{' '}
        <a href="https://start.4geeksacademy.com/starters/react-flask">Read documentation</a>
      </p>

      <div className="search-bar" style={{ textAlign: 'center' }}>
        <input
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
          style={{
            marginLeft: '10px', // Adjust the margin as needed
          }}
          onClick={handleIngredientSearch}
        >
          Search by Ingredient
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
                    <button
                      className={favorites.includes(cocktail.idDrink) ? 'favorite active' : 'favorite'}
                      onClick={() => toggleFavorite(cocktail)}>
                      ★
                    </button>
                  </p>
                  <p className="other-info">
                    <a href="#" onClick={() => handleDrinkClick(cocktail)}>
                      Details
                    </a>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      {selectedDrink && (
        <div className="drink-details">
          <img src={selectedDrink.strDrinkThumb} alt={selectedDrink.strDrink} className="original-cocktail-image" />
          <p className="drink-name">
            {selectedDrink.strDrink}
            <button
              className={favorites.includes(selectedDrink.idDrink) ? 'favorite active' : 'favorite'}
              onClick={() => toggleFavorite(selectedDrink)}>
              ★
            </button>
          </p>
          {getDrinkDetails(selectedDrink.strDrink) ? (
            <div>
              <p className="drink-ingredients">
                <strong>Ingredients:</strong>
                <ul>
                  {getDrinkDetails(selectedDrink.strDrink).Ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              </p>
              <p className="drink-instructions">
                <strong>Instructions:</strong> {getDrinkDetails(selectedDrink.strDrink).Instructions}
              </p>
            </div>
          ) : (
            <p>Ingredients and instructions not available for this drink.</p>
          )}
          <p className="other-info">
            <a href="#" onClick={() => {
              setSelectedDrink(null);
              setShowDrinkList(true); // Ensure the list is shown when going back
            }}>
              Back to search results
            </a>
          </p>
        </div>
      )}

      <ChatBot />
    </div>
  );
};
