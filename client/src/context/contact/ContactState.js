import React, { useReducer } from "react";
import {v4 as uuid} from "uuid";
import ContactContext from "./contactContext";
import contactReducer from "./contactReducer";
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
} from "../types";

const ContactState = (props) => {
  const intialState = {
    contacts: [
      {
        id: 1,
        name: "a",
        email: "a@b.com",
        phone: "1",
        type: "personal",
      },
      {
        id: 2,
        name: "b",
        email: "b@b.com",
        phone: "2",
        type: "personal",
      },
      {
        id: 3,
        name: "c",
        email: "c@b.com",
        phone: "3",
        type: "professional",
      },
    ],
    current: null
  };

  const [state,dispatch] = useReducer(contactReducer,intialState);

  // Add Contact
  const addContact = contact => {
    contact.id = uuid();
    dispatch({ type: ADD_CONTACT, payload: contact });
  }

  // Delete Contact
  const deleteContact = id => {
    dispatch({ type: DELETE_CONTACT, payload: id});
  }

  // Set Current Contact
  const setCurrent = contact => {
    dispatch({ type: SET_CURRENT, payload: contact});
  }

  // Clear Current Contact
  const clearCurrent = () => {
    dispatch({ type: SET_CURRENT});
  }

  // Update Contact


  // Filter Contacts


  // Clear Filter


  return (
      <ContactContext.Provider
        value = {{
            contacts: state.contacts,
            current: state.current,
            addContact,
            deleteContact,
            setCurrent,
            clearCurrent
        }}>
          {props.children}
      </ContactContext.Provider>
  )
};

export default ContactState;