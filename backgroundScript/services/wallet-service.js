import * as FusoWallet from '../apis/core-fuso/wallet';
import * as KsmWallet from '../apis/core-kusama/ksm-wallet';
import * as AcaWallet from '../apis/core-acala/acala-wallet';
import * as DotWallet from '../apis/core-polkadot/dot-wallet';
import * as CustomWallet from '../apis/core-custom/custom-wallet';

import { getCurrentNetwork } from './network-service';
import {
  KUSAMA_NETWORK,
  FUSOTAO_NETWORK,
  ACALA_NETWORK,
  POLKADOT_NETWORK,
} from '../../lib/constants/networks';

export const getWallet = () => {
  const currentNetwork = getCurrentNetwork();
  switch (currentNetwork.value) {
    case KUSAMA_NETWORK.value:
      return KsmWallet;
    case FUSOTAO_NETWORK.value:
      return FusoWallet;
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
    symbol: FUSOTAO_NETWORK.unit,
    wallet: FusoWallet,
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
    case FUSOTAO_NETWORK.text:
      return FusoWallet;
    case ACALA_NETWORK.text:
      return AcaWallet;
    case POLKADOT_NETWORK.text:
      return DotWallet;
    default:
      return CustomWallet;
  }
};
