import React from "react";
import HomeIcon from "../../assets/home-icon.svg";

import "./section-buttons.scss";

interface IProps {
  currentSection: number;
  totalSections: number;
  onSelectSection: (index: number) => void;
  showHomeButton?: boolean;
}

export const SectionButtons: React.FC<IProps> = (props) => {
  const { currentSection, totalSections, onSelectSection, showHomeButton } = props;
  const pages = Array(totalSections).fill("section");
  return (
    <div className="section-buttons">
      {pages.map((p, index) =>
        <button
          key={`button-${index}`}
          className={`section-button ${currentSection === index ? "selected" : ""}`}
          onClick={() => onSelectSection(index)}
          data-testid="section-numeric-button"
        >
          {showHomeButton
          ? index === 0 ? <HomeIcon className="home-icon" data-testid="section-home-button" /> : index
          : index + 1
          }
        </button>
      )}
    </div>
  );
};
