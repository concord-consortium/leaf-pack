import { SVGProps } from "react";

export enum ChemTestType {
  airTemperature = "airTemperature",
  waterTemperature = "waterTemperature",
  pH = "pH",
  nitrate = "nitrate",
  turbidity = "turbidity",
  dissolvedOxygen= "dissolvedOxygen",
}

export enum ChemTestRatingType {
  excellent = "excellent",
  good = "good",
  fair = "fair",
  poor = "poor",
}

export interface ChemTestRating {
  type: ChemTestRatingType;
  label: string;
  color: string;
}

export enum StepType {
  animation = "animation",
  resultSlider = "resultSlider",
  tempDisplay = "tempDisplay",
}

export interface ChemTestAnimationFrame {
  label: string;
  image: "none" | "byValue" | React.FC<SVGProps<SVGSVGElement>>;
  duration: number;
}

export interface ChemTestStep {
  type: StepType;
  label: string;
  frames?: ChemTestAnimationFrame[];
  // string => animation frame reference
  Image?: string | React.FC<SVGProps<SVGSVGElement>>;  // in lieu of animation
}

export interface ChemTestValue {
  value: number;
  rating?: ChemTestRatingType;
  color?: string;
  borderColor?: string;
  Icon?: React.FC<SVGProps<SVGSVGElement>>;
  frames?: Record<string, React.FC<SVGProps<SVGSVGElement>>>;
}

export interface ChemistryTest {
  type: ChemTestType;
  label: string;
  InitialImage?: React.FC<SVGProps<SVGSVGElement>>;
  steps: ChemTestStep[];
  results: ChemTestValue[];
  units: string;
}

export type ChemistryValues = Record<ChemTestType, number>;

export interface ChemistryTestResult {
  type: ChemTestType;
  currentStep?: number;   // currentStep is advanced at beginning of animation
  stepsComplete: number;  // stepsComplete is advanced at end of animation
  value?: number;
}

// argument to onUpdateTestResult()
export interface IUpdateChemistryTestResult {
  type: ChemTestType;
  currentStep?: number;   // for advancing currentStep without changing stepsComplete
  stepsComplete?: number; // as argument, stepsComplete takes precedence over currentStep
  value?: number;
}
