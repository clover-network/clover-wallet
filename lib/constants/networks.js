export const FUSOTAO_NETWORK = {
  text: "FUSOTAO",
  value: "FUSOTAO",
  networkURL: "wss://whisky.fusotao.org",
  networkPort: "",
  networkFullUrl: "wss://whisky.fusotao.org",
  transactionUrl: "https://explorer-vodka.fusotao.org/#/",
  unit: "TAO",
};

export const KUSAMA_NETWORK = {
  text: 'Kusama',
  value: 'Kusama',
  networkURL: 'wss://kusama-rpc.polkadot.io/',
  networkPort: '',
  networkFullUrl: 'wss://kusama-rpc.polkadot.io/',
  transactionUrl: 'https://kusama.subscan.io/extrinsic',
  unit: 'KSM',
};

export const POLKADOT_NETWORK = {
  text: "Polkadot",
  value: "Polkadot",
  networkURL: "wss://cc1-1.polkadot.network/",
  networkPort: "",
  networkFullUrl: "wss://cc1-1.polkadot.network/",
  unit: "DOT",
};

export const ACALA_NETWORK = {
  text: 'Acala',
  value: 'Acala',
  networkURL: 'wss://node-6714447553777491968.jm.onfinality.io/ws/',
  networkPort: '',
  networkFullUrl: 'wss://node-6714447553777491968.jm.onfinality.io/ws/',
  unit: 'ACA',
};

export const LOCALHOST_NETWORK = {
  text: "Localhost",
  value: "localhost",
  networkURL: "ws://127.0.0.1",
  networkPort: "9944",
  networkFullUrl: "ws://127.0.0.1:9944",
  unit: "DOT",
};

export const DOT_NETWORK_LIST = [
  FUSOTAO_NETWORK,
  //  KUSAMA_NETWORK,
  //   ACALA_NETWORK,
  // POLKADOT_NETWORK,
];

export const DEV_DOT_NETWORK_LIST = [
  FUSOTAO_NETWORK,
  // KUSAMA_NETWORK,
  // ACALA_NETWORK,
  // POLKADOT_NETWORK,
  // LOCALHOST_NETWORK,
];

export const DEFAULT_NETWORK = FUSOTAO_NETWORK;
// Custom Network Validation

export const CUSTOM = "custom";
export const HTTPS = "https";
export const HTTP = "http";
export const LOCALHOST = "localhost";
export const WS = "ws";
export const WSS = "wss";
export const DEFAULT_NON_SSL_PORT = "9944";
export const DEFAULT_SSL_PORT = "443";
