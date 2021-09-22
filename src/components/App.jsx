import React, { useEffect } from 'react';
import * as Keys from './key';
import axios from 'axios';
import '../styles/styles.css';

const App = () => {
  var url = `https://api.edamam.com/api/recipes/v2?type=public&q=chicken&app_id=${Keys.YOUR_APP_ID}&app_key=${Keys.YOUR_APP_KEY}`;
  // console.log(url);

  const getRecipes = async () => {
    var result = await axios.get(url);
    console.log(result.data);
  };

  useEffect(() => {
    getRecipes();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <h1 className='recipe-list' onClick={getRecipes}>
        Recipe List
      </h1>
    </div>
  );
};

export default App;
