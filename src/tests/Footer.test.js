import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './utils/renderWithRouter';

// Não foi necessário colocar o valor de placeholder e dos userType,
// pois cada valor foi só usado uma única vez, assim não disparou
// Nenhum aviso no lint
describe('O componente footer deve ', () => {
  it('ser encontrado na rota /meals', () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByPlaceholderText('exemplo@exemplo.com');
    const passwordInput = screen.getByPlaceholderText(/senha/i);
    const button = screen.getByTestId('login-submit-btn');
    userEvent.type(emailInput, 'email@email.com');
    userEvent.type(passwordInput, '1234567');
    userEvent.click(button);

    const footer = screen.getByTestId('footer');
    expect(footer).toBeInTheDocument();

    const drinksBtn = screen.getByTestId('drinks-btn');
    const mealsBtn = screen.getByTestId('meals-btn');
    expect(drinksBtn).toBeInTheDocument();
    expect(mealsBtn).toBeInTheDocument();
  });
});
