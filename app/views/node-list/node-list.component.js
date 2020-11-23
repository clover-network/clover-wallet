import React, { Component } from 'react';
import './styles.css';
import * as NavConstants from '../../constants/navigation';
import HeaderBack from '../../components/header-back';
import ArrowRight from '../../images/arrow_right.svg';

export default class NodeList extends Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }

  handleSubheaderBackBtn = () => {
    this.props.changePage(this.props.backupPage);
  };

  handleNodeDetail = () => {
    this.props.changePage(NavConstants.NODE_SETTING_PAGE);
  };

  render() {
    const nodeLists = [
      {
        name: 'Clover_HK',
        url: 'wss://api.ownstack.cn/',
      },
      {
        name: 'BTC',
        url: 'https://www.baidu.com',
      },
      {
        name: 'Ethereum',
        url: 'https://www.baidu.com',
      },
      {
        name: 'Polkadot',
        url: 'https://www.baidu.com',
      },
    ];
    return (
      <div className="container">
        <HeaderBack
          handleBack={this.handleSubheaderBackBtn}
          title="SETTING"
          style={{ textAlign: 'left', marginLeft: '25px' }}
        />
        <div className="node-setting-list-wrapper">
          {nodeLists.map(node => (
            <div className="node-setting-node-item" onClick={this.handleNodeDetail}>
              <div className="node-setting-node-name">{node.name}</div>
              <div className="node-setting-node-url">{node.url}</div>
              <img className="node-setting-arrow-right-icon" src={ArrowRight} alt="" />
            </div>
          ))}
        </div>
      </div>
    );
  }
}
