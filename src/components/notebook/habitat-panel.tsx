import React from "react";

import "./habitat-panel.scss";

interface IProps {
  isRunning: boolean;
}

export const HabitatPanel: React.FC<IProps> = (props) => {
  return (
    <div className="habitat-panel">
      Habitat Panel
    </div>
  );
};
