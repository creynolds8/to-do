import { render, fireEvent, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import TodoDetails from "../components/TodoDetails";
import axios from "axios";

// Mocking the props passed to TodoDetails
const mockOnToggleComplete = jest.fn();
const mockOnUpdateTodo = jest.fn();
const mockOnDeleteTodo = jest.fn();

const renderWithRouter = (initialEntries: string[], boolean: boolean) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <Routes>
        <Route path="/todos/:id" element={<TodoDetails onToggleComplete={mockOnToggleComplete} onUpdateTodo={mockOnUpdateTodo} onDeleteTodo={mockOnDeleteTodo} />} />
        {boolean && 
          <Route path="/todos" element={
            <h1 className="w-fit text-3xl underline underline-offset-4">To-Do List:</h1>
          } />
        }
      </Routes>
    </MemoryRouter>
  );
};

describe("TodoDetails component tests", () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });
  
  afterEach(() => {
    jest.restoreAllMocks();
  });
  test("renders the component and shows 'Loading...' while fetching the todo", () => {
    renderWithRouter(["/todos/1"], false);
    const loadingText = screen.getByText("Loading...");
    expect(loadingText).toBeInTheDocument();
  });

  test("renders todo details when the todo is fetched", async () => {
    // Mocking axios request to simulate fetching todo data
    jest.spyOn(axios, 'get').mockResolvedValueOnce({
      data: {
        todo_id: 1,
        todo_title: "Test Todo",
        message: "This is a test message",
        priority: false,
        completed: false,
        created_at: "2024-12-01T12:00:00Z"
      }
    });

    renderWithRouter(["/todos/1"], false);

    // Checking that the todo details are rendered
    const todoTitle = await screen.findByText("Test Todo");
    const todoMessage = screen.getByText("This is a test message");
    expect(todoTitle).toBeInTheDocument();
    expect(todoMessage).toBeInTheDocument();
  });

  test("can toggle the completion status of a todo", async () => {
    // Mocking axios request to simulate fetching todo data
    jest.spyOn(axios, 'get').mockResolvedValueOnce({
      data: {
        todo_id: 1,
        todo_title: "Test Todo",
        message: "This is a test message",
        priority: false,
        completed: false,
        created_at: "2024-12-01T12:00:00Z"
      }
    });

    renderWithRouter(["/todos/1"], false);

    const checkbox = await screen.findByRole("checkbox");
    fireEvent.click(checkbox);

    expect(mockOnToggleComplete).toHaveBeenCalledWith(1, true);  // Assuming the checkbox is clicked to mark it completed
  });

  test("can start editing a todo", async () => {
    // Mocking axios request to simulate fetching todo data
    jest.spyOn(axios, 'get').mockResolvedValueOnce({
      data: {
        todo_id: 1,
        todo_title: "Test Todo",
        message: "This is a test message",
        priority: false,
        completed: false,
        created_at: "2024-12-01T12:00:00Z"
      }
    });

    renderWithRouter(["/todos/1"],false);

    const editButton = await screen.findByAltText("Edit");
    fireEvent.click(editButton);

    const formHeader = screen.getByText("Update Todo");
    expect(formHeader).toBeInTheDocument(); // Assuming there's a placeholder text for editing
  });

  test("can delete a todo", async () => {
    // Mocking axios request to simulate fetching todo data
    jest.spyOn(axios, 'get').mockResolvedValueOnce({
      data: {
        todo_id: 1,
        todo_title: "Test Todo",
        message: "This is a test message",
        priority: false,
        completed: false,
        created_at: "2024-12-01T12:00:00Z"
      }
    });

    
    renderWithRouter(["/todos/1"], true);

    const editButton = await screen.findByAltText("Edit");
    fireEvent.click(editButton);

    const deleteButton = screen.getByText("Delete Todo");
    fireEvent.click(deleteButton);

    expect(mockOnDeleteTodo).toHaveBeenCalledWith(1, false);

    const todosHeader = screen.getByText("To-Do List:");
    expect(todosHeader).toBeInTheDocument();

  });
});
