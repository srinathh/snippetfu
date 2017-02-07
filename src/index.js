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
import MenuItemDialog from './menuitemdialog'
import {createStore} from 'redux'
import {hideToast, showToast, newSnippet, reducer, addSnippet, delSnippet, initSnippets} from './store'
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
var crypto = window.require('crypto')

let snippetsFilePath = path.join(app.getPath("userData"),"snippet-fu.json")

class PresApp extends Component {
    constructor(props) {
        super(props);
        this.state = { isSnackbarActive: false };
        this.copySnippet = this.copySnippet.bind(this);
    }

    render() {

        let snippets = []
        for(let j=0; j < this.props.snippets.length; j++){

            // set different colors for odd & even list items
            let background = "#E3F2FD"  // Blue 50 in Material Design
            if(j%2===0){
                background = "#BBDEFB" // Blue 100 in Material Design 
            }

            snippets.push(
                <Snippet 
                    key={this.props.snippets[j].snippetKey} 
                    copySnippet={this.copySnippet} 
                    delSnippet={this.props.delSnippet} 
                    background={background}
                    snippetWidth={window.innerWidth}
                    snippet={this.props.snippets[j]} />
            )
        }        

        // THe appbar is 56 pixels tall
        const ht = window.innerHeight - 56;
        return (
                <Layout fixedHeader>
                    <Header  
                        title={<span style={{webkitAppRegion: "drag"}}><strong>Snippet-Fu</strong></span>}>
                        <Navigation>
                            <strong>
                            <Icon
                                name="clear" 
                                style={{webkitAppRegion:"no-drag", cursor:"pointer"}} 
                                onClick={()=>{window.close()}} />
                            </strong>
                        </Navigation>
                    </Header>
                    <Drawer title={<span><strong>Snippet-Fu</strong></span>}>
                        <Navigation>
                            <MenuItemDialog key="datapath" menuItem="Data path" dialogContent={snippetsFilePath} />  
                            <AboutDialog key="about" />
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
                        active={this.props.toast.show}
                        onTimeout={this.props.hideToast}>
                        {this.props.toast.text}
                    </Snackbar>
                </Layout>
        );
    }

    copySnippet(snippet){
        clipboard.writeText(snippet.text)
        this.props.showToast("Copied to clipboard")
        //clipboard.set(snippet.text);
        console.log("copying snippet with key:".concat(snippet.snippetKey).concat(" text:").concat(snippet.text))
    }
}

function snippetStoreSig(snippets){
    var hash = crypto.createHash('md5')
    snippets.forEach((snippet)=>{
        hash.update(snippet.snippetKey)
    })
    return hash.digest('hex')
}

const mapStateToProps = (state) => {
    return {
        snippets: state.snippets,
        toast: state.toast
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addSnippet: (text) => {
            dispatch(addSnippet(text))
        },
        delSnippet: (snippet) => {
            dispatch(delSnippet(snippet))
        },
        showToast: (text) => {
            dispatch(showToast(text))
        },
        hideToast: () => {
            dispatch(hideToast())
        }
    }
}

const App = connect(
    mapStateToProps,
    mapDispatchToProps
)(PresApp)

let store = createStore(reducer)
ReactDOM.render(
    <Provider store={store}>
    <App />
    </Provider>,
    document.getElementById('root')
);

let prevSig = snippetStoreSig(store.getState().snippets) 

try{
    let snippets= loadSnippets(snippetsFilePath)
    store.dispatch(initSnippets(snippets))

    store.subscribe(()=>{
        let curState = store.getState()
        let newSig = snippetStoreSig(curState.snippets)
        console.log(curState);

        // persist data only if snippet store signature has changed
        if(prevSig !== newSig){
            saveSnippets(snippetsFilePath, curState.snippets, (err)=>{
                if(err){
                    store.dispatch(showToast("Error saving:".concat(err)))
                    console.log("error in saving snippets to ".concat(snippetsFilePath))
                    console.log(err)
                }else{
                    store.dispatch(showToast("Saved successfully."))
                    console.log("successfully saved snippets to ".concat(snippetsFilePath))
                }
            });
            prevSig = newSig
        }
    })    
}catch (err){
    console.log(err)
    store.dispatch(showToast(err))
}


