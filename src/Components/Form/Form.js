import React from "react";
import axios from "axios";
import {connect} from "react-redux"


class Form extends React.Component{
   constructor(){
      super()
      this.state ={
         title: "",
         img: "",
         content: ""
      }
   }

   handleChange(event){
      this.setState({[event.target.name]:event.target.value})
   }

   createPost(){
      const {title, img, content} = this.state,
            {userid} = this.props
      axios.post('/api/post', {title, img, content, userid}).
      then(()=>{
         this.props.history.push("/dashboard")
      })
   }

   render(){
      return(
         <div>
            <input value={this.state.title} name="title" onChange={(event) => this.handleChange(event)} placeholder="title"/>
            <input value={this.state.img} name="img"  height="300px" onChange={(event) => this.handleChange(event)} placeholder="img"/>
            <input value={this.state.content} name="content" onChange={(event) => this.handleChange(event)} placeholder="content"/>
            <button>Post</button>
         </div>
      )
   }
}
const mapStateToProps = reduxState => ({userid:reduxState.userid})
export default connect(mapStateToProps)(Form);
