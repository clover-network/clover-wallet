import React, { Component } from 'react';
import Drawer from '@material-ui/core/Drawer';
import FormControl from '@material-ui/core/FormControl';
import RadioGroup from '@material-ui/core/RadioGroup';
import withStyles from '@material-ui/core/styles/withStyles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import './styles.css';
import HeaderBack from '../../components/header-back';
import CloverInput from '../../components/common/clover-input';
import ButtonXL from '../../components/common/buttons/button-xl';
import * as NavConstants from '../../constants/navigation';

export default class NodeSetting extends Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
    this.state = {
      isNodeAddressError: false,
      nodeAddressErrorMessage: '',
      nodeValue: 'wss://api.ownstack.cn/',
      showAddNodes: false,
      addNodeAddress: '',
    };
  }

  handleSubheaderBackBtn = () => {
    this.props.changePage(NavConstants.NODE_LIST_PAGE);
  };

  handleChange = event => {
    this.setState({ nodeValue: event.target.value });
  };

  toggleDrawer = status => () => {
    this.setState({ showAddNodes: status });
  };

  handleToChangeAddNode = event => {
    this.setState({
      addNodeAddress: event.target.value,
    });
  };

  addNodes = () => {
    const { addNodeAddress } = this.state;
    const { isNodeAddressError, nodeAddressErrorMessage } = this.validateNodeAddress(
      addNodeAddress,
    );
    this.setState({
      isNodeAddressError,
      nodeAddressErrorMessage,
    });
    if (!isNodeAddressError) {
      this.props.submitNode({
        addNodeAddress,
      });
    }
  };

  validateNodeAddress(address) {
    let { isNodeAddressError, nodeAddressErrorMessage } = this.state;
    if (address.length === 0) {
      isNodeAddressError = true;
      nodeAddressErrorMessage = 'Node Address required';
    } else {
      isNodeAddressError = false;
      nodeAddressErrorMessage = '';
    }
    return {
      isNodeAddressError,
      nodeAddressErrorMessage,
    };
  }

  render() {
    const { nodeValue, showAddNodes, addNodeAddress } = this.state;
    const RedRadio = withStyles(() => ({
      root: {
        color: '#000000',
        '&$checked': {
          color: '#FB822A',
        },
      },
      checked: {},
    }))(Radio);
    const nodeLists = [
      {
        url: 'wss://api.ownstack.cn/',
      },
      {
        url: 'wss://api.jisand.com',
      },
    ];
    return (
      <div className="container">
        <HeaderBack
          handleBack={this.handleSubheaderBackBtn}
          title="NODE SETTING"
          style={{ textAlign: 'left', marginLeft: '25px' }}
        />
        <div className="node-list-wrapper">
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="gender"
              name="gender1"
              value={nodeValue}
              onChange={this.handleChange}
            >
              {nodeLists.map(node => (
                <FormControlLabel value={node.url} control={<RedRadio />} label={node.url} />
              ))}
            </RadioGroup>
          </FormControl>
        </div>
        <div className="footer" onClick={this.toggleDrawer(true)}>
          <span
            className="close"
            style={{ fontFamily: 'Inter-Bold', fontSize: '14px', color: '#3E85E9' }}
          >
            + Add nodes
          </span>
        </div>
        <React.Fragment>
          <Drawer anchor="bottom" open={showAddNodes} onClose={this.toggleDrawer(false)}>
            <div className="select-asset-wrapper">
              <div className="select-asset-title">Add a custom node</div>
              <div className="node-address-input">
                <CloverInput
                  className="sign-up-password"
                  placeholderText="Enter valid node address"
                  value={addNodeAddress}
                  label="Address"
                  onChange={this.handleToChangeAddNode}
                  spellCheck={false}
                />
              </div>
              <ButtonXL disabled={addNodeAddress === ''} onClick={this.addNodes}>
                CONFIRM
              </ButtonXL>
            </div>
          </Drawer>
        </React.Fragment>
      </div>
    );
  }
}
