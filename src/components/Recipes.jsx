import React, { useState } from 'react';
import '../styles/styles.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const Recipes = ({ recipe }) => {
  const handleRecipeClick = (e) => {
    e.preventDefault();
    const dog = e.target.id;
    const dogURI = encodeURI(dog);
    const dogURL = `https://food-app-aqlkxf2sh-zrama19.vercel.app/${dogURI}`;
    console.log(dogURL);
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

export default Recipes;
