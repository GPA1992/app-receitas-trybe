import React, { useEffect, useContext } from 'react';
import context from '../contexts/ContextRecipe';

export default function SearchBar() {
  const { setRecipeList, searchType,
    setSearchType, searchItem, recipeList } = useContext(context);

  useEffect(() => {}, []);

  const fetchRecipe = async (url) => {
    const { meals } = await fetch(url).then((response) => response.json());
    setRecipeList(meals);
  };

  const searchRecipe = async () => {
    const weNeedAlert = searchType === 'first-letter' && searchItem.length >= 2;

    if (weNeedAlert === true) {
      return global.alert('Your search must have only 1 (one) character');
    }
    switch (searchType) {
    case 'ingredient': {
      await fetchRecipe(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchItem}`);
      break;
    }
    case 'name': {
      await fetchRecipe(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchItem}`);
      break;
    }
    case 'first-letter': {
      await fetchRecipe(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchItem}`);
      break;
    }
    default:
      break;
    }
    console.log(recipeList);
  };

  const onClickSearchType = ({ target }) => {
    const { value } = target;
    setSearchType(value);
    console.log();
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
