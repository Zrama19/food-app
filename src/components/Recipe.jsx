import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const Recipe = (props) => {
  const location = useLocation();
  const [singleRecipe, setSingleRecipe] = useState([]);
  const [ingredientMap, setIngredientMap] = useState([]);
  const [recipeLoading, setRecipeLoading] = useState(false);
  const [networkError, setNetworkError] = useState(false);

  const recipeId = location.pathname;

  let id = recipeId;

  let url2 = `https://api.edamam.com/api/recipes/v2/${id}?type=public&app_id=8cf35d14&app_key=bcaa0fad1b335e61b667cfe9d5fce7b0`;

  const oneRecipe = async () => {
    setRecipeLoading(true);
    fetch(url2)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let recipe = data;
        setSingleRecipe(recipe.recipe);
        setRecipeLoading(false);
        setIngredientMap(recipe.recipe.ingredientLines);
      })
      .catch((err) => {
        console.log(err);
        setNetworkError(true);
      });
  };

  useEffect(() => {
    oneRecipe();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      {networkError ? (
        <h1>The page you are trying to access could not be found.</h1>
      ) : (
        <div>
          {recipeLoading ? (
            <h1 data-testid='loading'>Loading data...</h1>
          ) : (
            <div data-testid='loaded'>
              <h1 data-testid='recipe-label'>{singleRecipe?.label}</h1>
              <img alt='Food' src={singleRecipe.image} />
              <h1>{Math.round(singleRecipe.calories) + ' calories.'}</h1>
              <ul>
                {ingredientMap.map((ingredient, index) => {
                  return <li key={index}>{ingredient}</li>;
                })}
              </ul>

              <div>
                <p>{singleRecipe.mealType}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Recipe;
