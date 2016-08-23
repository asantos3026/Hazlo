const express = require('express')
const path = require('path')
//const path = require('path');

const server = express()
server.set('port', process.env.PORT || 3000)
//server.set('view engine', 'pug');
server.set('views', path.join(__dirname, 'views'))
server.set('view engine', 'pug')

server.use(express.static(path.join(__dirname, 'public')))


server.get('/', function(req, res){
  res.render('layout')
})

server.listen(3000, function() {
  console.log('Example app listening on port 3000!')
})

