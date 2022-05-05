import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import FusoValidator from '../../utils/fuso-validator';
import validator from '../../utils/fuso-validator/validator';
import CreateAccountForm from '../../components/account/create-account-form';
import { MANAGE_ACCOUNT_PAGE } from '../../constants/navigation';
import CreateAccountSettings from '../../components/account/create-account-settings';
import FooterButton from '../../components/common/footer-button';
import FooterWithTwoButton from '../../components/common/footer-with-two-button';
import BackButton from '../../components/back-button';
import * as Account from '../../constants/account';
import './styles.css';
import { copyDataMessage } from '../../../lib/services/static-message-factory-service';

export default class ImportWallet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formValue: Account.IMPORT_ACCOUNT,
      buttonName: Account.TO_CONFIRM_BUTTON_TEXT,
      backButtonName: Account.BACK_BUTTON_TEXT,
      onSubmit: this.handleNext,
      importedSeedPhrase: '',
      confirmSeedPhrase: '',
      isError: false,
      errorMessage: null,
      disableAccountSettings: false,
      importSeedPhraseInputName: 'importedSeedPhrase',
      confirmSeedPhraseInputName: 'confirmSeedPhrase',
    };
    this.validator = new FusoValidator(validator.importSeedPhraseValidation);
    this.seedInput = React.createRef();
    this.confirmSeedInput = React.createRef();
  }

  componentDidMount() {}

  static getDerivedStateFromProps(props, state) {
    if (props.error) {
      return { isError: true, errorMessage: props.error.message };
    }
    return state;
  }

  handleChange = (e, value) => {
    let {
      buttonName, formValue, onSubmit, disableAccountSettings
    } = this.state;
    if (value === Account.CREATE_ACCOUNT) {
      buttonName = Account.TO_CONFIRM_BUTTON_TEXT;
      onSubmit = this.handleNext;
      formValue = Account.CREATE_ACCOUNT;
      disableAccountSettings = false;
    }
    if (value === Account.IMPORT_ACCOUNT) {
      buttonName = Account.IMPORT_BUTTON_TEXT;
      onSubmit = this.handleImportSeedWordClick;
      formValue = Account.IMPORT_ACCOUNT;
      disableAccountSettings = false;
    }
    this.setState({
      buttonName,
      formValue,
      onSubmit,
      disableAccountSettings,
    });
  };

  handleImportSeedWordsChange = prop => e => {
    const { value } = e.target;
    let { isError, errorMessage } = this.state;
    const { error, resetImportAccountWithSeedPhraseError } = this.props;
    // value = value.trim().replace(/\n/g, ' ');
    if (error) {
      resetImportAccountWithSeedPhraseError();
    }
    if (value === '') {
      isError = false;
      errorMessage = null;
    }
    this.setState({
      [prop]: value,
      isError,
      errorMessage,
    });
  };

  handleSeedWordImportOnMount = () => {
    this.setState({
      importedSeedPhrase: '',
    });
  };

  handleBack = () => {
    if (
      this.state.formValue === Account.CREATE_ACCOUNT
      || this.state.formValue === Account.IMPORT_ACCOUNT
    ) {
      this.props.changePage(MANAGE_ACCOUNT_PAGE);
    } else if (this.state.formValue === Account.CONFIRM_ACCOUNT) {
      this.setState({
        buttonName: Account.TO_CONFIRM_BUTTON_TEXT,
        onSubmit: this.handleNext,
        formValue: Account.CREATE_ACCOUNT,
        disableAccountSettings: false,
      });
    }
  };

  handleConfirm = () => {
    const { confirmSeedPhrase } = this.state;
    const { seedWords, alias } = this.props;
    const trimedSeedWords = seedWords.replace(/\s/g, '');
    const trimedConfirmSeedPhrase = confirmSeedPhrase.replace(/\s/g, '');
    if (trimedSeedWords === trimedConfirmSeedPhrase) {
      this.props.createFirstAccountWithSeedPhrase(this.props.seedWords, alias);
    } else {
      this.setState({
        isError: true,
        errorMessage: "Seed phrase doesn't match.",
      });
    }
  };

  toConfirm = () => {
    this.setState({
      formValue: Account.CONFIRM_ACCOUNT,
      buttonName: Account.GENERATE_BUTTON_TEXT,
      onSubmit: this.handleConfirm,
      disableAccountSettings: true,
    });
  };

  handleNext = () => {
    this.toConfirm();
  };

  handleImportSeedWordClick = () => {
    const { importedSeedPhrase } = this.state;
    const { alias } = this.props;
    const { isError, errorMessage } = this.validateSeedPhrase(importedSeedPhrase);
    if (!isError) {
      this.props.createFirstAccountWithSeedPhrase(this.state.importedSeedPhrase, alias);
    } else if (isError) {
      this.seedInput.focus();
    }
    this.setState({
      isError,
      errorMessage,
    });
  };

  onCopy = () => {
    this.props.createToast({
      message: copyDataMessage(),
      type: 'info',
      toastPosition: toast.POSITION.TOP_CENTER,
    });
  };

  onKeypairTypeChange = e => {
    this.props.setKeypairType(e.target.value);
  };

  handleSeedWordsOnBlur = () => {
    const { isError, errorMessage } = this.validateSeedPhrase(this.state.importedSeedPhrase);
    if (this.state.importedSeedPhrase === '' || !isError) {
      this.setState({ isError, errorMessage });
    }
  };

  handleConfirmSeedWordsOnBlur = () => {
    const { isError, errorMessage } = this.validateSeedPhrase(this.state.confirmSeedPhrase);
    if (this.state.confirmSeedPhrase === '' || !isError) {
      this.setState({ isError, errorMessage });
    }
  };

  validateSeedPhrase(importedSeedPhrase) {
    let { isError, errorMessage } = this.state;
    const validation = this.validator.validate({
      seedPhrase: importedSeedPhrase,
    });
    if (!validation.isValid) {
      isError = true;
      errorMessage = validation.seedPhrase.message;
    } else {
      isError = false;
      errorMessage = null;
    }

    return {
      isError,
      errorMessage,
    };
  }

  render() {
    const {
      seedWords, keypairType, keypairTypes, account
    } = this.props;
    const {
      formValue,
      buttonName,
      onSubmit,
      importedSeedPhrase,
      confirmSeedPhrase,
      isError,
      errorMessage,
      disableAccountSettings,
      importSeedPhraseInputName,
      confirmSeedPhraseInputName,
      backButtonName,
    } = this.state;

    return (
      <div>
        <BackButton />
        <CreateAccountForm
          value={formValue}
          generatedSeedWords={seedWords}
          importedSeedWords={importedSeedPhrase}
          confirmedSeedWords={confirmSeedPhrase}
          onChange={this.handleImportSeedWordsChange}
          isError={isError}
          errorMessage={errorMessage}
          handleSeedWordImportOnMount={this.handleSeedWordImportOnMount}
          importSeedPhraseInputName={importSeedPhraseInputName}
          confirmSeedPhraseInputName={confirmSeedPhraseInputName}
          onCopy={this.onCopy}
          seedRef={input => {
            this.seedInput = input;
          }}
          confirmSeedRef={input => {
            this.confirmSeedInput = input;
          }}
          handleSeedWordsOnBlur={this.handleSeedWordsOnBlur}
          handleConfirmSeedWordsOnBlur={this.handleConfirmSeedWordsOnBlur}
          className="create-account-form"
        />
        <CreateAccountSettings
          disableAccountSettings={disableAccountSettings}
          keypairType={keypairType}
          keypairTypes={keypairTypes}
          onKeypairTypeChange={this.onKeypairTypeChange}
          className="create-account-settings"
        />
        {formValue === Account.CONFIRM_ACCOUNT || account !== undefined ? (
          <FooterWithTwoButton
            onNextClick={onSubmit}
            onBackClick={this.handleBack}
            backButtonName={backButtonName}
            nextButtonName={buttonName}
          />
        ) : (
          <FooterButton onClick={onSubmit} name={buttonName} />
        )}
      </div>
    );
  }
}

ImportWallet.defaultProps = {
  alias: '',
  seedWords: '',
  createFirstAccountWithSeedPhrase: undefined,
  error: null,
  resetImportAccountWithSeedPhraseError: undefined,
};

ImportWallet.propTypes = {
  alias: PropTypes.string,
  createFirstAccountWithSeedPhrase: PropTypes.func,
  error: PropTypes.string,
  resetImportAccountWithSeedPhraseError: PropTypes.func,
  seedWords: PropTypes.string,
};
