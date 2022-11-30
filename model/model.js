const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const StudentShema = new mongoose.Schema({
  name: {
    type: String,
    
  },
  Dob: {
    type: Date,
  },

  password: {
    type: String,
  },
  cpassword: {
    type: String,
  },
});

// StudentShema.methods.generatetoken = async function (next) {
//   const token = await jwt.sign(
//     { _id:result1_id },
//     "THISISMYPRIVETKEYFORJSONWEBTOKEN"
//   );
//   console.log(token);
// };

StudentShema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  //   console.log(this.password);
});

module.exports = new mongoose.model("Student", StudentShema);
