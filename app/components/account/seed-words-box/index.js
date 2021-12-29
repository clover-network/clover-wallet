import React, { Component } from 'react';
import MultilineInput from '../../common/multiline-input';
import Grid from '@material-ui/core/Grid';

export default class SeedWordsBox extends Component {
  render() {
    const { value, ...otherProps } = this.props;
    const seedWordsList = value.split(' ');
    return (
      <div {...otherProps} style={{background: '#f0f0f0', padding: 8}} >
        <Grid container spacing={1}>
          {seedWordsList.map(item => (
            <Grid item sm={4} xs={4} key={item}>
              <Grid  style={{background: '#fff', borderRadius: 4, textAlign: 'center', padding: 8}}>{item}</Grid>
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
}
