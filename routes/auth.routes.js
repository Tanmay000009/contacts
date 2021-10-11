const express = require('express');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const config = require('config');

const router = express.Router();

/** load the service */
const AuthController = require("../app/controllers/auth.controller");
const {
  userValidationRules,
  validate,
} = require("../app/validators/user.validator");


/** to list all users */
router.get("/", AuthController.getAllUsers);

/** to list specific user */
router.get("/:id", AuthController.getOneUser);

/** to register a user */
router.post("/",userValidationRules(),validate ,AuthController.register);

/** to update a user */
router.put("/",userValidationRules(),validate, AuthController.update);

/** to delete a user */
router.delete("/:id", AuthController.delete);

/** export the routes to be binded to application */
module.exports = router;