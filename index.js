const express = require("express");
const mongoose = require("mongoose");

const port = 3000;
const app = express();

//--------------DB CONNECTION-----------------------------------------

mongoose
  .connect("mongodb://127.0.0.1:27017/testing")
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch((error) => console.log(error));

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    gender: {
      type: String,
    },
    jobTitle: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);

//---------------------------------------------------------------------

//middleware
app.use(express.urlencoded({ extended: false }));

// getting all users present
app.get("/api/users", async (req, res) => {
  // console.log("hi");
  const allUsers = await User.find({});
  return res.status(200).json(allUsers);
});

app
  .route("/api/users/:id")
  .get(async (req, res) => {
    // const id = Number(req.params.id)
    // console.log(typeof(id));
    // const user = users.find((user) => {
    //     return user.id === id
    // })
    // // console.log(user)
    // return res.json(user)

    // const searchedUser = await User.findById(req.params.id)
    // if(!searchedUser) return res.status(400).json({error:"no user"})
    // return res.status(200).json(searchedUser)

    try {
      // Validate ID
      if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).json({ error: "Invalid ID" });
      }

      // Convert ID if necessary
      // const userId = new mongoose.Types.ObjectId(req.params.id);

      // Find user
      const searchedUser = await User.findById(req.params.id);

      if (!searchedUser) {
        return res.status(404).json({ error: "User not found" }); // 404 for not found
      }

      return res.status(200).json(searchedUser);
    } catch (error) {
      console.error("Error finding user:", error);
      return res.status(500).json({ error: "Internal server error" }); // 500 for unexpected errors
    }
  })
  .patch(async (req, res) => {
    // const id = Number(req.params.id);
    // const body = req.body;
    // const user = users.find((user) => {
    //   return user.id === id;
    // const updatedUser = { ...user, ...body };
    // updatedUser.id = id;
    // // console.log(updatedUser);
    // // users.push(updatedUser)
    // users[id - 1] = updatedUser;
    // fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    //   return res.json({ status: "success" });
    // });
    try {
      if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).json({ error: "Invalid ID" });
      }
      await User.findByIdAndUpdate(req.params.id, {lastName:"Changed"} ) 
      return res.status(200).json({msg:"success"})
    } catch (error) {
      console.log(error);
    }
    })
  .delete(async (req, res) => {
    // const id = Number(req.params.id);
    // const user = users.find( (user)=>{
    //     return user.id === id
    // } )
    // console.log(user);
    // const modified = users.filter( (members)=>{
    //     return members.id !== id
    // } )
    // console.log(modifiedUsers[0]);
    // return res.json({ status: "pending" })
    // const userInd = users.findIndex((user) => {
    //   return user.id === id;
    // });
    // const deletedUser = users.splice(userInd, 1)[0];
    // // console.log(deletedUser);
    // fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    //   return res.json({ status: "success", deletedUser });
    // });
    // res.json({status:"success"})
    try {
      if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).json({ error: "Invalid ID" });
      }
      await User.findByIdAndDelete(req.params.id)
      return res.status(200).json({msg:"deleted"})
    } catch (error) {
      console.log(error);
    }
  
  });

// Creating new user through post
app.post("/api/users", async (req, res) => {
  const body = req.body;
  // console.log(body);
  // users.push({...body, id : users.length+1})
  // fs.writeFile('./MOCK_DATA.json',JSON.stringify(users), (err,data)=>{
  //     return res.json( {status:"success", id:users.length} )
  // })
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.job_title
  ) {
    return res.status(400).json({
      msg: "All fields are required",
    });
  }

  const createdUser = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    gender: body.gender,
    jobTitle: body.job_title,
  });

  return res.status(201).json({ msg: "Success" });
});

app.listen(port, () => {
  console.log("server running");
});
