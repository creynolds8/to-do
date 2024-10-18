import { render, fireEvent, waitFor } from '@testing-library/react';
import TodoForm from '../components/TodoForm';
import axios from 'axios';

jest.mock('axios');

describe("tests for TodoForm component and functions", () => {
  test('renders the form and submits with valid input', async () => {
    const handleSubmit = jest.fn();
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
    const titleInput = getByPlaceholderText('Title');
    fireEvent.change(titleInput, { target: { value: 'New Todo' } });
    const messageInput = getByPlaceholderText('Additional Info...');
    fireEvent.change(messageInput, { target: { value: 'Test message' } });
    const submitButton = getByText('Add Todo');
    fireEvent.click(submitButton);
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
  test("correctly renders todo data when passed a valid todo for update form", () => {
    const onSubmit = jest.fn();
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    const todo = {
      todo_id: 1,
      todo_title: 'New Todo',
      message: 'Test message',
      priority: false,
      completed: false
    };
    const { getByPlaceholderText, getByLabelText } = render(<TodoForm todo={todo} onSubmit={onSubmit}/>);
    const todoTitle = getByPlaceholderText("Title");
    const todoMessage = getByPlaceholderText("Additional Info...");
    const todoPriority = getByLabelText("Priority task:");

    expect(todoTitle).toHaveDisplayValue("New Todo");
    expect(todoMessage).toHaveDisplayValue("Test message");
    expect(todoPriority).not.toBeChecked();
  });
  test("if todo title is only whitespace an alert is made and the form is not submitted", () => {
    const onSubmit = jest.fn();
    const { getByPlaceholderText, getByText } = render(<TodoForm onSubmit={onSubmit} />);
    const titleInput = getByPlaceholderText("Title");
    fireEvent.change(titleInput, { target: { value: "   " } });
    const submitButton = getByText("Add Todo");
    fireEvent.click(submitButton);
    expect(onSubmit).not.toHaveBeenCalled();
    // const alertMessage = getByText("Please add a valid title.");
    // expect(alertMessage).toBeInTheDocument();
  });
});
