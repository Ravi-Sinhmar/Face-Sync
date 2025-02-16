// .env config
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

// Importing Database connection module
const meets = require("./Models/meets");


// Middlewares
app.use(
  cors({
    origin: "https://face-sync-video.vercel.app", // Allow requests from this origin
    methods: "GET, POST, PUT, DELETE", // Allowed methods
    credentials: true, // Allow credentials (cookies, authorization headers)
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));



const meetRoutes = require('./routes/meetRoutes');

// Use the routes
app.use('/', meetRoutes); // Base path for meet routes


// Testing
app.post("/local",(req,res)=>{
try {
  console.log("I got the local");
console.log(req.body);
  if(req.body){ 
    res.status(200).json({status:'success',message:"req.body is true"})
  }else{res.status(404).json({status:'fail',message:'no req.boyd'})}
} catch (error) {
  console.log(error);
  res.status(500).json({status:'fail',message:error});
}

});



module.exports = { app };