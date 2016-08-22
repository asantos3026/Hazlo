const express = require('express')
//const path = require('path');

const server = express()
server.set('port', process.env.PORT || 3000)
//server.set('view engine', 'pug');

server.listen(3000, function() {
  console.log('Example app listening on port 3000!')
})