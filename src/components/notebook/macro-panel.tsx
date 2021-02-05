import React from "react";

import "./macro-panel.scss";

interface IProps {
  isRunning: boolean;
}

export const MacroPanel: React.FC<IProps> = (props) => {
  return (
    <div className="macro-panel">
      Macroinvertebrates Panel
    </div>
  );
};
