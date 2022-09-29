import React, { useEffect, useContext } from 'react';
import context from '../Context/ContextRecipe';
import Recipes from '../components/Recipes';
import fetchMealsCategories from '../services/fetchMealsCategories';
import Footer from '../Components/Footer';
import './Meals.css';

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
