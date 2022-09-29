import React, { useEffect, useContext } from 'react';
import context from '../contexts/ContextRecipe';
import Recipes from '../component/Recipes';
import fetchMealsCategories from '../service/fetchMealsCategories';
import Footer from '../component/Footer';
import Header from '../component/Header';

export default function Meals() {
  const { title, setTitle, setMealsCategories } = useContext(context);

  useEffect(() => {
    console.log('Title value before render: ', title);
    async function getMealsCategories() {
      const data = await fetchMealsCategories();
      setMealsCategories(data.meals);
    }
    getMealsCategories();
    setTitle('Meals');
    console.log('Title value after render: ', title);
  }, []);
  // f

  return (
    <div>
      <Header />
      { title === 'Meals' && <Recipes /> }
      <Footer />
    </div>
  );
}
