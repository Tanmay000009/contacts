/** load required packages */

/** load peer modules and services */
const User = require('./user.schema');

/**
 * UserService operates on the data layer of the application, and performs *all* db operations.
 *
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
      user_identifier: body.uid,
      subscriptions: [],
    });
    const newUser = await user.save();
    return newUser;
  }

  /**
   * Updates the user details
   *@returns the updated user
   */
  static async updateUser(userId, objId) {
    const user = await User.findById({ id: userId });
    user.subscriptions.push(objId);
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