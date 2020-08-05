import React from 'react';
import '../Pages/Hall/Hall.css'

const Card = ({item, preço, ...props}) => {
  return (
    <div className="card">
    {item}
    {preço}
   
    </div>
  )
}

export default Card

