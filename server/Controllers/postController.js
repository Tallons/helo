module.exports ={
   createPost: (req, res) => {
      const {id, post} = req.body,
            db = req.app.get("db");
      
            db.post.create_post(id, post)
            .then(() => res.sendStatus(200))
            .catch(err => res.status(500).send(err))
   },

}