const extension = require("extensionizer");

require("./messaging/content");

function injectScript(filePath) {
  const script = document.createElement("script");
  script.setAttribute("type", "text/javascript");
  script.setAttribute("src", filePath);
  document.documentElement.appendChild(script);
}
const url = extension.extension.getURL("inPageScript.js");
injectScript(url);
