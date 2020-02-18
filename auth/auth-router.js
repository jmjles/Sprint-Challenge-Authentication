const router = require("express").Router();
const knex = require("../database/dbConfig");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const register = async newuser => {
  newuser.password = bcrypt.hashSync(newuser.password, 10);
  await knex("users").insert(newuser);
  const createdUser = await knex("users").where({ username: newuser.username });
  const token = genToken(createdUser);
  return { ...createdUser, token };
};

const login = async user => {
  const selectedUser = await knex("users").where({ username: user.username }).first();
  if (bcrypt.compareSync(user.password, selectedUser.password)) {
    return genToken(selectedUser);
  } else {
    return { error: "Incorrect Credentials" };
  }
};

const genToken = user => {
  const secret = process.env.SECRET;
  const {id,username} = user
    return jwt.sign(
      { id, username },
      secret,
      { expiresIn: "1h" }
    );
}
const checkme = [
  check("username")
    .notEmpty()
    .isLength({ min: 3 }),
  check("password")
    .notEmpty()
    .isLength({ min: 5 })
];

router.post("/register", checkme, async (req, res) => {
  // implement registration
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.status(400).json(errors.array());
  }
  try {
    const newuser = {
      username: req.body.username,
      password: req.body.password
    };
    res.status(201).json(await register(newuser));
  } catch (er) {
    console.log(er);
    return res.status(500).json(er);
  }
});

router.post("/login", checkme, async (req, res) => {
  // implement login
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return res.status(400).json(errors.array());
  }
  try {
    const user = {
      username: req.body.username,
      password: req.body.password
    };
    res.status(200).json(await login(user));
  } catch (er) {
    console.log(er);
    return res.status(500).json(er);
  }
});

module.exports = router;
