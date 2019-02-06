import React, {Component} from 'react';
import {ListItem, ListItemText, ListItemMeta} from '@material/react-list'
import PropTypes from 'prop-types'
import MaterialIcon from '@material/react-material-icon';


import "@material/react-list/dist/list.css";
import "@material/react-material-icon/dist/material-icon.css"

export default class Item extends Component{
    render(){

        let bgColor = "#ffffff"
        if(this.props.index % 2 === 0){
           bgColor = "#E1F5FE"
        }

        return(
            <ListItem 
                style={{backgroundColor:bgColor}}
                onClick={()=>this.props.clickFunc(this.props.subtitle)} >
                <ListItemText 
                    primaryText={this.props.title}
                    secondaryText={this.props.subtitle} />
                <ListItemMeta 
                    meta={<MaterialIcon icon='delete'/>} 
                    onClick={()=>this.props.delFunc(this.props.index)} />
            </ListItem>
        )
    }
}

Item.propTypes = {
    title       : PropTypes.string.isRequired,
    subtitle    : PropTypes.string.isRequired,
    index       : PropTypes.number.isRequired,
    clickFunc   : PropTypes.func.isRequired,
    delFunc   : PropTypes.func.isRequired
}