import { render, screen, fireEvent, within } from '@testing-library/react';
import { Home } from './Home';
import { BrowserRouter as Router } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

test('validate working of allergies dropdown', async () => {
  const defaultProps = { function: jest.fn() };
  const { getByRole } = render(
    <Router>
      <Home {...defaultProps} />
    </Router>
  );

  const allergiesInput = screen.getByLabelText('Allergies?');
  expect(allergiesInput).toBeInTheDocument();
  fireEvent.mouseDown(allergiesInput);
  const listbox = within(getByRole('listbox'));
  await fireEvent.click(listbox.getByText(/vegan/i));
});

test('validate ingredient search box', async () => {
  const defaultProps = { function: jest.fn() };

  act(() => {
    render(
      <Router>
        <Home {...defaultProps} />
      </Router>
    );
  });

  const ingredientSearch = screen.getByPlaceholderText('Enter ingredient:');
  expect(ingredientSearch).toBeInTheDocument();
  await fireEvent.change(ingredientSearch, { target: { value: 'chicken' } });
});
