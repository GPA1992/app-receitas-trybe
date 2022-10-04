import React, { useEffect, useState } from 'react';
import { useLocation, useHistory, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import fetchMeals from '../service/fetchMeals';
import fetchDrinks from '../service/fetchDrinks';
import { pushInLocalStorage, getFromLocalStorage } from '../service/localStorage';
import ShareAndFavoriteButtons from './RecipeDetails/ShareAndFavoriteButtons';

function RecipeInProgress() {
  const history = useHistory();
  const { pathname } = useLocation();
  const { id } = useParams();
  const [recipeDetails, setRecipeDetails] = useState({});
  const [ingredientsDone, setIgredientsDone] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      if (pathname.includes('meals')) {
        const data = await fetchMeals('id', id);
        setRecipeDetails(data);
      }
      if (pathname.includes('drinks')) {
        const data = await fetchDrinks('id', id);
        setRecipeDetails(data);
      }
    };
    fetchApi();
    console.log('depois tira');
  }, []);

  useEffect(() => {
    const dataProgress = getFromLocalStorage('inProgressRecipes');
    const mealsOrDrink = pathname.includes('/meals') ? 'meals' : 'drinks';
    if (dataProgress === null || dataProgress === undefined) {
      const progressObj = {
        drinks: {},
        meals: {},
      };
      return pushInLocalStorage('inProgressRecipes', progressObj);
    }
    const ifKeys = Object.keys(dataProgress[mealsOrDrink])?.some((keys) => keys === id);
    if (dataProgress[mealsOrDrink][id] !== null && ifKeys) {
      return setIgredientsDone(dataProgress[mealsOrDrink][id]);
    }
    if (ifKeys === false) {
      const newObj = { ...dataProgress };
      return pushInLocalStorage('inProgressRecipes', newObj);
    }
  }, []);

  useEffect(() => {
    const dataProgress = getFromLocalStorage('inProgressRecipes');
    const mealsOrDrink = pathname.includes('/meals') ? 'meals' : 'drinks';
    const progressList = [...ingredientsDone];
    if (progressList.length > 0) {
      const newDataProgress = {
        ...dataProgress,
        [mealsOrDrink]: {
          ...dataProgress[mealsOrDrink],
          [id]: progressList,
        },
      };
      pushInLocalStorage('inProgressRecipes', newDataProgress);
    }
  }, [ingredientsDone]);
  console.log(recipeDetails);
  const doneButton = () => {
    const doneRecipes = getFromLocalStorage('doneRecipes');
    if (doneRecipes === null) return pushInLocalStorage('doneRecipes', []);
    const mealsOrDrinkId = pathname.includes('/meals') ? 'idMeal' : 'idDrink';
    const mealsOrDrink = pathname.includes('/meals') ? 'Meal' : 'Drink';
    const str = 'str';
    const thumb = 'Thumb';
    const tag = [recipeDetails.strTags];
    const recipeDoneDetails = [
      ...doneRecipes,
      {
        id: recipeDetails[mealsOrDrinkId],
        type: mealsOrDrink,
        nationality: recipeDetails.strArea,
        category: recipeDetails.strCategory,
        alcoholicOrNot: recipeDetails.strAlcoholic,
        name: recipeDetails[str + mealsOrDrink],
        image: recipeDetails[str + mealsOrDrink + thumb],
        doneDate: recipeDetails.dateModified,
        tags: tag,
      },
    ];
    console.log(recipeDoneDetails);
    pushInLocalStorage('doneRecipes', recipeDoneDetails);
    return history.push('/done-recipes');
  };

  const ingredientsKeys = Object.keys(recipeDetails).filter(
    (key) => key.includes('strIngredient'),
  );

  const ingredients = ingredientsKeys.filter(
    (key) => recipeDetails[key] !== null && recipeDetails[key] !== '',
  );

  const ingredientsSetDone = ({ target }) => {
    if (target.checked) {
      setIgredientsDone([...ingredientsDone, target.name]);
      return true;
    }
    setIgredientsDone(ingredientsDone.filter((ingredient) => (
      ingredient !== target.name)));
    return false;
  };

  return (
    <section>
      <img
        data-testid="recipe-photo"
        src={ recipeDetails.strMealThumb || recipeDetails.strDrinkThumb }
        alt={ recipeDetails.strMeal || recipeDetails.strDrink }
      />
      <ShareAndFavoriteButtons recipeDetails={ recipeDetails } />
      <h1 data-testid="recipe-title">
        {recipeDetails.strMeal || recipeDetails.strDrink}
      </h1>
      <h2 data-testid="recipe-category">
        { recipeDetails.strCategory || recipeDetails.strAlcoholic }
      </h2>

      <div>
        <h4>Ingredients List</h4>
        <ul>
          {ingredients.map((key, index) => {
            if (recipeDetails[key] !== null) {
              const measurements = recipeDetails[`strMeasure${index + 1}`];
              return (
                <li>
                  <label
                    htmlFor={ key }
                    data-testid={ `${index}-ingredient-step` }
                  >
                    <input
                      checked={ ingredientsDone.some((e) => e === key) }
                      onChange={ ingredientsSetDone }
                      name={ key }
                      type="checkbox"
                    />
                    {recipeDetails[key]}
                    {measurements !== null && ` - ${measurements}`}
                  </label>
                </li>
              );
            }
            return null;
          })}
        </ul>
      </div>
      <h3>Instructions</h3>
      <p data-testid="instructions">{recipeDetails.strInstructions}</p>
      <button
        disabled={ ingredientsDone.length !== ingredients.length }
        onClick={ doneButton }
        type="button"
        data-testid="finish-recipe-btn"
      >
        Done Recipe
      </button>
    </section>
  );
}

RecipeInProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default RecipeInProgress;
