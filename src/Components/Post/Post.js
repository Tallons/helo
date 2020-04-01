import React from "react";
import axios from "axios";


class Post extends React.Component{
   constructor(){
      super()
      this.state = {
      title: "",
      img: "",
      content: "",
      author: "",
      authorPicture: ""
      }
   }

   componentDidMount(){
      axios.get(`/api/post/${this.props.match.params.postid}`)
      .then(({data}) => {
         console.log({data})
         this.setState({
            title: data[0].title,
            img: data[0].img,
            content: data[0].content,
            author: data[0].username,
            authorPicture: data[0].profile_pic
         })
      })
   }

   handleDelete(id){
         axios.delete(`/api/post/${id}`)
           .then(() => this.props.history.push("/dashboard"));
       }

   render(){
      const {title, img, content, author, authorPicture} = this.state,
            {postid} = this.props.match.params
      return(
         <div> 
            <h1>{title}</h1>
            <img src={img}/>
            <h1>{content}</h1>
            <h1>{author}</h1>
            <h1>{authorPicture}</h1>
            {

            <button onClick={()=> this.handleDelete(postid)}>Delete Post</button>
            }
         </div>
      )
   }
}

export default Post;