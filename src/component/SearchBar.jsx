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

  const checkIfOneRecipe = (array, id) => {
    if (array.length === 1) {
      history.push(`${title.toLowerCase()}/${id}`);
    }
  };

  const mealsHandle = async () => {
    const dataMealsTwo = await fetchMeals(searchType, searchItem);
    if (dataMealsTwo.meals === null) {
      return global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
    checkIfOneRecipe(dataMealsTwo.meals, dataMealsTwo.meals[0].idMeal);
    setDataMeals(dataMealsTwo.meals);
  };

  const drinkHandle = async () => {
    const dataDrinkTwo = await fetchDrinks(searchType, searchItem);

    if (dataDrinkTwo.drinks === null) {
      return global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
    setDataDrinks(dataDrinkTwo.drinks);
    checkIfOneRecipe(dataDrinkTwo.drinks, dataDrinkTwo.drinks[0].idDrink);
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
