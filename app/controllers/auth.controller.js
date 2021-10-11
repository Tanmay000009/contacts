/** load required packages */
const { json } = require("express");

/** load peer modules and services */
const { logger } = require("../services/logger");
const { AuthService } = require("../services/auth.service");
const apiResponse = require("../helpers/apiResponse");

module.exports.getAllUsers = async (req,res) => {
  try {
    logger.info("[user]: listing all users");
    const userList = await AuthService.findAllUsers();
    return apiResponse.successResponseWithData(res, "Operation success", userList);
  } catch (e) {
    logger.error("Error: " + e);
    apiResponse.ErrorResponse(res, e);
  }
};

module.exports.getOneUser = async (req,res) => {
  try {
    logger.info("[user]: finding the user");
    const user = await AuthService.findUser(req.params.id);
    return apiResponse.successResponseWithData(res, "Operation success", user);
  } catch (e) {
    logger.error("Error: " + e);
    apiResponse.ErrorResponse(res, e);
  }
};

module.exports.register = async (req,res) => {
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

module.exports.update = async (req,res) => {
  try {
    logger.info("[user]: updating the user");
    const user = await AuthService.updateUser(req.body.id,req.body);
    return apiResponse.successResponseWithData(res, "Operation success", user);
  } catch (e) {
    logger.error("Error: " + e);
    apiResponse.ErrorResponse(res, e);
  }
};

module.exports.delete = async (req,res) => {
  try {
    logger.info("[user]: deleting the user");
    return apiResponse.successResponse(res,"User delete Success.")
  } catch (e) {
    logger.error("Error: " + e);
    apiResponse.ErrorResponse(res, e);
  }
};
