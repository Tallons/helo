import React from "react";
import {Link} from "react-router-dom";
import axios from "axios";

class Dashboard extends React.Component {
   constructor(){
      super()
      this.state = {
         posts: [],
         searchString: "",
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

   titleSearch() {
      const {searchString, userPosts} = this.state
      console.log("titleSearch Hit")
      console.log(searchString)
      console.log(userPosts)
   axios.get(`/api/posts/?title=${searchString}`, {userPosts}).than(({data}) => {
      this.setState({ posts: [...data]})
   })
   }

   render(){
      {console.log(this.state.userPosts)}
      return(
         <div className="dashboard"> 
            <div>
               <input placeholder="name"
                     name="search"
                     value={this.state.searchString}
                     onChange={(event) => this.setState({searchString: event.target.value})}/>
                     
               <button onClick={() => this.titleSearch()}>Search</button>
               <button onClick={() => this.setState({searchString: ""})}>Reset</button>
            </div>
            <input type="checkbox" checked={this.state.userPosts}
                   onChange={() => this.setState({userPosts: !this.state.userPosts})}
                   /><span>My Posts </span>
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