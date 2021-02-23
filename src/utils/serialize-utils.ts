import { ContainerId, ContainerIds, IContainer, IContainerMap, IModelCurrentState, initContainerMap, IPartialContainerMap } from "../hooks/use-model-state";
import { ILeafModelInputState, ILeafModelOutputState, ISerializableLeafModelOutputState, ISerializableTrayObject } from "../leaf-model-types";
import { Animal, Animals, Leaf, Leaves, TrayObject } from "./sim-utils";
import { HabitatFeatureType } from "./habitat-utils";
import cloneDeep from "lodash.clonedeep";

type ModelState = IModelCurrentState<ILeafModelInputState, ILeafModelOutputState>;
export type SerializableModelState = IModelCurrentState<ILeafModelInputState, ISerializableLeafModelOutputState>;
type ContainerState = IContainer<ILeafModelInputState, ILeafModelOutputState>;
type SerializableContainerMap = IContainerMap<ILeafModelInputState, ISerializableLeafModelOutputState>;

const serializeOutputState = (outputState: ILeafModelOutputState): ISerializableLeafModelOutputState => {
  const serializableTrayObjects: ISerializableTrayObject[] = outputState.trayObjects.map(trayObj => {
    const {image, selectionPath, width, height, ...serializableTrayObject} = trayObj;
    return serializableTrayObject;
  });
  const serializeableHabitatFeatures = Array.from(outputState.habitatFeatures);

  return {
    ...outputState,
    trayObjects: serializableTrayObjects,
    habitatFeatures: serializeableHabitatFeatures,
  };
};

export const deserializeOutputState = (serializedOutputState: ISerializableLeafModelOutputState): ILeafModelOutputState => {
  const trayObjects = serializedOutputState.trayObjects.map(trayObj => {
    let baseObject: Animal | Leaf | undefined;
    baseObject = Animals.find(animal => animal.type === trayObj.type);
    if (!baseObject) {
      baseObject = Leaves.find(leaf => leaf.type === trayObj.type);
    }
    if (baseObject) {
      return {
        ...trayObj,
        image: baseObject.image,
        selectionPath: baseObject.selectionPath,
        width: baseObject.width,
        height: baseObject.height,
      };
    } else {
      return undefined;
    }
  }).filter(trayObj => trayObj !== undefined) as TrayObject[];
  const habitatFeatures = new Set(serializedOutputState.habitatFeatures) as Set<HabitatFeatureType>;

  return {
    ...serializedOutputState,
    trayObjects,
    habitatFeatures,
  };
};

export const serialize = (model: ModelState): SerializableModelState => {
  const clonedState = cloneDeep(model);

  const serializableContainers: IPartialContainerMap<ILeafModelInputState, ISerializableLeafModelOutputState> = {};
  for (const id of ContainerIds) serializableContainers[id] = null;

  Object.keys(clonedState.containers).forEach((key: ContainerId) => {
    const container: ContainerState | null = clonedState.containers[key];
    if (container) {
      serializableContainers[key] = {
        ...container,
        outputState: serializeOutputState(container.outputState)
      };
    }
  });

  return {
    ...clonedState,
    containers: serializableContainers as SerializableContainerMap,
    outputState: serializeOutputState(clonedState.outputState)
  };
};

export const deserialize = (serializableState: SerializableModelState): ModelState => {
  const containers: IContainerMap<ILeafModelInputState, ILeafModelOutputState> = initContainerMap();

  Object.keys(serializableState.containers).forEach((key: ContainerId) => {
    const container = serializableState.containers[key];
    if (container) {
      containers[key] = {
        ...container,
        outputState: deserializeOutputState(container.outputState)
      };
    }
  });

  return {
    ...serializableState,
    containers,
    outputState: deserializeOutputState(serializableState.outputState)
  };
};
