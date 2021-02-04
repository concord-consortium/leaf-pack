import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { IThumbnailWrapperProps, ThumbnailWrapper } from "./thumbnail-wrapper";
import { ContainerId, IContainer, initialSimulationState } from "../../../hooks/use-model-state";

interface IModelInputState {
  foo: boolean;
}
interface IModelOutputState {
  bar: boolean;
}

describe("ThumbnailWrapper component", () => {
  it("renders wrapper with saved title icon", () => {
    const container: IContainer<IModelInputState, IModelOutputState> = {
      inputState: {foo: true},
      outputState: {bar: false},
      simulationState: initialSimulationState,
      isSaved: true
    };

    const Thumbnail = () => <div data-testid="thumbnail">Thumbnail</div>;

    const thumbnailWrapperProps: IThumbnailWrapperProps<IModelInputState, IModelOutputState> = {
      containerId: "A",
      Thumbnail,
      container,
      selected: true,
      setSelectedContainerId: (containerId: ContainerId) => undefined,
      clearContainer: (containerId: ContainerId) => undefined,
      disabled: false,
      savedBgColor: "#000000",
      selectedContainerBgColor: "#eeeeee"
    };

    render(<ThumbnailWrapper {...thumbnailWrapperProps} />);
    expect(screen.getAllByTestId("thumbnail-wrapper")).toHaveLength(1);
    expect(screen.getAllByTestId("thumbnail-button")).toHaveLength(1);
    expect(screen.getAllByTestId("thumbnail-title")).toHaveLength(1);
    expect(screen.getByTestId("thumbnail-title")).toHaveClass("saved");
    expect(screen.getAllByTestId("thumbnail")).toHaveLength(1);
  });

  it("renders wrapper without saved title icon", () => {
    const container: IContainer<IModelInputState, IModelOutputState> = {
      inputState: { foo: true },
      outputState: { bar: false },
      simulationState: initialSimulationState,
      isSaved: false
    };

    const Thumbnail = () => <div data-testid="thumbnail">Thumbnail</div>;

    const thumbnailWrapperProps: IThumbnailWrapperProps<IModelInputState, IModelOutputState> = {
      containerId: "A",
      Thumbnail,
      container,
      selected: true,
      setSelectedContainerId: (containerId: ContainerId) => undefined,
      clearContainer: (containerId: ContainerId) => undefined,
      disabled: false,
      savedBgColor: "#000000",
      selectedContainerBgColor: "#eeeeee"
    };

    render(<ThumbnailWrapper { ...thumbnailWrapperProps } />);
    expect(screen.getAllByTestId("thumbnail-wrapper")).toHaveLength(1);
    expect(screen.getAllByTestId("thumbnail-button")).toHaveLength(1);
    expect(screen.getAllByTestId("thumbnail-title")).toHaveLength(1);
    expect(screen.getByTestId("thumbnail-title")).not.toHaveClass("saved");
    expect(screen.getAllByTestId("thumbnail")).toHaveLength(1);
  });
});
