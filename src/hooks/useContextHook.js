import { useState } from 'react';

const useContextHook = () => {
  const [title, setTitle] = useState('');
  const [mealsCategories, setMealsCategories] = useState([]);
  const [drinksCategories, setDrinksCategories] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState([]);
  const [selectedDrink, setSelectedDrink] = useState([]);
  const [dataMeals, setDataMeals] = useState([]);
  const [dataDrinks, setDataDrinks] = useState([]);

  return { title,
    setTitle,
    mealsCategories,
    setMealsCategories,
    drinksCategories,
    setDrinksCategories,
    dataMeals,
    setDataMeals,
    dataDrinks,
    setDataDrinks,
    selectedMeal,
    setSelectedMeal,
    selectedDrink,
    setSelectedDrink };
};

export default useContextHook;
