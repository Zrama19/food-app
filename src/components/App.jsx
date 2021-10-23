import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Home from './Home';
import Recipe from './Recipe';
import Header from './Header';

const App = () => {
  return (
    <div>
      <Router>
        <Header />
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route exact path='/recipe'>
            <div>
              <h1>This page does not exist.</h1>
            </div>
          </Route>
          <Route exact path='/recipe/:recipeName'>
            <Recipe />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};
export default App;
