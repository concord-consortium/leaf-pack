import { IModelInputState } from "./leaf-model-types";
import { EnvironmentType } from "./utils/environment";
import { LeafDecompositionType, LeafEatersAmountType, AlgaeEatersAmountType, FishAmountType, Animal, Animals,
         AnimalInstance, LeafDecompositionFinalValues, LeafEatersFinalValues, AlgaeEatersFinalValues, FishFinalValues,
       } from "./utils/sim-utils";
import { getRandomInteger } from "./utils/math-utils";

export const kMaxSteps = 660;

export class Model {
  private frame = 0;

  private environment: EnvironmentType = EnvironmentType.environment1;
  private sunnyDayFequency = 0;
  private animalInstances: AnimalInstance[] = [];

  constructor(inputState: IModelInputState) {
    this.environment = inputState.environment;
    this.sunnyDayFequency = inputState.sunnyDayFequency;
    this.animalInstances = [];

    Animals.forEach((animal: Animal) => {
      const abundanceRange = this.sunnyDayFequency
        ? animal.abundance[this.environment].notSunny
        : animal.abundance[this.environment].sunny;
      const animalAbundance = getRandomInteger(abundanceRange.min, abundanceRange.max);
      // TODO: for now adjust each abundance number by 30% if it is less sunny, ultimately this should be in abundanceRange
      const animalAbundanceAdjusted = Math.floor(this.sunnyDayFequency === 0 ? animalAbundance : animalAbundance * .7);
      for (let x = 0; x < animalAbundance; x++) {
        // TODO: for now spread spawn over max time, but this should be more realistic
        const spawnOffset = 60;
        const spawnDelta = Math.floor((kMaxSteps - spawnOffset) / animalAbundanceAdjusted);
        const animalInstance: AnimalInstance = { type: animal.type,
                                                 spawnTime: spawnOffset + x * spawnDelta,
                                                 spawned: false };
        this.animalInstances.push(animalInstance);
      }
    });

  }

  public step() {
    if (this.frame > kMaxSteps) return;

    this.frame++;

    // spawn any animals
    for (let x = 0; x < this.animalInstances.length; x++) {
      if (this.animalInstances[x].spawnTime < this.frame) {
        this.animalInstances[x].spawned = true;
      }
    }

  }

  public getSimulationState() {
    const percentComplete =  this.frame / kMaxSteps;
    const isFinished = this.frame >= kMaxSteps;

    // TODO: instead of using the animal count, we will compute the sim state based on the known end state of each category.
    // The entire sim takes place over a 3 week period (so every 3.67 seconds comprises a week). Increase by one category
    // (e.g., "few" to "some") each week until we hit the end state. Because we animate each category change over a single week,
    // we need to set the state one week in advance (so if the sim moves from "few" to "some" in the first week, we want to set
    // the state to "some" as soon as the sim begins so we can start any animations or transitions).

    const sunny = this.sunnyDayFequency === 1;

    // determine leaf decomposition state
    const finalLeafDecomposition = LeafDecompositionFinalValues.find((ld) => ld.environment === this.environment
                                                                             && ld.sunny === sunny);
    const finalDecompositionVal = finalLeafDecomposition?.value || LeafDecompositionType.little;
    let leafDecomposition = LeafDecompositionType.little;
    if (finalDecompositionVal === LeafDecompositionType.lots && this.frame > kMaxSteps * .33) {
      leafDecomposition = LeafDecompositionType.lots;
    } else if (finalDecompositionVal === LeafDecompositionType.lots || finalDecompositionVal === LeafDecompositionType.some) {
      leafDecomposition = LeafDecompositionType.some;
    }

    // determine leaf eaters state
    const finalLeafEaters = LeafEatersFinalValues.find((le) => le.environment === this.environment && le.sunny === sunny);
    const finalLeafEatersVal = finalLeafEaters?.value || LeafEatersAmountType.some;
    let leafEaters = LeafEatersAmountType.few;
    if (finalLeafEatersVal === LeafEatersAmountType.lots && this.frame > kMaxSteps * .33) {
      leafEaters = LeafEatersAmountType.lots;
    } else if (finalLeafEatersVal === LeafEatersAmountType.lots || finalLeafEatersVal === LeafEatersAmountType.some) {
      leafEaters = LeafEatersAmountType.some;
    }

    // determine algae eaters state
    const finalAlgaeEaters = AlgaeEatersFinalValues.find((ae) => ae.environment === this.environment && ae.sunny === sunny);
    const finalAlgaeEatersVal = finalAlgaeEaters?.value || AlgaeEatersAmountType.some;
    let algaeEaters = AlgaeEatersAmountType.few;
    if (finalAlgaeEatersVal === AlgaeEatersAmountType.lots && this.frame > kMaxSteps * .33) {
      algaeEaters = AlgaeEatersAmountType.lots;
    } else if (finalAlgaeEatersVal === AlgaeEatersAmountType.lots || finalAlgaeEatersVal === AlgaeEatersAmountType.some) {
      algaeEaters = AlgaeEatersAmountType.some;
    }

    // determine fish state
    const finalFish = FishFinalValues.find((f) => f.environment === this.environment && f.sunny === sunny);
    const finalFishVal = finalFish?.value || FishFinalValues.some;
    let fish = finalFishVal === FishAmountType.none ? FishAmountType.none : FishAmountType.few;
    if (finalFishVal === FishAmountType.lots && this.frame > kMaxSteps * .33) {
      fish = FishAmountType.lots;
    } else if (finalFishVal === FishAmountType.lots || finalFishVal === FishAmountType.some) {
      fish = FishAmountType.some;
    }

    return {
      percentComplete,
      isFinished,
      leafDecomposition,
      leafEaters,
      algaeEaters,
      fish,
      animalInstances: this.animalInstances,
    };
  }
}
