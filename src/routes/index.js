const express = require('express');
const router = express.Router();
// const database = require('./src/database');
// const pgp = database.pgp;

module.exports = {
  index: function(req, res) {
    console.log('Cookies : ', req.cookies)

    const currentUser = req.session.userId ?
     {name: 'Jared Grippe'} : null

    res.render('index', {
      session: req.session,
      currentUser: currentUser
    })
  },

  login: function(req, res){
    res.render('login')
  }
}
