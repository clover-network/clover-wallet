import TAO from '../images/tao.svg';
import CETH from '../images/ceth.svg';
import CUSDT from '../images/cusdt.svg';
import KSM from '../images/kusama.svg';
import DOT from '../images/polkadot.svg';
import ACA from '../images/acala.svg';

export function getCurrencyIcon(type) {
  if (type === 'TAO') {
    return `https://www.fusotao.org/share/${type.toLowerCase()}.svg`;
  }
  else if (type === 'CUSDT') {
    return CUSDT;
  }
  else if (type === 'CETH') {
    return CETH;
  }
  else if (type === 'KSM') {
    return KSM;
  }
  else if (type === 'DOT') {
    return DOT;
  }
  else if (type === 'ACA') {
    return ACA;
  }
  else{
    return `https://www.fusotao.org/share/${type.toLowerCase()}.svg`
  }
}
