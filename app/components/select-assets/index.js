import React, { Component } from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import DarkDivider from '../common/divider/dark-divider';
import { getCurrencyIcon } from '../../utils/dashboard';
import './styles.css';

export default class SelectAssets extends Component {
  render() {
    const {
      assetsList, handleCurrencyChange, toggleDrawer, showCurrencySelect
    } = this.props;
    return (
      <div>
        <React.Fragment>
          <Drawer anchor="bottom" open={showCurrencySelect} onClose={toggleDrawer(false)}>
            <div
              className="select-asset-wrapper"
              onClick={toggleDrawer(false)}
              onKeyDown={toggleDrawer(false)}
            >
              <div className="select-asset-title">select Assets</div>
              <List>
                {assetsList.map(token => (
                  <div key={token.token}>
                    <DarkDivider />
                    <ListItem button key={token.amount} onClick={handleCurrencyChange(token)}>
                      <div className="select-asset-item-left">
                        <img
                          className="select-asset-item-icon"
                          width="28"
                          height="28"
                          src={getCurrencyIcon(token.token)}
                          alt=""
                        />
                        <span className="select-asset-item-currency-type">{token.token}</span>
                      </div>
                      <span className="select-asset-item-amount">{token.amount}</span>
                    </ListItem>
                  </div>
                ))}
              </List>
            </div>
          </Drawer>
        </React.Fragment>
      </div>
    );
  }
}
