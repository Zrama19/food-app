import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import * as Keys from './key';
import axios from 'axios';

const Recipe = (props) => {
  const [singleRecipe, setSingleRecipe] = useState([]);

  // console.log(props.history);
  const recipeName = props.match.params.recipeName;
  // console.log(props.location.search);
  const slicedUrl = props.location.search.slice(1, 500);
  // console.log(slicedUrl);

  const oneRecipe = async () => {
    var result = await axios.get(slicedUrl);
    console.log(slicedUrl);
    setSingleRecipe(result.data.recipe);
    console.log(result.data.recipe);
  };

  useEffect(() => {
    oneRecipe();
    //eslint-disable-next-line
  }, []);

  return (
    <div>
      <h1>{singleRecipe.label}</h1>
      <h1>{Math.round(singleRecipe.calories) + ' calories.'}</h1>
      <h1>{singleRecipe.ingredientLines}</h1>
      <h1>{singleRecipe.cautions}</h1>
    </div>
  );
};

export default withRouter(Recipe);
