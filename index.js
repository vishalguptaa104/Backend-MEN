const express = require("express");
const { connectMongoDB } = require('./connection.js')

const {logReqRes} = require("./middlewares");

const userRouter = require('./routes/user-route.js')

const port = 3000;
const app = express();

// CONNECTING MONGODB
connectMongoDB("mongodb://127.0.0.1:27017/testing")

//middleware
app.use(express.urlencoded({ extended: false }));
app.use(logReqRes('logs.txt'))

app.use('/api/users', userRouter)

app.listen(port, () => {
  console.log("server running");
});
