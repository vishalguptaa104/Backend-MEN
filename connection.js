const mongoose = require("mongoose");

// mongoose
//   .connect("mongodb://127.0.0.1:27017/testing")
//   .then(() => {
//     console.log("DB CONNECTED");
//   })
//   .catch((error) => console.log(error));

  const connectMongoDB = async (url) => {
    try {
        console.log("DB connected!");
        return await mongoose.connect(url)
    } catch (error) {
        console.log("not connected");
    }
    
  }

  module.exports = { connectMongoDB, }