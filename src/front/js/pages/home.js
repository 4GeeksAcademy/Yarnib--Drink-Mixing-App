
import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../store/appContext';
import rigoImageUrl from '../../img/rigo-baby.jpg';
import '../../styles/home.css';
import ChatBot from './ChatBot';

export const Home = () => {
  const { store, actions } = useContext(Context);
  const [cocktails, setCocktails] = useState([]);
  const [selectedDrink, setSelectedDrink] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [showDrinkList, setShowDrinkList] = useState(true);
  const [previousSearchResults, setPreviousSearchResults] = useState([]);

  useEffect(() => {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=`)
      .then((response) => response.json())
      .then((data) => {
        setCocktails(data.drinks);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleDrinkClick = async (drink) => {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drink.idDrink}`);
    const data = await response.json();
    if (data.drinks && data.drinks.length > 0) {
      setSelectedDrink(data.drinks[0]);
      setShowDrinkList(false);
    }
  };

  const toggleFavorite = (drink) => {
    if (favorites.includes(drink.idDrink)) {
      const updatedFavorites = favorites.filter((fav) => fav !== drink.idDrink);
      setFavorites(updatedFavorites);
    } else {
      setFavorites([...favorites, drink.idDrink]);
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

  return (
    <div className="text-center mt-5">
      {/* ... Rest of your component layout and presentation ... */}

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
          <div>
            <p className="drink-ingredients">
              <strong>Ingredients:</strong>
              <ul>
                {[...Array(15)].map((_, i) => {
                  const ingredient = selectedDrink[`strIngredient${i + 1}`];
                  const measure = selectedDrink[`strMeasure${i + 1}`];
                  if (ingredient && measure) {
                    return <li key={i}>{measure} {ingredient}</li>;
                  }
                  return null;
                })}
              </ul>
            </p>
            <p className="drink-instructions">
              <strong>Instructions:</strong> {selectedDrink.strInstructions}
            </p>
          </div>
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
