import React, { useEffect, useContext } from 'react';
import context from '../contexts/ContextRecipe';
import Recipes from '../component/Recipes';
import fetchMealsCategories from '../service/fetchMealsCategories';
import Footer from '../component/Footer';

export default function Meals() {
  const { title, setTitle, setMealsCategories } = useContext(context);

  useEffect(() => {
    async function getMealsCategories() {
      const data = await fetchMealsCategories();
      setMealsCategories(data.meals);
    }
    getMealsCategories();
    setTitle('Meals');
  }, []);
  // f

  return (
    <div className="meals-css">
      { title === 'Meals' && <Recipes /> }
      <Footer />
    </div>
  );
}
