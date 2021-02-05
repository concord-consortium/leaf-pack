import React from "react";

import "./chemistry-panel.scss";

interface IProps {
  isRunning: boolean;
}

export const ChemistryPanel: React.FC<IProps> = (props) => {
  return (
    <div className="chemistry-panel">
      Chemistry Panel
    </div>
  );
};
