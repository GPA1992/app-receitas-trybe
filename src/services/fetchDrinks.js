async function fetchDrinks(type, query) {
  try {
    if (type === 'name') {
      const getByName = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`);
      const dataName = await getByName.json();
      return dataName;
    } if (type === 'category') {
      const getByCategory = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${query}`);
      const dataCategory = await getByCategory.json();
      return dataCategory;
    }
  } catch (error) {
    console.log(error);
  }
}

export default fetchDrinks;
