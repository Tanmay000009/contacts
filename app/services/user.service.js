/** load required packages */
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const config = require('config');

/** load peer modules and services */
const User = require("../models/user.schema");
const { response } = require("express");

/**
 * UserService is consumed not only by UserController, but also by controllers of other modules.
 */
class UserService {
  /**
   * Fetch all user details
   * @returns Array<User> list of users in the system
   */
  static async findAllUsers() {
    const userList = await User.find({});
    return userList;
  }

  /**
   * Fetch user details using id
   * @returns single User in the system
   */
  static async findUser(id) {
    const user = await User.findById(id);
    return user;
  }

  /**
   * Create/Register a new user
   * @returns the created User in the system
   */
  static async registerUser(body) {
    const user = new User({
      name: body.name,
      email: body.email,
      password: body.password,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    const newUser = await user.save();
    const payload = {
      user: {
        id: user.id,
      },
    };

    return await jwt.sign(
      payload,
      config.get("jwtSecret"),
      {
        expiresIn: 360000,
      }
    );
  }

  /**
   * Updates the user details
   *@returns the updated user
   */
  static async updateUser(userId, objId) {
    const user = await User.findById({ id: userId });
    user.push(objId);
    const updatedUser = await user.save();
    return updatedUser;
  }

  /**
   * Deletes the user
   */
  static async deleteUser(id) {
    const user = await User.findByIdAndDelete(id);
    return user;
  }
}

module.exports = { UserService };
