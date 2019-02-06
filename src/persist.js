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
const path = window.require('path');
const fs = window.require('fs');
const {app} = window.require('electron').remote;
export let snippetsFilePath = path.join(app.getPath("userData"),"snippet-fu-v2.json")

export function loadSnippets(){
    let data = ""
    try{
        data = fs.readFileSync(snippetsFilePath, 'utf8')
    }
    catch(err){
        // if the error was something other than "file not found" (ENOENT), we will return
        if(err.code !== 'ENOENT'){
            return {data:[], err:"Error reading data file:".concat(snippetsFilePath).concat(" : ").concat(err.message)}
        }

        // if the error was "file not found" which is coded by ENOENT, perhaps its the first
        // execution of the program and we can try to create it with initdata. If successful
        // we will simply return initdata
        try{
            fs.writeFileSync(snippetsFilePath, JSON.stringify(initData),{encoding:"utf8"})
        }catch(e){
            return {data:[], err: "Error creating data file:".concat(snippetsFilePath).concat(" : ").concat(e.message)}
        }

        let ret = initData.map((snippet)=>{
            return Object.assign({},snippet)
        })
        return {data:ret, err:null}
    }

    // now we have the data, let's parse JSON
    let parsedData = []
    try{
        parsedData = JSON.parse(data)
    }catch(err){
        return {data:[],err:"File ".concat(snippetsFilePath).concat(" exists but data is corrupted. ").concat(err.message).concat(". Check manually or delete file to start fresh.")}
    }

    // now let's check that it's an array
    if(!Array.isArray(parsedData)){
        return {data:[],err: "File ".concat(snippetsFilePath).concat(" found but data corrupted: Missing snippet array. Check manually or delete file to start fresh.")}
    }

    // then let's check it's got a snippetKey and a text field defined
    if(!parsedData.every(snippet=>{
        return 'title' in snippet && 'subtitle' in snippet                 
    })){
        return {data:[],err: "File ".concat(snippetsFilePath).concat(" found but data corrupted: Some fields missing snippetKey and/or text fields. Check manually or delete file to start fresh.")}
    }

    return {data:parsedData,err:null}

}

export function saveSnippets(snippets, callback){
    fs.writeFile(snippetsFilePath, JSON.stringify(snippets, null, 4), callback)
}
