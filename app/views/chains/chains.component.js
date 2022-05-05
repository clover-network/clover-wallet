import React, { Component } from "react";
import './index.css';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import cn from 'classnames';
import { chainsProps } from "../../constants/colors";
import nearLogo from '../../images/near.svg';
import fusotaoLogo from '../../images/logo.svg';

const chainLogoProps = {
  near: nearLogo,
  fusotao: fusotaoLogo
}

export default class Chains extends Component {
  state = {
    activeChain: 'fusotao'
  }

  componentDidMount() {
    
  }

  createAccount(){
    console.log('create account')
  }
  
  importAccount(){
    console.log('import account')
  }

  handleChangeChain(chain){
    console.log(chain, this.state);
    this.setState({
      ...this.state,
      activeChain: chain
    })
    console.log(chain, this.state);
  }

  render() {
    const { chains, accountList} = this.props;
    const {activeChain} = this.state;
    return (
      <Grid container className="container" justifyContent="space-between">
        <div className="chainsList">
          {chains.map((item, index) => (
            <span 
              className={cn('item', item.value === activeChain ? 'active' : '')} 
              key={item.value} 
              style={{background: item.value === activeChain ? chainsProps[item.value].primary: ''}}
              onClick={() => this.handleChangeChain(chains[index].value)}
            >
              <img src={chainLogoProps[item.value]} alt="" size="24"/>
            </span>
          ))}
        </div>
        <div className="accountList">
          {accountList.length ? (
            null
          ) :(
            <Grid container justifyContent="space-between">
              <Button color="primary" variant="outlined" size="small" onClick={this.createAccount}>
                + Create Account
              </Button>
              <Button color="default" variant="outlined" size="small" onClick={this.importAccount}>
                + Import Account
              </Button>
            </Grid>
          )}
        </div>
      </Grid>
    );
  }
}
