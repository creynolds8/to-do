import Login from "../components/Login";
import { render, screen, fireEvent } from "@testing-library/react";
import axios from "axios";
import { MemoryRouter, Route, Routes } from 'react-router-dom';

jest.mock("axios");

describe("tests for the Login component and functions", () => {
  test("correctly handles backend login error", async () => {
    const onSubmit = jest.fn();
    (axios.post as jest.Mock).mockRejectedValueOnce(new Error("User not found"));
    render(
      <MemoryRouter initialEntries={["/login"]}>
        <Routes>
          <Route path="/login" element={
            <Login onSubmit={onSubmit} />
          } />
        </Routes>
      </MemoryRouter>
    );
    const emailInput = screen.getByPlaceholderText("Email");
    fireEvent.input(emailInput, { target: { value: "jest@test.com"} });
    const passwordInput = screen.getByPlaceholderText("Password");
    fireEvent.input(passwordInput, { target: { value: "password"} });
    const submitButton = screen.getByText("Login!");
    fireEvent.click(submitButton);
    const errorMessage = await screen.findByText("Sorry, there was an error logging in. Please check your login information and try again");
    expect(errorMessage).toBeInTheDocument();
  });
});
