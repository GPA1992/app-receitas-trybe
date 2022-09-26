import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import './Footer.css';

// Renderizar o component Footer em Drinks, Meals e Profile após criados

export default function Footer() {
  return (
    <footer data-testid="footer" className="footer">

      <section>
        <Link to="/drinks">
          <button
            type="button"
          >
            <img
              src={ drinkIcon }
              alt="drinks"
              data-testid="drinks-bottom-btn"
            />
          </button>
        </Link>

        <Link to="/meals">
          <button
            type="button"
          >
            <img
              src={ mealIcon }
              alt="meals"
              data-testid="meals-bottom-btn"
            />
          </button>
        </Link>
      </section>

    </footer>
  );
}

// Renderizar o component Footer em Drinks, Meals e Profile após criados
