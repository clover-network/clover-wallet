import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import FontRegular from '../fonts/font-regular';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import './styles.css';

export default class ClickToCopy extends Component {
  render() {
    const {
      value, text, onCopy, ...otherProps
    } = this.props;
    return (
      <CopyToClipboard text={value} onCopy={onCopy}>
        <div className="copy-container">
          <FileCopyIcon color="inherit" fontSize="inherit"/>
          <FontRegular {...otherProps} text={text} />
        </div>
      </CopyToClipboard>
    );
  }
}
