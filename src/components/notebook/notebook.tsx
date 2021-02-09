import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { EnvironmentType, TrayAnimal } from "../../utils/sim-utils";
import { HabitatPanel } from "./habitat-panel";
import { ChemistryPanel } from "./chemistry-panel";
import { MacroPanel } from "./macro-panel";
import HabitatIcon from "../../assets/habitat-icon.svg";
import ChemistryIcon from "../../assets/chemistry-icon.svg";
import MacroIcon from "../../assets/macro-icon.svg";

import "react-tabs/style/react-tabs.css";
import "./notebook.scss";

interface IProps {
  trayAnimals: TrayAnimal[];
  environment: EnvironmentType;
  featureSelections: boolean[];
  onSelectFeature: (index: number, selected: boolean) => void;
  isRunning: boolean;
}

export const Notebook: React.FC<IProps> = (props) => {
  const { environment, featureSelections, onSelectFeature, isRunning } = props;
  return (
    <div className="notebook" data-testid="notebook">
      <Tabs>
        <TabList className="notebook-tablist">
          <Tab className="notebook-tab habitat"><HabitatIcon className="icon" />Habitat</Tab>
          <Tab className="notebook-tab macro"><MacroIcon className="icon" />Macroinvertebrates</Tab>
          <Tab className="notebook-tab chemistry"><ChemistryIcon className="icon" />Chemistry</Tab>
        </TabList>

        <TabPanel>
          <HabitatPanel
            environment={environment}
            featureSelections={featureSelections}
            onSelectFeature={onSelectFeature}
            isRunning={isRunning}
          />
        </TabPanel>
        <TabPanel>
          <MacroPanel
            isRunning={isRunning}
          />
        </TabPanel>
        <TabPanel>
          <ChemistryPanel
            isRunning={isRunning}
          />
        </TabPanel>

      </Tabs>
    </div>
  );
};
