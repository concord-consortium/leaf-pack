import { App} from "./components/app";
import { renderApp } from "./components/render-app";
import { IModelInputState, IModelOutputState, IModelConfig } from "./leaf-model-types";

import "./index.scss";

const app = renderApp<IModelInputState, IModelOutputState, IModelConfig>({App, logEvent, modelConfig: {}});

function logEvent(args: any) {
  // do nothing
}
