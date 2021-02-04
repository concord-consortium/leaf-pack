import React from "react";
import ReactDOM from "react-dom";
import { App } from "./components/app";

import "./index.scss";

ReactDOM.render(
  <App
    onStateChange={()=>{ /* no-op */}}
    addExternalSetStateListener={()=>{ /* no-op */}}
    removeExternalSetStateListener={()=>{ /* no-op */}}
    logEvent={()=>{ /* no-op */}}
    modelConfig={""}
  />,
  document.getElementById("app")
);
