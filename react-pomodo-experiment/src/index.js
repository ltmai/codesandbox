import React from "react";
import ReactDOM from "react-dom";
import changeConsoleLog from "./utils";
import Center from "./components/Center";
import Podomo from "./components/Pomodo";

const rootElement = document.getElementById("root");

changeConsoleLog();

ReactDOM.render(
  <React.StrictMode>
    <Center>
      <Podomo />
    </Center>
  </React.StrictMode>,
  rootElement
);
