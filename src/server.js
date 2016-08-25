import express      from 'express'
import path         from 'path'
import logger       from 'morgan'
import cookieParser from 'cookie-parser'
import bodyParser   from 'body-parser'
import pug          from 'pug'
import database     from './database'
import routes       from './routes'

const server = express()

//view engine setup
server.set('port', process.env.PORT || 3000)
//server.set('view engine', 'pug');
server.set('views', path.join(__dirname, 'views'))
server.set('view engine', 'pug')

server.use(express.static(path.join(__dirname, 'public')))
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))
server.use(cookieParser())

// middleware
server.use(routes.sessionMiddleware)

//user routes
server.get( '/',       routes.get.index)
server.get( '/signup', routes.get.signup)
server.post('/signup', routes.post.signup)
server.get( '/login',  routes.get.login)
server.post('/login',  routes.post.login)
server.get( '/logout', routes.get.logout)

// server.get('/todos/:id/edit', routes.get.edit)
server.delete('/todos/:id', routes.get.index)
// server.post('/todos',  routes.post.createTodo)


//test Route
server.get('/test', function(req, res, next){
  database.completeTodo()
    .then(function(data){
      res.json(data)
    })
    .catch(renderError(res))
})


//Create New To Dos
server.post('/todos', function(req, res){
  if (req.session)
  var todo = req.body.todo
  todo.work = todo.work === "true"
  todo.userId = req.session.userId
  database.createTodo(todo)
    .then(todo => {
      res.redirect('/')
    })
    .catch(renderError(res))
})

//Edit ToDos
server.get('/todos/:todoId/complete', function(req, res){
  if (!req.session.userId){
    res.redirect('/login')
    return;
  }
  database.completeTodo(req.params.todoId)
    .then(() => {
      res.redirect('/')
    })
     .catch(renderError(res))
})

server.get('/todos/:todoId/uncomplete', function(req, res){
  if (!req.session.userId){
    res.redirect('/login')
    return;
  }
  database.uncompleteTodo(req.params.todoId)
    .then(() => {
      res.redirect('/')
    })
     .catch(renderError(res))
})

//user can delete too
server.get('/todos/:todoId/delete', function(req, res){
  database.deleteTodo(req.params.todoId)
  .then(() => {
    res.redirect('/')
  })
  .catch(renderError(res))
})

//user can edit todo

// EDIT route
server.get('/todos/:todoId/edit', function(req, res){
  database.getOneTodoById(req.params.todoId)
    .then(todo =>{
      res.render('todos/edit',{
        todo: todo
      })
    })
    .catch(renderError(res))
})

// UPDATE route
server.post('/todos/:todoId', function(req, res){
  database.updateTodo(req.params.todoId, req.body.todo)
    .then(todo =>{
      res.redirect('/')
    })
    .catch(renderError(res))
})


const renderError = function(res){
  return function(error){
    res.render('error',{
      error: error
    })
  }
}

//local host server
server.listen(3000, function() {
  console.log('Example app listening on port 3000!')
})

