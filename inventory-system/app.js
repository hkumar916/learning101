const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
require("dotenv").config();
const bookRouter = require("./routes/books.routes");

app.use(express.json());
app.use("/books", bookRouter);

app.listen(port, () => {
  console.log(`App Listing on Port ${port}`);
});

const connectionString = process.env.CONNECT_STRING;

mongoose
  .connect(connectionString)
  .then(() => console.log("Connected to Mongo DB ^_^"))
  .catch((error) => log(error));
