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
  await UserController.getAllUsers()
  .then( userList => {
    return res.json(userList);
  })
  .catch( e => {
    return res.status(400).json({
      errors: e
    });
  })
});

/** to list specific user */
router.get("/:id", async (req, res) => {
  await UserController.getOneUser(req.params.id)
  .then( user => {
    return res.json(user);
  })
  .catch( e => {
    return res.status(400).json({
      errors: e
    });
  })
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
  await UserController.register(req.body)
  .then( user => {
    return res.json(user);
  })
  .catch( e => {
    return res.status(400).json({
      errors: e
    });
  })
});

/** to delete a user */
router.delete("/:id", async (req, res) => {
  await UserController.delete(req.params.id)
  .then( user => {
    return res.json(user);
  })
  .catch( e => {
    return res.status(400).json({
      errors: e
    });
  })
});

/** export the routes to be binded to application */
module.exports = router;
