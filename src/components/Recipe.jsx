import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { withRouter } from 'react-router';

const Recipe = (props) => {
  console.log(props.match.params.recipeName);
  return <h1>Hello World</h1>;
};

export default withRouter(Recipe);
