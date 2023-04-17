
const express = require("express");
const screenshot = require('screenshot-desktop');
const fs = require('fs');
const mongoose = require('mongoose');
require("dotenv").config();
const app = express();
const cors = require("cors");
const {connection} = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const projectRouter = require("./routes/project.routes");
const engineerprofileRouter = require("./routes/engineerprofile.routes.js");
const screenshotRoute = require("./routes/screenshot.routes")

// database connection

connection();




// const User = mongoose.model('ScreenShort', {
//   username: { type: String, required: true},
//   type: { type: String, required: true},
//   image: { type: String,  required: true},
//   uploadedAt: {type: String},
// });

// // Function call to Take window Image 

// const interval=10*60*1000 //10 minutes


// setInterval(() => {
//     screenshot({format: 'png'}).then((img) => {
//         fs.writeFileSync('picture.png',img);
//         const dateObj = new Date();
//         console.log(`Date: ${dateObj.toDateString()}`);
//         console.log(`Time: ${dateObj.toTimeString()}`);
//         console.log("captured window image")
//       }).catch((err) => {
//         console.log(err);
//       })
    
// }, interval);




// Function call to Save  window Image into Database


// function readAndStoreImages() {
//     User.insertMany([
//     {
//       username: 'Atul T',
//       type: 'image/png',
//       image:"data:image/png;base64,"+fs.readFileSync('picture.png','base64'),
//       uploadedAt: new Date()
//     },
    
//     ],{ unique: true }).then(function(){
//         console.log("Data inserted") // Success
//     }).catch(function(error){
//         console.log(error)	 // Failure
//     });
//   }

//   const timer=10*60*1000;
//   // Call the readAndStoreImages function every 5 seconds
//   setInterval(readAndStoreImages, timer);
 






// console.log(content)


// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", projectRouter);
app.use("/api/user", engineerprofileRouter);
app.use("/api/user",screenshotRoute)
// app.use("/api",userscreenRouter)

app.get("/api", async (req, res) => {
  const tasks = await   User.find()
  res.send(tasks)
})



const port = process.env.PORT || 8000;
app.listen(port, console.log(`Listening on port ${port}...`));