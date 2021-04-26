import { combineReducers } from "redux";
import bagCounterReducer from "./bagCounterReducer";
import authReducer from "./authReducer";

const allReducers = combineReducers({
  bagCounter: bagCounterReducer,
  auth: authReducer
});

export default allReducers;
