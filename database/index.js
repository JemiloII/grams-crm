'use strict';

require('./create').database(function () {
    require('./load').csv('./database.csv');
});
