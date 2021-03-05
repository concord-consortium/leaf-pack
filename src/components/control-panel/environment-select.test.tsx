import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { EnvironmentSelect } from "./environment-select";
import { EnvironmentType } from "../../utils/environment";

describe("Environment Select component", () => {
  it("renders environment label", () => {
    const handleSelectChange = jest.fn();
    render(<EnvironmentSelect labelOnly={true} onChange={handleSelectChange} environment={EnvironmentType.environment1} disabled={false} />);
    expect(screen.getByTestId("environment-select")).toBeInTheDocument();
    expect(screen.queryByTestId("location-select")).toBeNull();
    expect(screen.getByText("Environment")).toBeInTheDocument();
  });
  it("renders environment select", () => {
    const handleSelectChange = jest.fn();
    render(<EnvironmentSelect labelOnly={false} onChange={handleSelectChange} environment={EnvironmentType.environment1} disabled={false} />);
    expect(screen.getByTestId("environment-select")).toBeInTheDocument();
    expect(screen.getByTestId("location-form")).toBeInTheDocument();
    expect(screen.getByTestId("location-select")).toBeInTheDocument();
    expect(screen.getByText("Environment")).toBeInTheDocument();
    fireEvent.mouseDown(screen.getByRole("button"));
    const listbox = within(screen.getByRole("listbox"));
    fireEvent.click(listbox.getByText("Stream B"));
    expect(handleSelectChange).toHaveBeenCalledTimes(1);
    expect(screen.getByText("Stream B")).toBeInTheDocument();
  });
});
