'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.static('../assets'));

app.all('/ok*', function (req, res) {
    res.status(200).send('ok');
});

require('../api/clients/routes')(app);

app.use('*', function (req, res) {
    var path = require('path');
    res.status(404).sendFile(path.join(__dirname, '../assets/img/404.jpg'));
});

module.exports = app;
