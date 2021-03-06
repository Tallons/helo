module.exports ={
   getPosts: (req, res) => {
      db = req.app.get("db");
      db.post.get_all_posts()
      .then(posts => res.status(200).send(posts))
      .catch(err => res.status(500).send(err))
   },

   createPost: (req, res) => {
      const {title, img, content, author_id} = req.body,
            db = req.app.get("db");
            console.log(req.body);
         db.post.create_post(title, img, content, +author_id)
         .then(() => res.sendStatus(200))
         .catch(err => res.status(500).send(err))
   },

   getPost: (req, res) => {
      const {postid} = req.params
            db = req.app.get("db");
      
         console.log(db.post.get_post(postid).then(post => console.log(post)))
         db.post.get_post(+postid)
         .then(post => res.status(200).send(post))
         .catch(err => res.status(500).send(err))
   },

   deletePost: (req, res) => {
      const db = req.app.get("db"),
            {postid} = req.params;
      db.post.delete_post(+postid).then(post => {
         res.status(200).send(post)
      }).catch (err => res.status(500).send(err))
   },

   getUserPosts: ( req, res) => {
      const db = req.app.get("db"),
            {title, author_id} = req.body,
            {userPosts, searchString} = req.params,
            {userid} = req.session

         if(userPosts && !searchString === ""){
            db.post.get_my_post_by_title(title, userid)
               .then(posts => res.status(200).send(posts))
               .catch(err => res.status(500).send(err))
         } else if (!userPosts && searchString === ""){
            db.post.get_other_posts (userid)
               .then(posts => res.status(200).send(posts))
               .catch(err => res.status(500).send(err))
         } else if (!userPosts && !searchString === ""){
            db.post.get_post_by_title(title, userid)
               .then(posts => res.status(200).send(posts))
               .catch(err => res.status(500).send(err))
         } else {
            db.post.get_all_posts()
               .then(posts => res.status(200).send(posts))
               .catch(err => res.status(500).send(err))
         }
   }

}