import React from "react";
import { LeafPack } from "./leaf-pack";
import { SimulationAnimation } from "./simulation-animation";
import { EnvironmentType, LeafPackConfigurations, LeafPackState, SimAnimals, SimAnimation, FishAmountType, SimAnimationType,
         Environment, Environments } from "../../utils/sim-utils";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import "./simulation-view.scss";

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
  const fishCount = fish === FishAmountType.few
    ? kFishCountFew
    : fish === FishAmountType.some ? kFishCountSome : kFishCountLots;
  const fishAnimationConfig = SimAnimals.find((simAnimal) => simAnimal.type === SimAnimationType.fish);
  const animations: SimAnimation[] = [];
  fishAnimationConfig?.layouts.filter((l) => l.environment === environment).forEach((layout, index) => {
    if (index < fishCount) {
      animations.push(
        { frames: fishAnimationConfig.frames,
          left: layout.left,
          top: layout.top,
          xScale: layout.xScale,
          yScale: layout.yScale,
          rotation: layout.rotation,
          altText: fishAnimationConfig.altText
        }
      );
    }
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
        { animations.map((animation, index) =>
          <CSSTransition key={index} timeout={isRunning ? kSimulationOneWeekPeriodInMilliseconds : 0} classNames="animation-item">
            <SimulationAnimation
              animation={animation}
              key={`animation-${index}`}
            />
          </CSSTransition>
        )}
      </TransitionGroup>
      Model running: { isRunning ? "yes" : "no" }
    </div>
  );
};
