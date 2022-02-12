import React, { useEffect, useState } from 'react';

import axios from 'axios';
import ClipLoader from 'react-spinners/ClipLoader';
import { css } from '@emotion/react';

const override = css`
  position: absolute;
  top: 50%;
  left: 50%;
`;

const Recipe = (props) => {
  const [singleRecipe, setSingleRecipe] = useState([]);
  const [ingredientMap, setIngredientMap] = useState([]);
  const [recipeLoading, setRecipeLoading] = useState(false);
  const [networkError, setNetworkError] = useState(false);
  const [networkStatus, setNetworkStatus] = useState();

  console.log(props.url);
  // let id = '5b30daab1baa660c3e78e94c52d760fd'

  //  let url2 =  `https://api.edamam.com/api/recipes/v2/${id}?type=public&app_id=8cf35d14&app_key=bcaa0fad1b335e61b667cfe9d5fce7b0`

  // const slicedUrl = props.location.search.slice(1, 500);
  const url = `${props.url}`;

  const oneRecipe = () => {
    setRecipeLoading(true);
    axios
      .get(url)
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
