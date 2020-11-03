/* eslint-disable import/no-extraneous-dependencies */
import { ApiPromise, WsProvider } from '@polkadot/api';
import { typesBundleForPolkadot as acalaTypes } from '@acala-network/type-definitions';
import { setChain } from './chain';
import { ACALA_NETWORK, CLOVER_NETWORK } from '../../lib/constants/networks';
import { cloverTypes } from './core-clover/clover-types';
import { cloverRpc } from './core-clover/clover-rpc';

const connection = {
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

const connect = async network => {
  let api;
  const { networkFullUrl, value } = network;
  if (value === 'dotcustom') {
    disconnect();
  }
  if (networkFullUrl !== undefined && networkFullUrl !== null && networkFullUrl !== '') {
    disconnect();
    try {
      const provider = new WsProvider(networkFullUrl);
      if (value === ACALA_NETWORK.value) {
        const acaTypes = acalaTypes.spec.acala.types.find(t => t.minmax[0] >= 1500);
        api = await ApiPromise.create({
          provider,
          types: acaTypes.types,
        });
      } else if (value === CLOVER_NETWORK.value) {
        api = await ApiPromise.create({
          provider,
          types: cloverTypes,
          rpc: cloverRpc,
        });
      } else {
        api = await ApiPromise.create({ provider });
      }
      api.on('disconnected', () => {
        disconnect();
      });

      // set connection
      connection.provider = provider;
      connection.isConnected = provider.isConnected;
      connection.api = api;
      connection.currentNetwork = network;
      await setChain(api);
      return connection;
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log('Error in polkadot connection', err);
    }
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
