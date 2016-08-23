import express from 'express'
import onHeaders from 'on-headers'
// import database from './database'
// const pgp = database.pgp;
const router = express.Router();

module.exports = {
  sessionMiddleware: function(req, res, next){
    const cookieName = 'hazlo'
    req.session = req.cookies[cookieName] || {}
    req.session.requestCount = req.session.requestCount || 0
    req.session.requestCount++;

    console.log('READ SESSION', req.session)
    onHeaders(res, function(){
      console.log('WRITE SESSION', req.session)
      this.cookie(cookieName, req.session, { maxAge: 900000, httpOnly: true });
    })
    next()
  },

  get: {
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
    },

    logout: function(req, res){
      req.session = {}
      res.redirect('/')
    }
  },

  post: {
    login: function(req, res){
      // recieve login credentials
      // lookup and authenticate user
      const credentials = {
        email:    req.query.email,
        password: req.query.password
      }

      database.authenticateUser(credentials)
        .then(userId => {
          req.session.userId = userId
          res.redirect('/')
        })
        .catch(error => {
          res.render('login', {error: error.message})
        })
    }
  }
}
