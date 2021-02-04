import React from "react";
import { LeafDecompositions, LeafEatersAmounts, AlgaeEatersAmounts, FishAmounts,
         LeafDecompositionType, LeafEatersAmountType, AlgaeEatersAmountType, FishAmountType,
         LeafDecomposition, LeafEatersAmount, AlgaeEatersAmount, FishAmount } from "../../utils/sim-utils";
import { Scale } from "./scale";
import t from "../../utils/translation/translate";

import "./scale-panel.scss";

interface IProps {
  leafDecomposition: LeafDecompositionType;
  leafEaters: LeafEatersAmountType;
  algaeEaters: AlgaeEatersAmountType;
  fish: FishAmountType;
  isRunning: boolean;
}

export const ScalePanel: React.FC<IProps> = (props) => {
  const { leafDecomposition, leafEaters, algaeEaters, fish, isRunning } = props;
  return (
    <div className="scale-panel" data-testid="scale-panel">
      <Scale
        label={t("LEAFDECOMPOSITION")}
        scaleIndex={LeafDecompositions.findIndex((item) => item.type === leafDecomposition)}
        scaleDisplay={LeafDecompositions.map((item: LeafDecomposition) => item.scaleDisplay)}
        isRunning={isRunning}
      />
      <Scale
        label={t("LEAFEATERS")}
        scaleIndex={LeafEatersAmounts.findIndex((item) => item.type === leafEaters)}
        scaleDisplay={LeafEatersAmounts.map((item: LeafEatersAmount) => item.scaleDisplay)}
        isRunning={isRunning}
      />
      <Scale
        label={t("ALGAEEATERS")}
        scaleIndex={AlgaeEatersAmounts.findIndex((item) => item.type === algaeEaters)}
        scaleDisplay={AlgaeEatersAmounts.map((item: AlgaeEatersAmount) => item.scaleDisplay)}
        isRunning={isRunning}
      />
      <Scale
        label={t("FISH")}
        scaleIndex={FishAmounts.findIndex((item) => item.type === fish)}
        scaleDisplay={FishAmounts.map((item: FishAmount) => item.scaleDisplay)}
        isRunning={isRunning}
      />
    </div>
  );
};
