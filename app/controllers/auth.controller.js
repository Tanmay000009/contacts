/** load required packages */
const { json } = require("express");

/** load peer modules and services */
const { logger } = require("../services/logger");
const { AuthService } = require("../services/auth.service");
const apiResponse = require("../helpers/apiResponse");

/** Get current user  */
module.exports.currentUser = async (req,res) => {
  try {
    const user = await AuthService.currentUser(req.user.id);
    apiResponse.successResponseWithData(res,"Operation Success",user);
  } catch (err) {
    logger.error("Error: " + e);
    apiResponse.ErrorResponse(res, "Internal Server Error!");
  }
}

/** Authenticate a user */
module.exports.authenticate = async (req, res) => {
  try {
    logger.info("[user]: logging in the user");
    const token = await AuthService.authenticate(req.body);
    return apiResponse.successResponseWithData(res, "Operation success", token);
  } catch (e) {
    if (e) {
      logger.error("Error: " + e);
      apiResponse.ErrorResponse(res, e.message);
    }
  }
};
