import React from "react";
import ReactDOM from "react-dom/client";

import { App } from "./App";

const IS_PRODUCTION = import.meta.env.PROD;

const ROOT = ReactDOM.createRoot(document.getElementById("root")!);

if (IS_PRODUCTION) {
  ROOT.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  ROOT.render(<App />);
}
