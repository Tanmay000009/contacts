const express = require("express");
const router = express.Router();

/** load the service */
const UserController = require("../app/controllers/user.controller");
const {
  userValidationRules,
  validate,
} = require("../app/validators/user.validator");

/** to list all users */
router.get("/", UserController.getAllUsers);

/** to list specific user */
router.get("/:id", UserController.getOneUser);

/** to register a user */
router.post("/",userValidationRules(),validate ,UserController.register);

/** to update a user */
router.put("/",userValidationRules(),validate, UserController.update);

/** to delete a user */
router.delete("/:id", UserController.delete);

/** export the routes to be binded to application */
module.exports = router;
