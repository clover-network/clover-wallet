/* eslint-disable import/no-extraneous-dependencies */
import { ApiPromise, WsProvider } from '@polkadot/api';
import { typesBundleForPolkadot as acalaTypes } from '@acala-network/type-definitions';
import { setChain } from './chain';
import { ACALA_NETWORK, CLOVER_NETWORK } from '../../lib/constants/networks';
import { cloverTypes } from './core-clover/clover-types';
import { cloverRpc } from './core-clover/clover-rpc';

const connection = {
  isError: false,
  isConnected: false,
  api: null,
  provider: null,
  currentNetwork: null,
};

const disconnect = () => {
  if (connection.isConnected) {
    try {
      connection.provider.disconnect();
      connection.isConnected = false;
      connection.provider = null;
      connection.api = null;
      connection.currentNetwork = null;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log('Could not disconnect polkadot while resetting');
    }
  }
};

const connect = network => {
  let apiPromise;
  const { networkFullUrl, value } = network;
  const error = new Error(`Error connecting to ${value} chain`);
  if (value === 'dotcustom') {
    disconnect();
  }
  if (networkFullUrl !== undefined && networkFullUrl !== null && networkFullUrl !== '') {
    return new Promise((resolve, reject) => {
      const provider = new WsProvider(networkFullUrl, false);
      provider
        .connect()
        .then(() => {
          provider.on('error', () => {
            provider.disconnect();
            reject(error);
          });
          provider.on('connected', () => {
            if (value === ACALA_NETWORK.value) {
              const acaTypes = acalaTypes.spec.acala.types.find(t => t.minmax[0] >= 1500);
              apiPromise = ApiPromise.create({
                provider,
                types: acaTypes.types,
              });
            } else if (value === CLOVER_NETWORK.value) {
              apiPromise = ApiPromise.create({
                provider,
                types: cloverTypes,
                rpc: cloverRpc,
              });
            } else {
              apiPromise = ApiPromise.create({ provider });
            }
            apiPromise
              .then(api => {
                disconnect();
                connection.provider = provider;
                connection.isConnected = api.isConnected;
                connection.api = api;
                connection.currentNetwork = network;
                setChain(api)
                  .then(() => resolve(connection))
                  .catch(() => {
                    disconnect();
                    reject(error);
                  });
              })
              .catch(() => {
                disconnect();
                reject(error);
              });
          });
        })
        .catch(() => {
          disconnect();
          reject(error);
        });
    });
  }
};

// call when network changes
export const connectToApi = async network => {
  const { networkFullUrl } = network;
  if (connection.isConnected) {
    if (connection.currentNetwork.networkFullUrl === networkFullUrl) {
      return connection;
    }
  }
  return connect(network);
};

export const getApi = () => connection.api;

export const isConnected = () => connection.isConnected;
