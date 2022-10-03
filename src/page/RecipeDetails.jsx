import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

import requestFetchApi from '../service/RequestFetchApi';
import './RecipeDetails.css';
import { getFromLocalStorage } from '../service/localStorage';

const MAX_RECOMMENDATIONS = 6;

function RecipeDetails(props) {
  const [recipeDetails, setRecipeDetails] = useState({});
  const [recommendations, setRecommendations] = useState({
    allRecommendations: [],
    selectedRecommendations: [],
  });
  const [recipeIsDone, setRecipeIsDone] = useState(false);

  const { pathname } = useLocation();

  useEffect(() => {
    const { match: { params: { id } } } = props;

    const fetchApi = async () => {
      const response = pathname.includes('/meals')
        ? await requestFetchApi(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        : await requestFetchApi(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      return pathname.includes('/meals')
        ? setRecipeDetails(response.meals[0])
        : setRecipeDetails(response.drinks[0]);
    };
    fetchApi();
  }, [pathname, props]);

  useEffect(() => {
    const fetchApi = async () => {
      const response = pathname.includes('/meals')
        ? await requestFetchApi('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
        : await requestFetchApi('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      setRecommendations({
        ...recommendations,
        allRecommendations: response.drinks || response.meals,
      });
    };
    fetchApi();
  }, []);

  useEffect(() => {
    const { allRecommendations } = recommendations;
    if (allRecommendations.length > 0) {
      const randomRecomendations = [];
      for (let index = 0; index < MAX_RECOMMENDATIONS; index += 1) {
        randomRecomendations.push(allRecommendations[index]);
      }
      setRecommendations({
        ...recommendations,
        selectedRecommendations: randomRecomendations,
      });
    }
  }, [recommendations.allRecommendations]);

  useEffect(() => {
    const doneRecipes = getFromLocalStorage('doneRecipes');
    const { match: { params: { id } } } = props;
    if (doneRecipes !== null) {
      const isDone = doneRecipes.some(
        (recipe) => recipe.id === id,
      );
      setRecipeIsDone(isDone);
    }
  }, []);

  const ingredientsKeys = Object.keys(recipeDetails).filter(
    (key) => key.includes('strIngredient'),
  );

  const ingredientsKeysFilred = ingredientsKeys.filter(
    (key) => recipeDetails[key] !== null && recipeDetails[key] !== '',
  );

  return (
    <main className="main-description">
      <header className="header-details">
        <img
          className="img-recipe-details"
          data-testid="recipe-photo"
          src={ recipeDetails.strMealThumb || recipeDetails.strDrinkThumb }
          alt={ recipeDetails.strMeal || recipeDetails.strDrink }
        />
        <div className="header-details-title">
          <h1 data-testid="recipe-title">
            {recipeDetails.strMeal || recipeDetails.strDrink}
          </h1>
          <h2 data-testid="recipe-category">
            {pathname.includes('/meals')
              ? recipeDetails.strCategory
              : recipeDetails.strAlcoholic}
          </h2>
        </div>
      </header>

      <div className="div-ingredients-recipe-details">
        <h3>Ingredients</h3>
        <div className="ingredients-recipe-details">
          <ul>
            {ingredientsKeysFilred.map((key, index) => {
              if (recipeDetails[key] !== null) {
                const measurements = recipeDetails[`strMeasure${index + 1}`];
                return (
                  <li
                    key={ index }
                    data-testid={ `${index}-ingredient-name-and-measure` }
                  >
                    {recipeDetails[key]}
                    {measurements !== null && ` - ${measurements}`}
                  </li>
                );
              }
              return null;
            })}
          </ul>
        </div>
      </div>

      <div className="div-instructions-recipe-details">
        <h3>Instructions</h3>
        <div className="instructions-recipe-details">
          <p data-testid="instructions">{recipeDetails.strInstructions}</p>
          <div>
            <iframe
              data-testid="video"
              width="640"
              height="360"
              src={ recipeDetails.strYoutube }
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media;
                 gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </div>

      <h3>Recomendadas</h3>
      <section className="section-recomendation">
        {recommendations.selectedRecommendations.map((recommendation, index) => (
          <div
            key={ index }
            data-testid={ `${index}-recommendation-card` }
            className="recommendation-card"
          >
            <img
              data-testid={ `${index}-recomendation-card-img` }
              src={ recommendation.strMealThumb || recommendation.strDrinkThumb }
              alt={ recommendation.strMeal || recommendation.strDrink }
            />
            <h4 data-testid={ `${index}-recommendation-title` }>
              {recommendation.strMeal || recommendation.strDrink}
            </h4>
          </div>
        ))}
      </section>
      { !recipeIsDone && (
        <button type="button" data-testid="start-recipe-btn" className="start-recipe-btn">
          Start Recipe
        </button>
      )}
    </main>
  );
}

RecipeDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default RecipeDetails;
