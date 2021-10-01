const express = require('express');

const router = express.Router();

/** load the service */
const { UserController } = require('./user.controller');

/** to list all users */
router.get('/', async (req, res) => {
  const userList = await UserController.getAllUsers();
  return res.json(userList);
});

/** to list specific user */
router.get('/:id', async (req, res) => {
  const user = await UserController.getOneUser(req.params.id);
  return res.json(user);
});

/** to register a user */
router.post('/', async (req, res) => {
  const user = await UserController.register(req.body);
  return res.json(user);
});

/** to update a user */
router.put('/', async (req, res) => {
  const user = await UserController.register(req.body);
  return res.json(user);
});

/** to delete a user */
router.delete('/:id', async (req, res) => {
  const user = await UserController.delete(req.params.id);
  return res.json(user);
});

/** export the routes to be binded to application */
module.exports = router;