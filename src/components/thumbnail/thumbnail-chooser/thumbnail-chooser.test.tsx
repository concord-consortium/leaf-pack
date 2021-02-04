import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { IThumbnailChooserProps, ThumbnailChooser } from "./thumbnail-chooser";
import { ContainerId, IContainer, initialSimulationState } from "../../../hooks/use-model-state";

interface IModelInputState {
  foo: boolean;
}
interface IModelOutputState {
  bar: boolean;
}

describe("ThumbnailChooser component", () => {
  it("renders", () => {

    const container: IContainer<IModelInputState, IModelOutputState> = {
      inputState: {foo: true},
      outputState: {bar: false},
      simulationState: initialSimulationState,
      isSaved: false
    };

    const Thumbnail = () => <div data-testid="thumbnail">Thumbnail</div>;

    const thumbnailChooserProps: IThumbnailChooserProps<IModelInputState, IModelOutputState> = {
      containers: {"A": container, "B": null, "C": null, "D": null, "E": null},
      Thumbnail,
      selectedContainerId: "A",
      setSelectedContainerId: (containerId: ContainerId) => undefined,
      clearContainer: (containerId: ContainerId) => undefined,
      savedBgColor: "#000000",
      selectedContainerBgColor: "#eeeeee"
    };

    render(<ThumbnailChooser {...thumbnailChooserProps} />);
    expect(screen.getAllByTestId("thumbnail-chooser")).toHaveLength(1);
    expect(screen.getAllByTestId("thumbnail-wrapper")).toHaveLength(5);
    expect(screen.getAllByTestId("thumbnail")).toHaveLength(1);
  });
});
