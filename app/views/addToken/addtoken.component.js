import React, { Component } from 'react';
import HeaderBack from '../../components/header-back';
import ArrowLeft from '../../images/arrow_left.svg';
import InputBase from '@material-ui/core/InputBase';
import FooterButton from '../../components/common/footer-button';
import * as NavConstants from '../../constants/navigation';
import { getWallet } from '../../../backgroundScript/services/wallet-service';

import "./index.css"

const unlockWalletSuccess = () => ({
  type: SignInActionTypes.UNLOCK_WALLET_SUCCESS,
});
export default class AddToken extends Component{
  constructor(props){
    super(props);
    this.state = {
      tokenId:"",
      tokenName:"",
      isTokenIdError:false,
      isTokenNameError:false,
      textError:"",
      btnLoading:false,
    }
  }
  handleBack = () => {
    this.props.changePage(NavConstants.DASHBOARD_PAGE);
  };
  handleLoading = (stu) => {
    this.props.updateAppLoading(stu);
  }
  handleToChange = prop => async e => {
    const {network} = this.props;
    let reg1 = /^\+?[1-9]\d*$/;
    if (!reg1.test(e.target.value) && e.target.value!="") {
      return;
    }
    this.setState({
      [prop]: e.target.value,
      isTokenIdError:false,
      isTokenNameError:false,
      textError:"",
    });
    if(e.target.value == ""){
      this.setState({tokenName:""});
      return;
    }
    this.handleLoading(true);
    const wallet = getWallet();
    const checkIsTokenId = await wallet.getNextTokenId(e.target.value,network);
    let selfTokenName = "-";
    if(checkIsTokenId){
      selfTokenName = await wallet.getTokenName(this.state.tokenId,network);
      this.setState({tokenName:selfTokenName});
      this.handleLoading(false);
    }else{
      this.handleLoading(false);
      this.tokenIdInput.focus();
      this.setState({isTokenIdError:true,tokenName:""});
      this.setState({textError:"The tokenId query result does not exist!"});
    }
    
  };
   handleSendButton = async () => {
    const {address} = this.props.account;
    const {network} = this.props;
    let reg1 = /^\+?[1-9]\d*$/,reg2 = /^[A-Za-z]+$/;
    if (!reg1.test(this.state.tokenId)) {
      this.tokenIdInput.focus();
      this.setState({isTokenIdError:true});
      this.setState({textError:"The input format is a positive integer greater than 0!"});
      return false;
    }
    if (!reg2.test(this.state.tokenName)) {
      this.tokenNameInput.focus();
      this.setState({isTokenNameError:true});
      this.setState({textError:"The value is in uppercase or lowercase letters!"});
      return false;
    }

    this.setState({btnLoading:true});
    const wallet = getWallet();
    const isEmpty = await wallet.checkToken(address,this.state.tokenId,network);
    console.log("isEmpty --" ,isEmpty);
    let tokenList = JSON.parse(localStorage.getItem("tokenList")) || [];
    let isTokenidArr = tokenList.filter(item => {
      return item.tokenId == this.state.tokenId||item.tokenName == this.state.tokenName
    });
    if(isTokenidArr && isTokenidArr.length){
      this.setState({btnLoading:false});
      this.setState({textError:"The token cannot be added repeatedly!"});
      return;
    }
    let tokenObj = {tokenId:this.state.tokenId,tokenName:this.state.tokenName.toUpperCase()};
    tokenList.push(tokenObj);
    localStorage.setItem("tokenList",JSON.stringify(tokenList));

    this.setState({btnLoading:false});
    this.handleBack();

    // if(isEmpty){
    //   this.tokenIdInput.focus();
    //   this.setState({isTokenIdError:true});
    //   this.setState({textError:"The tokenID was entered incorrectly!"});
    //   return false;
    // }

  }
  render(){
    const {tokenId,tokenName,isTokenIdError,isTokenNameError,textError,btnLoading} = this.state;
    this.tokenIdInput = React.createRef();
    this.tokenNameInput = React.createRef();
    return (
      <div>
        <HeaderBack icon={ArrowLeft} handleBack={this.handleBack} title="Add Token" />
        <div className="transfer-form-card">
        <div className="transfer-border-bottom transfer-padding">
            <span className="transfer-card-span">Token ID</span>
            <InputBase
              style={{ fontSize: '12px' }}
              fullWidth
              error={isTokenIdError}
              placeholder="Please enter token ID"
              value={tokenId}
              name="tokenId"
              onChange={this.handleToChange('tokenId')}
              inputRef={input => {
                this.tokenIdInput = input;
              }}
            />
          </div>
          <div className="transfer-padding">
            <span className="transfer-card-span">Token Name</span>
            <InputBase
              style={{ fontSize: '12px',color: '#000'}}
              fullWidth
              disabled
              error={isTokenNameError}
              placeholder="-"
              value={tokenName}
              name="tokenName"
              inputRef={input => {
                this.tokenNameInput = input;
              }}
            />
          </div>
          <FooterButton
            disabled={ !this.state.tokenId || !this.state.tokenName || btnLoading}
            style={{ left: 0 }}
            onClick={this.handleSendButton}
            name={btnLoading?"In the query...":"ADD TOKEN"}
          />
        </div>
        <div className="addErrorText">{textError}</div>
      </div>
    )
  }
}