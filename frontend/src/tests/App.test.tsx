import { fireEvent, render } from "@testing-library/react"
import App from "../App"
import axios from "axios";
// import axios from "axios";

jest.mock("axios");

describe("tests for the App component and functions", () => {
  test("render index, register user, render to-do list integration test", async () => {
    (axios.post as jest.Mock).mockResolvedValueOnce({
      data: {
          id: 1,
          email: "user1@test.com",
          password_digest: "$2a$10$NdTNoc5vCetgnF6qT8rEE.PrJ8v5Y8fxibTGjAhWyhwWOw8xfzlO2",
        }
      })
    const { findByText, getByText, getByPlaceholderText } = render(<App />);
    const indexCheck = await findByText("Welcome!");
    expect(indexCheck).toBeInTheDocument();
    const registerButton = getByText("Register");
    //navigate to register page
    fireEvent.click(registerButton);
    const registerCheck = await findByText("Register:");
    expect(registerCheck).toBeInTheDocument();
    //find input fields
    const emailInput = getByPlaceholderText("Email");
    const passwordInput = getByPlaceholderText("Password");
    const passwordConfirmInput = getByPlaceholderText("Re-type Password");
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(passwordConfirmInput).toBeInTheDocument();
    //add test values to inputs
    fireEvent.change(emailInput, { target: { value: "user1@test.com" } });
    fireEvent.change(passwordInput, { target: { value: "1" } });
    fireEvent.change(passwordConfirmInput, { target: { value: "1" } });
    const submitButton = getByText("Register!");
    fireEvent.click(submitButton);
    const todoListCheck = await findByText("To-Do List:");
    expect(todoListCheck).toBeInTheDocument();
  });
})