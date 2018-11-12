import React from "react";
import ReactDOM from "react-dom";


/* If value length is equal to zero, then we return true, else we return false */
export const  isEmpty = (value) => {
        
        if(value.length == 0){
            return true;
        }
        
        return false;
}
