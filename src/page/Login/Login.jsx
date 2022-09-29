import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import context from '../../Context/ContextRecipe';

export default function Login() {
  const { setTitle } = useContext(context);

  useEffect(() => { setTitle('Login'); });

  const history = useHistory();
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });
  const [buttonDisable, setButtonDisable] = useState(true);

  const loginValidation = () => {
    const { email, password } = loginInfo;
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const minCaractereLength = 6;
    const validation = regex.test(email) && password.length >= minCaractereLength;
    setButtonDisable(!validation);
  };

  const handleChange = ({ target }) => {
    const { value, name } = target;
    setLoginInfo({
      ...loginInfo,
      [name]: value,
    });
    loginValidation();
  };

  const handleClick = () => {
    const { email } = loginInfo;
    localStorage.setItem('user', JSON.stringify({ email }));
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('drinksToken', '1');
    history.push('/meals');
  };

  return (
    <div>
      <label htmlFor="email-input">
        <p>E-mail</p>
        <input
          name="email"
          data-testid="email-input"
          type="email"
          placeholder="exemplo@exemplo.com"
          onChange={ handleChange }
        />
      </label>
      <br />
      <label htmlFor="password">
        <p>Senha</p>
        <input
          onChange={ handleChange }
          name="password"
          data-testid="password-input"
          type="password"
          placeholder="senha"
        />
      </label>
      <br />
      <br />
      <button
        disabled={ buttonDisable }
        data-testid="login-submit-btn"
        type="button"
        onClick={ handleClick }
      >
        Submit
      </button>
    </div>
  );
}
