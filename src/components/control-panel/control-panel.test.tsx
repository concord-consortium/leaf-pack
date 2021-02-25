import React from "react";
import { render, screen } from "@testing-library/react";
import { ControlPanel } from "./control-panel";
import { EnvironmentType } from "../../utils/environment";

function hasChildContainingText(parent: Element, text: string, tag = "div") {
  // https://stackoverflow.com/a/3813334
  const children = parent.getElementsByTagName(tag);
  return !!Array.from(children).find(child => child?.textContent?.includes(text));
}

describe("ControlPanel component", () => {
  const startSim = jest.fn();
  const pauseSim = jest.fn();
  const rewindSim = jest.fn();
  const changeSunnyDaysSlider = jest.fn();
  const changeEnvironment = jest.fn();

  it("renders initial state", () => {
    const { container } = render(
      <ControlPanel
        isRunning={false} isPaused={false} isFinished={false} inputControlsDisabled={false}
        onStartSim={startSim} onPauseSim={pauseSim} onRewindSim={rewindSim}
        sunnyDayFequency={0} onChangeSunnyDaySlider={changeSunnyDaysSlider}
        environment={EnvironmentType.environment1} onChangeEnvironment={changeEnvironment}
      />);

    const sunnyDaySliderWrapper = screen.getByTestId("sunny-day-slider");
    const sunnyDaySlider = sunnyDaySliderWrapper?.querySelector(".slider");
    expect(sunnyDaySlider).not.toHaveClass("disabled");

    const vcrButtons = container.querySelectorAll(".vcr-button");
    vcrButtons.forEach(button => {
      if (hasChildContainingText(button, "Rewind")) {
        expect(button).toBeDisabled();
      }
      else if (hasChildContainingText(button, "Start")) {
        expect(button).toBeEnabled();
      }
      else {
        expect("Unidentified button encountered").toBe(true);
      }
    });
  });

  it("renders running state", () => {
    const { container } = render(
      <ControlPanel
        isRunning={true} isPaused={false} isFinished={false} inputControlsDisabled={true}
        onStartSim={startSim} onPauseSim={pauseSim} onRewindSim={rewindSim}
        sunnyDayFequency={0} onChangeSunnyDaySlider={changeSunnyDaysSlider}
        environment={EnvironmentType.environment1} onChangeEnvironment={changeEnvironment}
      />);

    const sunnyDaySliderWrapper = screen.getByTestId("sunny-day-slider");
    const sunnyDaySlider = sunnyDaySliderWrapper?.querySelector(".slider");
    expect(sunnyDaySlider).toHaveClass("disabled");

    const vcrButtons = container.querySelectorAll(".vcr-button");
    vcrButtons.forEach(button => {
      if (hasChildContainingText(button, "Rewind")) {
        expect(button).toBeEnabled();
      }
      else if (hasChildContainingText(button, "Pause")) {
        expect(button).toBeEnabled();
      }
      else {
        expect("Unidentified button encountered").toBe(true);
      }
    });
  });

  it("renders paused state", () => {
    const { container } = render(
      <ControlPanel
        isRunning={true} isPaused={true} isFinished={false} inputControlsDisabled={true}
        onStartSim={startSim} onPauseSim={pauseSim} onRewindSim={rewindSim}
        sunnyDayFequency={0} onChangeSunnyDaySlider={changeSunnyDaysSlider}
        environment={EnvironmentType.environment1} onChangeEnvironment={changeEnvironment}
      />);

    const sunnyDaySliderWrapper = screen.getByTestId("sunny-day-slider");
    const sunnyDaySlider = sunnyDaySliderWrapper?.querySelector(".slider");
    expect(sunnyDaySlider).toHaveClass("disabled");

    const vcrButtons = container.querySelectorAll(".vcr-button");
    vcrButtons.forEach(button => {
      if (hasChildContainingText(button, "Rewind")) {
        expect(button).toBeEnabled();
      }
      else if (hasChildContainingText(button, "Start")) {
        expect(button).toBeEnabled();
      }
      else {
        expect("Unidentified button encountered").toBe(true);
      }
    });
  });

  it("renders finished state", () => {
    const { container } = render(
      <ControlPanel
        isRunning={false} isPaused={false} isFinished={true} inputControlsDisabled={true}
        onStartSim={startSim} onPauseSim={pauseSim} onRewindSim={rewindSim}
        sunnyDayFequency={0} onChangeSunnyDaySlider={changeSunnyDaysSlider}
        environment={EnvironmentType.environment1} onChangeEnvironment={changeEnvironment}
      />);

    const sunnyDaySliderWrapper = screen.getByTestId("sunny-day-slider");
    const sunnyDaySlider = sunnyDaySliderWrapper?.querySelector(".slider");
    expect(sunnyDaySlider).toHaveClass("disabled");

    const vcrButtons = container.querySelectorAll(".vcr-button");
    vcrButtons.forEach(button => {
      if (hasChildContainingText(button, "Rewind")) {
        expect(button).toBeEnabled();
      }
      else if (hasChildContainingText(button, "Start")) {
        expect(button).toBeDisabled();
      }
      else {
        expect("Unidentified button encountered").toBe(true);
      }
    });
  });
});
