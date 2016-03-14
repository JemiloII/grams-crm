'use strict';

var query = require('./query');

function list (req, res, next) {
    query.list(req.body, function (error, data) {
        if (error) {
            console.log('Client list error: ', error);
            res.status(404).send({error: 'Error retrieving list of clients from database!'});
        }
        else if (!data) {
            next();
        }
        else {
            console.log('Retrieved client list data!');
            res.status(200).send({client: data});
        }
    });
}

function get (req, res, next) {
    query.get(req.params.id, function (error, data) {
        if (error) {
            res.status(404).send({error: 'Error retrieving client from database!'});
        }
        else if (!data) {
            next();
        }
        else {
            console.log('Retrieved client data: ', data);
            res.status(200).send({client: data});
        }
    });
}

function add (req, res) {
    query.add(req.body, function (error) {
        if (error) {
            res.status(409).send({error: 'Error adding client to database!'});
        }
        else {
            var message = 'Client added successfully!';
            console.log(message);
            res.status(200).send({message: message});
        }
    });
}

function update (req, res) {
    query.update(req.params.id, req.body, function (error) {
        if (error) {
            res.status(409).send({error: 'Error updating client in database!'});
        }
        else {
            var message = 'Client updated successfully!';
            console.log(message);
            res.status(200).send({message: message});
        }
    });
}

function remove (req, res) {
    query.remove(req.params.id, function (error) {
        if (error) {
            res.status(409).send({error: 'Error deleting client from database!'});
        }
        else {
            var message = 'Client deleted successfully!';
            console.log(message);
            res.status(200).send({message: message});
        }
    });
}

module.exports = {
    add: add,
    update: update,
    get: get,
    list: list,
    remove: remove
};
