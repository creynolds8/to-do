import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Index from "../components/Index";
import Navbar from "../components/Navbar";
import axios from "axios";

jest.mock("axios");

describe("tests for the Navbar component and functions", () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });
  
  afterEach(() => {
    jest.restoreAllMocks();
  });
  test("correctly logs out and redirects to to index page", async () => {
    const onLogout = jest.fn();
    (axios.post as jest.Mock).mockResolvedValue({data: {}});
    const user = {id: 1, email: "jest@test.com"};
    render(
      <MemoryRouter initialEntries={["/login"]}>
        <Routes>
          <Route path="/" element={
            <Index />
          } />
          <Route path="/login" element={
            <Navbar user={user} handleLogout={onLogout} />
          } />
        </Routes>
      </MemoryRouter>
    );
    const logoutButton = screen.getByText("Logout");
    fireEvent.click(logoutButton);
    await waitFor(() => {
      expect(onLogout).toHaveBeenCalledTimes(1);
    });
    const indexCheck = screen.getByText("Welcome!");
    expect(indexCheck).toBeInTheDocument();
  });
});