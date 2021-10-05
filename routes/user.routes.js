const { response } = require("express");
const express = require("express");

const router = express.Router();

/** load the service */
const { UserController } = require("../app/controllers/user.controller");
const {
  userValidationRules,
  validate,
} = require("../app/validators/user.validator");

/** to list all users */
router.get("/", async (req, res) => {
  const userList = await UserController.getAllUsers();
  return res.json(userList);
});

/** to list specific user */
router.get("/:id", async (req, res) => {
  const user = await UserController.getOneUser(req.params.id);
  return res.json(user);
});

/** to register a user */
router.post("/", userValidationRules(), validate, async (req, res) => {
  await UserController.register(req.body)
  .then( response => {
    return res.send(response);
  })
  .catch(e => {
    return res.status(400).json({
      errors: e
    });
  })

});

/** to update a user */
router.put("/", async (req, res) => {
  const user = await UserController.register(req.body);
  return res.json(user);
});

/** to delete a user */
router.delete("/:id", async (req, res) => {
  const user = await UserController.delete(req.params.id);
  return res.json(user);
});

/** export the routes to be binded to application */
module.exports = router;
