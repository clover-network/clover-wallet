import React, { Component } from 'react';
import MultilineInput from '../../common/multiline-input';
import Grid from '@material-ui/core/Grid';

export default class SeedWordsBox extends Component {
  render() {
    const { value, ...otherProps } = this.props;
    const seedWordsList = value.split(' ');
    return (
      <div {...otherProps} style={{marginBottom: 16}}>
        <Grid container spacing={1}>
          {seedWordsList.map((item, index) => (
            <Grid item sm={4} xs={4} key={item}>
              <Grid container>
                <span 
                  style={{color: '#8A8C9B'}}
                >
                  {index+1 < 10 ? `0${index+1}` : index+1}
                </span>
                &ensp;
                <span>
                  {item}
                </span>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
}
