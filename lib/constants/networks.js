export const WESTEND_NETWORK = {
  text: 'Westend',
  value: 'Westend',
  networkURL: 'wss://westend-rpc.polkadot.io',
  networkPort: '',
  networkFullUrl: 'wss://westend-rpc.polkadot.io',
  transactionUrl: 'https://westend.subscan.io/extrinsic',
  //faucetUrl: 'https://faucets.blockxlabs.com/',
  //faucetText: 'Universal Faucet (at BlockX Labs).',
  unit: 'WND',
};

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

export const EDGEWARE_NETWORK = {
  text: 'Edgeware',
  value: 'Edgeware',
  networkURL: 'wss://mainnet1.edgewa.re/',
  networkPort: '',
  networkFullUrl: 'wss://mainnet1.edgewa.re/',
  transactionUrl: 'https://edgeware.subscan.io/extrinsic',
  unit: 'EDG',
};

export const BERESHEET_NETWORK = {
  text: 'Beresheet',
  value: 'Beresheet',
  networkURL: 'wss://beresheet1.edgewa.re/',
  networkPort: '',
  networkFullUrl: 'wss://beresheet1.edgewa.re/',
  //transactionUrl: 'https://beresheet.subscan.io/extrinsic',
  unit: 'tEDG',
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
  networkURL: 'wss://node-6684611762228215808.jm.onfinality.io/ws/',
  networkPort: '',
  networkFullUrl: 'wss://node-6684611762228215808.jm.onfinality.io/ws/',
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
