import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MobileNavigation } from "./MobileNavigation";

// Mock the LoadingLink component
jest.mock("./LoadingLink", () => ({
  LoadingLink: ({ children, href, onClick }: { children: React.ReactNode; href: string; onClick?: () => void }) => (
    <a href={href} onClick={onClick}>
      {children}
    </a>
  ),
}));

// Mock the ThemeToggle component
jest.mock("./ThemeToggle", () => ({
  ThemeToggle: () => <button>Theme Toggle</button>,
}));

describe("MobileNavigation", () => {
  beforeEach(() => {
    // Mock document.body.style
    Object.defineProperty(document.body, "style", {
      value: {},
      writable: true,
    });
  });

  it("renders hamburger button", () => {
    render(<MobileNavigation />);
    const hamburgerButton = screen.getByLabelText("Open menu");
    expect(hamburgerButton).toBeInTheDocument();
  });

  it("opens menu when hamburger is clicked", () => {
    render(<MobileNavigation />);
    const hamburgerButton = screen.getByLabelText("Open menu");

    fireEvent.click(hamburgerButton);

    expect(screen.getByLabelText("Close menu")).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("How it works")).toBeInTheDocument();
    expect(screen.getByText("Transparency")).toBeInTheDocument();
    expect(screen.getByText("Launch App")).toBeInTheDocument();
  });

  it("closes menu when clicking outside", () => {
    render(<MobileNavigation />);
    const hamburgerButton = screen.getByLabelText("Open menu");

    fireEvent.click(hamburgerButton);
    expect(screen.getByText("Home")).toBeInTheDocument();

    // Click outside the menu
    fireEvent.mouseDown(document.body);

    expect(screen.queryByText("Home")).not.toBeInTheDocument();
  });

  it("closes menu when pressing escape key", () => {
    render(<MobileNavigation />);
    const hamburgerButton = screen.getByLabelText("Open menu");

    fireEvent.click(hamburgerButton);
    expect(screen.getByText("Home")).toBeInTheDocument();

    // Press escape key
    fireEvent.keyDown(document, { key: "Escape" });

    expect(screen.queryByText("Home")).not.toBeInTheDocument();
  });

  it("closes menu when clicking on navigation link", () => {
    render(<MobileNavigation />);
    const hamburgerButton = screen.getByLabelText("Open menu");

    fireEvent.click(hamburgerButton);
    const homeLink = screen.getByText("Home");

    fireEvent.click(homeLink);

    expect(screen.queryByText("Home")).not.toBeInTheDocument();
  });
});
