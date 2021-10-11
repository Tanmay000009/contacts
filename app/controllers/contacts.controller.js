/** load required packages */
const { json } = require("express");

/** load peer modules and services */
const { logger } = require("../services/logger");
const { ContactService } = require("../services/contacts.service");
const apiResponse = require("../helpers/apiResponse");

module.exports.getAllContacts = async (req, res) => {
  try {
    logger.info("[Contact]: listing all Contacts");
    const ContactList = await ContactService.findAllContacts();
    return apiResponse.successResponseWithData(
      res,
      "Operation success",
      ContactList
    );
  } catch (e) {
    logger.error("Error: " + e);
    apiResponse.ErrorResponse(res, e.message);
  }
};

module.exports.getOneContact = async (req, res) => {
  try {
    logger.info("[Contact]: finding the Contact");
    const contact = await ContactService.findContact(req.params.id);
    return apiResponse.successResponseWithData(
      res,
      "Operation success",
      contact
    );
  } catch (e) {
    logger.error("Error: " + e);
    apiResponse.ErrorResponse(res, e.message);
  }
};

module.exports.register = async (req, res) => {
  try {
    logger.info("[Contact]: registering the Contact");
    const contact = await ContactService.registerContact(req.body, req.user.id);
    return apiResponse.successResponseWithData(
      res,
      "Operation success",
      contact
    );
  } catch (e) {
    logger.error("Error: " + e);
    apiResponse.ErrorResponse(res, e.message);
  }
};

module.exports.update = async (req, res) => {
  try {
    logger.info("[Contact]: updating the Contact");
    const contact = await ContactService.updateContact(req.params.id, req.body,req.user.id);
    return apiResponse.successResponseWithData(
      res,
      "Operation success",
      contact
    );
  } catch (e) {
    logger.error("Error: " + e);
    apiResponse.ErrorResponse(res, e.message);
  }
};

module.exports.delete = async (req, res) => {
  try {
    logger.info("[Contact]: deleting the Contact");
    const contact = await ContactService.deleteContact(req.params.id);
    return apiResponse.successResponse(res, "Contact delete Success.");
  } catch (e) {
    logger.error("Error: " + e);
    apiResponse.ErrorResponse(res, e.message);
  }
};
