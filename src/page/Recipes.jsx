import React, { useContext, useEffect } from 'react';
import context from '../contexts/ContextRecipe';
import Footer from '../component/Footer';
import Header from '../component/Header';

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
