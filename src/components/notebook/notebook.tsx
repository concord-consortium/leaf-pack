import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { LeafDecompositionType, LeafEatersAmountType, AlgaeEatersAmountType, FishAmountType,
       } from "../../utils/sim-utils";
import { HabitatPanel } from "./habitat-panel";
import { ChemistryPanel } from "./chemistry-panel";
import { MacroPanel } from "./macro-panel";

import "react-tabs/style/react-tabs.css";
import "./notebook.scss";

interface IProps {
  leafDecomposition: LeafDecompositionType;
  leafEaters: LeafEatersAmountType;
  algaeEaters: AlgaeEatersAmountType;
  fish: FishAmountType;
  isRunning: boolean;
}

export const Notebook: React.FC<IProps> = (props) => {
  const { leafDecomposition, leafEaters, algaeEaters, fish, isRunning } = props;
  return (
    <div className="notebook" data-testid="notebook">
      <Tabs>
        <TabList className="notebook-tablist">
          <Tab className="notebook-tab habitat">Habitat</Tab>
          <Tab className="notebook-tab macro">Macroinvertebrates</Tab>
          <Tab className="notebook-tab chemistry">Chemistry</Tab>
        </TabList>

        <TabPanel>
          <HabitatPanel
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
