import React from "react";
import { LeafPack } from "./leaf-pack";
import { SimulationAnimation } from "./simulation-animation";
import { EnvironmentType, Environments, Environment } from "../../utils/environment";
import {
  LeafPackConfigurations, LeafPackState, simAnimationConfigurations, SimAnimation, FishAmountType, SimAnimationType,
} from "../../utils/sim-utils";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import "./simulation-view.scss";

const kFishCountNone = 0;
const kFishCountFew = 1;
const kFishCountSome = 3;
const kFishCountLots = 5;
const kSimulationOneWeekPeriodInMilliseconds = 3667;

interface IProps {
  environment: EnvironmentType;
  leafPackState: LeafPackState;
  fish: FishAmountType;
  onShowTray: () => void;
  isFinished: boolean;
  isRunning: boolean;
}

export const SimulationView: React.FC<IProps> = (props) => {
  const { environment, leafPackState, fish, isRunning, isFinished, onShowTray } = props;
  const currentEnvironment = Environments.find((env: Environment) => env.type === environment);
  const backgroundImage = currentEnvironment?.backgroundImage;
  const backgroundImageAltText = currentEnvironment?.backgroundImageAltText;

  const leafPackConfiguration = LeafPackConfigurations.find((lp) => lp.environment === environment);
  let fishCount = kFishCountNone;
  if (fish === FishAmountType.few) {
    fishCount = kFishCountFew;
  } else if (fish === FishAmountType.some) {
    fishCount = kFishCountSome;
  } else if (fish === FishAmountType.lots) {
    fishCount = kFishCountLots;
  }
  const fishAnimationConfig = simAnimationConfigurations.find((aniConfig) => aniConfig.type === SimAnimationType.fish);
  const fishAnimations: SimAnimation[] = [];
  fishAnimationConfig?.layouts.filter((l) => l.environment === environment).forEach((layout, index) => {
    if (index < fishCount) {
      fishAnimations.push(
        { frames: fishAnimationConfig.frames,
          left: layout.left,
          top: layout.top,
          xScale: layout.xScale,
          yScale: layout.yScale,
          rotation: layout.rotation,
          altText: fishAnimationConfig.altText }
      );
    }
  });

  const beaverAnimationConfig = simAnimationConfigurations.find((aniConfig) => aniConfig.type === SimAnimationType.beaver);
  const simAnimations: SimAnimation[] = [];
  beaverAnimationConfig?.layouts.filter((l) => l.environment === environment).forEach((layout) => {
    simAnimations.push(
      { frames: beaverAnimationConfig.frames,
        left: layout.left,
        top: layout.top,
        xScale: layout.xScale,
        yScale: layout.yScale,
        rotation: layout.rotation,
        altText: beaverAnimationConfig.altText }
    );
  });

  return (
    <div className="simulation-view" data-testid="simulation-view">
      <img src={backgroundImage} className="background" alt={backgroundImageAltText} />
      <LeafPack
        leafDecomposition={leafPackState.leafDecomposition}
        left={leafPackConfiguration?.left}
        top={leafPackConfiguration?.top}
        onShowTray={onShowTray}
        isFinished={isFinished}
        isRunning={isRunning}
      />
      <TransitionGroup>
        { fishAnimations.map((animation, index) =>
            <CSSTransition
              key={index}
              timeout={isRunning ? kSimulationOneWeekPeriodInMilliseconds : 0}
              classNames="animation-item"
            >
              <SimulationAnimation
                animation={animation}
                key={`fish-animation-${index}`}
              />
            </CSSTransition>
          )
        }
      </TransitionGroup>
      { simAnimations.map((animation, index) =>
          <SimulationAnimation
            animation={animation}
            key={`sim-animation-${index}`}
          />
        )
      }
      Model running: { isRunning ? "yes" : "no" }
    </div>
  );
};
