const KUSAMA_CHAIN = {
  name: 'Kusama',
  genesisHash: '0xb0a8d493285c2df73290dfb7e61f870f17b41801197a149ca93654499ea3dafe',
  icon: 'polkadot',
  specVersion: 1056,
  ss58Format: 2,
  tokenDecimals: 12,
  tokenSymbol: 'KSM',
  types: {
    Keys: 'SessionKeys5',
  },
};

const CLOVER_CHAIN = {
  name: 'Clover',
  genesisHash: '0xc82d53dc522d43bcac4e16a7b0f983d700c0fc45732e379bb1273942fe8bde2c',
  icon: 'polkadot',
  specVersion: 1,
  ss58Format: 42,
  tokenDecimals: 12,
  tokenSymbol: 'CLV',
  types: {},
};

const ACALA_CHAIN = {
  name: 'Acala',
  genesisHash: '0xc963328a9ce0911b4e6531c60aafda597b05dc4e25bf10d71e9591a0313f5388',
  icon: 'polkadot',
  specVersion: 1056,
  ss58Format: 42,
  tokenDecimals: 18,
  tokenSymbol: 'ACA',
  types: {},
};

const POLKADOT_CHAIN = {
  name: 'Polkadot',
  genesisHash: '0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3',
  icon: 'polkadot',
  specVersion: 31,
  ss58Format: 7,
  tokenSymbol: 'DOT',
  tokenDecimals: 10,
};

export const CHAIN = [KUSAMA_CHAIN, CLOVER_CHAIN, ACALA_CHAIN, POLKADOT_CHAIN];
export const findChain = genesisHash => {
  const selectedChain = CHAIN.find(x => x.genesisHash === genesisHash);
  if (selectedChain) {
    return selectedChain;
  }
  return CLOVER_CHAIN;
};

export const findChainByName = name => {
  const selectedChain = CHAIN.find(x => x.name === name);
  return selectedChain;
};
