import t from "./translation/translate";
import { ContainerId } from "../hooks/use-model-state";

import EnvironmentImage1 from "../assets/environment1.png";
import EnvironmentImage2 from "../assets/environment2.png";
import EnvironmentImage3 from "../assets/environment3.png";
import EnvironmentImage4 from "../assets/environment4.png";
import EnvironmentSketchImage1 from "../assets/environment-sketch1.png";
import EnvironmentSketchImage2 from "../assets/environment-sketch2.png";
import EnvironmentSketchImage3 from "../assets/environment-sketch3.png";
import EnvironmentSketchImage4 from "../assets/environment-sketch4.png";

export enum EnvironmentType {
  environment1 = "environment1",
  environment2 = "environment2",
  environment3 = "environment3",
  environment4 = "environment4",
}

export const containerIdForEnvironmentMap: Record<EnvironmentType, ContainerId> = {
  [EnvironmentType.environment1]: "A",
  [EnvironmentType.environment2]: "B",
  [EnvironmentType.environment3]: "C",
  [EnvironmentType.environment4]: "D"
};

export const environmentForContainerId: Record<ContainerId, EnvironmentType> = {
  A: EnvironmentType.environment1,
  B: EnvironmentType.environment2,
  C: EnvironmentType.environment3,
  D: EnvironmentType.environment4
};

export interface Environment {
  type: EnvironmentType;
  name: string;
  backgroundImage: any;
  backgroundImageAltText: string;
  sketchImage: any;
  sketchImageAltText: string;
}

export const Environments: Environment[] = [
  {
    type: EnvironmentType.environment1,
    name: t("ENVIRONMENT.1"),
    backgroundImage: EnvironmentImage1,
    backgroundImageAltText: t("ENVIRONMENT1.DESCRIPTION"),
    sketchImage: EnvironmentSketchImage1,
    sketchImageAltText: t("ENVIRONMENT.SKETCH.DESCRIPTION")
  },
  {
    type: EnvironmentType.environment2,
    name: t("ENVIRONMENT.2"),
    backgroundImage: EnvironmentImage2,
    backgroundImageAltText: t("ENVIRONMENT2.DESCRIPTION"),
    sketchImage: EnvironmentSketchImage2,
    sketchImageAltText: t("ENVIRONMENT.SKETCH.DESCRIPTION")
  },
  {
    type: EnvironmentType.environment3,
    name: t("ENVIRONMENT.3"),
    backgroundImage: EnvironmentImage3,
    backgroundImageAltText: t("ENVIRONMENT3.DESCRIPTION"),
    sketchImage: EnvironmentSketchImage3,
    sketchImageAltText: t("ENVIRONMENT.SKETCH.DESCRIPTION")
  },
  {
    type: EnvironmentType.environment4,
    name: t("ENVIRONMENT.4"),
    backgroundImage: EnvironmentImage4,
    backgroundImageAltText: t("ENVIRONMENT4.DESCRIPTION"),
    sketchImage: EnvironmentSketchImage4,
    sketchImageAltText: t("ENVIRONMENT.SKETCH.DESCRIPTION")
  },
];
