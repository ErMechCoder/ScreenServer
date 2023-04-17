const express = require("express");
const mongoose = require('mongoose');
const screenshot = require('screenshot-desktop');
const fs = require('fs');
const screenShotRoute= express.Router();


screenShotRoute.post('/:userId/projects/screenshot', async(req, res) => {
    const userId = req.params.userId
    const {start}=  req.body;
   
   //console.log(userId )
   
  if (start===start && userId==userId) {
   // console.log("start screenshot",start)
    // Function call to Take window Image 
  
    const User = mongoose.model('ScreenShort', {
        username: { type: String, required: true},
        type: { type: String, required: true},
        image: { type: String,  required: true},
        uploadedAt: {type: String},
      });
      
    

  const interval=2*60*1000 //10 minutes
  
  
  setInterval(() => {
      screenshot({format: 'png'}).then((img) => {
        
          fs.writeFileSync('picture.png',img);
        //  const dateObj = new Date();
         // console.log(`Date: ${dateObj.toDateString()}`);
         // console.log(`Time: ${dateObj.toTimeString()}`);
         // console.log("captured window image")
        }).catch((err) => {
          console.log(err);
        })
      
  }, interval);
  
  
  
  
  // Function call to Save  window Image into Database
  
  
  function readAndStoreImages() {
      User.insertMany([
      {
        username: userId,
        type: 'image/png',
        image:"data:image/png;base64,"+fs.readFileSync('picture.png','base64'),
        uploadedAt: new Date()
      },
      
      ],{ unique: true }).then(function(){
          console.log("Data inserted") // Success
      }).catch(function(error){
          console.log(error)	 // Failure
      });
    }
  
    const timer=3*60*1000 ;
    // Call the readAndStoreImages function every 5 seconds
    setInterval(readAndStoreImages, timer);
   
  
  
  }else if(start==false) {
    console.log("Please Start Your ScreenShot Again")
  }else{
    console.log("Something Wrong from User")
  }
  
  
    res.sendStatus(200);
  });
  


module.exports = screenShotRoute;
