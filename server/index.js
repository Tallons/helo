require("dotenv").config();
   const express = require("express"),
         massive = require("massive"),
         session = require("express-session"),
         {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env,
         ctrl = require("./Controllers/controller"),
         postCtrl = require("./Controllers/postController.js")
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
   app.post("/api/register", ctrl.register);
   app.post("/api/login", ctrl.login);
   app.get("/api/logout", ctrl.logout);

   //user post endpoints
   app.post("/api/posts", postCtrl.createPost);

   
   app.listen(port, () => console.log("Server is on Port " + port));
   
