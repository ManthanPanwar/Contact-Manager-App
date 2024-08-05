const express = require("express");
const router = express.Router();

// get all contacts
router.get("/", (req, res, next) => {
  res.status(200).json({ message: "Get all contacts" });
});

// create a contact
router.post("/", (req, res, next) => {
  res.status(200).json({ message: "Create contact" });
});

// get individual contact
router.get("/:id", (req, res, next) => {
  res.status(200).json({ message: `Get contact for ${req.params.id}` });
});

// update a contact(overwrite)
router.put("/:id", (req, res, next) => {
  res.status(200).json({ message: `Update contact for ${req.params.id}` });
});

// delete a contact
router.delete("/:id", (req, res, next) => {
  res.status(200).json({ message: `Delete contact for ${req.params.id}` });
});

module.exports = router;
