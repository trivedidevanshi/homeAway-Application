import _ from "lodash"; 
import { T_LOGIN } from "../actions";

//Reducer listening to different action types
//initial state is {}
export default function(state = {}, action) {
  switch (action.type) {
    //target 
    case T_LOGIN:
      
      return _.mapKeys(action.payload.data, "email");
    default:
      return state;
  }
}
