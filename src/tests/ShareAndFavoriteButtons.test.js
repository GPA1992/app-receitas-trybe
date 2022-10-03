import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderWithRouter from './utils/renderWithRouter';
import App from '../App';
import { DESCRIPTION_MEAL_PATHNAME, DESCRIPTION_DRINK_PATHNAME, RECIPE_PHOTO_TEST_ID } from './utils/constantsTest';
import { MOCK_FAVORITE_RECIPE_MEAL_BEFORE, MOCK_FAVORITE_RECIPE_MEAL_AFTER,
  MOCK_FAVORITE_RECIPE_DRINK_BEFORE, MOCK_FAVORITE_RECIPE_DRINK_AFTER } from './utils/utilsMocks';
import fetch from '../../cypress/mocks/fetch';
import { pushInLocalStorage, getFromLocalStorage } from '../service/localStorage';

describe('Testa o componente ShareAndFavoriteButtons.', () => {
  test('Testa se, ao clicar no botão de favoritos, o coração muda para preenchido de preto.', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(fetch);

    renderWithRouter(<App />, DESCRIPTION_MEAL_PATHNAME);

    const recipePhoto = await screen.findByTestId(RECIPE_PHOTO_TEST_ID);
    expect(recipePhoto).toBeInTheDocument();

    const whiteHeartButton = await screen.findByTestId('favorite-btn');
    expect(whiteHeartButton).toBeInTheDocument();
    expect(whiteHeartButton).toHaveAttribute('src', 'whiteHeartIcon.svg');

    userEvent.click(whiteHeartButton);

    const blackHeartButton = await screen.findByTestId('favorite-btn');
    expect(blackHeartButton).toBeInTheDocument();
    expect(blackHeartButton).toHaveAttribute('src', 'blackHeartIcon.svg');
  });

  test('Testa se, ao clicar no botão de compartilhar, o link é copiado.', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(fetch);
    navigator.clipboard = {
      writeText: jest.fn(),
    };

    renderWithRouter(<App />, DESCRIPTION_DRINK_PATHNAME);

    const shareButton = await screen.findByTestId('share-btn');
    expect(shareButton).toBeInTheDocument();

    userEvent.click(shareButton);

    const shareMessage = screen.getByText(/Link copied!/i);
    expect(shareMessage).toBeInTheDocument();
  });

  test('Testa se, ao clicar no botão de favoritos, a receita é adicionada à lista de favoritos. ', () => {
    jest.spyOn(global, 'fetch').mockImplementation(fetch);

    pushInLocalStorage('favoriteRecipes', MOCK_FAVORITE_RECIPE_MEAL_BEFORE);

    renderWithRouter(<App />, DESCRIPTION_MEAL_PATHNAME);
    const favoriteListBefore = getFromLocalStorage('favoriteRecipes');

    expect(favoriteListBefore).not.toBe(null);

    const blackHeartButton = screen.getByTestId('favorite-btn');
    userEvent.click(blackHeartButton);

    const favoriteListAfter = getFromLocalStorage('favoriteRecipes');

    expect(favoriteListAfter).toEqual(MOCK_FAVORITE_RECIPE_MEAL_AFTER);
  });

  test('Testa se, ao clicar no botão de favoritos, a receita é adicionada à lista de favoritos. ', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(fetch);

    pushInLocalStorage('favoriteRecipes', MOCK_FAVORITE_RECIPE_DRINK_BEFORE);

    renderWithRouter(<App />, DESCRIPTION_DRINK_PATHNAME);
    const favoriteListBefore = getFromLocalStorage('favoriteRecipes');
    expect(favoriteListBefore).toEqual([]);

    const recipePhoto = await screen.findByTestId(RECIPE_PHOTO_TEST_ID);
    expect(recipePhoto).toBeInTheDocument();

    const whiteHeartButton = screen.getByTestId('favorite-btn');
    userEvent.click(whiteHeartButton);

    const favoriteListAfter = getFromLocalStorage('favoriteRecipes');

    expect(favoriteListAfter[0].id).toBe('15997');

    const blackHeartButton = await screen.findByTestId('favorite-btn');
    expect(blackHeartButton).toBeInTheDocument();
    expect(blackHeartButton).toHaveAttribute('src', 'blackHeartIcon.svg');
  });
});
