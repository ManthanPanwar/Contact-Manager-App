const express = require("express");
const dotenv = require("dotenv").config();
const contactRoutes = require("./routes/contactRoutes");

const app = express();
const port = process.env.PORT || 5000;

app.use("/api/contacts", contactRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
