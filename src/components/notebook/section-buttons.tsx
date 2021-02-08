import React from "react";

import "./section-buttons.scss";

interface IProps {
  currentSection: number;
  totalSections: number;
  onSelectSection: (index: number) => void;
}

export const SectionButtons: React.FC<IProps> = (props) => {
  const { currentSection, totalSections, onSelectSection } = props;
  const pages = Array(totalSections).fill("section");
  return (
    <div className="section-buttons">
      {pages.map((p, index) =>
        <button
          key={`button-${index}`}
          className={`section-button ${currentSection === index ? "selected" : ""}`}
          onClick={() => onSelectSection(index)}
        >
          {index + 1}
        </button>
      )}
    </div>
  );
};
