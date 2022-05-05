import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import withStyles from "@material-ui/core/styles/withStyles";
import { styles } from "./styles";

class WalletExpansionPanel extends Component {
  render() {
    const {
      classes,
      summary,
      children,
      handleChange,
      expanded,
      isBelowExpandIcon,
      ...otherProps
    } = this.props;
    return (
      <Accordion
        expanded={expanded}
        onChange={handleChange}
        classes={{ root: classes.root, expanded: classes.panelExpanded }}
        {...otherProps}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          classes={{
            content: classes.content,
            expanded: classes.expanded,
            root: classes.summaryRoot,
            expandIcon: isBelowExpandIcon
              ? classes.belowExpandIcon
              : classes.expandIcon,
          }}
          // eslint-disable-next-line react/no-children-prop
          children={summary}
        />
        <AccordionDetails
          classes={{ root: classes.detailsRoot }}
          // eslint-disable-next-line react/no-children-prop
          children={children}
        />
      </Accordion>
    );
  }
}

WalletExpansionPanel.defaultProps = {
  expanded: true,
};

WalletExpansionPanel.propTypes = {
  expanded: PropTypes.bool,
};

export default withStyles(styles)(WalletExpansionPanel);
