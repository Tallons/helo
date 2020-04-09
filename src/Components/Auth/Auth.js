import React from "react";
import {connect} from "react-redux";
import {getUser} from "../../Redux/reducer";
import axios from "axios";


class Auth extends React.Component{
   constructor(){
      super()
      this.state = {
         username: "",
         password: "",
         registerView: false
      }
   }

   handleInput = (event) => {
      this.setState({ [event.target.name]: event.target.value })
   }

   handleLogin = () => {
      const {username, password} = this.state;
      axios.post("/api/auth/login", {username, password}).then(res => {
         this.props.getUser(res.data) 
         this.props.history.push("/dashboard")
      }).catch(err => console.log(err))
   }

   handleRegister = () => {
      const {username, password} = this.state;
      axios.post("/api/auth/register", {username, password}).then(res => {
         this.props.getUser(res.data);
         this.props.history.push("/dashboard");
      }).catch(err => console.log(err))
    }

   render(){
      return(
         <div className="Auth">
            <div>
               <h3> Username </h3>
               <input placeholder="username" 
                     name="username"
                     onChange={(event) => this.handleInput(event)}/>
               <h3> Password </h3>
               <input placeholder="password" 
                     type="password" 
                     name="password"
                     onChange={(event) => this.handleInput(event)}/>
            </div>
            <button onClick={this.handleLogin}> Login </button>   
            <button onClick={this.handleRegister}> Register </button>  
         </div>
      )
   }
}

export default connect(null, {getUser} )(Auth);