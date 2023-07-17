const jwt = require("jsonwebtoken");
require("dotenv").config();
function verifyToken(req, res, next) {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.jwt_key, (err, user) => {
      if (err) res.status(403).json("Token is not Valid");
      else {
        req.user = user;
        next();
      }
    });
  } else {
    res.status(403).json("You are Not Authenticated");
  }
}

module.exports = verifyToken;
