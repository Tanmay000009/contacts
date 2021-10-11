/** load required packages */
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

/** load peer modules and services */
const User = require("../models/user.schema");

class AuthService {
  /**
   * Authenticate a new user
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
}

module.exports = { AuthService };
