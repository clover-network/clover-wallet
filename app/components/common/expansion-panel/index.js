import React, { Component } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import withStyles from "@material-ui/core/styles/withStyles";
import FontRegular from "../fonts/font-regular";
import { styles } from "./styles";

class FusoExpansionPanel extends Component {
  state = {
    expanded: false,
  };

  handleChange = () => {
    const { expanded } = this.state;
    this.setState({
      expanded: !expanded,
    });
  };

  render() {
    const { expanded } = this.state;
    const { classes, title, children, ...otherProps } = this.props;
    return (
      <Accordion
        expanded={expanded}
        onChange={this.handleChange}
        classes={{ root: classes.root, expanded: classes.panelExpanded }}
        {...otherProps}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          classes={{
            content: classes.content,
            expanded: classes.expanded,
            root: classes.summaryRoot,
            expandIcon: classes.expandIcon,
          }}
          // eslint-disable-next-line react/no-children-prop
          children={
            <FontRegular
              text={title}
              style={{ fontSize: 16, fontWeight: "normal" }}
            />
          }
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

export default withStyles(styles)(FusoExpansionPanel);
