'use strict';

var path = require('path');
require('./create').database(function () {
    require('./load').csv(path.join(__dirname, './database.csv'));
});
