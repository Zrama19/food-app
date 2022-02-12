import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Recipe from './Recipe';
import Header from './Header';
import { useState } from 'react';

const App = () => {
  const [recipeUrlLink, setRecipeUrlLink] = useState();
  const currentRecipePage = (path) => {
    console.log(path);
  };

  const currentUrlLink = (url) => {
    console.log(url);
    setRecipeUrlLink(url);
  };
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
                  currentUrlLink={currentUrlLink}
                />
              </div>
            }
          ></Route>

          <Route
            exact
            path='/:path'
            element={
              <div>
                <Recipe url={recipeUrlLink} />
              </div>
            }
          ></Route>
        </Routes>
      </Router>
    </div>
  );
};
export default App;
