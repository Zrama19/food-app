import React, { useEffect, useState } from 'react';

import axios from 'axios';
import ClipLoader from 'react-spinners/ClipLoader';
import { css } from '@emotion/react';
import { useLocation } from 'react-router-dom';

const override = css`
  position: absolute;
  top: 50%;
  left: 50%;
`;

const Recipe = (props) => {
  const location = useLocation();
  const [singleRecipe, setSingleRecipe] = useState([]);
  const [ingredientMap, setIngredientMap] = useState([]);
  const [recipeLoading, setRecipeLoading] = useState(false);
  const [networkError, setNetworkError] = useState(false);
  const [networkStatus, setNetworkStatus] = useState();

  // console.log(location.pathname);
  const recipeId = location.pathname;
  console.log(recipeId);

  let id = recipeId;

  let url2 = `https://api.edamam.com/api/recipes/v2/${id}?type=public&app_id=8cf35d14&app_key=bcaa0fad1b335e61b667cfe9d5fce7b0`;
  console.log(url2);

  const oneRecipe = () => {
    setRecipeLoading(true);
    axios
      .get(url2)
      .then((result) => {
        setSingleRecipe(result.data.recipe);
        setIngredientMap(result.data.recipe.ingredientLines);
        console.log(result.data.recipe);
        setRecipeLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setNetworkError(true);
        setNetworkStatus(err.message);
      });
  };

  useEffect(() => {
    oneRecipe();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      {networkError ? (
        <h1>
          {networkStatus}: The page you are trying to access could not be found.
        </h1>
      ) : (
        <div>
          {recipeLoading ? (
            <ClipLoader css={override} />
          ) : (
            <div>
              <h1>{singleRecipe.label}</h1>
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
