/** load required packages */
const { json } = require("express");

/** load peer modules and services */
const { logger } = require("../services/logger");
const { AuthService } = require("../services/auth.service");
const apiResponse = require("../helpers/apiResponse");

module.exports.authenticate = async (req, res) => {
  try {
    logger.info("[user]: logging in the user");
    const user = await AuthService.registerUser(req.body);
    return apiResponse.successResponseWithData(res, "Operation success", user);
  } catch (e) {
    logger.error("Error: " + e);
    console.log(e);
    apiResponse.ErrorResponse(res, e.message);
  }
};
