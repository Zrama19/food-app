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
import Header from './Header';

const override = css`
  position: absolute;
  top: 50%;
  left: 50%;
`;

const App = () => {
  const [recipe, setRecipe] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [healthLabel, setHealthLabel] = useState('');
  const [isLoading, setIsLoading] = useState('false');

  var url = `https://api.edamam.com/api/recipes/v2?type=public&q=${recipe}&app_id=${Keys.YOUR_APP_ID}&app_key=${Keys.YOUR_APP_KEY}&${healthLabel}`;
  var urlOne = `https://api.edamam.com/api/recipes/v2?type=public&q=$chicken&app_id=${Keys.MY_APP_ID}&app_key=${Keys.MY_APP_KEY}`;

  // var testURI = 'this is a test string';
  // var pog = encodeURI(testURI);
  // console.log(pog);        <- -  -  - - - - -    testing out URIs, probably gonna use this to implement routing later on.
  const getRecipes = async () => {
    setIsLoading(true);
    var result = await axios.get(url);
    setRecipes(result.data.hits);
    setIsLoading(false);
  };

  const originalRecipes = async () => {
    setIsLoading(true);
    var result = await axios.get(urlOne);
    setRecipes(result.data.hits);
    setIsLoading(false);
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

  const queryRecipe = (e) => {
    setRecipe(e.target.value);
    e.preventDefault();
  };

  const queryHealth = (e) => {
    setHealthLabel(e.target.value);
    e.preventDefault();
  };

  return (
    <div>
      <Header />
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
      <div className='recipe-table'>
        {isLoading ? (
          <ClipLoader css={override} />
        ) : (
          recipes.map((recipe, index) => {
            return <Recipes key={index} recipe={recipe} />;
          })
        )}
      </div>
    </div>
  );
};

export default App;
