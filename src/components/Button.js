import React from 'react'

const Button = (props) => {
    const className = `button ${props.type}`
    return (
      <button 
        className={className} 
        onClick={props.handleClick}
       >
        {props.icon && props.icon} {props.label}
      </button>
    );
   }
   
   Button.defaultProps = {
    type: "secondary"
   };

export default Button;