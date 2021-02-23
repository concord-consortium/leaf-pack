import { App} from "./components/app";
import { renderApp } from "./components/render-app";
import { IModelCurrentState } from "./hooks/use-model-state";
import { IModelInputState, IModelOutputState, IModelConfig } from "./leaf-model-types";
import { deserialize, SerializableModelState, serialize } from "./utils/serialize-utils";
import { getInitInteractiveMessage, setInteractiveState } from "@concord-consortium/lara-interactive-api";

import "./index.scss";

const app = renderApp<IModelInputState, IModelOutputState, IModelConfig>({App, logEvent, modelConfig: {}, onStateChange: handleStateChange});

function logEvent(args: any) {
  // do nothing
}

function handleStateChange(newState: IModelCurrentState<IModelInputState, IModelOutputState>) {
  setInteractiveState(serialize(newState));
}

getInitInteractiveMessage<SerializableModelState>().then(initMsg => {
  if (initMsg?.mode === "runtime" && initMsg.interactiveState) {
    app.setState(deserialize(initMsg.interactiveState));
  }
});
