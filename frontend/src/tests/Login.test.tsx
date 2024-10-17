import Login from "../components/Login";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Navbar from "../components/Navbar";

jest.mock("axios");

describe("tests for the Login component and functions", () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });
  
  afterEach(() => {
    jest.restoreAllMocks();
  });
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
  test("users are able to login with valid info and are redirected to todos page", async () => {
    const onSubmit = jest.fn();
    (axios.post as jest.Mock).mockResolvedValue({
      data: {
        id: 1,
        email: "jest@test.com"
      }
    });
    render(
      <MemoryRouter initialEntries={["/login"]}>
        <Routes>
          <Route path="/login" element={
            <Login onSubmit={onSubmit} />
          } />
          <Route path="/todos" element={
            <>
              <Navbar user={{id: 1, email: "jest@test.com"}} handleLogout={onSubmit}/>
              <h1 className="w-fit text-3xl underline underline-offset-4">To-Do List:</h1>
            </>
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
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        id: 1,
        email: "jest@test.com"
      });
    });
    const todosHeader = screen.getByText("To-Do List:");
    expect(todosHeader).toBeInTheDocument();
    const userId = screen.getByText("User Id: 1");
    expect(userId).toBeInTheDocument();
  });
});
