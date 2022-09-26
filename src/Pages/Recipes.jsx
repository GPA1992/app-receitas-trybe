import React, { useContext } from 'react';
import context from '../Context/ContextRecipe';

export default function Recipes() {
  const { state,
    setState } = useContext(context);

  const handleChange = ({ target }) => {
    const { value } = target;
    setState(value);
    console.log(`fui chamado o valor é ${value}`);
    console.log(state.nome);
  };

  return (
    <div>
      <p name="nome">
        {state.nome}
      </p>
      <input type="text" onChange={ handleChange } />
    </div>
  );
}
