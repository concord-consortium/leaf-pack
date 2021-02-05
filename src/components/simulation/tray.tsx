import React from "react";

import "./tray.scss";

interface IProps {
  isRunning: boolean;
}

export const Tray: React.FC<IProps> = (props) => {
  return (
    <div className="tray">
      Leaf Pack Sorting Tray
    </div>
  );
};
