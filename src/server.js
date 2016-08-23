import express      from 'express'
import path         from 'path'
import logger       from 'morgan'
import cookieParser from 'cookie-parser'
import bodyParser   from 'body-parser'
import pug          from 'pug'
import database     from './database'
import onHeaders    from 'on-headers'
import routes       from './routes'

const server = express()
const cookieName = 'hazlo'

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
server.use(function(req, res, next){
  req.session = req.cookies[cookieName] || {}
  req.session.requestCount = req.session.requestCount || 0
  req.session.requestCount++;

  console.log('READ SESSION', req.session)
  onHeaders(res, function(){
    console.log('WRITE SESSION', req.session)
    this.cookie(cookieName, req.session, { maxAge: 900000, httpOnly: true });
  })
  next()
})

server.get('/', routes.index)

server.get('/login', routes.login)

server.post('/login', function(req, res){
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
})

server.get('/logout', function(req, res){
  req.session = {}
  res.redirect('/')
})


//local host server
server.listen(3000, function() {
  console.log('Example app listening on port 3000!')
})

