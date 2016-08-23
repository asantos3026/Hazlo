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
server.get( '/',       routes.get.index)
server.get( '/signup', routes.get.signup)
server.post('/signup', routes.post.signup)
server.get( '/login',  routes.get.login)
server.post('/login',  routes.post.login)
server.get( '/logout', routes.get.logout)

//local host server
server.listen(3000, function() {
  console.log('Example app listening on port 3000!')
})

