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
const uuidV4 = require('uuid/v4');

const ADD_SNIPPET = 'ADD_SNIPPET'
const DEL_SNIPPET = 'DEL_SNIPPET'
const INIT_SNIPPETS = 'INIT_SNIPPETS'
const SHOW_TOAST = 'SHOW_TOAST'
const HIDE_TOAST = 'HIDE_TOAST'

export function newSnippet(text){
    return {
        text: text,
        snippetKey: uuidV4() 
    }
}

export function showToast(text){
    return {
        type: SHOW_TOAST,
        text: text
    }
}

export function hideToast(){
    return {
        type: HIDE_TOAST
    }
}

export function addSnippet(text) {
    return {
        type: ADD_SNIPPET,
        snippet: newSnippet(text)
    }
}

export function initSnippets(snippets){
    return{
        type: INIT_SNIPPETS,
        snippets: snippets
    }
}

export function delSnippet(snippet) {
    return {
        type: DEL_SNIPPET,
        snippet
    }
}

const initialState = {
    snippets:[],
    toast:{
        show:false,
        text:""
    }
}

export function reducer(state = initialState, action){
    switch(action.type){
        case ADD_SNIPPET:
            return Object.assign({}, state,{
                snippets:[
                    ...state.snippets,
                    action.snippet
                ]
            })
        case INIT_SNIPPETS:
            return Object.assign({}, state,{
                snippets:[...action.snippets]
            })
        case DEL_SNIPPET:
            let newList = []
            state.snippets.forEach((snippet)=>{
                if(snippet.snippetKey !== action.snippet.snippetKey)
                    newList.push(Object.assign({},snippet))
            })
            return Object.assign({}, state,{
                snippets:[ ...newList ]
            })
        case SHOW_TOAST:
            return Object.assign({},state,{
                toast:{
                    show:true,
                    text: action.text
                }
            })
        case HIDE_TOAST:
            return Object.assign({},state,{
                toast:{
                    show:false,
                    text:"" 
                }
            })
        default:
            return state
    }
}