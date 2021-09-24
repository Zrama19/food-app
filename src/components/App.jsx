import React, { useEffect, useState } from 'react';
import * as Keys from './key';
import axios from 'axios';
import '../styles/styles.css';
import Recipes from './Recipes';
import ClipLoader from 'react-spinners/ClipLoader';
import { css } from '@emotion/react';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';

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

  var url = `https://api.edamam.com/api/recipes/v2?type=public&q=${recipe}&app_id=${Keys.YOUR_APP_ID}&app_key=${Keys.YOUR_APP_KEY}&health=${healthLabel}`;
  var urlOne = `https://api.edamam.com/api/recipes/v2?type=public&q=$chicken&app_id=${Keys.MY_APP_ID}&app_key=${Keys.MY_APP_KEY}`;

  const getRecipes = async () => {
    setIsLoading(true);
    var result = await axios.get(url);
    setRecipes(result.data.hits);
    setIsLoading(false);
    console.log(result.data.hits);
  };

  const originalRecipes = async () => {
    setIsLoading(true);
    var result = await axios.get(urlOne);
    setRecipes(result.data.hits);
    setIsLoading(false);
    console.log(result.data);
  };

  useEffect(() => {
    originalRecipes();
    //eslint-disable-next-line
  }, []);

  const submit = (e) => {
    e.preventDefault();
    getRecipes();
  };

  const queryRecipe = (e) => {
    setRecipe(e.target.value);
  };

  const queryHealth = (e) => {
    setHealthLabel(e.target.value);
  };

  return (
    <div>
      <h1 className='recipe-list'>Recipe List</h1>
      <form onSubmit={submit} className='recipe-search'>
        <Box sx={{ maxWidth: 180 }}>
          <TextField
            className='recipe-input'
            onChange={queryRecipe}
            type='text'
            placeholder='Enter ingredient:'
            value={recipe}
          ></TextField>
        </Box>
        <Box sx={{ minWidth: 160 }}>
          <FormControl fullWidth>
            <InputLabel id='demo-simple-select-label'>Food Type</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={healthLabel}
              label='typeFood'
              onChange={queryHealth}
            >
              <MenuItem value={'vegan'}>Vegan</MenuItem>
              <MenuItem value={'alcohol-free'}>Alcohol Free</MenuItem>
              <MenuItem value={'dairy-free'}>Dairy Free</MenuItem>
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
