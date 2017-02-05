import React from 'react';
import {Dialog,DialogContent,DialogActions,Button} from 'react-mdl'

class AboutDialog extends React.Component {
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
        <div className="mdl-navigation__link" onClick={this.handleOpenDialog}>About</div>
        <Dialog open={this.state.openDialog}>
          <DialogContent style={{overflowY:"scroll", height:contentHt}}>
            <p> Snippet-Fu, Copyright (C) 2017, Hariharan Srinath</p>
            <p> Source Code: https://github.com/srinathh/snippetfu</p>
            <p> This program is free software; you can redistribute it and/or
                modify it under the terms of the GNU General Public License
                as published by the Free Software Foundation; either version 2
                of the License, or (at your option) any later version.</p>
            <p> This program is distributed in the hope that it will be useful,
                but WITHOUT ANY WARRANTY; without even the implied warranty of
                MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
                GNU General Public License for more details.</p>
            <p> You should have received a copy of the GNU General Public License
                along with this program; if not, write to the Free Software
                Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.</p>
          </DialogContent>
          <DialogActions>
            <Button type='button' onClick={this.handleCloseDialog}>Ok</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default AboutDialog;