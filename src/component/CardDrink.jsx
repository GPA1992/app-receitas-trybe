import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import context from '../contexts/ContextRecipe';

function CardDrink() {
  const history = useHistory();
  const { dataDrinks, setSelectedDrink } = useContext(context);
  const renderLimit = 12;

  return (
    <div>
      {dataDrinks && dataDrinks.map((drink, i) => (
        i < renderLimit && (
          <div
            key={ drink.idDrink }
            data-testid={ `${i}-recipe-card` }
            role="button"
            tabIndex={ 0 }
            onClick={ () => {
              setSelectedDrink(drink.idDrink);
              history.push(`/drinks/${drink.idDrink}`);
            } }
            onKeyPress={ () => { history.push(`/drinks/${drink.idDrink}`); } }
          >
            <img
              data-testid={ `${i}-card-img` }
              src={ drink.strDrinkThumb }
              alt={ `drink-${i}` }
            />
            <h2
              data-testid={ `${i}-card-name` }
            >
              {drink.strDrink}
            </h2>
          </div>
        )
      ))}
    </div>
  );
}

export default CardDrink;
