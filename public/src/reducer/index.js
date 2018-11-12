import { combineReducers, createStore } from "redux";
import {formReducer} from "./formReducer";

const rootReducer = combineReducers({
    form:formReducer
});
  
export default rootReducer;