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

import React, { Component } from 'react';
import {List, Icon, Snackbar} from 'react-mdl'
import Snippet from './snippet'
import SnippetInput from './snippetinput'
import {createStore} from 'redux'
import {newSnippet, reducer, addSnippet, delSnippet, initSnippets} from './store'
import {Layout, Header, Navigation, Drawer, Content} from 'react-mdl'
import {initdata} from './initdata'
import {connect, Provider} from 'react-redux'
import ReactDOM from 'react-dom';
import './index.css';
import 'react-mdl/extra/material.css';
import 'react-mdl/extra/material.js';
import {loadSnippets, saveSnippets} from './persist'
import AboutDialog from './about'
const path = window.require('path');
const {clipboard} = window.require('electron')
const {app} = window.require('electron').remote;
//const {dialog} = window.require('electron').remote

let snippetsFilePath = path.join(app.getPath("userData"),"snippet-fu.json")
initdata.push(newSnippet("Your snippets will be saved in:"))
initdata.push(newSnippet(snippetsFilePath))

class PresApp extends Component {
    constructor(props) {
        super(props);
        this.state = { isSnackbarActive: false, snackbarMessage:"" };
        this.showSnackBar = this.showSnackBar.bind(this);
        this.hideSnackBar = this.hideSnackBar.bind(this);
        this.copySnippet = this.copySnippet.bind(this);
    }

    hideSnackBar(){
        this.setState({isSnackbarActive:false, snackbarMessage:""})
    }

    showSnackBar(text) {
        this.setState({isSnackbarActive:true, snackbarMessage:text})
    }

    render() {
        let snippets = []
        for(let j=0; j < this.props.snippets.length; j++){
            let background = "#E3F2FD" 
            if(j%2===0){
                background = "#FFFFFF" 
            }
            snippets.push(
                <Snippet 
                    key={this.props.snippets[j].snippetKey} 
                    copySnippet={this.copySnippet} 
                    delSnippet={this.props.delSnippet} 
                    background={background}
                    snippet={this.props.snippets[j]} />
            )
        }        

        const ht = window.innerHeight - 56; 
        return (
                <Layout fixedHeader>
                    <Header  
                        title={<span style={{webkitAppRegion: "drag"}}><strong>Snippet-Fu</strong></span>}>
                        <Navigation>
                            <Icon
                                name="clear" 
                                style={{webkitAppRegion:"no-drag", cursor:"pointer"}} 
                                onClick={()=>{window.close()}} />
                        </Navigation>
                    </Header>
                    <Drawer title={<span><strong>Snippet-Fu</strong></span>}>
                        <Navigation>
                            <div onClick={()=>{ console.log("export snippets function TBD")}}>
                                Export...</div>
                            <AboutDialog />
                        </Navigation>
                    </Drawer>
                    <Content>
                        <SnippetInput addSnippet={this.props.addSnippet}/>
                        <div style={{overflowY:"auto", height:ht}}   >
                            <List style={{margin:0, padding:0 }} >
                                {snippets}
                            </List>
                        </div>
                    </Content>
                    <Snackbar
                        active={this.state.isSnackbarActive}
                        onTimeout={this.hideSnackBar}>
                        {this.state.snackbarMessage}
                    </Snackbar>
                </Layout>
        );
    }

    copySnippet(snippet){
        clipboard.writeText(snippet.text)
        this.showSnackBar("Copied to clipboard")
        //clipboard.set(snippet.text);
        console.log("copying snippet with key:".concat(snippet.snippetKey).concat(" text:").concat(snippet.text))
    }
}

const mapStateToProps = (state) => {
    return {
        snippets: state.snippets
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addSnippet: (text) => {
            dispatch(addSnippet(text))
        },
        delSnippet: (snippet) => {
            dispatch(delSnippet(snippet))
        }
    }
}

const App = connect(
    mapStateToProps,
    mapDispatchToProps
)(PresApp)

let store = createStore(reducer)



loadSnippets(snippetsFilePath, initdata, (err, snippets)=>{
    if(err){
        console.log("error in loadSnippets from ".concat(snippetsFilePath).concat(" : Using default values"))
        console.log(err)
    }
    store.dispatch(initSnippets(snippets))

    store.subscribe(()=>{
        console.log(store.getState());
        saveSnippets(snippetsFilePath, store.getState().snippets, (err)=>{
            if(err){
                console.log("error in saving snippets to ".concat(snippetsFilePath))
                console.log(err)
            }else{
                console.log("successfully saved snippets to ".concat(snippetsFilePath))
            }
        });
    })

    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
    document.getElementById('root')
    );

}) 
