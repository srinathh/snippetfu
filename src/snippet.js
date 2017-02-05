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

import React from 'react';
import {ListItem, ListItemContent, ListItemAction, Icon, Tooltip} from 'react-mdl'

class Snippet extends React.Component{
    render(){
        const txtWidth = window.innerWidth-32-16*3;
        return(
            <ListItem style={{background:this.props.background}}>
                <ListItemContent>
                    <Tooltip label="Click text to copy">
                        <div 
                            onClick={()=>{this.props.copySnippet(this.props.snippet)}}
                            style={{fontFamily:"monospace", width:txtWidth, overflowWrap:"break-word"}}>
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