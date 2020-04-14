import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {getUserInfo} from "../../Redux/reducer"
import axios from "axios";

class Nav extends React.Component{
   constructor(props){
      super(props)
      this.state = {
         username: "",
         profile_pic: ""
      }
   }

   componentDidMount(){
      getUserInfo()
         console.log(this.props)
         // this.setState({})
      
      console.log(this.props.user)
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
         <div className="nav-bar"> 
            <button value="home" onClick={(event)=>this.navHandle(event)}>Home</button>
            <button value="newPost" onClick={(event)=>this.navHandle(event)}>New Post</button>
            <button onClick={()=>this.handleLogout()}>Logout</button>
            {this.props.user.username}
         </div>
      )
   }
}
   const mapStateToProps = (reduxState) => reduxState  
export default withRouter(connect(mapStateToProps, {getUserInfo})(Nav));