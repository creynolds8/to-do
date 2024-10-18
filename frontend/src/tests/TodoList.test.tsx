import { MemoryRouter, Route, Routes } from "react-router-dom";
import TodoList from "../components/TodoList";
import { render, screen } from "@testing-library/react";

describe("tests for TodoList component and functions", () => {
  test("renders multiple todos", () => {
    const todos = [
      {
        todo_id: 1,
        todo_title: 'Title 1',
        message: 'Updated message',
        priority: false,
        completed: false
      }, {
        todo_id: 2,
        todo_title: 'Title 2',
        message: 'Updated message',
        priority: true,
        completed: false
      }
    ];
    const handleToggleComplete = jest.fn();
    const { getByText, getByAltText } = render(
      <MemoryRouter initialEntries={["/todos"]}>
        <Routes>
          <Route path="/todos" element={
            <TodoList todos={todos} onToggleComplete={handleToggleComplete}/>
          } />
        </Routes>
      </MemoryRouter>
    );
    const todo1Title = getByText("Title 1");
    const todo2Title = getByText("Title 2");
    const todo1Completed = screen.getAllByTestId("completed-checkbox");
    const todo2Priority = getByAltText("!");
    expect(todo1Title).toBeInTheDocument();
    expect(todo2Title).toBeInTheDocument();
    expect(todo1Completed[0]).not.toBeChecked();
    expect(todo2Priority).toBeInTheDocument();
  });
});