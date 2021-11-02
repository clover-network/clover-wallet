import React from "react";
import ReactDOM from "react-dom";
import Root from "../../app/containers/Root";
import { updateApplicationState } from "../../app/services/watcher-service";

const { state } = {};
const initialState = JSON.parse(state || "{}");

const createStore = require("../../app/store/configure-store").default;

const store = createStore(initialState);
ReactDOM.render(<Root store={store} />, document.querySelector("#root"));

updateApplicationState(store);

chrome.runtime.getPlatformInfo((info) => {
  if (info.os === "mac") {
    const fontFaceSheet = new CSSStyleSheet();
    fontFaceSheet.insertRule(`
      @keyframes redraw {
        0% {
        opacity: 1;
        }
        100% {
        opacity: .99;
        }
      }
    `);
    fontFaceSheet.insertRule(`
      html {
        animation: redraw 1s linear infinite;
      }
    `);
    document.adoptedStyleSheets = [
      ...document.adoptedStyleSheets,
      fontFaceSheet,
    ];
  }
});
