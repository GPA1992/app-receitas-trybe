import React from 'react';
import PropTypes from 'prop-types';
import ContextRecipe from './ContextRecipe';
import useContextHook from '../hooks/useContextHook';

function Provider({ children }) {
  const {
    title,
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
    setSelectedDrink,
  } = useContextHook();

  const value = {
    title,
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
    setSelectedDrink,
  };

  return (
    <ContextRecipe.Provider value={ value }>
      {children}
    </ContextRecipe.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default Provider;
