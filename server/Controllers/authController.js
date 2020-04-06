const bcrypt = require("bcryptjs");

module.exports = {
   register: async (req, res) => {
      const {username, password} = req.body,
            db = req.app.get("db");
            console.log(req.body)
            
      let user = await db.auth.check_user(username);
      console.log(user[0])

         if(user[0]){
            return res.status(400).send("username already exists")
         }
      let salt = bcrypt.genSaltSync(10),
          hash = bcrypt.hashSync(password, salt),
          newUser = await db.auth.register_user({username, password: hash});
            req.session.user = newUser[0];
            req.session.userid = newUser[0].user_id;
            console.log(req.session.userid);
            res.status(201).send(req.session.user)
   },

   login: async (req, res) => {
      const {username, password} = req.body,
            db = req.app.get("db");

      let user = await db.auth.check_user(username);
         if(!user[0]){
            return res.status(400).send("username doesn't exist")
         }
      
      const authenticated = bcrypt.compareSync(password, user[0].password);
         if(!authenticated){
            return res.status(401).send("password is incorrect")
         }

      delete user[0].password;
      req.session.user = user[0];
      req.session.userid = user[0].user_id;
      console.log(req.session.userid);
      res.status(202).send(req.session.user);
   },

   logout: (req,res) => {
      req.session.destroy();
      res.sendStatus(200);
   },

   getUserInfo: (req,res) => {
      console.log("get User: ", req.session.userid);
      const {userid} = req.session,
            db = req.app.get("db");

         db.auth.get_user_info(userid)
         .then(userInfo => {console.log(userInfo), res.status(200).send(userInfo)})
         .catch(err => res.status(500).send(err));
   }
}