import React from 'react';
import '../styles/styles.css';
import { withRouter } from 'react-router';

const Recipes = ({ recipe, history }) => {
  const handleRecipeClick = (e) => {
    e.preventDefault();
    const dog = e.target.id;
    history.push(`/recipe/${dog}`);
  };

  return (
    recipe['recipe']['image'].match(/\.(jpeg|jpg|gif}png)$/) != null && (
      <div className='recipeCard'>
        <img
          className='recipeCard-img'
          src={recipe.recipe.image}
          alt='Food'
          onClick={handleRecipeClick}
          id={recipe.recipe.label}
        />
        <p className='recipeCard-name'>{recipe.recipe.label}</p>
      </div>
    )
  );
};

export default withRouter(Recipes);
