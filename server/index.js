require("dotenv").config();
   const express = require("express"),
         massive = require("massive"),
         session = require("express-session"),
         {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env,
         authCtrl = require("./Controllers/authController"),
         postCtrl = require("./Controllers/postController")
         port = SERVER_PORT,
         app = express();

   app.use(express.json());

   app.use(session({
      resave: false,
      saveUninitialized: true,
      secret: SESSION_SECRET,
   }))

   massive({
      connectionString: CONNECTION_STRING,
      ssl: {rejectUnauthorized: false}
   }).then(db => {
      app.set("db", db);
      console.log("Your db is ALIVE!")
   });

   //authentication endpoints
   app.post("/api/auth/register", authCtrl.register);
   app.post("/api/auth/login", authCtrl.login);
   app.post("/api/auth/logout", authCtrl.logout);
   app.get("/api/auth/me", authCtrl.getUserInfo)

   //user post endpoints
   app.get("/api/posts", postCtrl.getPosts); // remove?
   app.post("/api/posts", postCtrl.createPost);
   app.get("/api/posts/:userid", postCtrl.getUserPosts);
   app.delete("/api/post/:postid", postCtrl.deletePost)
   app.get("/api/post/:postid", postCtrl.getPost);

   
   app.listen(port, () => console.log("Server is on Port " + port));
   
