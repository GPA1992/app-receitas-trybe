import React, { useEffect, useContext } from 'react';
import context from '../contexts/ContextRecipe';
import Recipes from '../component/Recipes';
import fetchDrinksCategories from '../service/fetchDrinksCategories';
import Footer from '../component/Footer';
import Header from '../component/Header';

export default function Drinks() {
  const { title, setTitle, setDrinksCategories } = useContext(context);

  useEffect(() => {
    async function getDrinksCategories() {
      const data = await fetchDrinksCategories();
      setDrinksCategories(data.drinks);
    }
    getDrinksCategories();
    setTitle('Drinks');
  }, []);
  // f

  return (
    <div>
      <Header />
      { title === 'Drinks' && <Recipes /> }
      <Footer />

    </div>
  );
}
