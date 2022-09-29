import React, { useContext, useEffect } from 'react';
import context from '../contexts/ContextRecipe';
import Header from '../component/Header';

function DoneRecipes() {
  const { setPageTitle, setShowHeaderButtons } = useContext(context);

  useEffect(() => {
    setShowHeaderButtons({
      profile: true,
      search: false,
    });
    setPageTitle('Done Recipes');
  }, []);

  return (
    <div>
      <Header />
      DoneRecipes
    </div>
  );
}
export default DoneRecipes;
