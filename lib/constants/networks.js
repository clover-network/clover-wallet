export const CLOVER_NETWORK = {
  text: 'Clover',
  value: 'Clover',
  networkURL: 'wss://api.ownstack.cn/',
  networkPort: '',
  networkFullUrl: 'wss://api.ownstack.cn/',
  transactionUrl: 'https://apps.ownstack.cn/#/explorer',
  unit: 'CLV',
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
  text: 'Polkadot',
  value: 'Polkadot',
  networkURL: 'wss://cc1-1.polkadot.network/',
  networkPort: '',
  networkFullUrl: 'wss://cc1-1.polkadot.network/',
  unit: 'DOT',
};

export const ACALA_NETWORK = {
  text: 'Acala',
  value: 'Acala',
  networkURL: 'wss://rococo-1.acala.laminar.one/',
  networkPort: '',
  networkFullUrl: 'wss://rococo-1.acala.laminar.one/',
  unit: 'ACA',
};

export const LOCALHOST_NETWORK = {
  text: 'Localhost',
  value: 'localhost',
  networkURL: 'ws://127.0.0.1',
  networkPort: '9944',
  networkFullUrl: 'ws://127.0.0.1:9944',
  unit: 'DOT',
};

export const DOT_NETWORK_LIST = [CLOVER_NETWORK, KUSAMA_NETWORK, ACALA_NETWORK, POLKADOT_NETWORK];

export const DEV_DOT_NETWORK_LIST = [
  CLOVER_NETWORK,
  KUSAMA_NETWORK,
  ACALA_NETWORK,
  POLKADOT_NETWORK,
  LOCALHOST_NETWORK,
];

export const DEFAULT_NETWORK = CLOVER_NETWORK;
// Custom Network Validation

export const CUSTOM = 'custom';
export const HTTPS = 'https';
export const HTTP = 'http';
export const LOCALHOST = 'localhost';
export const WS = 'ws';
export const WSS = 'wss';
export const DEFAULT_NON_SSL_PORT = '9944';
export const DEFAULT_SSL_PORT = '443';
