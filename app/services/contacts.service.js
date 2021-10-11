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
  static async registerContact(body, id) {
    const contact = new Contact({
      name: body.name,
      email: body.email,
      phone: body.phone,
      type: body.type,
      user: id,
    });

    const newContact = await contact.save();
    return newContact;
  }

  /**
   * Updates the Contact details
   *@returns the updated Contact
   */
  static async updateContact(ContactId, obj, userId) {
    const contactFields = {};
    if (obj.name) contactFields.name = obj.name;
    if (obj.email) contactFields.email = obj.email;
    if (obj.phone) contactFields.phone = obj.phone;
    if (obj.type) contactFields.type = obj.type;
    console.log(contactFields);
    var contact = await Contact.findById({ _id: ContactId });

    if (!contact) {
      throw new Error("Contact not found");
    }

    // Make sure user owns contact
    if (contact.user.toString() !== userId) {
      return new Error("Unauthorized access");
    }

    contact = await Contact.findByIdAndUpdate(
      ContactId,
      { $set: contactFields },
      { new: true }
    );
    return contact;
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
