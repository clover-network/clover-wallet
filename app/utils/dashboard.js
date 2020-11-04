import CLV from '../images/clover.svg';
import CETH from '../images/ceth.svg';
import CUSDT from '../images/cusdt.svg';
import KSM from '../images/kusama.svg';
import DOT from '../images/polkadot.svg';

export function getCurrencyIcon(type) {
  if (type === 'CLV') {
    return CLV;
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
}
