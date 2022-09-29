import React, { useEffect, useContext } from 'react';
import context from '../Context/ContextRecipe';
import Recipes from '../components/Recipes';
import fetchMealsCategories from '../services/fetchMealsCategories';
import Footer from '../Components/Footer';
import './Meals.css';
import Header from '../Components/Header';

export default function Meals() {
  const { title, setTitle, mealsCategories, setMealsCategories } = useContext(context);

  useEffect(() => {
    console.log('Title before rendering: ', title);
    async function getMealsCategories() {
      const data = await fetchMealsCategories();
      setMealsCategories(data.meals);
    }
    console.log('Fetch return: ', mealsCategories);
    setTitle('Meals');
    console.log('Title after rendering: ', title);
    getMealsCategories();
  }, []);

  return (
    <div className="meals-css">

    <div>
      <Header />
      <h2>Página principal de receitas</h2>

      { title === 'Meals' && <Recipes /> }
      <Footer />
    </div>
  );
}
