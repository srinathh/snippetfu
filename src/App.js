import React, {Component} from 'react';
import Item from './item.js'
import List from '@material/react-list'
import {loadSnippets, saveSnippets, snippetsFilePath} from './persist'
import Dialog, { DialogContent, DialogTitle, DialogButton, DialogFooter } from '@material/react-dialog';
import Fab from '@material/react-fab';
import MaterialIcon from '@material/react-material-icon';
import TextField, {Input} from '@material/react-text-field';


import '@material/react-button/dist/button.css';
import '@material/react-dialog/dist/dialog.css';
import '@material/react-fab/dist/fab.css';
import '@material/react-material-icon/dist/material-icon.css';
import './App.css';
import '@material/react-text-field/dist/text-field.css';


const { clipboard } = window.require('electron')

export default class App extends Component{
    constructor(props) {
        super(props);
        this.state = {
            alertOpen: false,
            alertText: "",
            alertTitle: "",
            inputOpen:false,
            inputTitle:"",
            inputSubTitle:"",
            searchText:"",
            open:false,
            data:[]
        }
        this.delFunc = this.delFunc.bind(this);
        this.showAlert= this.showAlert.bind(this);
        this.saveFunc = this.saveFunc.bind(this);
    }

    copyFunc(text){
        clipboard.writeText(text)
    }

    delFunc(idx){
        const newArr = this.state.data.filter( (item,listIdx) => listIdx !== idx)
        saveSnippets(newArr, (err)=>{
            if(err){
                this.setState({alertOpen:true, alertText:"Error deleting:".concat(err)})
            }else{
                this.setState({data:newArr})
            }
        })
    }

    showAlert(title, text){
        this.setState({alertOpen:true, alertTitle: title, alertText:text})
    }

    saveFunc(title, subtitle){
        let newState = Object.assign(this.state, {inputOpen:false, inputTitle:"", inputSubTitle:""});
        newState.data.push({title,subtitle});
        saveSnippets(newState.data, (err)=>{
            if(err){
                this.showAlert("Error Saving", err)
            }else{
                this.setState(newState);
            }
        })
    }

    componentDidMount() {
        let {data, err } = loadSnippets()
        console.log(data, err)
        if(err === null){
            this.setState({data:data})
        }else{
            this.setState({alertOpen:true, alertText:err})
        }
    }
    
    render(){
        const items = this.state.data.filter(item=>{
            const text = item.title.concat(' ').concat(item.subtitle).toLowerCase()
            const st = this.state.searchText.toLowerCase()

           if(st.length>=2){
               if(text.includes(st)){
                   return true
               }else{
                   return false
               }
           }else{
               return true;
           } 
        }).map((item,idx)=>{
            return (
                <Item  
                    title={item.title} 
                    subtitle={item.subtitle} 
                    index={idx} 
                    key={idx} 
                    clickFunc ={this.copyFunc} 
                    delFunc = {this.delFunc} />
            )
        });

        return (
            <div> 
                <TextField
                    style={{width:"100%"}}
                    label='Search'
                    leadingIcon={<MaterialIcon role="button" icon="info"/>}
                    onLeadingIconSelect={() => this.showAlert("Snippets File", snippetsFilePath)}
                    onTrailingIconSelect={() => this.setState({searchText: ''})}
                    trailingIcon={<MaterialIcon role="button" icon="delete"/>}>
                    <Input
                        value={this.state.searchText}
                        onChange={(e) => this.setState({searchText: e.target.value})} />
                </TextField>

                <List twoLine >
                    {items}
                </List>

                <Dialog
                    onClose={() => this.setState({alertOpen: false}) }
                    open={this.state.alertOpen}>
                    <DialogTitle>{this.state.alertTitle}</DialogTitle>
                    <DialogContent>{this.state.alertText}</DialogContent>
                    <DialogFooter>
                        <DialogButton action='dismiss'>Ok</DialogButton>
                    </DialogFooter>
                </Dialog>

                <Dialog 
                    onClose={(action) => {
                        if(action==='confirm'){
                            this.saveFunc(this.state.inputTitle, this.state.inputSubTitle)
                        }else{
                            this.setState( {inputOpen:false, inputTitle:"", inputSubTitle:""});
                        }
                    }}
                    open={this.state.inputOpen}>
                    <DialogTitle>Add a Snippet</DialogTitle>
                    <DialogContent>
                        <TextField
                            style={{width:"100%"}}
                            label='Snippet Title'
                            onTrailingIconSelect={() => this.setState({inputTitle: ''})}
                            trailingIcon={<MaterialIcon role="button" icon="delete"/>}>
                            <Input
                                value={this.state.inputTitle}
                                onChange={(e) => this.setState({inputTitle: e.target.value})} />
                        </TextField>
                        <TextField
                            style={{width:"100%"}}
                            label='Snippet Text'
                            onTrailingIconSelect={() => this.setState({inputSubTitle: ''})}
                            trailingIcon={<MaterialIcon role="button" icon="delete"/>}>
                            <Input
                                value={this.state.inputSubTitle}
                                onChange={(e) => this.setState({inputSubTitle: e.target.value})} />
                        </TextField>
                    </DialogContent>
                    <DialogFooter>
                        <DialogButton action='dismiss'>Cancel</DialogButton>
                        <DialogButton action='confirm' isDefault>Ok</DialogButton>
                    </DialogFooter>
                </Dialog>

                <Fab 
                    className="addItem" 
                    icon={<MaterialIcon icon="add"/>}
                    onClick={()=>this.setState({inputOpen:true})}/>
            </div>
        )
    }
}
