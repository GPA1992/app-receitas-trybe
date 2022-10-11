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
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderWithRouter from './utils/renderWithRouter';
import App from '../App';
import { MEAL_NAME, DRINK_NAME, FAVORITE_KEY_LOCAL_STORAGE, FAVORITE_RECIPES_PATHNAME } from './utils/constantsTest';
import { MOCK_FAVORITE_RECIPE_ALL, MOCK_FAVORITE_RECIPE_ALL_AFTER } from './utils/utilsMocks';
import fetch from '../../cypress/mocks/fetch';
import { pushInLocalStorage, getFromLocalStorage } from '../service/localStorage';

describe('Testa o componente FavoriteRecipes.', () => {
  test('Testa se, ao acessar a página de favoritos, a lista de receitas dispõe as receita sem filtros de categoria.', () => {
    jest.spyOn(global, 'fetch').mockImplementation(fetch);

    pushInLocalStorage(FAVORITE_KEY_LOCAL_STORAGE, MOCK_FAVORITE_RECIPE_ALL);

    renderWithRouter(<App />, FAVORITE_RECIPES_PATHNAME);

    const drinkName = screen.getByText(DRINK_NAME);
    const mealName = screen.getByText(MEAL_NAME);

    expect(drinkName).toBeInTheDocument();
    expect(mealName).toBeInTheDocument();
  });

  test('Testa se, ao clicar no botão "Drinks", apenas as receitas com categoria drink aparecerão.', () => {
    jest.spyOn(global, 'fetch').mockImplementation(fetch);

    pushInLocalStorage(FAVORITE_KEY_LOCAL_STORAGE, MOCK_FAVORITE_RECIPE_ALL);

    renderWithRouter(<App />, FAVORITE_RECIPES_PATHNAME);

    const drinkButton = screen.getByRole('button', { name: 'Drinks' });
    expect(drinkButton).toBeInTheDocument();

    userEvent.click(drinkButton);

    const drinkName = screen.queryByText(DRINK_NAME);
    const mealName = screen.queryByText(MEAL_NAME);

    expect(drinkName).toBeInTheDocument();
    expect(mealName).not.toBeInTheDocument();
  });

  test('Testa se, ao clicar no botão "Food", apenas as receitas com categoria meal aparecerão.', () => {
    jest.spyOn(global, 'fetch').mockImplementation(fetch);

    pushInLocalStorage(FAVORITE_KEY_LOCAL_STORAGE, MOCK_FAVORITE_RECIPE_ALL);

    renderWithRouter(<App />, FAVORITE_RECIPES_PATHNAME);

    const mealsButton = screen.getByRole('button', { name: 'Meals' });
    expect(mealsButton).toBeInTheDocument();

    userEvent.click(mealsButton);

    const drinkName = screen.queryByText(DRINK_NAME);
    const mealName = screen.queryByText(MEAL_NAME);

    expect(drinkName).not.toBeInTheDocument();
    expect(mealName).toBeInTheDocument();

    const allButton = screen.getByRole('button', { name: 'All' });
    expect(allButton).toBeInTheDocument();

    userEvent.click(allButton);

    const drinkNameAfter = screen.queryByText(DRINK_NAME);
    const mealNameAfter = screen.queryByText(MEAL_NAME);

    expect(drinkNameAfter).toBeInTheDocument();
    expect(mealNameAfter).toBeInTheDocument();
  });

  test('Testa se, ao clicar no botão de compartilhar, o link é copiado.', () => {
    jest.spyOn(global, 'fetch').mockImplementation(fetch);
    navigator.clipboard = {
      writeText: jest.fn(),
    };

    renderWithRouter(<App />, FAVORITE_RECIPES_PATHNAME);

    const shareButton = screen.getByTestId('0-horizontal-share-btn');
    expect(shareButton).toBeInTheDocument();

    const shareMessageBefore = screen.queryByText(/Link copied!/i);

    expect(shareMessageBefore).not.toBeInTheDocument();

    userEvent.click(shareButton);

    const shareMessageAfter = screen.queryByText(/Link copied!/i);

    expect(shareMessageAfter).toBeInTheDocument();
  });

  test('Testa se, ao clicar no botão de favoritos, a receita é removida da lista de favoritos. ', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(fetch);

    pushInLocalStorage(FAVORITE_KEY_LOCAL_STORAGE, MOCK_FAVORITE_RECIPE_ALL);

    renderWithRouter(<App />, FAVORITE_RECIPES_PATHNAME);
    const favoriteListBefore = getFromLocalStorage(FAVORITE_KEY_LOCAL_STORAGE);
    expect(favoriteListBefore).toEqual(MOCK_FAVORITE_RECIPE_ALL);

    const drinkNameBefore = screen.queryByTestId('0-horizontal-name');
    const mealNameBefore = screen.queryByTestId('1-horizontal-name');

    expect(drinkNameBefore).toBeInTheDocument();
    expect(mealNameBefore).toBeInTheDocument();

    const favoriteButton = screen.getByTestId('1-horizontal-favorite-btn');
    userEvent.click(favoriteButton);

    const favoriteListAfter = getFromLocalStorage(FAVORITE_KEY_LOCAL_STORAGE);

    expect(favoriteListAfter).toEqual(MOCK_FAVORITE_RECIPE_ALL_AFTER);

    const drinkNameAfter = screen.queryByText(DRINK_NAME);
    const mealNameAfter = screen.queryByText(MEAL_NAME);

    expect(drinkNameAfter).toBeInTheDocument();
    expect(mealNameAfter).not.toBeInTheDocument();
  });

  test('Testa se, quando não houver receitas favoritadas, a mensagem "Nenhuma receita favoritada" é renderizada', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(fetch);
    pushInLocalStorage(FAVORITE_KEY_LOCAL_STORAGE, []);

    renderWithRouter(<App />, FAVORITE_RECIPES_PATHNAME);

    const message = await screen.findByText(/Nenhuma receita favoritada/i);

    expect(message).toBeInTheDocument();
  });
});
