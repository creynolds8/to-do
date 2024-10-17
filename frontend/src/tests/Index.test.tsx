import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import Index from '../components/Index';
import Login from '../components/Login';
import Register from '../components/Register';

test('renders the Index component and navigates to Login page', () => {
  const onSubmit = jest.fn();
  render(
    <MemoryRouter>
      <Routes>
        <Route path='/' element={
            <Index />
          }
        />
        <Route path='/login' element={
          <Login onSubmit={onSubmit}/>
          }
        />
      </Routes>
    </MemoryRouter>
  );
  
  const button = screen.getByText("Login");
  fireEvent.click(button);
  const emailInput = screen.getByPlaceholderText("Email");
  expect(emailInput).toBeInTheDocument();
});

test('renders the Index component and navigates to Register page', () => {
  const onSubmit = jest.fn();
  render(
    <MemoryRouter>
      <Routes>
        <Route path='/' element={
            <Index />
          }
        />
        <Route path='/register' element={
          <Register onSubmit={onSubmit}/>
          }
        />
      </Routes>
    </MemoryRouter>
  );
  
  const button = screen.getByText("Register");
  fireEvent.click(button);
  const emailInput = screen.getByPlaceholderText("Email");  
  expect(emailInput).toBeInTheDocument();
});

