/** load required packages */
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

/** load peer modules and services */
const User = require("../models/user.schema");

class AuthService {
  /**
   * Get a current user
   * @returns the current User in the system
   */
  static async currentUser(id) {
    const user = await User.findById(id).select("-password");
    return user;
  }

  /**
   * Authenticate a  user
   * @returns the created User in the system
   */
  static async authenticate(body) {
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

    return await jwt.sign(
      payload,
      config.get("jwtSecret"),
      {
        expiresIn: 360000,
      }
    );
  }
}

module.exports = { AuthService };
