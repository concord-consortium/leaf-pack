import React from "react";
import ReactDOM from "react-dom";

import { IModelCurrentState, ModelStateChangeCallback } from "../hooks/use-model-state";

export type LogEventMethod = (name: string, options?: {data?: any, includeState?: boolean}) => void;
export type PCILogEventMethod = (name: string, data: any) => void;

export interface PCIApp {
  setState: (state: any) => void;
  getState: () => any;
}

export interface IRenderAppOptions<IModelInputState, IModelOutputState, IModelConfig> {
  App: React.FC<IAppProps<IModelInputState, IModelOutputState, IModelConfig>>;
  logEvent: PCILogEventMethod;
  modelConfig: IModelConfig
}

export type ExternalSetStateListenerCallback<IModelInputState, IModelOutputState> = (newState: IModelCurrentState<IModelInputState, IModelOutputState>) => void;

export interface IAppProps<IModelInputState, IModelOutputState, IModelConfig> {
  onStateChange: ModelStateChangeCallback<IModelInputState, IModelOutputState>;
  addExternalSetStateListener: (listener: ExternalSetStateListenerCallback<IModelInputState, IModelOutputState>) => void;
  removeExternalSetStateListener: (listener: ExternalSetStateListenerCallback<IModelInputState, IModelOutputState>) => void;
  logEvent: LogEventMethod;
  modelConfig: IModelConfig;
}

let externalSetStateListeners: ExternalSetStateListenerCallback<any, any>[] = [];

const addExternalSetStateListener = (listener: ExternalSetStateListenerCallback<any, any>) => {
  externalSetStateListeners.push(listener);
};
const removeExternalSetStateListener = (listener: ExternalSetStateListenerCallback<any, any>) => {
  externalSetStateListeners = externalSetStateListeners.filter(l => l !== listener);
};

let currentState = {};

const setState = (state: any) => {
  // update PCI with the state object
  currentState = state;
  externalSetStateListeners.forEach(listener => listener(state));
};

const getState = (): any => {
  return currentState || {};
};

export const renderApp = <IModelInputState, IModelOutputState, IModelConfig>(options: IRenderAppOptions<IModelInputState, IModelOutputState, IModelConfig>) => {
  const onStateChange: ModelStateChangeCallback<IModelInputState, IModelOutputState> = (state) => currentState = state;

  const logEventWithState: LogEventMethod = (name, logOptions) => {
    let data = logOptions?.data || {};
    if (logOptions?.includeState) {
      data = {...data, state: currentState};
    }

    // clone the data in case log system just saves the object directly and doesn't do the clone itself
    const clonedData = JSON.parse(JSON.stringify(data));

    options.logEvent(name, clonedData);
  };

  // TODO: some of these app props are likely not needed
  ReactDOM.render(
    <options.App
      onStateChange={onStateChange}
      addExternalSetStateListener={addExternalSetStateListener}
      removeExternalSetStateListener={removeExternalSetStateListener}
      logEvent={logEventWithState}
      modelConfig={options.modelConfig}
    />,
    document.getElementById("app")
  );

  const app: PCIApp = {
    setState,
    getState
  };

  return app;
};
