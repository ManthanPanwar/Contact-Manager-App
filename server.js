const express = require("express");
const dotenv = require("dotenv").config();
const contactRoutes = require("./routes/contactRoutes");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
// const bodyParser = require("body-parser");

// connecting to database
connectDb();
const app = express();
const port = process.env.PORT || 5000;

// app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api/contacts", contactRoutes);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
