import React from 'react';
import '../styles/styles.css';

const Recipes = ({ recipe }) => {
  return (
    recipe['recipe']['image'].match(/\.(jpeg|jpg|gif}png)$/) != null && (
      <div className='recipeCard'>
        <img className='recipeCard-img' src={recipe.recipe.image} alt='Food' />
        <p className='recipeCard-name'>{recipe.recipe.label}</p>
      </div>
    )
  );
};

export default Recipes;
