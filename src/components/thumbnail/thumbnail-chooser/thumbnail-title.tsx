import classNames from "classnames";
import React from "react";

import "./thumbnail-title.scss";

interface IProps {
  title: string;
  fullWidth?: boolean;
  empty: boolean;
  saved: boolean;
  savedBgColor: string;
}

export const ThumbnailTitle: React.FC<IProps> = ({ title, fullWidth, empty, saved, savedBgColor }) => {
  const className = classNames("thumbnail-title", { fullWidth, empty, saved });
  const style: React.CSSProperties = { backgroundColor: saved ? savedBgColor : undefined };
  return (
    <div className={className} data-testid="thumbnail-title" style={style}>
      {title}
    </div>
  );
};
