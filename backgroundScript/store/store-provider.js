import fn from "./configure-store";
const store = fn({});

export const getStore = () => store;

export const setStore = () => {
  throw new Error("Not Implemented yet !");
};
