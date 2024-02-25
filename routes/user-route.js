const express = require("express");
const { handleGetAllUsers, handleCreateNewUser, handleUserById, handleUpdateUserById, deleteUserById } = require("../controllers/user-controller");
const router = express.Router();

router
    .route("/")
    .get( handleGetAllUsers )
    .post( handleCreateNewUser )
  
  router
    .route("/:id")
    .get(handleUserById)
    .patch(handleUpdateUserById)
    .delete(deleteUserById);
  


  module.exports = router;