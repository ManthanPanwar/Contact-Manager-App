const express = require("express");
const dotenv = require("dotenv").config();
const contactRoutes = require("./routes/contactRoutes");
// const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 5000;

// app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api/contacts", contactRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
