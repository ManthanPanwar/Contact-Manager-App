const express = require("express");
const router = express.Router();
const {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
} = require("../controllers/contactController");

// // get all contacts
// router.get("/", getContacts);

// // create a contact
// router.post("/", createContact);

// // get individual contact
// router.get("/:id", getContact);

// // update a contact(overwrite)
// router.put("/:id", updateContact);

// // delete a contact
// router.delete("/:id", deleteContact);

//

router.get("/", getContacts).post("/", createContact);

router
  .get("/:id", getContact)
  .put("/:id", updateContact)
  .delete("/:id", deleteContact);

module.exports = router;
