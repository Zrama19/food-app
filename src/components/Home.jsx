import React, { useEffect, useState } from 'react';
import * as Keys from './key';
import axios from 'axios';
import '../styles/styles.css';
import Recipes from './Recipes';
import ClipLoader from 'react-spinners/ClipLoader';
import { css } from '@emotion/react';
import {
  IconButton,
  TextField,
  InputLabel,
  FormControl,
  Select,
  Box,
  MenuItem,
} from '@mui/material/';
import SearchIcon from '@mui/icons-material/Search';

import Grid from '@mui/material/Grid';
import { useNavigate, useLocation } from 'react-router-dom';

const override = css`
  position: absolute;
  top: 50%;
  left: 50%;
`;

const Home = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [recipe, setRecipe] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [healthLabel, setHealthLabel] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [recipeId, setRecipeId] = useState();

  var url = `https://api.edamam.com/api/recipes/v2?type=public&q=${recipe}&app_id=${Keys.YOUR_APP_ID}&app_key=${Keys.YOUR_APP_KEY}&${healthLabel}`;
  var urlOne = `https://api.edamam.com/api/recipes/v2?type=public&q=$chicken&app_id=${Keys.MY_APP_ID}&app_key=${Keys.MY_APP_KEY}`;

  const getRecipes = () => {
    setIsLoading(true);
    axios
      .get(url)
      .then((result) => {
        setRecipes(result.data.hits);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const originalRecipes = () => {
    setIsLoading(true);
    axios
      .get(urlOne)
      .then((result) => {
        setRecipes(result.data.hits);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    originalRecipes();
    //eslint-disable-next-line
  }, []);

  const submit = (e) => {
    e.preventDefault();
    getRecipes();
    setRecipe('');
  };
  console.log(location);

  const queryRecipe = (e) => {
    setRecipe(e.target.value);
    e.preventDefault();
  };

  const queryHealth = (e) => {
    setHealthLabel(e.target.value);
    e.preventDefault();
  };

  const handleRecipeClick = (recipe) => {
    setRecipeId(recipe._links.self.href);
    console.log(recipe._links.self.href);
    let theUrl = recipe._links.self.href;
    let newUrl = theUrl.split('/');
    let sendUrl = newUrl[6].split('?');
    let sendTheUrl = sendUrl[0];
    navigate(`/${sendTheUrl}`);
  };

  console.log(location.pathname);
  props.function(location.pathname);
  console.log(props);
  console.log(recipeId);

  return (
    <div>
      <div>
        <h1 className='recipe-list'>Whats Your Craving?</h1>
        <form onSubmit={submit} className='recipe-search'>
          <Box sx={{ maxWidth: 180 }}>
            <TextField
              required
              className='recipe-input'
              onChange={queryRecipe}
              type='text'
              placeholder='Enter ingredient:'
              value={recipe}
            ></TextField>
          </Box>
          <Box sx={{ minWidth: 160 }}>
            <FormControl fullWidth>
              <InputLabel id='demo-simple-select-label'>Allergies?</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={healthLabel}
                label='typeFood'
                onChange={queryHealth}
                selected='vegan'
              >
                <MenuItem value={'health=vegan'}>Vegan</MenuItem>
                <MenuItem value={'health=alcohol-free'}>Alcohol Free</MenuItem>
                <MenuItem value={'health=dairy-free'}>Dairy Free</MenuItem>
                <MenuItem value={'health=wheat-free'}>Wheat Free</MenuItem>
                <MenuItem value={'health=gluten-free'}>Gluten Free</MenuItem>
                <MenuItem value={'health=peanut-free'}>Peanut Free</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <IconButton type='submit'>
            <SearchIcon />
          </IconButton>
        </form>
      </div>
      <div>
        <div>
          <Grid
            container
            justify='center'
            align='center'
            alignItems='center'
            className='grid-spacing'
          >
            {isLoading ? (
              <ClipLoader css={override} />
            ) : (
              recipes.map((recipe, index) => {
                return (
                  <Grid item xs={12} md={4} lg={3} key={index}>
                    <Recipes
                      handleRecipeClick={handleRecipeClick}
                      recipe={recipe}
                    />
                  </Grid>
                );
              })
            )}
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default Home;
