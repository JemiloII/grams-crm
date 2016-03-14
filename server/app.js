'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use('/', express.static(path.join(__dirname, '../public/app')));

app.all('/ok*', function (req, res) {
    res.status(200).send('ok');
});

require('../api/clients/routes')(app);

app.use('*', function (req, res) {
    res.status(404).sendFile(path.join(__dirname, '../public/img/404.jpg'));
});

module.exports = app;
