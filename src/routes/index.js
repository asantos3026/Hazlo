import express from 'express'
import onHeaders from 'on-headers'
import database from '../database'

export default {
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
      if (req.session.userId){
        database.getUserById(req.session.userId)
          .then(currentUser => {
            res.render('dashboard',{
              currentUser: currentUser
            })
          })
      }else{
        res.render('homepage')
      }
    },

    signup: function(req, res){
      res.render('signup',{
        email: ''
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

    signup: function(req, res){
      const attributes = req.body.user
      const email = attributes.email
      const password = attributes.password
      const password_confirmation = attributes.password_confirmation
      if (password !== '' && password !== password_confirmation){
        res.render('signup', {
          error: 'passwords do not match',
          email: email,
        })
      }else{
        // res.json(req.body)
        database.createUser(attributes)
          .then(user => {
            req.session.userId = user.id
            res.redirect('/')
          })
          .catch(error => {
            res.render('signup', {
              error: error,
              stack: error.stack,
              email: email,
            })
          })
      }

    },

    login: function(req, res){
      const credentials = {
        email:    req.body.email,
        password: req.body.password
      }

      database.authenticateUser(credentials)
        .then(userId => {
          console.log('userId', userId)
          if (userId === null){
            res.status(400).render('login', {
              error: 'Bad email or password'
            })
          }else{
            req.session.userId = userId
            res.redirect('/')
          }
        })
    }
  }
}
