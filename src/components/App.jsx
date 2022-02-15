import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Recipe from './Recipe';
import Header from './Header';
import { useState } from 'react';

const App = () => {
  const currentRecipePage = (path) => {};

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
