import React from 'react';
import {Dialog,DialogContent,DialogActions,Button} from 'react-mdl'

class MenuItemDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleOpenDialog = this.handleOpenDialog.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
  }

  handleOpenDialog() {
    this.setState({
      openDialog: true
    });
  }

  handleCloseDialog() {
    this.setState({
      openDialog: false
    });
  }

  render() {
      const contentHt = Math.floor(window.innerHeight/2)
    return (
      <div>
        <div className="mdl-navigation__link" onClick={this.handleOpenDialog}>{this.props.menuItem}</div>
        <Dialog open={this.state.openDialog}>
          <DialogContent style={{overflowY:"scroll", height:contentHt}}>
            {this.props.dialogContent}
          </DialogContent>
          <DialogActions>
            <Button type='button' onClick={this.handleCloseDialog}>Ok</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default MenuItemDialog;