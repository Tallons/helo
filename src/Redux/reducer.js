import axios from "axios";

const initialState = {
   user: {
      username: "Noah",
      profile_pic: ""
   }
}

const GET_USER = "GET_USER",
      GET_USER_INFO = "GET_USER_INFO"

export function getUser(userObj){
   console.log(userObj)
   return {
         type: GET_USER,
         payload: userObj
   };
};

export async function getUserInfo(){
   const user = await axios.get("/api/auth/me").then(res=> {
      return res.data[0]
   })
   console.log(user)
   return{ 
      type: GET_USER_INFO,
      payload: user
   }
};

export default function reducer (state = initialState, action) {

   const {type, payload} = action;
   switch(type){

      case GET_USER:
         return {...state, user:payload};
      // case GET_USER_INFO + "_PENDING":   // animation/loading
      case GET_USER_INFO + "_FULFILLED":
         console.log(payload)
         return {...state, user:payload};


      default:
         return state;
   };
};
