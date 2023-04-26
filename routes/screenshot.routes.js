const express = require("express");
const mongoose = require('mongoose');
const screenshot = require('screenshot-desktop');
const fs = require('fs');
const base64js = require('base64-js');
const screenShotRoute= express.Router();

const ImageModel = mongoose.model('ScreenShort', new mongoose.Schema({
    usersId: { type: String, required: true},
    type: { type: String, required: true},
    image: { type: String,  required: true},
    uploadedAt: {type: String},
  }));

let intervalId;
screenShotRoute.post('/:userId/projects/screenshot', async(req, res) => {
    const userId = req.params.userId
  const shouldStart = req.body.shouldStart;
  if (shouldStart) {
    const timer=3*60*1000;
    intervalId = setInterval(
        
        async function captureAndSaveImage() {

            screenshot({format: 'png'}).then((img) => {
        
                // Convert the PNG image buffer to base64
        const base64Image = base64js.fromByteArray(img);
        
         const baseImage="data:image/png;base64,"+`${base64Image}`
        
                  ImageModel.insertMany([
                    {
                     usersId:userId , 
                      type: 'image/png',
                      image:`${baseImage}`,
                      uploadedAt: new Date()
                    },
                    
                    ],{ unique: true }).then(function(){
                        // console.log("Data inserted") // Success
                        return ;
                    }).catch(function(error){
                        // console.log(error)	 // Failure
                        res.send(error)
                    });
        
        
              }).catch((err) => {
                console.log(err);
              })
        
          
        }

        
        
        , timer); // execute function every 3 minutes
  } else {
    clearInterval(intervalId);
  }

  res.send('Success');
});





module.exports = screenShotRoute;
