import axios from "axios";

import {ROOT_URL} from '../root_url';
//export const FETCH_BOOKS = "fetch_books";
export const T_LOGIN = "t_login";
export const GET_USER_PROFILE = "GET_USER_PROFILE";

//const ROOT_URL = "http://localhost:3001";

//target action

export function travelerLoginAction(values, callback) {
  const request = axios
    .post(`${ROOT_URL}/travelerLogin`, values, {withCredentials:true})
    .then((response) =>{
      console.log("The response in action is : ",response);
      callback(response);
      return response;

    }, (error)=>{
      console.log("The error is : ",error);
      callback(error);
      return error;
    }
    );
  return {
    type: T_LOGIN,
    payload: request
  };
}

export function getUserProfile() {
  const response = axios
    .get(`${ROOT_URL}/userProfile`, {withCredentials:true});

  console.log("Response from get userProfile",response);
  return {
    type: GET_USER_PROFILE,
    payload: response
  };
}

