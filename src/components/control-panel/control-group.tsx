import React from "react";

import "./control-group.scss";

interface IProps {
  first?: boolean;
  last?: boolean;
}

export const ControlGroup: React.FC<IProps> = (props) => {
  const { first, last, children } = props;
  return (
    <div className="control-group">
      {first ? undefined : <div className="border-cover left" />}
      {last  ? undefined : <div className="border-cover right" />}
      {children}
    </div>
  );
};
