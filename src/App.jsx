import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Pages/Login';
import Recipes from './Pages/Recipes';
import Provider from './Context/ProviderRecipe';

function App() {
  return (
    <Provider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/meals" component={ Recipes } />
      </Switch>
    </Provider>
  );
}

export default App;
