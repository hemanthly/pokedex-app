// Stats.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
//import '@testing-library/jest-dom/extend-expect';
import Stats from "./index";
import ProgressBar from "@/components/atoms/progress-bar";
import { STAT_LABELS } from "@/utils/constants";

const mockStatsData = [
  { name: "hp", value: 80 },
  { name: "attack", value: 100 },
  { name: "defense", value: 70 },
  { name: "special-attack", value: 90 },
  { name: "special-defense", value: 80 },
  { name: "speed", value: 110 },
];

jest.mock("../../Atoms/ProgressBar/index.tsx", () => {
  return function MockProgressBar({
    label,
    value,
  }: {
    label: string;
    value: number;
  }) {
    return (
      <div>
        <span data-testid={`label-${label}`}>{label}</span>
        <span data-testid={`value-${label}`}>{value}</span>
      </div>
    );
  };
});

jest.mock("../../../utils/constants.ts", () => ({
  STAT_LABELS: {
    hp: "HP",
    attack: "Attack",
    defense: "Defense",
    "special-attack": "Special Attack",
    "special-defense": "Special Defense",
    speed: "Speed",
  },
}));

describe("Stats component", () => {
  test("renders stats with correct labels and values", () => {
    render(<Stats statsData={mockStatsData} />);

    mockStatsData.forEach((stat) => {
      const labelElement = screen.getByTestId(
        `label-${STAT_LABELS[stat.name]}`
      );
      const valueElement = screen.getByTestId(
        `value-${STAT_LABELS[stat.name]}`
      );

      expect(labelElement).toBeInTheDocument();
      expect(valueElement).toBeInTheDocument();
      expect(labelElement).toHaveTextContent(STAT_LABELS[stat.name]);
      expect(valueElement).toHaveTextContent(stat.value.toString());
    });
  });
});
