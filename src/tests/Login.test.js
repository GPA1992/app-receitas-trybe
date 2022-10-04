import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import renderWithRouter from './utils/renderWithRouter';
import { getFromLocalStorage } from '../service/localStorage';

const testEmail = 'email@email.com';
const testPassword = '1234567';
const LOGIN_BUTTON_TEST_ID = 'login-submit-btn';
const INPUT_EMAIL_TEST_ID = 'email-input';
const INPUT_PASSWORD_TEST_ID = 'password-input';

describe('Verifica se a página Login', () => {
  test('Testa se os inputs podem ser preenchidos pela digitação do usuário', () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByTestId(INPUT_EMAIL_TEST_ID);
    const passwordInput = screen.getByTestId(INPUT_PASSWORD_TEST_ID);
    const loginButtonElement = screen.getByTestId(LOGIN_BUTTON_TEST_ID);

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButtonElement).toBeInTheDocument();

    userEvent.type(emailInput, testEmail);

    expect(loginButtonElement).toBeDisabled();

    userEvent.type(passwordInput, testPassword);

    expect(loginButtonElement).toBeEnabled();

    expect(emailInput).toHaveValue(testEmail);
    expect(passwordInput).toHaveValue(testPassword);
  });

  test('Testa se as informações chegam no LocalStorage corretamente', () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByTestId(INPUT_EMAIL_TEST_ID);
    const passwordInput = screen.getByTestId(INPUT_PASSWORD_TEST_ID);
    const loginButtonElement = screen.getByTestId(LOGIN_BUTTON_TEST_ID);

    userEvent.type(emailInput, testEmail);
    userEvent.type(passwordInput, testPassword);

    userEvent.click(loginButtonElement);

    const user = getFromLocalStorage('user');
    const mealsToken = getFromLocalStorage('mealsToken');
    const drinksToken = getFromLocalStorage('drinksToken');

    expect(user).toEqual({ email: testEmail });
    expect(mealsToken).toBe(1);
    expect(drinksToken).toBe(1);
  });
});
