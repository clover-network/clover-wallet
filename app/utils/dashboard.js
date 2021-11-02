import TAO from '../images/tao.svg';
import CETH from '../images/ceth.svg';
import CUSDT from '../images/cusdt.svg';
import KSM from '../images/kusama.svg';
import DOT from '../images/polkadot.svg';
import ACA from '../images/acala.svg';

export function getCurrencyIcon(type) {
  if (type === 'TAO') {
    return TAO;
  }
  if (type === 'CUSDT') {
    return CUSDT;
  }
  if (type === 'CETH') {
    return CETH;
  }
  if (type === 'KSM') {
    return KSM;
  }
  if (type === 'DOT') {
    return DOT;
  }
  if (type === 'ACA') {
    return ACA;
  }
}
