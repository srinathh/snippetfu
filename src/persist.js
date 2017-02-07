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
import {initData} from './initdata'
import {newSnippet} from './store'

const fs = window.require('fs');

export function loadSnippets(filepath){
    let data = ""
    try{
        data = fs.readFileSync(filepath, 'utf8')
    }
    catch(err){
        // if the error was a "file not found" which is coded by ENOENT, perhaps its the first
        // execution of the program and we can create it. Otherwise, we can't handle it & throw it
        if(err.code !== 'ENOENT'){
            throw "Error reading data file:".concat(filepath).concat(" : ").concat(err.message)
        }

        try{
            fs.writeFileSync(filepath, JSON.stringify(initData),{encoding:"utf8"})
        }catch(e){
            throw "Error creating data file:".concat(filepath).concat(" : ").concat(e.message)
        }

        let ret = initData.map((snippet)=>{
            return Object.assign({},snippet)
        })
        console.log("creating new file")
        console.log(ret)
        return ret

    }

    // now we have the data, let's parse JSON
    let parsedData = []
    try{
        parsedData = JSON.parse(data)
    }catch(err){
        throw "File ".concat(filepath).concat(" exists but data is corrupted. ").concat(err.message).concat(". Check manually or delete file to start fresh.")
    }

    // now let's check that it's an array
    if(!Array.isArray(parsedData)){
        throw "File ".concat(filepath).concat(" found but data corrupted: Missing snippet array. Check manually or delete file to start fresh.")
    }

    // then let's check it's got a snippetKey and a text field defined
    if(!parsedData.every(snippet=>{
        return 'snippetKey' in snippet && 'text' in snippet                 
    })){
        throw "File ".concat(filepath).concat(" found but data corrupted: Some fields missing snippetKey and/or text fields. Check manually or delete file to start fresh.")
    }

    return parsedData
}

export function saveSnippets(filepath, snippets, callback){
    fs.writeFile(filepath, JSON.stringify(snippets, null, 4), callback)
}
