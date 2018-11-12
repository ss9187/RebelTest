import React from "react";
import ReactDOM from "react-dom";


const Button = (props) => {
    return(
        <button aria-label={props.name} className={props.className} onClick={() => props.onClick()}
        tabIndex={props.tabIndex}>{props.name}</button>
    );
    
}

export default Button;