import "./react-shim";
import React from "react";
import ReactDOM from "react-dom";
import App from "./IconPicker.jsx";

let panel;

function create() {
  panel = document.createElement("div");
  return panel;
}

function renderApp(selection) {
  ReactDOM.render(<App selection={selection} />, panel);
}

function show(event) {
  console.log(event);
  if (!panel) event.node.appendChild(create());
}

function update(selection) {
  renderApp(selection);
}

export const panels = {
  iconPicker: {
    show,
    update,
  },
};
