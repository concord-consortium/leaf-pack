import React from "react";

import "./thumbnail-title.scss";

interface IProps {
  title: string;
  empty: boolean;
  saved: boolean;
  savedBgColor: string;
}

export const ThumbnailTitle: React.FC<IProps> = (props) => {
  const className = `thumbnail-title${props.empty ? " empty" : ""}${props.saved ? " saved" : ""}`;
  const style = { backgroundColor: props.saved ? props.savedBgColor : undefined };
  return (
    <div className={className} data-testid="thumbnail-title" style={style}>
      {props.title}
    </div>
  );
};
