const extension = require("extensionizer");

const WINDOW_HEIGHT = 625;
const WINDOW_WIDTH = 360;

export function create() {
  const { create } = extension.windows;
  return new Promise((resolve, reject) => {
    try {
      create(
        {
          url: "window.html",
          type: "popup",
          height: WINDOW_HEIGHT,
          width: WINDOW_WIDTH,
          top: 150,
          left: 150,
        },
        (details) => {
          resolve(details);
        }
      );
    } catch (e) {
      reject(e);
    }
  });
}

export function remove(id) {
  const { remove } = extension.windows;
  return new Promise((resolve, reject) => {
    try {
      remove(id, () => {
        resolve(1);
      });
    } catch (e) {
      reject(e);
    }
  });
}

export function get(id) {
  const { get } = extension.windows;
  return new Promise((resolve, reject) => {
    try {
      get(id, (res) => {
        resolve(res);
      });
    } catch (e) {
      reject(e);
    }
  });
}

export function getAll() {
  const { getAll } = extension.windows;
  return new Promise((resolve, reject) => {
    try {
      getAll({}, (windows) => {
        resolve(windows);
      });
    } catch (e) {
      reject(e);
    }
  });
}

export function update(id) {
  const { update } = extension.windows;
  return new Promise((resolve, reject) => {
    try {
      update(id, { focused: true }, (result) => {
        resolve(result);
      });
    } catch (e) {
      reject(e);
    }
  });
}
