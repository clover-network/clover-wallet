import React, { Component } from 'react';
import ContentHeader from '../../common/content-header';
import ClickToCopy from '../../common/click-to-copy';
import SeedWordsBox from '../seed-words-box';
import './styles.css';

export default class GenerateSeedPhrase extends Component {
  render() {
    const { seedWords, onCopy, ...otherProps } = this.props;
    return (
      <div {...otherProps}>
        <ContentHeader
          title="Generate Seed Phrase"
          description="This seed phrase is used to generate your first account. Save this somewhere safe and
          don't share it."
        />
        <SeedWordsBox className="seed-phrase-text-area" value={seedWords} />
        <ClickToCopy className="seed-phrase-copy" text="Copy" value={seedWords} onCopy={onCopy} />
      </div>
    );
  }
}
