import React, { useEffect, useContext } from 'react';
import context from '../Context/ContextRecipe';
import Recipes from '../components/Recipes';
import fetchDrinksCategories from '../services/fetchDrinksCategories';

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

  return (
    <div>
      { title === 'Drinks' && <Recipes /> }
    </div>
  );
}
