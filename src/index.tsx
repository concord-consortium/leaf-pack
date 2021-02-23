import { App} from "./components/app";
import { renderApp } from "./components/render-app";
import { IModelCurrentState } from "./hooks/use-model-state";
import { IModelInputState, IModelOutputState, IModelConfig } from "./leaf-model-types";

import "./index.scss";

const app = renderApp<IModelInputState, IModelOutputState, IModelConfig>({App, logEvent, modelConfig: {}, onStateChange: handleStateChange});

function handleStateChange(newState: IModelCurrentState<IModelInputState, IModelOutputState>) {
  // do nothing yet
}

function logEvent(args: any) {
  // do nothing
}
