import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import t from "../../utils/translation/translate";
import { EnvironmentType, TrayObject, TrayType } from "../../utils/sim-utils";
import { HabitatFeatureType } from "../../utils/habitat-utils";
import { ChemTestType, ChemistryTestResult } from "../../utils/chem-utils";
import { HabitatPanel } from "./habitat-panel";
import { ChemistryPanel } from "./chemistry-panel";
import { MacroPanel } from "./macro-panel";
import HabitatIcon from "../../assets/habitat-icon.svg";
import ChemistryIcon from "../../assets/chemistry-icon.svg";
import MacroIcon from "../../assets/macro-icon.svg";

import "react-tabs/style/react-tabs.css";
import "./notebook.scss";

interface IProps {
  trayObjects: TrayObject[];
  environment: EnvironmentType;
  featureSelections: Set<HabitatFeatureType>;
  onSelectFeature: (feature: HabitatFeatureType, selected: boolean) => void;
  onCategorizeAnimal: (trayType: TrayType | undefined, notebookType: TrayType | undefined) => void;
  chemistryTestResults: ChemistryTestResult[];
  onUpdateTestResult: (type: ChemTestType, completedStep: number, value?: number) => void;
  traySelectionType?: TrayType;
  isRunning: boolean;
}

export const Notebook: React.FC<IProps> = (props) => {
  const { trayObjects, environment, featureSelections, onSelectFeature, onCategorizeAnimal, traySelectionType,
          isRunning, chemistryTestResults, onUpdateTestResult } = props;
  return (
    <div className="notebook" data-testid="notebook">
      <Tabs>
        <TabList className="notebook-tablist">
          <Tab className="notebook-tab habitat">
            <div className="inner"><HabitatIcon className="icon" />{t("NOTEBOOK.HABITAT")}</div>
          </Tab>
          <Tab className="notebook-tab macro">
            <div className="inner"><MacroIcon className="icon" />{t("NOTEBOOK.MACRO")}</div>
          </Tab>
          <Tab className="notebook-tab chemistry">
            <div className="inner"><ChemistryIcon className="icon" />{t("NOTEBOOK.CHEMISTRY")}</div>
          </Tab>
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
            trayObjects={trayObjects}
            onCategorizeAnimal={onCategorizeAnimal}
            traySelectionType={traySelectionType}
            isRunning={isRunning}
          />
        </TabPanel>
        <TabPanel>
          <ChemistryPanel
            chemistryTestResults={chemistryTestResults}
            onUpdateTestResult={onUpdateTestResult}
            isRunning={isRunning}
          />
        </TabPanel>

      </Tabs>
    </div>
  );
};
