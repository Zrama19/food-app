import { render, screen } from '@testing-library/react';

import Recipe from './Recipe';
import { BrowserRouter as Router } from 'react-router-dom';

import { BASE_URL, fetchApi } from './utils';

describe('fetchAPI', () => {
  describe('when API call is successful', () => {
    it('should return recipe list', async () => {
      render(
        <Router>
          <Recipe />
        </Router>
      );

      const recipe = [
        {
          label: 'Smothered Chicken',
          calories: 7964.760379624098,
        },
      ];

      const result = await fetchApi();
      expect(result.label).toEqual(recipe[0].label);
      expect(result.calories).toEqual(recipe[0].calories);
    });
  });
});
