import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import context from '../context/ContextRecipe';
import SearchBar from './SearchBar';

export default function Header() {
  const history = useHistory();
  const { pageTitle, showHeaderButtons,
    setShowHeaderButtons, setSearchitem } = useContext(context);
  const { profile, search, inputSearch } = showHeaderButtons;

  const viewInputSearch = () => {
    setShowHeaderButtons((previousState) => ({
      ...previousState,
      inputSearch: !inputSearch,
    }));
  };

  const searchItemCapture = ({ target }) => {
    const { value } = target;
    setSearchitem(value);
  };

  return (
    <div>
      <h3 data-testid="page-title">{ pageTitle }</h3>
      { profile && (
        <button
          onClick={ () => history.push('/profile') }
          type="button"
          src={ profileIcon }
        >
          <img data-testid="profile-top-btn" src={ profileIcon } alt="profile-icon" />
        </button>
      )}
      { search && (
        <button
          onClick={ viewInputSearch }
          type="button"
          src={ searchIcon }
        >
          <img data-testid="search-top-btn" src={ searchIcon } alt="profile-icon" />
        </button>
      )}
      {inputSearch && (
        <input
          onChange={ searchItemCapture }
          type="text"
          data-testid="search-input"
        />
      )}
      <SearchBar />
    </div>
  );
}
