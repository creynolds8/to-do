import { render, screen,fireEvent, waitFor } from "@testing-library/react";
import Register from "../components/Register";
import axios from "axios";
import { MemoryRouter, Route, Routes } from 'react-router-dom';

jest.mock("axios");

test("renders the Register component, submits with valid input, redirects correctly to todos page", async () => {
  const onSubmit = jest.fn();
  (axios.post as jest.Mock).mockResolvedValue({
    data: {
      id: 1,
      email: "jest@test.com"
    }
  });
  render(
    <MemoryRouter initialEntries={["/register"]}>
      <Routes>
        <Route path="/register" element={
            <Register onSubmit={onSubmit} />
          } 
        />
        <Route path="/todos" element={
          <h1 className="w-fit text-3xl underline underline-offset-4">To-Do List:</h1>
        } />
      </Routes>
    </MemoryRouter>
  );
  const emailInput = screen.getByPlaceholderText("Email");
  fireEvent.input(emailInput, { target: { value: "jest@test.com"} });
  const passwordInput = screen.getByPlaceholderText("Password");
  fireEvent.input(passwordInput, { target: { value: "password"} });
  const passwordConfirmInput = screen.getByPlaceholderText("Re-type Password");
  fireEvent.input(passwordConfirmInput, { target: { value: "password"} });
  const submitButton = screen.getByText("Register!");
  fireEvent.click(submitButton);
  await waitFor(() => {
    expect(onSubmit).toHaveBeenCalledWith({
      id: 1,
      email: "jest@test.com"
    });
  });
  const todosHeader = screen.getByText("To-Do List:");
  expect(todosHeader).toBeInTheDocument();
});