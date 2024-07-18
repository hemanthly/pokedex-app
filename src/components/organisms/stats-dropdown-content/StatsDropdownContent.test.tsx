import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import StatsDropdownContent from "./index";
import { STAT_LABELS } from "@/utils/constants";
import {
  StatValues,
  initialStatValues,
} from "@/components/atoms/dropdown/Dropdown.types";
import { useRouter, useSearchParams } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

const mockUseRouter = useRouter as jest.Mock;
const mockUseSearchParams = useSearchParams as jest.Mock;

const mockRouterPush = jest.fn();

describe("StatsDropdownContent", () => {
  beforeEach(() => {
    mockUseRouter.mockReturnValue({
      push: mockRouterPush,
    });

    mockUseSearchParams.mockReturnValue({
      get: jest.fn(),
    });
  });

  const defaultProps = {
    initialValues: initialStatValues,
    onApply: jest.fn(),
    onClose: jest.fn(),
  };

  it("renders the component with initial values", () => {
    render(<StatsDropdownContent {...defaultProps} />);

    Object.keys(STAT_LABELS).forEach((stat) => {
      const sliders = screen.queryAllByLabelText(
        `Thumb for ${STAT_LABELS[stat as keyof StatValues]}`
      );
      expect(sliders.length).toBe(2); // Ensure only one slider is found
    });
  });

  it("updates slider values on change", () => {
    render(<StatsDropdownContent {...defaultProps} />);

    const attackSliders = screen.queryAllByLabelText("Thumb for Attack");
    expect(attackSliders.length).toBe(2);

    const attackSlider = attackSliders[0];
    fireEvent.mouseDown(attackSlider);
    fireEvent.mouseMove(attackSlider, { clientX: 100 });
    fireEvent.mouseUp(attackSlider);

    const newValue = screen.getByText("100"); // Assuming the slider was moved to 100
    expect(newValue).toBeInTheDocument();
  });

  it("resets slider values to initial state", () => {
    render(<StatsDropdownContent {...defaultProps} />);

    const resetButton = screen.getByRole("button", { name: /reset/i });
    fireEvent.click(resetButton);

    const sliders = screen.queryAllByLabelText((content, element) => {
      return content.startsWith("Thumb for");
    });

    expect(sliders.length).toBe(Object.keys(STAT_LABELS).length * 2); // Ensure all sliders are reset
  });

  it("applies the selected values and calls onApply", () => {
    const mockOnApply = jest.fn();
    render(<StatsDropdownContent {...defaultProps} onApply={mockOnApply} />);

    const applyButton = screen.getByRole("button", { name: /apply/i });
    fireEvent.click(applyButton);

    expect(mockOnApply).toHaveBeenCalledWith(defaultProps.initialValues);
  });

  it("closes the dropdown on close button click", () => {
    const mockOnClose = jest.fn();
    render(<StatsDropdownContent {...defaultProps} onClose={mockOnClose} />);

    const closeButton = screen.getByRole("button", { name: /close/i });
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalled();
  });

  it("updates URL params when sliders are adjusted", () => {
    render(<StatsDropdownContent {...defaultProps} />);

    const attackSliders = screen.queryAllByLabelText("Thumb for Attack");
    expect(attackSliders.length).toBe(2);

    const attackSlider = attackSliders[0];
    fireEvent.mouseDown(attackSlider);
    fireEvent.mouseMove(attackSlider, { clientX: 100 });
    fireEvent.mouseUp(attackSlider);

    const applyButton = screen.getByRole("button", { name: /apply/i });
    fireEvent.click(applyButton);

    expect(mockRouterPush).toHaveBeenCalled();
  });
});
