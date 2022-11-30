const jwt = require("jsonwebtoken");

const auth = async (req, resp, next) => {
    console.log("middle ware are calling")
  try {
    const mytoken = req.header("Auth-token");
    if (mytoken == null) return resp.send("token is not valid")
    const data2 = await jwt.verify(mytoken, "thisismyprivetkeyforjsonwebtoken");
    console.log(data2);
    if (!data2) {
      resp.send("invalid token ");
      return
    }

    next();
  } catch (error) {
    console.log(error);
    
  }
};

module.exports = auth;
