const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const router = express.Router();

/** load the service */
const AuthController = require("../app/controllers/auth.controller");
const {
  userValidationRules,
  validate,
} = require("../app/validators/user.validator");

/** load the middlewares */
const auth = require("../app/middleware/auth");

/** to get loggged in user */
router.get("/",auth,AuthController.currentUser);

/** to authenticate a user */
router.post("/", userValidationRules(), validate, AuthController.authenticate);

/** export the routes to be binded to application */
module.exports = router;
