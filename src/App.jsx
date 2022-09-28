import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Pages/Login';
import Provider from './Context/ProviderRecipe';
import Drinks from './Pages/Drinks';
import Meals from './pages/Meals';
import DoneRecipes from './Pages/DoneRecipes';
import Profile from './Pages/Profile';
import FavoriteRecipes from './Pages/FavoriteRecipes';
import RecipeInProgress from './Pages/RecipeInProgress';
import RecipeDetails from './Pages/RecipeDetails';

function App() {
  return (
    <Provider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/meals" component={ Meals } />
        <Route exact path="/drinks" component={ Drinks } />
        <Route exact path="/meals/:id/in-progress" component={ RecipeInProgress } />
        <Route exact path="/drinks/:id/in-progress" component={ RecipeInProgress } />
        <Route exact path="/meals/:id" component={ RecipeDetails } />
        <Route exact path="/drinks/:id" component={ RecipeDetails } />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/done-recipes" component={ DoneRecipes } />
        <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
      </Switch>
    </Provider>
  );
}

export default App;
