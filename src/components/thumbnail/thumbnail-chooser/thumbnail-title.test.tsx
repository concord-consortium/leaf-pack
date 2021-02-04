import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { ThumbnailTitle } from "./thumbnail-title";

describe("ThumbnailTitle component", () => {
  it("renders empty title", () => {
    render(<ThumbnailTitle title="Test Title" empty={true} saved={false} savedBgColor="#000000" />);
    expect(screen.getAllByTestId("thumbnail-title")).toHaveLength(1);
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getAllByTestId("thumbnail-title")[0]).toHaveClass("empty");
  });

  it("renders non-empty title", () => {
    render(<ThumbnailTitle title="Test Title" empty={false} saved={false} savedBgColor="#000000" />);
    expect(screen.getAllByTestId("thumbnail-title")).toHaveLength(1);
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getAllByTestId("thumbnail-title")[0]).not.toHaveClass("empty");
  });
});
