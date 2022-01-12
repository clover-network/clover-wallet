import React, { Component } from 'react';
import _ from 'lodash';
import Drawer from '@material-ui/core/Drawer';
import FormControl from '@material-ui/core/FormControl';
import RadioGroup from '@material-ui/core/RadioGroup';
import withStyles from '@material-ui/core/styles/withStyles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import './styles.css';
import HeaderBack from '../../components/header-back';
import FusoInput from '../../components/common/input';
import ButtonXL from '../../components/common/buttons/button-xl';
import * as NavConstants from '../../constants/navigation';

export default class NodeSetting extends Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
    this.state = {
      isNodeAddressError: false,
      nodeAddressErrorMessage: '',
      selectedNode: this.props.nodes[0].selectedNode,
      showAddNodes: false,
      addNodeAddress: '',
    };
  }

  handleSubheaderBackBtn = () => {
    this.props.changePage(NavConstants.NODE_LIST_PAGE);
  };

  handleChange = event => {
    const { nodes, network } = this.props;
    nodes[0].selectedNode = event.target.value;
    this.props.updateNodes(nodes);
    this.setState({ selectedNode: event.target.value });
    network.networkFullUrl = this.props.nodes[0].selectedNode;
    network.networkURL = this.props.nodes[0].selectedNode;
    network.transactionUrl = `${this.props.nodes[0].selectedNode}/#/explorer`;
    nodes[0].selectedNode = event.target.value;
    this.props.switchNetwork(network);
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
    const { nodes } = this.props;
    const { addNodeAddress } = this.state;
    const { isNodeAddressError, nodeAddressErrorMessage } = this.validateNodeAddress(
      addNodeAddress,
    );
    this.setState({
      isNodeAddressError,
      nodeAddressErrorMessage,
    });
    if (!isNodeAddressError) {
      nodes[0].nodes.push(addNodeAddress);
      this.props.updateNodes(nodes);
      this.setState({ showAddNodes: false });
    } else {
      this.props.createToast({
        message: nodeAddressErrorMessage,
        type: 'error',
      });
    }
  };

  validateNodeAddress(address) {
    let { isNodeAddressError, nodeAddressErrorMessage } = this.state;
    if (address.length === 0) {
      isNodeAddressError = true;
      nodeAddressErrorMessage = 'Node Address required';
    } else if (!_.startsWith(address, 'wss://')) {
      isNodeAddressError = true;
      nodeAddressErrorMessage = 'Node Address Start With "wss://"';
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
    const { nodes } = this.props;
    const { selectedNode, showAddNodes, addNodeAddress } = this.state;
    const RedRadio = withStyles(() => ({
      root: {
        color: '#000000',
        '&$checked': {
          color: '#FB822A',
        },
      },
      checked: {},
    }))(Radio);
    return (
      <div className="container">
        <HeaderBack
          handleBack={this.handleSubheaderBackBtn}
          title="NODE SETTING"
          // style={{ textAlign: 'left', marginLeft: '25px' }}
        />
        <div className="node-list-wrapper">
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="gender"
              name="gender1"
              value={selectedNode}
              onChange={this.handleChange}
            >
              {nodes[0].nodes.map((nodeUrl, index) => (
                <FormControlLabel
                  value={nodeUrl}
                  control={<RedRadio />}
                  label={nodeUrl}
                  key={`node_list_${index.toString()}`}
                />
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
                <FusoInput
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
