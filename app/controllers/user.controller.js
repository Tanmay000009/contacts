// ek badi class , jisme common validation nd all hojaye
// rest functions wali class extend


// if specialized controller with same specifications, unki bhi class banado



/** load required packages */
const { json } = require('express');
const {
    InternalServerException,
  } = require('http-exception-transformer/exceptions');
  
  /** load peer modules and services */
  const { logger } = require('../services/logger');
  const { UserService } = require('../services/user.service');
  
  /**
   * UserController contains definitions of all route handlers in /user namespace.
   */
  class UserController {
    /**
     * each member function of controller is attached to each route
     */
    static async getAllUsers() {
      try {
        logger.info('[user]: listing all users');
        const userList = await UserService.findAllUsers();
  
        return userList;
      } catch (e) {
        throw new Error();
      }
    }
  
    static async getOneUser(id) {
      try {
        logger.info('[user]: finding the user');
        const user = await UserService.findUser(id);
  
        return user;
      } catch (e) {
        throw new InternalServerException();
      }
    }
  
    static async register(body) {
      try {
        logger.info('[user]: registering the user');
        const user = await UserService.registerUser(body);
        return user;
      } catch (e) {
        return json({
          status: 400,
          error: e
        })
      }
    }
  
    static async update() {
      logger.info('[user]: updating the user');
      await UserService.updateUser(id, objectid)
      .then(user => {return user;})
      .catch(e => {});
    }
  
    static async delete(id) {
      try {
        logger.info('[user]: deleting the user');
        return await UserService.deleteUser(id);
      } catch (e) {
        throw new InternalServerException();
      }
    }
  }
  
  module.exports = { UserController };