import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {getUser} from "../../Redux/reducer"
import axios from "axios";

class Nav extends React.Component{
   constructor(props){
      super(props)
      this.state ={
         username: "",
         profile_pic: ""
      }
   }

   componentDidMount(){
      console.log(this.props.user)
      axios.get("/api/auth/me").then(({data}) => {

         this.setState({username: data[0].username, profile_pic: data[0].profile_pic})
         console.log(this.state.username)
      }).catch(err => console.log("nav: ", err))
   }
   navHandle(event){
      const home = "home",
            newPost = "newPost"
      switch(event.target.value){
         case home:
            this.props.history.push("/dashboard");
            break;
         case newPost:
            this.props.history.push("/new");
            break;
         default:
            break;
      }
   }
   handleLogout(){
      axios.get("/api/auth/logout").then(() => {


         this.props.history.push("/")
      })
   }

   render(){
      console.log(this.props)
      return(
         <div> 
            <button value="home" onClick={(event)=>this.navHandle(event)}>Home</button>
            <button value="newPost" onClick={(event)=>this.navHandle(event)}>New Post</button>
            <button onClick={()=>this.handleLogout()}>Logout</button>
         </div>
      )
   }
}
   const mapStateToProps = (reduxState) => reduxState

export default withRouter(connect(mapStateToProps, {getUser})(Nav));