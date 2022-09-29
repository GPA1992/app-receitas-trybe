import React, { useContext, useEffect } from 'react';
import context from '../contexts/ContextRecipe';
import Header from '../component/Header';

function FavoriteRecipes() {
  const { setTitle, setShowHeaderButtons } = useContext(context);

  useEffect(() => {
    setShowHeaderButtons({
      profile: true,
      search: false,
    });
    setTitle('Favorite Recipes');
  }, []);

  return (
    <div>
      <Header />
      FavoriteRecipes
    </div>
  );
}
export default FavoriteRecipes;
