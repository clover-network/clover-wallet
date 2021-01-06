import { injectExtension } from '@polkadot/extension-inject';
import { EventEmitter } from 'events';
import { resolveRequest } from './messaging/in-page';
import * as RequestTypes from '../lib/constants/request-types';
import AppConfig from '../lib/constants/config';

const metadata = {
  url: window.location.host,
};
const getAccounts = async () => {
  const result = await resolveRequest(RequestTypes.GET_ACCOUNTS, {}, metadata);
  return result;
};

const signTransaction = async payload => {
  const result = await resolveRequest(RequestTypes.SEND, payload, metadata);
  return result;
};

// eslint-disable-next-line no-unused-vars
const signMessage = async payload => {
  const result = await resolveRequest(RequestTypes.SIGN_MESSAGE, payload, metadata);
  return result;
};

const enable = async origin => {
  const metadata = {
    origin,
    url: window.location.host,
  };
  await resolveRequest(RequestTypes.ENABLE, { origin }, metadata);
  return {
    accounts: {
      get: async () => {
        const res = await getAccounts();
        return res;
      },
    },
    name: AppConfig.name,
    signer: {
      signPayload: async payload => {
        const res = await signTransaction(payload);
        return res;
      },
      signRaw: async payload => {
        const res = await signMessage(payload);
        return res;
      },
    },
    sign: {
      signMessage: async payload => {
        const res = await signMessage(payload);
        return res;
      },
    },
    version: AppConfig.version,
  };
};

injectExtension(enable, {
  name: AppConfig.name,
  version: AppConfig.version,
});
class CloverWalletProvider extends EventEmitter {
  constructor() {
    super();
    this.request = this.request.bind(this);
    this.send = this.send.bind(this);
    this.selectedAddress = '0xe6206c7f064c7d77c6d8e3ed8601c9aa435419ce';
    this.networkVersion = '1337';
    this.chainId = '0x539';
    this.setMaxListeners(100);
  }

  async request(args) {
    // console.log('request args:', args);
    const result = await resolveRequest(RequestTypes.WEB3_REQUEST, args, metadata);
    return result;
  }

  async send(methodOrPayload, callbackOrArgs) {
    if (typeof methodOrPayload === 'object' && typeof callbackOrArgs === 'function') {
      try {
        const result = await resolveRequest(RequestTypes.WEB3_REQUEST, methodOrPayload, metadata);
        callbackOrArgs(undefined, result);
      } catch (e) {
        callbackOrArgs(e, undefined);
      }
    } else {
      return this._sendSync(methodOrPayload);
    }
  }

  _sendSync(payload) {
    let result;
    switch (payload.method) {
      case 'eth_accounts':
        result = this.selectedAddress ? [this.selectedAddress] : [];
        break;

      case 'eth_coinbase':
        result = this.selectedAddress || null;
        break;

      case 'eth_uninstallFilter':
        resolveRequest(RequestTypes.WEB3_REQUEST, payload, metadata);
        result = true;
        break;

      case 'net_version':
        result = this.networkVersion || null;
        break;

      default:
        throw new Error('unsupported method');
    }

    return {
      id: payload.id,
      jsonrpc: payload.jsonrpc,
      result,
    };
  }
}
window.ethereum = new Proxy(new CloverWalletProvider(), {
  // some common libraries, e.g. web3@1.x, mess with our API
  deleteProperty: () => true,
});
