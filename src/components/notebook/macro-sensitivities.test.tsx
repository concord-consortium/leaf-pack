import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MacroSensitivities } from "./macro-sensitivities";
import { SensitivityType } from "../../utils/sim-utils";

describe("Macro Sensitivities component", () => {
  it("renders macro sensitivities", () => {
    const taxaSensitivities: Record<SensitivityType, number> = {sensitive: 3, somewhatSensitive: 4, tolerant: 6};
    render(<MacroSensitivities taxaSensitivities={taxaSensitivities} />);
    expect(screen.getAllByTestId("macro-sensitivities")).toHaveLength(1);
    expect(screen.getAllByTestId("macro-sensitivity-summaries")).toHaveLength(3);
    expect(screen.getAllByText("3")).toHaveLength(2);
    expect(screen.getAllByText("4")).toHaveLength(1);
    expect(screen.getAllByText("6")).toHaveLength(2);
    expect(screen.getAllByText("9")).toHaveLength(1);
    expect(screen.getAllByText("8")).toHaveLength(1);
  });
});
