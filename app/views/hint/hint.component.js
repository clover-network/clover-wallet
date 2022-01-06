import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import withStyles from "@material-ui/core/styles/withStyles";
import NoScreenShot from "../../images/no_screen_shot.svg";
import { styles } from "./styles";

class RadioButtonGroup extends Component {
  render() {
    const { classes, isOpen, handleClose, handleYes } = this.props;
    return (
      <Dialog
        classes={{
          root: classes.root,
          paper: classes.paper,
        }}
        disableBackdropClick={true}
        open={isOpen}
        onClose={handleClose}
      >
        <DialogContent
          classes={{
            root: classes.contentRoot,
          }}
        >
          <img src={NoScreenShot} alt="no-screen-shot" width="96" />
          <DialogContentText
            classes={{
              root: classes.title,
            }}
          >
            No Screenshots Please
          </DialogContentText>
          <DialogContentText
            classes={{
              root: classes.desc,
            }}
          >
            This seed phrase is used to create your account. Save this somewhere safe and don&#39;t share it
          </DialogContentText>

        </DialogContent>
        <DialogActions
          classes={{root: classes.confirmbox}}
          onClick={handleYes}>
          <DialogContentText
            classes={{
              root: classes.confirm,
            }}
          >
            Yes, I Know
          </DialogContentText>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles)(RadioButtonGroup);
