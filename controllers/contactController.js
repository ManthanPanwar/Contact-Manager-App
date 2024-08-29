const asyncHandler = require("express-async-handler");
// whenever we create the API methods, we always need to give some labels to that.
// here is how you give a label

// @desc Get all contacts
// @route GET /api/contacts
// @access public
const getContacts = asyncHandler(async (req, res, next) => {
  res.status(200).json({ message: "Get all contacts" });
});

// @desc Create New contact
// @route POST /api/contacts
// @access public
const createContact = asyncHandler(async (req, res, next) => {
  const { name, email, age } = req.body;
  if (!name || !email || !age) {
    res.status(400);
    throw new Error("all fields are compulsory");
  }
  res.status(201).json({ message: "Create contact" });
  // 201 --> resource created
});

// @desc Get contact
// @route GET /api/contacts/:id
// @access public
const getContact = asyncHandler(async (req, res, next) => {
  res.status(200).json({ message: `Get contact for ${req.params.id}` });
});

// @desc Update contact
// @route PUT /api/contacts/:id
// @access public
const updateContact = asyncHandler(async (req, res, next) => {
  res.status(201).json({ message: `Update contact for ${req.params.id}` });
  // 201 --> resource created
});

// @desc delete contact
// @route DELETE /api/contacts/:id
// @access public
const deleteContact = asyncHandler(async (req, res, next) => {
  res.status(201).json({ message: `Delete contact for ${req.params.id}` });
  // 201 --> resource created
});

module.exports = {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};
