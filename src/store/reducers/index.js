import { combineReducers } from "redux";
import MainReducer from "./MainReducer";

const rootReducer = combineReducers({
  main: MainReducer,
});

export default rootReducer;
