import { render } from "@testing-library/react";
import TodoDetails from "../components/TodoDetails";
import { MemoryRouter, Route, Routes } from "react-router-dom";

describe("tests for TodoDetails component and functions", () => {
  test("renders the component and returns loading screen when todo is not given", () => {
    const onToggleComplete = jest.fn();
    const onUpdateTodo = jest.fn();
    const onDeleteTodo = jest.fn();
    const { getByText } = render(
      <MemoryRouter initialEntries={["/todos/:id"]}>
        <Routes>
          <Route path={"/todos/:id"} element={
            <TodoDetails onToggleComplete={onToggleComplete} onUpdateTodo={onUpdateTodo} onDeleteTodo={onDeleteTodo} />
          } />
        </Routes>
      </MemoryRouter>
    );
    const renderCheck = getByText("Loading...")
    expect(renderCheck).toBeInTheDocument();
  });
});