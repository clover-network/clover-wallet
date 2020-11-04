import CLV from '../images/clover.svg';
import CETH from '../images/ceth.svg';
import CUSDT from '../images/cusdt.svg';

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
}
