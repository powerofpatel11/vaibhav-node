const express = require("express");

const app = express();
const PORT = 9000;
const mongoose = require("mongoose");
const url =
  "mongodb+srv://vaibhav11:vaibhav11@cluster0.uzq4egi.mongodb.net/vaibhav30?retryWrites=true&w=majority";

const strouter = require("../router/router");
mongoose
  .connect(url)
  .then(() => {
    console.log("db is connection successfully");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());

app.use("/", strouter);

app.listen(PORT, () => {
  console.log("port is listing " + PORT);
});
