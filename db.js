const mongoose = require('mongoose');
const fs = require('fs');
require("dotenv").config();
const database =process.env.DATABASE 
const connection = async () => {
  try {
    const connected = await mongoose.connect(
      "mongodb+srv://atul:ermechcoder@cluster0.fq4j3um.mongodb.net/merndata?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

 

    console.log(`MongoDb Connected successfully`);
  } catch (error) {
    console.log(`Error occurred, ${error.message}`);
  }
};


  // Close the database connection

module.exports = { connection };