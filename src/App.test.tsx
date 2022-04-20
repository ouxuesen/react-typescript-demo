import React from 'react';
import { getByTestId, render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
  expect(screen.getByTestId('button')).toBeDisabled();
  const input = screen.getByTestId('input-fouce') 
  input.focus()
  expect(input).toHaveFocus()
  input.blur()
  expect(input).not.toHaveFocus()
});

test('function test',()=>{
  expect(true).toBe(true)
})

