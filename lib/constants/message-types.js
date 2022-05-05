export const BG_APP_SET_ONBOARDED = 'APP/ONBOARDED';
export const BG_APP_IS_ONBOARDED = 'APP/IS_ONBOARDED';
export const BG_APP_IS_READY = 'APP/IS_READY';
export const BG_SET_HASH_KEY = 'APP/SET_HASH_KEY';

export const BG_ACCOUNTS_CREATE_ACCOUNT = 'ACCOUNTS/CREATE_ACCOUNT';
export const BG_ACCOUNTS_CREATE_SEED_WORDS = 'ACCOUNTS/CREATE_SEED_WORDS';
export const BG_ACCOUNTS_UPDATE_ALIAS = 'ACCOUNTS/UPDATE_ALIAS';
export const BG_CURRENT_ACCOUNTS_UPDATE = 'ACCOUNTS/UPDATE_CURRENT_ACCOUNT';
export const BG_ACCOUNTS_REMOVE_ACCOUNT = 'ACCOUNTS/REMOVE_ACCOUNT';
export const BG_ACCOUNTS_CURRENT_ACCOUNT = 'ACCOUNT/CURRENT';
export const BG_ACCOUNTS_LIST = 'ACCOUNTS/LIST';
export const BG_ACCOUNT_BALANCE = 'ACCOUNT/BALANCE';

export const BG_NETWORK_CURRENT = 'NETWORK/CURRENT';
export const BG_NETWORK_IS_CONNECTED = 'NETWORK/IS_CONNECTED';
export const BG_NETWORK_UPDATE = 'NETWORK/UPDATE';
export const BG_NETWORK_GET_UNITS = 'NETWORK/GET_UNITS';
export const BG_NETWORK_GET_DEVELOPERMODE = 'NETWORK/GET_DEVELOPERMODE';
export const BG_NETWORK_UPDATE_DEVELOPERMODE = 'NETWORK/UPDATE_DEVELOPERMODE';

// Address Book
export const BG_ADDRESS_BOOK_ADD = 'ADDRESS_BOOK/ADD';
export const BG_ADDRESS_BOOK_LIST = 'ADDRESS_BOOK/LIST';
export const BG_ADDRESS_BOOK_REMOVE = 'ADDRESS_BOOK/REMOVE';
export const BG_ADDRESS_BOOK_IS_NEW_ADDRESS = 'ADDRESS_BOOK/IS_NEW_ADDRESS';

// Transaction
export const BG_TXN_FEE = 'TXN/GET_FEES';
export const BG_TXN_CONFIRM = 'TXN/CONFIRM';
export const BG_TXN_SUBMIT = 'TXN/SUBMIT';
export const BG_TXN_GET = 'TXN/GET';
export const BG_TXN_LIST = 'TXNS/LIST';

// Validation
export const BG_ACCOUNT_IS_VALID_ADDRESS = 'ACCOUNT/ADDRESS';

// DApp
export const BG_DAPP_AUTHORIZE = 'DAPP/BG_DAPP_AUTHORIZE';
export const BG_GET_DAPP_REQUESTS = 'DAPP/BG_GET_DAPP_REQUESTS';
export const BG_GET_DAPP_ACCOUNTS_OPTIONS = 'DAPP/GET_ACCOUNT_OPTIONS';
export const BG_DAPP_UPDATE_WHITELIST = 'DAPP/UPDATE_WHITELIST';
export const BG_DAPP_TXN_VALIDATE = 'DAPP/TXN_VALIDATE';
export const BG_DAPP_TXN_SUBMIT = 'DAPP/TXN_SUBMIT';
export const BG_DAPP_CANCEL_REQUEST = 'DAPP/CANCEL_REQUEST';
export const BG_DAPP_GET_ACCOUUNTS = 'DAPP/GET_ACCOUNTS';
export const BG_DAPP_SIGN_MESSAGE = 'DAPP/SIGN_MESSAGE';
export const BG_DAPP_GET_SIGN_MESSAGE = 'DAPP/GET_SIGN_MESSAGE';
export const BG_DAPP_CHANGE_ACCOUNTS = 'DAPP/CHANGE_ACCOUNTS';

// NODE
export const BG_NODE_ADD = 'NODE/ADD';
export const BG_NODE_LIST = 'NODE/LIST';
export const BG_SET_NODE_LIST = 'NODE/SET_LIST';

//Web3
export const WEB3_REQUEST = 'WEB3/REQUEST';
export const WEB3_CANCEL_REQUEST = 'WEB3/CANCEL_REQUEST';

export const SAFE_METHODS = [
  'eth_blockNumber',
  'eth_call',
  'eth_chainId',
  'eth_coinbase',
  'eth_decrypt',
  'eth_estimateGas',
  'eth_gasPrice',
  'eth_getBalance',
  'eth_getBlockByHash',
  'eth_getBlockByNumber',
  'eth_getBlockTransactionCountByHash',
  'eth_getBlockTransactionCountByNumber',
  'eth_getCode',
  'eth_getEncryptionPublicKey',
  'eth_getFilterChanges',
  'eth_getFilterLogs',
  'eth_getLogs',
  'eth_getProof',
  'eth_getStorageAt',
  'eth_getTransactionByBlockHashAndIndex',
  'eth_getTransactionByBlockNumberAndIndex',
  'eth_getTransactionByHash',
  'eth_getTransactionCount',
  'eth_getTransactionReceipt',
  'eth_getUncleByBlockHashAndIndex',
  'eth_getUncleByBlockNumberAndIndex',
  'eth_getUncleCountByBlockHash',
  'eth_getUncleCountByBlockNumber',
  'eth_getWork',
  'eth_hashrate',
  'eth_mining',
  'eth_newBlockFilter',
  'eth_newFilter',
  'eth_newPendingTransactionFilter',
  'eth_protocolVersion',
  'eth_sendRawTransaction',
  'eth_sendTransaction',
  'eth_sign',
  'eth_signTypedData',
  'eth_signTypedData_v1',
  'eth_signTypedData_v3',
  'eth_signTypedData_v4',
  'eth_submitHashrate',
  'eth_submitWork',
  'eth_syncing',
  'eth_uninstallFilter',
  'metamask_getProviderState',
  'metamask_watchAsset',
  'net_listening',
  'net_peerCount',
  'net_version',
  'personal_ecRecover',
  'personal_sign',
  'wallet_watchAsset',
  'web3_clientVersion',
  'web3_sha3',
];
