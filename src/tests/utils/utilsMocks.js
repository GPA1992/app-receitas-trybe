export const MOCK_DONE_RECIPE = [
  {
    id: '52771',
    type: 'meal',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    doneDate: '23/06/2020',
    tags: ['Pasta', 'Curry'],
  },
  {
    id: '15997',
    type: 'drink',
    nationality: '',
    category: 'Ordinary Drink',
    alcoholicOrNot: 'Alcoholic',
    name: 'GG',
    image: 'https://www.thecocktaildb.com/images/media/drink/3pylqc1504370988.jpg',
    doneDate: '23/06/2020',
    tags: [],
  },
];

export const MOCK_FAVORITE_RECIPE_MEAL_BEFORE = [{
  id: '52771',
  type: 'meal',
  nationality: 'Italian',
  category: 'Vegetarian',
  alcoholicOrNot: '',
  name: 'Spicy Arrabiata Penne',
  image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
  doneDate: '',
  tags: ['Pasta', 'Curry'],
}];

export const MOCK_FAVORITE_RECIPE_MEAL_AFTER = [];

export const MOCK_FAVORITE_RECIPE_DRINK_BEFORE = [];

export const MOCK_FAVORITE_RECIPE_DRINK_AFTER = [{
  id: '15997',
  type: 'drink',
  nationality: '',
  category: 'Ordinary Drink',
  alcoholicOrNot: 'Alcoholic',
  name: 'GG',
  image: 'https://www.thecocktaildb.com/images/media/drink/3pylqc1504370988.jpg',
}];

export const MOCK_IN_PROGRESS_RECIPE = {
  drinks: {
    15997: [],
  },
  meals: {
    52771: [],
  },
};
