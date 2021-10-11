const express = require("express");
const router = express.Router();
const auth = require('../app/middleware/auth');

/** load the service */
const ContactsController = require("../app/controllers/contacts.controller");

/** to list all Contacts */
router.get("/",auth ,ContactsController.getAllContacts);

/** to list specific Contacts */
router.get("/:id", auth, ContactsController.getOneContact);

/** to register a Contacts */
router.post("/" , auth,ContactsController.register);

/** to update a Contacts */
router.put("/", auth,ContactsController.update);

/** to delete a Contacts */
router.delete("/:id", auth, ContactsController.delete);

/** export the routes to be binded to application */
module.exports = router;
