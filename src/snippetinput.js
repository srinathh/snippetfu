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
        const fabTop = window.innerHeight - 80;
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