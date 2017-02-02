const uuidV4 = require('uuid/v4');

const ADD_SNIPPET = 'ADD_SNIPPET'
const DEL_SNIPPET = 'DEL_SNIPPET'
const INIT_SNIPPETS = 'INIT_SNIPPETS'

export function newSnippet(text){
    return {
        text: text,
        snippetKey: uuidV4() 
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
    snippets:[]
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
        default:
            return state
    }
}