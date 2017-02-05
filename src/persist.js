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
const fs = window.require('fs');

export function saveSnippets(filepath, snippets, callback){
    fs.writeFile(filepath, JSON.stringify(snippets, null, 4), callback)
}

export function loadSnippets(filepath, defValues, callback){
    fs.readFile(filepath, "utf8", (err, data)=>{
        if(err){
            callback(err, defValues)
            return
        }
        try{
            let snippets = JSON.parse(data)
            callback(undefined, snippets)
        }catch (e) {
            callback(e, defValues)
        }
    })
}