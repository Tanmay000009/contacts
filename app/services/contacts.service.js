/** load required packages */

/** load peer modules and services */
const Contact = require("../models/contact.schema");

/**
 * ContactService is consumed not only by ContactController, but also by controllers of other modules.
 */
class ContactService {
  /**
   * Fetch all Contact details
   * @returns Array<Contact> list of Contacts in the system
   */
  static async findAllContacts() {
    const ContactList = await Contact.find({});
    return ContactList;
  }

  /**
   * Fetch Contact details using id
   * @returns single Contact in the system
   */
  static async findContact(id) {
    const Contact = await Contact.findById(id);
    return Contact;
  }

  /**
   * Create/Register a new Contact
   * @returns the created Contact in the system
   */
  static async registerContact(body,id) {
    const contact = new Contact({
      name: body.name,
      email: body.email,
      phone: body.phone,
      type: body.type,
      user: id
    });

    const newContact = await contact.save();
    return newContact;
  }

  /**
   * Updates the Contact details
   *@returns the updated Contact
   */
  static async updateContact(ContactId, objId) {
    const Contact = await Contact.findById({ id: ContactId });
    Contact.push(objId);
    const updatedContact = await Contact.save();
    return updatedContact;
  }

  /**
   * Deletes the Contact
   */
  static async deleteContact(id) {
    const Contact = await Contact.findByIdAndDelete(id);
    return Contact;
  }
}

module.exports = { ContactService };
