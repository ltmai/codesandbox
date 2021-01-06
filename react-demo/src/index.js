import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import Center from "./components/Center";
import ToDo from "./components/ToDo";
import createFancyButton from "./components/ForwardRef";
import changeConsoleLog from "./utils";
import ListLoader, { withStyle } from "./components/HOC";

import "./css/styles.css";

const rootElement = document.getElementById("root");

changeConsoleLog();

const AppWithStyle = withStyle(App);
const styleObj = { borderStyle: "dotted", padding: 20 };

ReactDOM.render(
  <React.StrictMode>
    <Center>
      <AppWithStyle startValue={15} withStyle={styleObj} />
      <hr />
    </Center>
    {createFancyButton("Click me first")}
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    {createFancyButton("Click me too")}
    <br />
    <br />
    <hr />
    <ListLoader />
    <hr />
    <Center>
      <ToDo />
    </Center>
  </React.StrictMode>,
  rootElement
);
