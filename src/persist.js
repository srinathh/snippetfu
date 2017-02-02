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