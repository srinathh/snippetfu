/*
Snippet-Fu, Copyright (C) 2017, Hariharan Srinath

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
*/

import React from 'react';
import {Dialog, DialogTitle, DialogContent, DialogActions, Textfield, FABButton, Icon, Button} from 'react-mdl';

class SnippetInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {openDialog:false, text:""};
        this.handleCloseDialog = this.handleCloseDialog.bind(this);
    }
    
    handleCloseDialog() {
        this.setState({openDialog:false, text:""});
    }

    render() {
        const fabTop = window.innerHeight - 140;
        const fabLeft = window.innerWidth - 80;

        return (
            <div>
                <FABButton 
                    primary ripple
                    onClick={()=>{this.setState({openDialog:true, text: this.state.text})}}
                    style={{
                        position:"absolute",
                        top:fabTop,
                        left:fabLeft
                    }} >
                    <Icon name="add" />
                </FABButton>
                <Dialog open={this.state.openDialog}>
                    <DialogTitle>Add Snippet</DialogTitle>
                    <DialogContent>
                        <Textfield
                            onChange={(evt) => {
                                this.setState({openDialog:this.state.openDialog, text: evt.target.value})
                            }}
                            label="Type your snippet here..."
                            rows={3}
                            value={this.state.text}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button 
                            type='button'
                            onClick={()=>{
                                const curState = Object.assign({},this.state)
                                if(curState.text !== ""){
                                    this.props.addSnippet(curState.text)
                                    this.handleCloseDialog();
                                }
                            }}>
                            Add
                        </Button>
                        <Button type='button' onClick={()=>{ this.handleCloseDialog(); }}>
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

SnippetInput.propTypes = {
    addSnippet : React.PropTypes.func.isRequired,
}

export default SnippetInput;