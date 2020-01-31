/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const jwt = require("jsonwebtoken");
const knex = require("../database/dbConfig");

module.exports = async (req, res, next) => {
  const providedToken = req.headers.authorization;
  if (providedToken) {
    const secret = process.env.SECRET;
    const token = jwt.verify(providedToken, secret);
    const { id, username } = token;
    if (
      await knex("users")
        .where({ id, username })
        .first()
    ) {
      next();
    } else {
      return res.status(401).json({ you: "shall not pass!" });
    }
  }else{
    return res.status(400).json({token:"Token required in header.authorization"})
  }
};
