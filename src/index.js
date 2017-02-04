import React, { Component } from 'react';
import {List, Icon} from 'react-mdl'
import Snippet from './snippet'
import SnippetInput from './snippetinput'
import {createStore} from 'redux'
import {newSnippet, reducer, addSnippet, delSnippet, initSnippets} from './store'
import {Layout, Header, Navigation, Drawer, Content} from 'react-mdl'
//const clipboard = window.nw.Clipboard.get()
import {initdata} from './initdata'
import {connect, Provider} from 'react-redux'
import ReactDOM from 'react-dom';
import './index.css';
import 'react-mdl/extra/material.css';
import 'react-mdl/extra/material.js';
import {loadSnippets, saveSnippets} from './persist'
const path = window.require('path');
const {clipboard} = window.require('electron')
const {app} = window.require('electron').remote;

let snippetsFilePath = path.join(app.getPath("documents"),"snippet-fu.json")
initdata.push(newSnippet("Your snippets will be saved in:"))
initdata.push(newSnippet(snippetsFilePath))

class PresApp extends Component {
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
                    copySnippet={this.props.copySnippet} 
                    delSnippet={this.props.delSnippet} 
                    background={background}
                    snippet={this.props.snippets[j]} />
            )
        }        
        const ht = window.innerHeight - 56; 
        return (
            <div>
                <Layout fixedHeader>
                    <Header  
                        title={<span style={{webkitAppRegion: "drag"}}><strong>Snippet-Fu</strong></span>}>
                        <Navigation>
                            <Icon 
                                name="clear"
                                style={{webkitAppRegion:"no-drag", cursor:"pointer"}}
                                onClick={()=>{window.close()}}
                            />
                        </Navigation>
                    </Header>
                    <Drawer title={<span><strong>Snippet-Fu</strong></span>}>
                        <Navigation>
                            <div>Export</div>
                            <div>About</div>
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
                </Layout>
            </div>
        );
    }
}

function copySnippet(snippet){
    clipboard.writeText(snippet.text)
    //clipboard.set(snippet.text);
    console.log("copying snippet with key:".concat(snippet.snippetKey).concat(" text:").concat(snippet.text))
}


const mapStateToProps = (state) => {
    return {
        copySnippet: copySnippet,
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
