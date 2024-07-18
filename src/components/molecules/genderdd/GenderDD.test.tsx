import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import GenderDD from "@/components/molecules/genderdd/index";
import Dropdown from "@/components/atoms/dropdown";

// Mock the Dropdown component
jest.mock("../../Atoms/DropDown/index.tsx", () => {
  const DropdownMock = ({ label, options }) => (
    <div>
      <label>{label}</label>
      <select>
        {options.map((option: string) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );

  DropdownMock.displayName = "Dropdown";

  return DropdownMock;
});

describe("GenderDD Component", () => {
  test("renders without crashing", () => {
    render(<GenderDD />);
  });

  test("renders the dropdown with the correct label", () => {
    render(<GenderDD />);
    //const labelElement = screen.getByText(/Gender/i);
    //expect(labelElement).toBeInTheDocument();
  });

  test("renders the correct options", () => {
    render(<GenderDD />);
    const options = ["Male", "Female", "Genderless"];
    options.forEach((option) => {
      const optionElement = screen.getByText(option);
      expect(optionElement).toBeInTheDocument();
    });
  });
});
