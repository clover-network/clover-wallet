import TAO from "../images/tao.svg";
import TAO_OFF from "../images/tao_off.svg";
import TAO_CARD from "../images/tao_card.svg";
import KSM from "../images/kusama.svg";
import KSM_OFF from "../images/kusama_off.svg";
import KSM_CARD from "../images/kusama_card.svg";
import ACA from "../images/acala.svg";
import AVA_OFF from "../images/acala_off.svg";
import ACA_CARD from "../images/acala_card.svg";
import DOT from "../images/polkadot.svg";
import DOT_OFF from "../images/polkadot_off.svg";
import DOT_CARD from "../images/polkadot_card.svg";
import ALL from "../images/all.svg";
import ALL_OFF from "../images/all_off.svg";

export function getChainLogo(symbol, on = true) {
  if (symbol === "TAO") {
    return on ? TAO : TAO_OFF;
  }
  if (symbol === "KSM") {
    return on ? KSM : KSM_OFF;
  }
  if (symbol === "ACA") {
    return on ? ACA : AVA_OFF;
  }
  if (symbol === "DOT") {
    return on ? DOT : DOT_OFF;
  }
  if (symbol === "ALL") {
    return on ? ALL : ALL_OFF;
  }
}

export function getChainCardStyle(symbol) {
  if (symbol === "TAO") {
    return {
      background: "linear-gradient(94.54deg, #FF8212 0%, #ED4454 100%)",
      img: TAO_CARD,
    };
  }
  if (symbol === "KSM") {
    return {
      background: "#343535",
      img: KSM_CARD,
    };
  }
  if (symbol === "ACA") {
    return {
      background: "linear-gradient(270deg, #FF9373 10.8%, #E41A72 71.6%)",
      img: ACA_CARD,
    };
  }
  if (symbol === "DOT") {
    return {
      background: "#E6007A",
      img: DOT_CARD,
    };
  }
}
