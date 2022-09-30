import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import context from '../contexts/ContextRecipe';
import SearchBar from './SearchBar';

export default function Header() {
  const history = useHistory();
  const { title, showHeaderButtons,
    setShowHeaderButtons, setSearchItem } = useContext(context);
  const { profile, search, inputSearch } = showHeaderButtons;

  const viewInputSearch = () => {
    setShowHeaderButtons((previousState) => ({
      ...previousState,
      inputSearch: !inputSearch,
    }));
  };

  const searchItemCapture = ({ target }) => {
    const { value } = target;
    setSearchItem(value);
  };

  return (
    <div data-testid="header">
      <h3 data-testid="page-title">{ title }</h3>
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
