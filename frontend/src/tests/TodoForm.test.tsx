import { render, fireEvent, waitFor } from '@testing-library/react';
import TodoForm from '../components/TodoForm';
import axios from 'axios';

jest.mock('axios');

describe("tests for TodoForm component and functions", () => {
  test('renders the form and submits with valid input', async () => {
    const onSubmit = jest.fn();
    (axios.post as jest.Mock).mockResolvedValue({
      data: {
        todo_id: 1,
        todo_title: 'New Todo',
        message: 'Test message',
        priority: false,
        completed: false
      }
    });
    const { getByPlaceholderText, getByText } = render(<TodoForm onSubmit={onSubmit} />);
    const titleInput = getByPlaceholderText('Title');
    fireEvent.change(titleInput, { target: { value: 'New Todo' } });
    const messageInput = getByPlaceholderText('Additional Info...');
    fireEvent.change(messageInput, { target: { value: 'Test message' } });
    const submitButton = getByText('Add Todo');
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        todo_id: 1,
        todo_title: 'New Todo',
        message: 'Test message',
        priority: false,
        completed: false
      });
    });
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });
  test("renders todo data when passed a valid todo for update form, set priority", () => {
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
    fireEvent.click(todoPriority);

    expect(todoTitle).toHaveDisplayValue("New Todo");
    expect(todoMessage).toHaveDisplayValue("Test message");
    expect(todoPriority).toBeChecked();
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
  test("submits todo with updated data", async () => {
    const onSubmit = jest.fn();
    (axios.put as jest.Mock).mockResolvedValue({
      data: {
        todo_id: 1,
        todo_title: 'Updated title',
        message: 'Updated message',
        priority: true,
        completed: false
      }
    });
    const todo = {
      todo_id: 1,
      todo_title: 'New Todo',
      message: 'Test message',
      priority: false,
      completed: false
    };
    const { getByPlaceholderText, getByLabelText, getByText } = render(<TodoForm todo={todo} onSubmit={onSubmit}/>);
    const todoTitle = getByPlaceholderText("Title");
    const todoMessage = getByPlaceholderText("Additional Info...");
    const todoPriority = getByLabelText("Priority task:");
    fireEvent.click(todoPriority);
    fireEvent.change(todoTitle, { target: { value: "Updated title" } });
    fireEvent.change(todoMessage, { target: { value: "Updated message" } });
    const submitButton = getByText("Update Todo");
    fireEvent.click(submitButton);    
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        todo_id: 1,
        todo_title: 'Updated title',
        message: 'Updated message',
        priority: true,
        completed: false
      });
    });
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });
});
