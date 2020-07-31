import React from 'react'
import { Link } from 'react-router-dom';

const BtLink = (props) => {
    return (
        <Link to={props.page} variant="body2">{props.name}</Link> 
    )
}
export default BtLink;
