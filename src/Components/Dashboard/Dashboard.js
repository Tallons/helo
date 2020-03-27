import React from "react";
import Post from "../Post/Post"


class Dashboard extends React.Component {
   constructor(){
      super()
      this.state = {
         searchValue: "",
         myPosts: []
      }
   }

   render(){
      return(
         <div> 
            <div>
               <input placeholder="name"
                     name="search"/>
               <button>Search</button>
               <button>Reset</button>
            </div>
            {this.state.myPosts.map((post, index) => {
               return <Post key={index} 
                     post={post} 
               />
            })}
         </div>
      )
   }
}

export default Dashboard;