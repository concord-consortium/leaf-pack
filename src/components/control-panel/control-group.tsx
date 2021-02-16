import React from "react";

import "./control-group.scss";

interface IProps {
  first?: boolean;
  last?: boolean;
}

export const ControlGroup: React.FC<IProps> = (props) => {
  const { children } = props;
  return (
    <div className="control-group">
      <div className="border-cover left" />
      <div className="border-cover right" />
      {children}
    </div>
  );
};
