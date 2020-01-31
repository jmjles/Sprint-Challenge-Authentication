const router = require('express').Router();
const knex = require('../database/dbConfig')
const bcrypt = require('bcryptjs')
const {check,validationResult} = require('express-validator')

const register = newuser => {
  newuser.password = bcrypt.hashSync(newuser.password,10)
  knex('users').insert(newuser)
  return knex('users').where({username:newuser.username})
}

const login = async user => {
  const selectedUser = await knex('users').where({username:user.username})
  if(bcrypt.compareSync(user.password,selectedUser.password)){
    return {token:'token'}
  }
}

const checkme = [
  check('username').notEmpty().isString().isLength({min:3}),
  check('password').notEmpty().isString().isLength({min:3})
]

router.post('/register', checkme, (req, res) => {
  // implement registration
});

router.post('/login', checkme, (req, res) => {
  // implement login
});

module.exports = router;
