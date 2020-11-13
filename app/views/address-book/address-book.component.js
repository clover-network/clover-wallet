import React, { Component } from 'react';
import * as NavConstants from '../../constants/navigation';
import { copyAccountMessage } from '../../../lib/services/static-message-factory-service';
import AddressList from '../../components/address-book/address-list';
import EmptyDashboard from '../../components/empty-dashboard';
import ButtonMD from '../../components/common/buttons/button-md';
import DraggableDialog from '../../components/common/confirm-dialog';
import { ACCOUNT_MANAGEMENT_OPTIONS, ADD_ADDRESS, REMOVE } from '../../constants/options';
import { findChainByName } from '../../../lib/constants/chain';
import './styles.css';
import HeaderBack from '../../components/header-back';
import { CREATE_ADDRESS_BOOK_PAGE } from '../../constants/navigation';

export default class AddressBook extends Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
    this.state = {
      isOpen: false,
      isMoreVertIconVisible: true,
      headerText: 'SETTING',
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.backupPage === NavConstants.TRANSFER_PAGE) {
      return {
        headerText: 'SETTING',
        isMoreVertIconVisible: true,
      };
    }
    return state;
  }

  async componentDidMount() {
    await this.props.getContacts();
  }

  handleSubheaderBackBtn = () => {
    this.props.changePage(this.props.backupPage);
    this.props.updateBackupPage(NavConstants.DASHBOARD_PAGE);
  };

  onCopy = () => {
    this.props.createToast({ message: copyAccountMessage(), type: 'info' });
  };

  handelChangeToAddress = async (e, account) => {
    if (this.props.backupPage === NavConstants.TRANSFER_PAGE) {
      if (e.target.tagName === 'DIV') {
        this.props.createToast({ message: copyAccountMessage(), type: 'info' });
      } else {
        const { address } = account;
        if (address) {
          this.props.updateToAddress(address);
          this.props.changePage(NavConstants.TRANSFER_PAGE);
        }
      }
    }
  };

  handleOnSubMenuOptionsChange = async option => {
    if (option.value === ADD_ADDRESS.value) {
      this.props.resetToAddress();
      this.props.changePage(NavConstants.CREATE_ADDRESS_BOOK_PAGE);
    }
  };

  handleAddAddressClick = () => {
    this.props.resetToAddress();
    this.props.changePage(NavConstants.CREATE_ADDRESS_BOOK_PAGE);
  };

  handleAddressBookOptionsChange = async (option, contact) => {
    if (option.value === REMOVE.value) {
      this.setState({ isOpen: true, contact });
    }
  };

  handleCloseDialog = () => {
    const { isOpen } = this.state;
    this.setState({ isOpen: !isOpen });
  };

  handleYes = () => {
    const { contact } = this.state;
    const { removeContact } = this.props;
    removeContact(contact);
    this.setState({ isOpen: false });
  };

  openAddressBook = () => {
    this.props.changePage(CREATE_ADDRESS_BOOK_PAGE);
  };

  render() {
    const { addressBook, network } = this.props;
    const { isOpen, headerText, isMoreVertIconVisible } = this.state;
    const chain = findChainByName(network.value);
    const theme = chain.icon || 'polkadot';
    return (
      <div>
        <HeaderBack
          handleBack={this.handleSubheaderBackBtn}
          title={headerText}
          style={{ textAlign: 'left', marginLeft: '25px' }}
          rightButton={(
            <div className="add-address-btn" onClick={this.openAddressBook}>
              Add
            </div>
          )}
        />
        <div className="manage-address-book">
          <div className="manage-address-book-container">
            {addressBook.length > 0 ? (
              <AddressList
                className="address-book-container"
                addressBook={addressBook}
                moreMenu={ACCOUNT_MANAGEMENT_OPTIONS}
                onMoreMenuOptionsChange={this.handleAddressBookOptionsChange}
                theme={theme}
                isMoreVertIconVisible={isMoreVertIconVisible}
                handelChangeToAddress={this.handelChangeToAddress}
              />
            ) : (
              <EmptyDashboard className="empty-list-text" text="Click here to add an address!" />
            )}
            {addressBook.length === 0 ? (
              <div className="address-book-add-button">
                <ButtonMD color="dashboard" onClick={this.handleAddAddressClick}>
                  Add Address
                </ButtonMD>
              </div>
            ) : null}

            <div>
              <DraggableDialog
                isOpen={isOpen}
                handleClose={this.handleCloseDialog}
                handleYes={this.handleYes}
                noText="No"
                yesText="Yes"
                title="Remove contact"
                msg="Do you want to remove this address ?"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
