import React from 'react';
import { withRouter } from 'react-router';

const Recipe = (props) => {
  // console.log(props.match.params.recipeName);
  const recipeName = props.match.params.recipeName;
  return (
    <div>
      <h2>{recipeName}</h2>
      <p>{props.name}</p>
    </div>
  );
};

export default withRouter(Recipe);
