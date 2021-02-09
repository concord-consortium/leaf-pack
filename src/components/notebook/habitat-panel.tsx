import React, { useState } from "react";
import { SectionButtons } from "./section-buttons";
import { EnvironmentType, habitatCategories, Environments } from "../../utils/sim-utils";
import CheckIcon from "../../assets/check-icon.svg";

import "./habitat-panel.scss";

const kCategoriesPerSection = 3;

interface IProps {
  environment: EnvironmentType;
  featureSelections: boolean[];
  onSelectFeature: (index: number, selected: boolean) => void;
  isRunning: boolean;
}

export const HabitatPanel: React.FC<IProps> = (props) => {
  const { environment, featureSelections, onSelectFeature } = props;
  const [currentSection, setCurrentSection] = useState(0);
  const numSections = Math.ceil(habitatCategories.length / kCategoriesPerSection);
  const environmentImage = Environments.find((env) => env.type === environment)?.sketchImage;

  const featureOrder: string[] = [];
  habitatCategories.forEach((hCat) => {
    hCat.features?.forEach((feat) => {
      featureOrder.push(feat);
    });
  });

  return (
    <div className="habitat-panel">
      <div className="categories">
        {habitatCategories.map((category, cIndex) =>
          cIndex >= kCategoriesPerSection * currentSection &&
          cIndex < kCategoriesPerSection * currentSection + kCategoriesPerSection &&
          <div key={`habitat-category-${cIndex}`} className="category">
            <div className="header">{category.title}</div>
            { category.features
              ? category.features.map((feature, fIndex) =>
                  <div className="feature-row" key={`feature-row-${fIndex}`}>
                    <button
                      className={`checkbox ${featureSelections[featureOrder.findIndex((f) => f === feature)] ? "selected" : ""}`}
                      onClick={() => onSelectFeature(featureOrder.findIndex((f) => f === feature),
                        !featureSelections[featureOrder.findIndex((f) => f === feature)])}
                    >
                      <CheckIcon />
                    </button>
                    <div key={`feature-${fIndex}`}>{feature}</div>
                  </div>
                )
              : <img src={environmentImage} />
            }
          </div>
        )}
      </div>
      <SectionButtons
        currentSection={currentSection}
        totalSections={numSections}
        onSelectSection={setCurrentSection}
      />
    </div>
  );
};
