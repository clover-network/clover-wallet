import React, { Component } from 'react';
import ContentHeader from '../../common/content-header';
import './styles.css';
import Grid from '@material-ui/core/Grid';
import cn from 'classnames';
import Button from '@material-ui/core/Button';
import CancelIcon from '@material-ui/icons/Cancel';

export default class ConfirmSeedPhrase extends Component {
  constructor(props) {
    super(props);
    this.seedWordsInput = React.createRef();
    this.confirmSeedInput = React.createRef();
  }

  state = {
    addSeedWordsList: [],
    originalSeeds: [],
    mixedSeeds: [],
    errorIndex: -1,
  }

  handleSetSeed(seed, index){
    const {addSeedWordsList, originalSeeds, errorIndex} = this.state;
    if(addSeedWordsList.includes(seed) || errorIndex !== -1){
      return ;
    }
    this.setState({
      ...this.state, 
      addSeedWordsList: addSeedWordsList.concat(seed),
      errorIndex: addSeedWordsList.concat(seed).join() !== originalSeeds.slice(0, addSeedWordsList.concat(seed).length).join() ? addSeedWordsList.length : -1,
    });
  }

  setOriginalSeeds(){
    const {originalSeedWords} = this.props;
    const mxiedSeedsList = originalSeedWords.split(' ').sort(() => {
      return .5 - Math.random();
    });
    this.setState({
      ...this.state,
      mixedSeeds: mxiedSeedsList,
      originalSeeds: originalSeedWords.split(' ')
    })
  }

  handleDelete(index){
    const {addSeedWordsList} = this.state;
    this.setState({
      ...this.state, 
      addSeedWordsList: addSeedWordsList.slice(0, -1),
      errorIndex: -1,
    });
  }

  componentDidMount() {
    this.props.handleSeedWordConfirmOnMount();
    this.setOriginalSeeds();
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.state.addSeedWordsList.join() !== prevState.addSeedWordsList.join()){
      this.props.handleChange(this.state.addSeedWordsList.join(' '));
    }
  }

  render() {
    const {addSeedWordsList, originalSeeds, mixedSeeds, errorIndex} = this.state;

    return (
      <div style={{marginTop: -8}}>
        <ContentHeader
          title="Verify Seed Phrase"
          description="Type or paste your seed phrase here to verify that you've saved it."
        />
        <Grid className="addSeedContainer">
          <Grid container spacing={1}>
            {originalSeeds.map((item, index) => (
              <Grid item sm={4} xs={4} key={item}>
                <Grid className="seedContainer">
                  {index === addSeedWordsList.length - 1 ? (
                    <span onClick={() => this.handleDelete(index)}>{addSeedWordsList[index] || ''}</span>
                  ) : (
                    <span >{addSeedWordsList[index] || ''}</span>
                  )}
                  {index === errorIndex && (
                    <CancelIcon 
                    color="error" 
                    className="error" 
                    fontSize="small"
                    onClick={() => this.handleDelete(index)}
                    />
                  )}
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <div className="errorMessage">
          {errorIndex > -1 ? (
            <div className="errorBar">
              Please check your backup's order is correct
            </div>
          ) : null}
        </div>
        <Grid className="mixedWordsContainer">
          <Grid container spacing={1}>
            {mixedSeeds.map((item, index) => (
              <Grid item sm={4} xs={4} key={item}>
                <Button 
                  size="small" 
                  variant="outlined" 
                  color='default' 
                  disabled={addSeedWordsList.includes(item)}
                  onClick={() => this.handleSetSeed(item)}
                  fullWidth
                  style={{textTransform: 'lowercase'}}
                >{item}</Button>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </div>
    );
  }
}
