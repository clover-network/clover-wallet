import React, { Component } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import withStyles from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button  from '@material-ui/core/Button';
import cn from 'classnames';

class FusoTabs extends Component {
  render() {
    const {
      value, onChange, classes, labels, ...otherProps
    } = this.props;

    return (
      <div className={classes.tabsRoot}>
        <ButtonGroup
          variant="contained"
          {...otherProps}
          fullWidth
          classes={{contained: classes.group}}
          disableRipple
        >
          {labels.map((label, index) => (
            <Button
              key={label}
              disableRipple
              onClick={(e) => onChange(e, index)}
              classes={{contained: classes.buttonRoot}}
              className={cn(classes.tabRoot, index === value ? classes.tabSelected : '')}
            >{label}</Button>
          ))}
        </ButtonGroup>
      </div>
    );
  }
}

export default withStyles(styles)(FusoTabs);
