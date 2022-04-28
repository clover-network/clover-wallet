import React, { Component } from 'react';
import { Provider } from 'react-redux';
import App from './app.container';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: "#F23E5F",
    },
  },
  overrides:{
    MuiButton:{
      root:{
        textTransform: 'capitalize',
        fontSize: 12 
      }
    }
  }
});


export default class Root extends Component {
  render() {
    const { store } = this.props;
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </Provider>
    );
  }
}
