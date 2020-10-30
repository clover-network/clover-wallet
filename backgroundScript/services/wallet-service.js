import * as ClvWallet from '../apis/core-clover/clover-wallet';
import * as KsmWallet from '../apis/core-kusama/ksm-wallet';
import * as AcaWallet from '../apis/core-acala/acala-wallet';
import * as DotWallet from '../apis/core-polkadot/dot-wallet';
import * as CustomWallet from '../apis/core-custom/custom-wallet';

import { getCurrentNetwork } from './network-service';
import {
  KUSAMA_NETWORK,
  CLOVER_NETWORK,
  ACALA_NETWORK,
  POLKADOT_NETWORK,
} from '../../lib/constants/networks';

export const getWallet = () => {
  const currentNetwork = getCurrentNetwork();
  switch (currentNetwork.value) {
    case KUSAMA_NETWORK.value:
      return KsmWallet;
    case CLOVER_NETWORK.value:
      return ClvWallet;
    case ACALA_NETWORK.value:
      return AcaWallet;
    case POLKADOT_NETWORK.value:
      return DotWallet;
    default:
      return CustomWallet;
  }
};

export const getWallets = () => [
  {
    symbol: KUSAMA_NETWORK.unit,
    wallet: KsmWallet,
  },
  {
    symbol: CLOVER_NETWORK.unit,
    wallet: ClvWallet,
  },
  {
    symbol: ACALA_NETWORK.unit,
    wallet: AcaWallet,
  },
  {
    symbol: POLKADOT_NETWORK.unit,
    wallet: DotWallet,
  },
];

export const getWalletByChain = chain => {
  switch (chain) {
    case KUSAMA_NETWORK.text:
      return KsmWallet;
    case CLOVER_NETWORK.text:
      return ClvWallet;
    case ACALA_NETWORK.text:
      return AcaWallet;
    case POLKADOT_NETWORK.text:
      return DotWallet;
    default:
      return CustomWallet;
  }
};
