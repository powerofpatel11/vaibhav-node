const express = require("express");
const router = express.Router();
const Student = require("../model/model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/middle");
router.post("/add", async (req, resp) => {
  const student = new Student(req.body);

  try {
    const result = await student.save();
    resp.send("data add successfully for database");
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", async (req, resp) => {
  try {
    const name = req.body.name;
    const password = req.body.password;
    console.log(name + " " + password);
    const result1 = await Student.findOne({ name: name });
    console.log(result1.password);
    const isvalid = await bcrypt.compare(password, result1.password);
    console.log(isvalid);
    if (!isvalid) {
      resp.send("invalid credentials");
      return;
    }
    const token = await jwt.sign(
      { _id: result1._id },
      "thisismyprivetkeyforjsonwebtoken"
    );

    resp.header("Auth-token",token).
    send(token);

  } catch (error) {
    console.log(error);
  }
});

router.get("/view", auth,async (req, resp) => {
  const count=req.query.page*5
  try {
    const result = await Student.find().sort({ name: 1 }).limit(count);
    resp.send(result);
  } catch (error) {
    console.log(error);
  }
});

router.get("/viewall", async (req, resp) => {
  try {
    const result = await Student.find();
    resp.send(result);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
