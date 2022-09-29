import React, { useContext, useEffect } from 'react';
import context from '../context/ContextRecipe';
import Header from '../components/Header';

function FavoriteRecipes() {
  const { setPageTitle, setShowHeaderButtons } = useContext(context);

  useEffect(() => {
    setShowHeaderButtons({
      profile: true,
      search: false,
    });
    setPageTitle('Favorite Recipes');
  }, []);

  return (
    <div>
      <Header />
      FavoriteRecipes
    </div>
  );
}
export default FavoriteRecipes;
