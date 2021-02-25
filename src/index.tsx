import { App} from "./components/app";
import { renderApp } from "./components/render-app";
import { IModelCurrentState } from "./hooks/use-model-state";
import { ILeafModelInputState, ILeafModelOutputState, ILeafModelConfig } from "./leaf-model-types";
import { deserialize, SerializableModelState, serialize } from "./utils/serialize-utils";
import { getInitInteractiveMessage, setInteractiveState, setSupportedFeatures } from "@concord-consortium/lara-interactive-api";

import "ts-polyfill";
import "./index.scss";

// set aspect ratio
setSupportedFeatures({
  aspectRatio: 1.553        // 882 x 568px
});

const app = renderApp<ILeafModelInputState, ILeafModelOutputState, ILeafModelConfig>({App, logEvent, modelConfig: {}, onStateChange: handleStateChange});

function logEvent(args: any) {
  // do nothing
}

function handleStateChange(newState: IModelCurrentState<ILeafModelInputState, ILeafModelOutputState>) {
  setInteractiveState(serialize(newState));
}

getInitInteractiveMessage<SerializableModelState>().then(initMsg => {
  if (initMsg && (initMsg.mode === "runtime" || initMsg.mode === "report") && initMsg.interactiveState) {
    // userState is supposed to be SerializableModelState, but "report" mode has a bug where it is passed in as a string
    const userState = typeof initMsg.interactiveState === "string" ?
      JSON.parse(initMsg.interactiveState) :
      initMsg.interactiveState;
    app.setState(deserialize(userState));
  }
});
