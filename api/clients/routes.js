'use strict';

var controller = require('./controller');
var validate = require('./validate');

function clientRoutes (app) {
    app.use('/clients*', validate);
    app.get('/clients', controller.list);
    app.get('/clients/:id', controller.get);
    app.post('/clients', controller.add);
    app.put('/clients/:id', controller.update);
    app.delete('/clients/:id', controller.remove);
}

module.exports = clientRoutes;
