const express = require("express");
const router = express.Router();

/** load the service */
const ContactsController = require("../app/controllers/contacts.controller");

/** to list all Contacts */
router.get("/", ContactsController.getAllContacts);

/** to list specific Contacts */
router.get("/:id", ContactsController.getOneContact);

/** to register a Contacts */
router.post("/" ,ContactsController.register);

/** to update a Contacts */
router.put("/",ContactsController.update);

/** to delete a Contacts */
router.delete("/:id", ContactsController.delete);

/** export the routes to be binded to application */
module.exports = router;
