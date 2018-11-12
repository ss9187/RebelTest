import React, { Component } from "react";
import axios from "axios";
import {MOCK_URL} from  '../constants/constants';

export function SubmitAPI(formObject){
  /* MOCK_URL = null; (Instead of hitting the error url, if we make the MOCK_URL of success as null, 
                        then we can dispatch error in the catch method) */
  return function(dispatch) {
    axios.get(MOCK_URL).then((data)=>{
        dispatch({
                type: "SUCCESS",
                payload: data.data
            });
        }).catch(() => {
            dispatch({
                type:"ERROR",
                payload:false
            })
        });
    }
};

/* When Back button is pressed, we reset both Success and Error States*/
export function ClickBack(){
    return function(dispatch){
        dispatch({
            type:"RESET",
            payload:"reset"
        });
    }
}