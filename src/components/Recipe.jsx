import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import * as Keys from './key';
import axios from 'axios';

const Recipe = (props) => {
  const [singleRecipe, setSingleRecipe] = useState([]);
  const [ingredientMap, setIngredientMap] = useState([]);

  const slicedUrl = props.location.search.slice(1, 500);

  const oneRecipe = async () => {
    var result = await axios.get(slicedUrl);

    setSingleRecipe(result.data.recipe);
    setIngredientMap(result.data.recipe.ingredientLines);
  };

  useEffect(() => {
    oneRecipe();
    //eslint-disable-next-line
  }, []);

  return (
    <div>
      <h1>{singleRecipe.label}</h1>
      <h1>{Math.round(singleRecipe.calories) + ' calories.'}</h1>
      <ul>
        {ingredientMap.map((ingredient, index) => {
          return <li>{ingredient}</li>;
        })}
      </ul>
    </div>
  );
};

export default withRouter(Recipe);
