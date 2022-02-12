import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Recipe from './Recipe';
import Header from './Header';
import { useState } from 'react';

const App = () => {
  // const [recipeUrlLink, setRecipeUrlLink] = useState();
  const currentRecipePage = (path) => {
    console.log(path);
  };

  // const currentUrlLink = (url) => {
  //   console.log(url);
  //   const splitUrl = url.split('/');
  //   const getUrl = splitUrl[6];
  //   const newUrl = getUrl.split('?');
  //   const sendUrl = newUrl[0];

  //   setRecipeUrlLink(sendUrl);
  // };
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route
            path='/'
            element={
              <div>
                <Home
                  function={currentRecipePage}
                  // currentUrlLink={currentUrlLink}
                />
              </div>
            }
          ></Route>

          <Route exact path='/:path' element={<div>{<Recipe />}</div>}></Route>
        </Routes>
      </Router>
    </div>
  );
};
export default App;
