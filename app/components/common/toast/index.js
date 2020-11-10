import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons/faCheckCircle';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons/faInfoCircle';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons/faExclamationTriangle';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons/faExclamationCircle';
import FontRegular from '../fonts/font-regular';
import './styles.css';
import SuccessfulIcon from '../../../images/successful_icon.svg';
import AddAddressIcon from '../../../images/add_address_icon.svg';

const success = msg => (
  <div className="toast-message-container">
    <div className="toast-message-icon">
      <FontAwesomeIcon icon={faCheckCircle} style={{ color: '#FFFFFF', fontSize: '19px' }} />
    </div>
    <FontRegular
      className="toast-message-message"
      style={{ fontSize: '14px', color: '#FFFFFF' }}
      text={msg}
    />
  </div>
);

const info = (msg, isCustom) => {
  if (isCustom) {
    return (
      <div className="toast-message-custom-container">
        <div className="toast-message-custom-message">{msg}</div>
      </div>
    );
  }
  return (
    <div className="toast-message-container">
      <div className="toast-message-icon">
        <FontAwesomeIcon icon={faInfoCircle} style={{ color: '#FFFFFF', fontSize: '19px' }} />
      </div>
      <FontRegular
        className="toast-message-message"
        style={{ fontSize: '14px', color: '#FFFFFF' }}
        text={msg}
      />
    </div>
  );
};

const warning = msg => (
  <div className="toast-message-container">
    <div className="toast-message-icon">
      <FontAwesomeIcon
        icon={faExclamationTriangle}
        style={{ color: '#FFFFFF', fontSize: '19px' }}
      />
    </div>
    <FontRegular
      className="toast-message-message"
      style={{ fontSize: '14px', color: '#FFFFFF' }}
      text={msg}
    />
  </div>
);

const error = msg => (
  <div className="toast-message-container">
    <div className="toast-message-icon">
      <FontAwesomeIcon icon={faExclamationCircle} style={{ color: '#FFFFFF', fontSize: '19px' }} />
    </div>
    <FontRegular
      className="toast-message-message"
      style={{ fontSize: '14px', color: '#FFFFFF' }}
      text={msg}
    />
  </div>
);

const addAddress = (msg, onClick) => (
  // <div>
  //   <div>{info(msg)}</div>
  //   <div className="toast-message-add-to-address-button">
  //     <ButtonLG color="primary" onClick={() => onClick()}>
  //       Add to Address Book
  //     </ButtonLG>
  //   </div>
  // </div>
  <div className="toast-message-transfer-success-container">
    <div className="toast-message-add-to-address-status">
      <img width="24" height="24" src={SuccessfulIcon} alt="" />
      <span>Successful</span>
    </div>
    <div className="toast-message-add-to-address-button" onClick={() => onClick()}>
      <img width="12" height="12" src={AddAddressIcon} alt="" />
      <span>ADD ADDRESS</span>
    </div>
  </div>
);
export {
  success, info, warning, error, addAddress
};
