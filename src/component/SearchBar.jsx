import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import context from '../contexts/ContextRecipe';
import fetchMeals from '../service/fetchMeals';
import fetchDrinks from '../service/fetchDrinks';

export default function SearchBar() {
  const history = useHistory();
  const { searchType, setDataDrinks,
    setSearchType, searchItem, title, setDataMeals } = useContext(context);

  useEffect(() => {}, []);

  const onClickSearchType = ({ target }) => {
    const { value } = target;
    setSearchType(value);
  };

  const mealsHandle = async () => {
    const mealsFetch = await fetchMeals(searchType, searchItem.toLowerCase());
    const sorry = 'Sorry';
    if (mealsFetch.meals === null) {
      return global.alert(`${sorry}, we haven't found any recipes for these filters.`);
    }
    if (mealsFetch.meals.length === 1) {
      history.push(`${title.toLowerCase()}/${mealsFetch.meals[0].idMeal}`);
    }
    setDataMeals(mealsFetch.meals);
  };

  const drinkHandle = async () => {
    const drinksFetch = await fetchDrinks(searchType, searchItem.toLowerCase());
    const sorry = 'Sorry';
    if (drinksFetch.drink === null) {
      return global.alert(`${sorry}, we haven't found any recipes for these filters.`);
    }
    if (drinksFetch.drinks.length === 1) {
      history.push(`${title.toLowerCase()}/${drinksFetch.drinks[0].idDrink}`);
    }
    setDataDrinks(drinksFetch.drinks);
  };

  const searchRecipe = () => {
    const ifFirstLetter = searchType === 'first-letter' && searchItem.length >= 2;

    if (ifFirstLetter === true) {
      return global.alert('Your search must have only 1 (one) character');
    }
    if (title === 'Meals') {
      return mealsHandle();
    }
    if (title === 'Drinks') {
      return drinkHandle();
    }
  };

  return (
    <div>
      <label htmlFor="ingredient-search-radio">
        Ingredientes
        <input
          value="ingredient"
          onClick={ onClickSearchType }
          name="search-type"
          data-testid="ingredient-search-radio"
          type="radio"
        />
      </label>
      <br />
      <label htmlFor="name-search-radio">
        Name
        <input
          value="name"
          onClick={ onClickSearchType }
          name="search-type"
          data-testid="name-search-radio"
          type="radio"
        />
      </label>
      <br />
      <label htmlFor="first-letter-search-radio">
        Primeira Letra
        <input
          value="first-letter"
          onClick={ onClickSearchType }
          name="search-type"
          data-testid="first-letter-search-radio"
          type="radio"
        />
      </label>
      <br />
      <button
        onClick={ searchRecipe }
        type="button"
        data-testid="exec-search-btn"
      >
        exercutar busca
      </button>
    </div>
  );
}
