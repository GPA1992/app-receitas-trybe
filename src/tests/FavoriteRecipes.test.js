import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './utils/renderWithRouter';
import { pushInLocalStorage } from '../service/localStorage';
import App from '../App';

const PROFILE_ROUTE = '/profile';
const FAVORITE_RECIPE_ROUTE = '/favorite-recipes';

const mockStorage = [{
  alcoholicOrNot: '',
  category: 'Side',
  id: '52977',
  image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
  name: 'Corba',
  nationality: 'Turkish',
  type: 'meal',
}, {
  alcoholicOrNot: 'Optional alcohol',
  category: 'Ordinary Drink',
  id: '15997',
  image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
  name: 'GG',
  nationality: '',
  type: 'drink',
}];

describe('Testa se a Favorite Recipes', () => {
  test('é acessada corretamente a partir da tela de Profile', () => {
    pushInLocalStorage('favoriteRecipes', mockStorage);
    renderWithRouter(<App />, PROFILE_ROUTE);
    const pageTitle = screen.getByTestId('page-title');
    expect(pageTitle).toHaveTextContent('Profile');

    const email = screen.getByTestId('profile-email');
    expect(email).toBeInTheDocument();

    const doneRecipesBtn = screen.getByTestId('profile-done-btn');
    const favoriteRecipesBtn = screen.getByTestId('profile-favorite-btn');
    const logoutBtn = screen.getByTestId('profile-logout-btn');

    expect(doneRecipesBtn).toBeInTheDocument();
    expect(favoriteRecipesBtn).toBeInTheDocument();
    expect(logoutBtn).toBeInTheDocument();

    userEvent.click(favoriteRecipesBtn);

    const favoriteTitle = screen.getByTestId('page-title');
    expect(favoriteTitle).toBeInTheDocument();
  });
  test('mostra corretamente as receitas esperadas', () => {
    jest.spyOn(localStorage, 'setItem');
    pushInLocalStorage('favoriteRecipes', mockStorage);
    renderWithRouter(<App />, FAVORITE_RECIPE_ROUTE);

    const mealRecipe = screen.getByTestId('0-horizontal-image');
    const drinkRecipe = screen.getByTestId('1-horizontal-image');
    const drinkFavBtn = screen.getByTestId('1-horizontal-favorite-btn');
    expect(mealRecipe).toBeInTheDocument();
    expect(drinkRecipe).toBeInTheDocument();

    const allFilterBtn = screen.getByTestId('filter-by-all-btn');
    const mealsFilterBtn = screen.getByTestId('filter-by-meal-btn');
    const drinksFilterBtn = screen.getByTestId('filter-by-drink-btn');

    userEvent.click(mealsFilterBtn);
    userEvent.click(drinksFilterBtn);
    userEvent.click(allFilterBtn);
    userEvent.click(drinkFavBtn);

    userEvent.click(mealRecipe);
  });
  test('mostra corretamente o detalhe de uma receita favorita', () => {
    jest.spyOn(localStorage, 'setItem');
    pushInLocalStorage('favoriteRecipes', mockStorage);
    renderWithRouter(<App />, FAVORITE_RECIPE_ROUTE);

    const mealRecipe = screen.getByTestId('0-horizontal-image');
    const drinkRecipe = screen.getByTestId('1-horizontal-image');
    expect(mealRecipe).toBeInTheDocument();
    expect(drinkRecipe).toBeInTheDocument();

    userEvent.click(mealRecipe);

    const favoriteBtn = screen.getByTestId('favorite-btn');
    expect(favoriteBtn).toBeInTheDocument();

    const shareBtn = screen.getByTestId('share-btn');
    expect(shareBtn).toBeInTheDocument();

    const recipePhoto = screen.getByTestId('recipe-photo');
    expect(recipePhoto).toBeInTheDocument();

    const recipeTitle = screen.getByTestId('recipe-title');
    expect(recipeTitle).toBeInTheDocument();

    const recipeCategory = screen.getByTestId('recipe-category');
    expect(recipeCategory).toBeInTheDocument();

    const recipeInstruction = screen.getByTestId('instructions');
    expect(recipeInstruction).toBeInTheDocument();

    const startBtn = screen.getByTestId('start-recipe-btn');
    expect(startBtn).toBeInTheDocument();
  });
});
