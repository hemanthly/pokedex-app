// Accordion.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Accordion from "./index";
import { useRouter, useSearchParams } from "next/navigation";
import { initialStatValues } from "@/components/atoms/dropdown/Dropdown.types";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

const mockUseRouter = useRouter as jest.Mock;
const mockUseSearchParams = useSearchParams as jest.Mock;

const mockRouterPush = jest.fn();

describe("Accordion", () => {
  beforeEach(() => {
    mockUseRouter.mockReturnValue({
      push: mockRouterPush,
    });

    mockUseSearchParams.mockReturnValue(new URLSearchParams());
  });

  const defaultProps = {
    title: "Test Accordion",
    items: [{ label: "Item 1" }, { label: "Item 2" }],
    paramName: "testParam",
  };

  it("renders the accordion with title", () => {
    render(<Accordion {...defaultProps} />);

    const title = screen.getByText("Test Accordion");
    expect(title).toBeInTheDocument();
  });

  it("toggles the accordion on click", () => {
    render(<Accordion {...defaultProps} />);

    const button = screen.getByRole("button", { name: /test accordion/i });
    fireEvent.click(button);

    const items = screen.getByText("Item 1");
    expect(items).toBeInTheDocument();
  });

  it("checks and unchecks items", () => {
    render(<Accordion {...defaultProps} />);

    const button = screen.getByRole("button", { name: /test accordion/i });
    fireEvent.click(button);

    const checkbox = screen.getByLabelText("Item 1");
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    fireEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  it("displays selected items in the button", () => {
    render(<Accordion {...defaultProps} />);

    const button = screen.getByRole("button", { name: /test accordion/i });
    fireEvent.click(button);

    const checkbox = screen.getByLabelText("Item 1");
    fireEvent.click(checkbox);

    const selectedText = screen.getByText("Item 1 + 0 More");
    expect(selectedText).toBeInTheDocument();
  });

  it("handles stats accordion correctly", () => {
    render(<Accordion {...defaultProps} title="Stats" />);

    const button = screen.getByRole("button", { name: /stats/i });
    fireEvent.click(button);

    const applyButton = screen.getByRole("button", { name: /apply/i });
    fireEvent.click(applyButton);

    expect(mockRouterPush).toHaveBeenCalled();
  });

  it("applies new stat values", () => {
    render(<Accordion {...defaultProps} title="Stats" />);

    const button = screen.getByRole("button", { name: /stats/i });
    fireEvent.click(button);

    // Query all elements with the label 'Thumb for Attack'
    const sliders = screen.queryAllByLabelText("Thumb for Attack");

    // Assuming you want to interact with the first slider found
    const attackSlider = sliders[0];
    fireEvent.mouseDown(attackSlider);
    fireEvent.mouseMove(attackSlider, { clientX: 100 });
    fireEvent.mouseUp(attackSlider);

    const applyButton = screen.getByRole("button", { name: /apply/i });
    fireEvent.click(applyButton);

    expect(mockRouterPush).toHaveBeenCalled();
  });
});
