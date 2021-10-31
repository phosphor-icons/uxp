import "./react-shim";
import React from "react";
import ReactDOM from "react-dom";
import App from "./IconPicker.jsx";

let panel;

function create() {
  panel = document.createElement("div");
  return panel;
}

function renderApp() {
  ReactDOM.render(<App />, panel);
}

function show(event) {
  console.log(event);
  if (!panel) event.node.appendChild(create());
}

function update(selection) {
  console.log(selection);
  renderApp();
}

export const panels = {
  iconPicker: {
    show,
    update,
  },
};
