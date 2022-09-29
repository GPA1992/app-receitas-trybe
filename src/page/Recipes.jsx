import React, { useContext, useEffect } from 'react';
import context from '../context/ContextRecipe';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Recipes() {
  const { state, setPageTitle, setShowHeaderButtons } = useContext(context);

  useEffect(() => {
    setShowHeaderButtons({
      profile: true,
      search: true,
    });
    setPageTitle('Meals');
  }, []);

  const handleChange = ({ target }) => {
    const { value } = target;
    setState(value);
  };

  return (
    <div>
      <Header />
      <p name="nome">
        {state.nome}
      </p>
      <input type="text" onChange={ handleChange } />
      Meals
      <Footer />
    </div>
  );
}
