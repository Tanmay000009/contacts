import React, { Fragment, useContext } from "react";
import ContactContext from "../../context/contact/contactContext";

const ContactItem = () => {
  const contactContext = useContext(ContactContext);

  const { contacts } = contactContext;
  return <div>
      <Fragment>
          { contacts.map(contact => (
              <h3>
                  {contact.name}
              </h3>
          ))}
      </Fragment>
  </div>;
};

export default ContactItem;
