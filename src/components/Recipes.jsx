import React from 'react';

const Recipes = ({ recipe }) => {
  return (
    <div className='recipeCard'>
      <p>{recipe['recipe']['label']}</p>
    </div>
  );
};

export default Recipes;
