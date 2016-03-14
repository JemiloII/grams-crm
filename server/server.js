'use strict';

var app = require('./app');
var http = require('http');
var server = http.createServer(app);

server.listen('1337', function () {
    console.log('Sever running on http://localhost:1337');
});
