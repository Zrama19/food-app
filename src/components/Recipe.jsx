import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
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

  const slicedUrl = props.location.search.slice(1, 500);

  const oneRecipe = async () => {
    setRecipeLoading(true);
    var result = await axios.get(slicedUrl);

    setSingleRecipe(result.data.recipe);
    setIngredientMap(result.data.recipe.ingredientLines);
    setRecipeLoading(false);
  };

  useEffect(() => {
    oneRecipe();
    //eslint-disable-next-line
  }, []);

  return (
    <div>
      {recipeLoading ? (
        <ClipLoader css={override} />
      ) : (
        <div>
          <h1>{singleRecipe.label}</h1>
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
  );
};

export default withRouter(Recipe);
