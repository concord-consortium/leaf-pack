import React from "react";
import { Sensitivities, SensitivityType } from "../../utils/sim-utils";
import t from "../../utils/translation/translate";

import "./macro-sensitivities.scss";

interface IProps {
  taxaSensitivities: Record<SensitivityType, number>;
}

export const MacroSensitivities: React.FC<IProps> = (props) => {
  const { taxaSensitivities } = props;
  return (
    <div className="macro-sensitivities">
      <div className="labels">
        <div className="label">{t("PTI.GROUPS")}</div>
        <div className="label">{t("PTI.NUMTAXA")}</div>
        <div className="label">{t("PTI.INDEXVAL")}</div>
      </div>
      <div className="sensitivity-summaries">
        {Sensitivities.map((sensitivity, i) =>
          <div
            className="sensitivity-summary"
            key={`sensitivity-${i}`}
            style={{backgroundColor: sensitivity.backgroundColor}}
          >
            <div className="group">{sensitivity.label}</div>
            <div className="num-taxa">
              <div className="taxa-count" style={{backgroundColor: sensitivity.blockColor}}>
                {taxaSensitivities[sensitivity.type]}
              </div>
              x
              <div className="taxa-multiplier">{Sensitivities.length - i}</div>
            </div>
            <div>=</div>
            <div className="index-value">{Sensitivities.length - i}</div>
          </div>
        )}
      </div>
    </div>
  );
};
