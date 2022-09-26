import React, { useState } from 'react';
import ContextRecipe from './ContextRecipe';

function Provider({ children }) {
  const [state, setState] = useState(INITIAL_STATE);

  const context = useMemo(() => ({
    state,
    setState,
  }), [state]);

  /*   const context = {
    state,
    setState,
    test,
    setTest,
  }; */

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
