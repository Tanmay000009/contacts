/** load required packages */
const { json } = require("express");

/** load peer modules and services */
const { logger } = require("../services/logger");
const { UserService } = require("../services/user.service");
const apiResponse = require("../helpers/apiResponse");

module.exports.getAllUsers = async () => {
  try {
    logger.info("[user]: listing all users");
    const userList = await UserService.findAllUsers();

    return userList;
  } catch (e) {
    logger.error("Error: " + e);
    apiResponse.ErrorResponse(res, e);
  }
};

module.exports.getOneUser = async () => {
  try {
    logger.info("[user]: finding the user");
    const user = await UserService.findUser(id);

    return user;
  } catch (e) {
    logger.error("Error: " + e);
    apiResponse.ErrorResponse(res, e);
  }
};

module.exports.register = async () => {
  try {
    logger.info("[user]: registering the user");
    const user = await UserService.registerUser(body);
    return user;
  } catch (e) {
    logger.error("Error: " + e);
    apiResponse.ErrorResponse(res, e);
  }
};

module.exports.update = async () => {
  try {
    logger.info("[user]: updating the user");
    const user = await UserService.updateUser(id, objectid);
    return user;
  } catch (e) {
    logger.error("Error: " + e);
    apiResponse.ErrorResponse(res, e);
  }
};

module.exports.delete = async () => {
  try {
    logger.info("[user]: deleting the user");
    return await UserService.deleteUser(id);
  } catch (e) {
    logger.error("Error: " + e);
    apiResponse.ErrorResponse(res, e);
  }
};
