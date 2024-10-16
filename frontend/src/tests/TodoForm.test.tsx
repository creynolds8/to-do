// import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import TodoForm from '../components/TodoForm'; // adjust path if needed
import axios from 'axios';

// Mock axios
jest.mock('axios');

test('renders the form and submits with valid input', async () => {
  const handleSubmit = jest.fn();
  
  // Mock axios post request
  (axios.post as jest.Mock).mockResolvedValue({
    data: {
      todo_id: 1,
      todo_title: 'New Todo',
      message: 'Test message',
      priority: false,
      completed: false
    }
  });

  const { getByPlaceholderText, getByText } = render(<TodoForm onSubmit={handleSubmit} />);

  // Simulate user input
  const titleInput = getByPlaceholderText('Title');
  fireEvent.change(titleInput, { target: { value: 'New Todo' } });

  const messageInput = getByPlaceholderText('Additional Info...');
  fireEvent.change(messageInput, { target: { value: 'Test message' } });

  // Simulate form submission
  const submitButton = getByText('Add Todo');
  fireEvent.click(submitButton);

  // Use waitFor to handle the asynchronous axios call
  await waitFor(() => {
    expect(handleSubmit).toHaveBeenCalledWith({
      todo_id: 1,
      todo_title: 'New Todo',
      message: 'Test message',
      priority: false,
      completed: false
    });
  });

  expect(handleSubmit).toHaveBeenCalledTimes(1);
});
