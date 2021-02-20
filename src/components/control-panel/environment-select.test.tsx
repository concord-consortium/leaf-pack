import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { EnvironmentSelect } from "./environment-select";
import { EnvironmentType } from "../../utils/environment";

describe("Environment Select component", () => {
  it("renders environment select", () => {
    render(<EnvironmentSelect labelOnly={false} onChange={()=>{/*no-op*/}} environment={EnvironmentType.environment1} disabled={false} />);
    expect(screen.getAllByTestId("environment-select")).toHaveLength(1);
    expect(screen.getAllByTestId("location-select")).toHaveLength(1);
    expect(screen.getByText("Environment")).toBeInTheDocument();
  });
});
