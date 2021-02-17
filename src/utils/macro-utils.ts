import t from "./translation/translate";
import { Sensitivities, SensitivityType, TrayObject, Animals } from "../utils/sim-utils";

// PTI
export interface PTIRatingLevel {
  color: string;
  label: string;
  range: string;
  min: number;
}

export const PTIRatingLevels: PTIRatingLevel[] = [
  {color: "#a4f9be", label: t("PTI.RATING.LEVEL0.LABEL"), range: t("PTI.RATING.LEVEL0.RANGE"), min: 24},
  {color: "#94e5ff", label: t("PTI.RATING.LEVEL1.LABEL"), range: t("PTI.RATING.LEVEL1.RANGE"), min: 17},
  {color: "#cccccc", label: t("PTI.RATING.LEVEL2.LABEL"), range: t("PTI.RATING.LEVEL2.RANGE"), min: 11},
  {color: "#ffacac", label: t("PTI.RATING.LEVEL3.LABEL"), range: t("PTI.RATING.LEVEL3.RANGE"), min: 0}
];

export const getPTIScore = (trayObjects: TrayObject[]) => {
  const taxaSensitivities: Record<SensitivityType, number> = {sensitive: 0, somewhatSensitive: 0, tolerant: 0};
  trayObjects.forEach((obj, i) => {
    if (obj.count > 0 && obj.collected) {
      const animal = Animals.find((a) => a.type === obj.type);
      if (animal) {
        taxaSensitivities[animal.sensitivity]++;
      }
    }
  });
  let score = 0;
  Sensitivities.forEach((s, i) => {
    score = score + taxaSensitivities[s.type] * (Sensitivities.length - i);
  });
  return score;
}

export const getPTIRatingIndex = (score: number) => {
  let ratingIndex = 0;
  for (let i = PTIRatingLevels.length - 1; i >= 0; i--) {
    if (score >= PTIRatingLevels[i].min) {
      ratingIndex = i;
    }
  }
  return ratingIndex;
}
