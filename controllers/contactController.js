const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
// whenever we create the API methods, we always need to give some labels to that.
// here is how you give a label

// @desc Get all contacts
// @route GET /api/contacts
// @access private
const getContacts = asyncHandler(async (req, res, next) => {
  const contacts = await Contact.find({ user_id: req.user.id });
  // res.status(200).json({ message: "Get all contacts" });
  res.status(200).json(contacts);
});

// @desc Create New contact
// @route POST /api/contacts
// @access private
const createContact = asyncHandler(async (req, res, next) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("all fields are compulsory");
  }
  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  });
  // res.status(201).json({ message: "Create contact" });
  res.status(201).json(contact);
  // 201 --> resource created
});

// @desc Get contact
// @route GET /api/contacts/:id
// @access private
const getContact = asyncHandler(async (req, res, next) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact Not Found");
  }
  res.status(200).json(contact);
  // res.status(200).json({ message: `Get contact for ${req.params.id}` });
});

// @desc Update contact
// @route PUT /api/contacts/:id
// @access private
const updateContact = asyncHandler(async (req, res, next) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact Not Found");
  }

  // stopping different user from updating contacts of some other person
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User don't have permission to update other user contacts");
  }

  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(201).json(updatedContact);
  // res.status(201).json({ message: `Update contact for ${req.params.id}` });
  // 201 --> resource created
});

// @desc delete contact
// @route DELETE /api/contacts/:id
// @access public
const deleteContact = asyncHandler(async (req, res, next) => {
  let contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact Not Found");
  }

  // stopping different user from deleting contacts of some other person
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User don't have permission to delete other user contacts");
  }

  // removing contact
  contact = await Contact.findByIdAndDelete(req.params.id);
  res.status(200).json(contact);

  // res.status(201).json({ message: `Delete contact for ${req.params.id}` });
  // 201 --> resource created
});

module.exports = {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};
