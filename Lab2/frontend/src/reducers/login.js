import _ from "lodash"; 
import { T_LOGIN } from "../actions";
import { GET_USER_PROFILE } from "../actions";

//Reducer listening to different action types
//initial state is {}
export default function(state = {}, action) {
  switch (action.type) {
    //target 
    case T_LOGIN:

    /*return{
      ...state,
      travelerData : action.payload.data
    }*/
      /* console.log("Payload data : "+JSON.stringify(action.payload.data.traveleremail));
      var data = { travelerData : action.payload.data.traveleremail}
      state = Object.assign({},data);
      return state;
 */ console.log("action payload data",action.payload.data);
      return action.payload.data;

      //return _.mapKeys(action.payload.data, "email");
    
    case GET_USER_PROFILE:
      console.log("Payload data user profile : "+JSON.stringify(action.payload.data));
      var data = { userData : action.payload.data}
      state = Object.assign({},data);
      return state;

    default:
      return state;
  }
}
