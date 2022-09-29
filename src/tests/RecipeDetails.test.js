import { screen } from '@testing-library/react';

import renderWithRouter from './utils/renderWithRouter';
import App from '../App';
import oneMeal from '../../cypress/mocks/oneMeal';

describe('Testa o componente RecipeDetails', () => {
  test('Verifica se a página contém as informações corretas', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(oneMeal),
    }));

    const { history } = renderWithRouter(<App />);
    history.push('/meals/52771');

    expect(history.location.pathname).toBe('/meals/52771');

    const mealImage = await screen.findByTestId('recipe-photo');
    expect(mealImage).toBeInTheDocument();
  });
});
