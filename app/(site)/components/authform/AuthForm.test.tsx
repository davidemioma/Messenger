import React from "react";
import AuthForm from "./AuthForm";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";

jest.mock("next-auth/react", () => ({
  signIn: jest.fn(),
  useSession: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("AuthForm", () => {
  it("Renders login form by default", () => {
    render(<AuthForm />);

    expect(screen.getByTestId("emailEl")).toBeInTheDocument();

    expect(screen.getByTestId("passwordEl")).toBeInTheDocument();

    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  it("Renders register form when toggle button is clicked", () => {
    render(<AuthForm />);

    fireEvent.click(screen.getByTestId("task-btn"));

    expect(screen.getByTestId("nameEl")).toBeInTheDocument();

    expect(screen.getByTestId("emailEl")).toBeInTheDocument();

    expect(screen.getByTestId("passwordEl")).toBeInTheDocument();

    expect(screen.getByText("Register")).toBeInTheDocument();
  });
});
