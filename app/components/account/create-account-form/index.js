import React, { Component } from 'react';
import GenerateSeedPhrase from '../generate-seed-phrase';
import ImportSeedPhrase from '../import-seed-phrase';
import ConfirmSeedPhrase from '../confirm-seed-phrase';
import * as Account from '../../../constants/account';

export default class CreateAccountForm extends Component {
  render() {
    const {
      value,
      generatedSeedWords,
      onChange,
      handleConfirmChange,
      importedSeedWords,
      isError,
      errorMessage,
      handleSeedWordImportOnMount,
      importSeedPhraseInputName,
      confirmSeedPhraseInputName,
      seedRef,
      confirmSeedRef,
      handleSeedWordsOnBlur,
      handleConfirmSeedWordsOnBlur,
      confirmedSeedWords,
      alias,
      onCopy,
      ...otherProps
    } = this.props;
    const originGeneratedSeedWords = generatedSeedWords
    return (
      <div {...otherProps}>
        {value === Account.CREATE_ACCOUNT && (
          <GenerateSeedPhrase seedWords={originGeneratedSeedWords} onCopy={onCopy} />
        )}
        {value === Account.IMPORT_ACCOUNT && (
          <ImportSeedPhrase
            onChange={onChange}
            seedWords={importedSeedWords}
            isError={isError}
            errorMessage={errorMessage}
            handleSeedWordImportOnMount={handleSeedWordImportOnMount}
            importSeedPhraseInputName={importSeedPhraseInputName}
            seedRef={seedRef}
            handleSeedWordsOnBlur={handleSeedWordsOnBlur}
          />
        )}
        {value === Account.CONFIRM_ACCOUNT && (
          <ConfirmSeedPhrase
            alias={alias}
            onChange={onChange}
            seedWords={confirmedSeedWords}
            originalSeedWords={originGeneratedSeedWords}
            isError={isError}
            errorMessage={errorMessage}
            handleSeedWordConfirmOnMount={handleSeedWordImportOnMount}
            confirmSeedPhraseInputName={confirmSeedPhraseInputName}
            confirmSeedRef={confirmSeedRef}
            handleConfirmSeedWordsOnBlur={handleConfirmSeedWordsOnBlur}
            handleChange={handleConfirmChange}
          />
        )}
      </div>
    );
  }
}
