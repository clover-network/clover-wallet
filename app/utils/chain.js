import CLV from '../images/clover.svg';
import CLV_OFF from '../images/clover_off.svg';
import KSM from '../images/kusama.svg';
import KSM_OFF from '../images/kusama_off.svg';
import ACA from '../images/acala.svg';
import AVA_OFF from '../images/acala_off.svg';
import DOT from '../images/polkadot.svg';
import DOT_OFF from '../images/polkadot_off.svg';
import ALL from '../images/all.svg';
import ALL_OFF from '../images/all_off.svg';

export function getChainLogo(symbol, on = true) {
  if (symbol === 'CLV') {
    return on ? CLV : CLV_OFF;
  }
  if (symbol === 'KSM') {
    return on ? KSM : KSM_OFF;
  }
  if (symbol === 'ACA') {
    return on ? ACA : AVA_OFF;
  }
  if (symbol === 'DOT') {
    return on ? DOT : DOT_OFF;
  }
  if (symbol === 'ALL') {
    return on ? ALL : ALL_OFF;
  }
}
