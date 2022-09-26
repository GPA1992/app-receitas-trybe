import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ContextRecipe from './ContextRecipe';

function Provider({ children }) {
  const INITIAL_STATE = [];
  const [state, setState, test, setTest] = useState(INITIAL_STATE);

  const context = {
    state,
    setState,
    test,
    setTest,
  };

  return (
    <ContextRecipe.Provider value={ context }>
      {children}
    </ContextRecipe.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default Provider;
