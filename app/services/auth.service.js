/** load required packages */
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

/** load peer modules and services */
const User = require("../models/user.schema");

/**
 * UserService is consumed not only by UserController, but also by controllers of other modules.
 */
class AuthService {
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
    const { email, password } = body;

    let user = await User.findOne({ email });

    if (!user) {
      throw new Error("Invalid credentials!");
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      const err = new Error("Invalid credentials!");
      return err;
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      config.get("jwtSecret"),
      {
        expiresIn: 360000,
      },
      (err, Token) => {
        if (err) {
          return {
            error: "Internal server error",
          };
        }
        return Token;
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

module.exports = { AuthService };
