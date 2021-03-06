import React, { useState } from "react";
import { SectionButtons } from "./section-buttons";
import { Environments, EnvironmentType } from "../../utils/environment";
import { HabitatFeatureType, habitatCategories, habitatFeatures } from "../../utils/habitat-utils";
import CheckIcon from "../../assets/check-icon.svg";

import "./habitat-panel.scss";

const kCategoriesPerSection = 3;

interface IProps {
  environment: EnvironmentType;
  featureSelections: Set<HabitatFeatureType>;
  onSelectFeature: (feture: HabitatFeatureType, selected: boolean) => void;
}

export const HabitatPanel: React.FC<IProps> = (props) => {
  const { environment, featureSelections, onSelectFeature } = props;
  const [currentSection, setCurrentSection] = useState(0);
  const numSections = Math.ceil(habitatCategories.length / kCategoriesPerSection);
  const environmentImage = Environments.find((env) => env.type === environment)?.sketchImage;
  const environmentImageAltText = Environments.find((env) => env.type === environment)?.sketchImageAltText;

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
                      className={`checkbox ${featureSelections.has(feature) ? "selected" : ""}`}
                      onClick={() => onSelectFeature(feature, !featureSelections.has(feature))}
                      aria-label={habitatFeatures.find((f) => f.type === feature)?.label}
                    >
                      <CheckIcon width={14} />
                    </button>
                    <div key={`feature-${fIndex}`}>{habitatFeatures.find((f) => f.type === feature)?.label}</div>
                  </div>
                )
              : <img src={environmentImage} alt={environmentImageAltText} />
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
