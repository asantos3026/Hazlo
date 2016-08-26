import express from 'express'
import onHeaders from 'on-headers'
import database from '../database'

export default {
  sessionMiddleware: function(req, res, next){
    const cookieName = 'hazlo'
    req.session = req.cookies[cookieName] || {}
    req.session.requestCount = req.session.requestCount || 0
    req.session.requestCount++;

    res.locals.loggedIn = 'userId' in req.session 

    console.log('READ SESSION', req.session)
    onHeaders(res, function(){
      console.log('WRITE SESSION', req.session)
      this.cookie(cookieName, req.session, { maxAge: 900000, httpOnly: true });
    })
    next()
  },

//logged in routes - create new to do

  get: {
    index: function(req, res) {
      const userId = req.session.userId
      if (userId){
        Promise.all([
          database.getUserById(userId),
          database.getAllTodosByUserId(userId)
        ])
          .then(results => {
            const currentUser = results[0]
            let todos = results[1]
            todos = todos.filter(todo => todo.completed)

            res.render('users/dashboard',{
              currentUser: currentUser,
              todos: todos,
            })
          })
          .catch(renderError(res))
      }else{
        res.render('homepage')
      }
    },

    signup: function(req, res){
      res.render('users/signup',{
        email: ''
      })
    },

    login: function(req, res){
      res.render('users/login',{
        email: req.session.email
      })
    },

    logout: function(req, res){
      logout(req)
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
      } 
      else {
        // res.json(req.body)
        database.createUser(attributes)
          .then(user => {
            login(req, user.id)
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

    newTodo: function(req, res) {
      const userId = req.session.userId
      if (userId){
        Promise.all([
          database.getUserById(userId),
          database.createToDo(userId)
        ])
          .then(results => {
            const currentUser = results[0]
            const newTodo = results[1]

            res.render('users/dashboard', {
              currentUser: currentUser,
              todo: todo
            })
          })
          .catch(renderError(res))
      }else {
        res.render('homepage')
      }
    },

    login: function(req, res){
      const credentials = {
        email:    req.body.email,
        password: req.body.password
      }

      database.authenticateUser(credentials)
        .then(user => {
          if (user === null){
            res.status(400).render('users/login', {
              error: 'Bad email or password'
            })
          }
          else {
            login(req, user)
            res.redirect('/')
          }
        })
        .catch(renderError(res))
    }
  }
}

const renderError = function(res){
  return function(error){
    res.render('error',{
      error: error
    })
  }
}


const login = function(req, user){
  req.session.userId = user.id
  req.session.email = user.email
}

const logout = function(req){
  delete req.session.userId
}

