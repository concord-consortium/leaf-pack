import React from "react";
import { render, screen } from "@testing-library/react";
import { StreamScore } from "./stream-score";

describe("StreamScore component", () => {
  it("renders empty score", () => {
    render(<StreamScore />);
    expect(screen.getByText("PTI:", { exact: false })).toBeInTheDocument();
    expect(screen.queryByText("0")).toBeNull();
    expect(screen.queryByText("Poor")).toBeNull();
  });

  it("renders 0 score", () => {
    render(<StreamScore ptiScore={0} />);
    expect(screen.getByText("PTI:", { exact: false })).toBeInTheDocument();
    expect(screen.queryByText("0", { exact: false })).toBeInTheDocument();
    expect(screen.queryByText("Poor")).toBeNull();
  });

  it("renders 1 score", () => {
    render(<StreamScore ptiScore={1} />);
    expect(screen.getByText("PTI:", { exact: false })).toBeInTheDocument();
    expect(screen.queryByText("1", { exact: false })).toBeInTheDocument();
    expect(screen.getByText("Poor")).toBeInTheDocument();
  });

  it("renders 15 score", () => {
    render(<StreamScore ptiScore={15} />);
    expect(screen.getByText("PTI:", { exact: false })).toBeInTheDocument();
    expect(screen.queryByText("15", { exact: false })).toBeInTheDocument();
    expect(screen.getByText("Fair")).toBeInTheDocument();
  });

  it("renders 20 score", () => {
    render(<StreamScore ptiScore={20} />);
    expect(screen.getByText("PTI:", { exact: false })).toBeInTheDocument();
    expect(screen.queryByText("20", { exact: false })).toBeInTheDocument();
    expect(screen.getByText("Good")).toBeInTheDocument();
  });

  it("renders 25 score", () => {
    render(<StreamScore ptiScore={25} />);
    expect(screen.getByText("PTI:", { exact: false })).toBeInTheDocument();
    expect(screen.queryByText("25", { exact: false })).toBeInTheDocument();
    expect(screen.getByText("Excellent")).toBeInTheDocument();
  });
});
