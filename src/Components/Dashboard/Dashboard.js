import React from "react";
import {Link} from "react-router-dom";
import axios from "axios";

class Dashboard extends React.Component {
   constructor(){
      super()
      this.state = {
         posts: [],
         searchValue: "",
         userPosts: true
      };
   }

   componentDidMount(){
      console.log(this.props)
      this.getPosts()
   }

   getPosts(){ //put the search stuff inside
      axios.get("/api/posts").then(({data}) => {
         this.setState({ posts: [...data]})
      })
   };

   searchReset(){

   };


   render(){
      return(
         <div> 
            <div>
               <input placeholder="name"
                     name="search"/>
               <button>Search</button>
               <button>Reset</button>
            </div>
            {this.state.posts.map((post, index) => {
               return <Link to={`/post/${post.post_id}`}>
                        <div key={index}>
                           <div> {post.title} </div>
                           <img src={post.img} height="300px"/>
                           <div> {post.content} </div>
                        </div>
                      </Link>
               
            })}
         </div>
      )
   }
}


export default Dashboard;