import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../Components/Footer';

export default function Profile() {
  const history = useHistory();
  const { email } = (localStorage.getItem('user'))
    ? JSON.parse(localStorage.getItem('user')) : '';
  const userLogout = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <main>

      <section>
        <button
          data-testid="profile-done-btn"
          type="button"
          onClick={ () => history.push('/done-recipes') }
        >
          Done Recipes
        </button>

        <button
          data-testid="profile-favorite-btn"
          type="button"
          onClick={ () => history.push('/favorite-recipes') }
        >
          Favorite Recipes
        </button>

        <button
          data-testid="profile-logout-btn"
          type="button"
          onClick={ () => userLogout() }
        >
          Logout
        </button>
      </section>

      <div>PROFILE</div>
      <div data-testid="profile-email">{ email }</div>
      <Footer />

    </main>
  );
}
