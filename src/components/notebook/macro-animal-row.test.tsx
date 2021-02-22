import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MacroAnimalRow } from "./macro-animal-row";
import { AnimalType, getAnimal, SensitivityType } from "../../utils/sim-utils";

jest.mock("react-dnd", () => ({
  useDrop: () => [{ isOver: false }, () => null]
}));

describe("MacroAnimalRow component", () => {
  const animal = getAnimal(AnimalType.caddisFly)!;
  const collectedTrayAnimal: any = { type: AnimalType.caddisFly, collected: true };
  const correctTrayAnimal: any = { type: AnimalType.caddisFly, collected: false };
  const incorrectTrayAnimal: any = { type: AnimalType.aquaticWorm, collected: false };

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("renders with no tray animal", () => {
    render(<MacroAnimalRow animal={animal} count={0} onCategorizeAnimal={() => null} />);
    expect(screen.getByTestId("critter-caddisFly")).toBeInTheDocument();
  });

  it("renders with collected tray animal", () => {
    render(<MacroAnimalRow animal={animal} trayAnimal={collectedTrayAnimal}
                            count={0} onCategorizeAnimal={() => null} />);
    expect(screen.getByTestId("critter-caddisFly")).toBeInTheDocument();
  });

  it("categorizes correct animal on click", () => {
    render(<MacroAnimalRow animal={animal} traySelectionType={AnimalType.caddisFly}
                            trayAnimal={correctTrayAnimal}
                            count={0} onCategorizeAnimal={() => null} />);
    userEvent.click(screen.getByTestId("empty-box-caddisFly"));
  });

  it("provides error feedback for sensitive species on click", () => {
    const sensitivity: any = { type: SensitivityType.sensitive };
    render(<MacroAnimalRow animal={animal} traySelectionType={AnimalType.blackFly}
                            trayAnimal={incorrectTrayAnimal} sensitivity={sensitivity}
                            count={0} onCategorizeAnimal={() => null} />);
    userEvent.click(screen.getByTestId("empty-box-caddisFly"));
    expect(screen.getByTestId("error-sensitive")).toBeInTheDocument();
  });

  it("provides error feedback for somewhat sensitive species on click", () => {
    const sensitivity: any = { type: SensitivityType.somewhatSensitive };
    render(<MacroAnimalRow animal={animal} traySelectionType={AnimalType.blackFly}
                            trayAnimal={incorrectTrayAnimal} sensitivity={sensitivity}
                            count={0} onCategorizeAnimal={() => null} />);
    userEvent.click(screen.getByTestId("empty-box-caddisFly"));
    expect(screen.getByTestId("error-somewhat-sensitive")).toBeInTheDocument();
  });

  it("provides error feedback for tolerant species on click", () => {
    const sensitivity: any = { type: SensitivityType.tolerant };
    render(<MacroAnimalRow animal={animal} traySelectionType={AnimalType.blackFly}
                            trayAnimal={incorrectTrayAnimal} sensitivity={sensitivity}
                            count={0} onCategorizeAnimal={() => null} />);
    userEvent.click(screen.getByTestId("empty-box-caddisFly"));
    expect(screen.getByTestId("error-tolerant")).toBeInTheDocument();
  });
});
