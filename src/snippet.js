import React from 'react';
import {ListItem, ListItemContent, ListItemAction, Icon, Tooltip} from 'react-mdl'

class Snippet extends React.Component{
    render(){
        return(
            <ListItem style={{background:this.props.background}}>
                <ListItemContent>
                    <Tooltip label="Click text to copy">
                        <div 
                            onClick={()=>{this.props.copySnippet(this.props.snippet)}}
                            style={{fontFamily:"monospace", width:320, overflowWrap:"break-word"}}>
                            {this.props.snippet.text}
                        </div>
                    </Tooltip>
                </ListItemContent>
                <ListItemAction>
                    <Icon style={{width:32}} name="delete" onClick={()=>this.props.delSnippet(this.props.snippet)}/>
                </ListItemAction>
            </ListItem>
        )
    }
}

Snippet.propTypes = {
    copySnippet : React.PropTypes.func.isRequired,
    delSnippet : React.PropTypes.func.isRequired,
    background: React.PropTypes.string.isRequired,
    snippet : React.PropTypes.shape({
        text: React.PropTypes.string.isRequired,
        snippetKey: React.PropTypes.string.isRequired
    })
}

export default Snippet;