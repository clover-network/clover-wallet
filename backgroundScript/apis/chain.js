import { SI, findSi } from '@polkadot/util/format/si';
import { defaults } from '@polkadot/util-crypto/address/defaults';
import { u32 as U32 } from '@polkadot/types';
import registry from './type-Registry';

const femtoUnit = findSi('f');
const units = SI.filter(x => x.power >= femtoUnit.power);
const DEFAULT_SS58 = new U32(registry, defaults.prefix);
const DEFAULT_DECIMALS = new U32(registry, 18);

const Chain = {
  units,
  baseUnit: units[0],
  tokenSymbol: '',
  ss58Format: 42,
  tokenDecimals: 18,
  metadata: undefined,
  api: undefined,
};

export const setChain = async api => {
  const { ss58Format, tokenDecimals, tokenSymbol } = await api.rpc.system.properties();
  const ss58 = ss58Format.unwrapOr(DEFAULT_SS58).toNumber();
  Chain.api = api;
  const decimals = tokenDecimals.unwrapOr(DEFAULT_DECIMALS)[0].toNumber();
  const unit = SI.filter(x => x.power >= -decimals);
  Chain.units = unit;
  // eslint-disable-next-line prefer-destructuring
  Chain.baseUnit = unit[0];
  Chain.tokenSymbol = tokenSymbol.unwrapOr('')[0].toString();
  Chain.tokenDecimals = decimals;
  if (ss58) {
    Chain.ss58Format = ss58;
  } else {
    Chain.ss58Format = 42;
  }
  Chain.metadata = Buffer.from(api.runtimeMetadata.asCallsOnly.toU8a()).toString('base64');
};

export const getUnits = () => Chain.units;

export const getBaseUnit = () => Chain.baseUnit;

export const getTokenSymbol = () => Chain.tokenSymbol;

export const getTokenDecimals = () => Chain.tokenDecimals;

export const getSs58Format = () => Chain.ss58Format;

export const getMetaCalls = () => Chain.metadata;

export const getApi = () => Chain.api;
