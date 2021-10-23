import React from 'react';
import '../styles/styles.css';
import { withRouter } from 'react-router';

const Recipes = (props) => {
  // console.log(props);
  return (
    props.recipe['recipe']['image'].match(/\.(jpeg|jpg|gif}png)$/) != null && (
      <div className='recipeCard'>
        <img
          className='recipeCard-img'
          src={props.recipe.recipe.image}
          alt='Food'
          id={props.recipe.recipe.label}
          onClick={() => props.handleRecipeClick(props.recipe)}
        />
        <p className='recipeCard-name'>{props.recipe.recipe.label}</p>
      </div>
    )
  );
};

export default withRouter(Recipes);
