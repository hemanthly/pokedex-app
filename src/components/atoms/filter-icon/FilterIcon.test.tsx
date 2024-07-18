// FilterIcon.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import FilterIcon from "./index";
import FilterModal from "../filter-modal/index";
import Accordion from "../accordion/index"; // Ensure Accordion is imported
import { useRouter } from "next/router"; // Import useRouter from next/router

// Mock useRouter
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../FilterModal", () =>
  jest.fn(({ isOpen, onClose, children }) =>
    isOpen ? (
      <div data-testid="filter-modal">
        <button onClick={onClose}>Close</button>
        {children}
      </div>
    ) : null
  )
);

jest.mock("../Accordion", () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue(null), // Mock Accordion component
}));

describe("FilterIcon", () => {
  beforeEach(() => {
    // Reset the mock implementation for useRouter before each test
    //useRouter.mockClear();
  });

  test("renders the FilterIcon component correctly", () => {
    render(<FilterIcon />);
    const filterIcon = screen.getByRole("button");
    expect(filterIcon).toBeInTheDocument();
  });

  test("opens and closes the modal on icon click", () => {
    useRouter.mockReturnValue({
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      route: "/",
      pathname: "",
      query: "",
      asPath: "",
    });

    render(<FilterIcon />);
    const filterIcon = screen.getByRole("button");

    // Open the modal
    fireEvent.click(filterIcon);
    expect(screen.getByTestId("filter-modal")).toBeInTheDocument();

    // Close the modal
    fireEvent.click(screen.getByText("Close"));
    expect(screen.queryByTestId("filter-modal")).not.toBeInTheDocument();
  });
});
