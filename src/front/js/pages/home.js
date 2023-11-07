import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../store/appContext';
import rigoImageUrl from '../../img/rigo-baby.jpg';
import '../../styles/home.css';
import chatbot from './chatbot';
import Blogsidebar from './Blogsidebar'; // Import the Blogsidebar component
import { fetchCocktails, fetchCocktailsByIngredient, fetchCocktailByName } from './api';
import Homebarprotopsplashnotitle from "../../img/Headerimages/Homebarprotopsplashnotitle.jpg";
export const Home = () => {
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

  useEffect(() => {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=`)
      .then((response) => response.json())
      .then((data) => {
        setCocktails(data.drinks);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [showAgeVerificationModal]);
  const handleDrinkClick = (drink) => {
    fetchCocktailByName(drink.strDrink)
      .then((data) => {
        setSelectedDrink(data);
        setShowDrinkList(false);
      })
      .catch((error) => {
        console.error('Error fetching cocktail details:', error);
      });
  };
  const toggleFavorite = (drink) => {
    if (favorites.includes(drink.idDrink)) {
      const updatedFavorites = favorites.filter((fav) => fav !== drink.idDrink);
      actions.deleteFavorites(1, drink.idDrink).then((result) => {
        console.log(result)
      })
      setFavorites(updatedFavorites);
    } else {
      console.log(drink)
      if (store.user != undefined) {
        console.log(store)
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
    event.stopPropagation(); // Prevent the click event from bubbling up to the <li>
    toggleFavorite(drink);
  };
  return (
    <div style={{ background: `url(${Homebarprotopsplashnotitle})`, backgroundSize: 'cover', height: '100vh' }}>
      <div className="text-center">
        <div className="search-bar" style={{ margin: '100px 0', textAlign: 'center' }}>
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
              marginLeft: '10px',
            }}
            onClick={handleIngredientSearch}
          >
            Search
          </button>
        </div>
        {/* <div className="search-results-container">
        {showDrinkList && searchResults.length > 0 ? (
          <ul className="cocktail-list">
            {searchResults.map((cocktail) => (
              <li key={cocktail.idDrink} className="cocktail-item" onClick={() => handleDrinkClick(cocktail)}>
                <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} className="cocktail-image" />
                <div className="drink-info">
                  <p className="drink-name">
                    {cocktail.strDrink}
                    <br></br>
                    <button
                      className={favorites.includes(cocktail.idDrink) ? 'favorite active' : 'favorite'}
                      onClick={(e) => handleStarClick(e, cocktail)} // Use handleStarClick for star icon
                    >
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
      </div> */}
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
                        onClick={(e) => handleStarClick(e, cocktail)} // Use handleStarClick for star icon
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
              <p className="drink-ingredients">
                <strong>Ingredients:</strong>
                <ul>
                  {selectedDrink.Ingredients.map((ingredient, index) => (
                    <li key={index}>
                      {ingredient.ingredient} ({ingredient.measure})
                    </li>
                  ))}
                </ul>
              </p>
              <p className="drink-instructions">
                <strong>Instructions:</strong> {selectedDrink.Instructions}
              </p>
            </div>
            <p className="other-info">
              <a href="#" onClick={() => setSelectedDrink(null)}>
                Back to search results
              </a>
            </p>
          </div>
        )}
      </div>
      <div className="sidebar">
        <Blogsidebar /> {/* Include the BlogSidebar component here */}
      </div>
      <chatbot />
    </div>
  );
};