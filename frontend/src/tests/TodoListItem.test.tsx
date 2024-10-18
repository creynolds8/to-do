import { MemoryRouter, Route, Routes } from "react-router-dom";
import TodoListItem from "../components/TodoListItem";
import { fireEvent, render } from "@testing-library/react";


describe("tests for TodoListItem component and functions", () => {
  test("renders component with todo data", () => {
    const onToggleComplete = jest.fn();
    const todo = {
      todo_id: 1,
      todo_title: 'Title 1',
      message: 'Test Message',
      priority: false,
      completed: true
    };
    const { getByText, getByTestId } = render(
      <MemoryRouter initialEntries={["/todos/:id"]}>
        <Routes>
          <Route path="/todos/:id" element={
            <TodoListItem todo={todo} onToggleComplete={onToggleComplete} />
          } />
        </Routes>
      </MemoryRouter>
    );
    const completedCheckbox = getByTestId("completed-checkbox");
    expect(completedCheckbox).toHaveClass("accent-green-600");
    const completedStatus = getByText("Completed");
    expect(completedStatus).toBeInTheDocument();
    expect(completedStatus).toHaveClass("text-green-600");
  });
  test("calls complete function with vaild data", () => {
    const todo = {
      todo_id: 1,
      todo_title: 'Title 1',
      message: 'Test Message',
      priority: false,
      completed: false
    };
    const onToggleComplete = jest.fn();
    const { getByTestId } = render(
      <MemoryRouter initialEntries={["/todos/:id"]}>
        <Routes>
          <Route path="/todos/:id" element={
            <TodoListItem todo={todo} onToggleComplete={onToggleComplete} />
          } />
        </Routes>
      </MemoryRouter>
    );
    const completedCheckbox = getByTestId("completed-checkbox");
    fireEvent.click(completedCheckbox);
    expect(onToggleComplete).toHaveBeenCalledWith(1, true)
    expect(onToggleComplete).toHaveBeenCalledTimes(1);
  });
});