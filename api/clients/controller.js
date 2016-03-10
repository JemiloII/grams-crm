'use strict';

var query = require('./query');

function list (req, res) {
    query.list(req.body, function (error, data) {
        if (error) {
            console.log('Client list error: ', error);
            res.status(409).send({error: 'Error retrieving list of clients from database!'})
        }
        else {
            console.log('Got list data!');
            res.status(200).send({client: data});
        }
    });
}

function get (req, res) {
    query.get(req.params.id, function (error, data) {
        if (error) {
            res.status(409).send({error: 'Error retrieving client from database!'})
        }
        else {
            console.log('Got get data: ', data);
            res.status(200).send({client: data});
        }
    });
}

function add (req, res) {
    query.add(req.params.id, function (error, data) {
        if (error) {
            res.status(409).send({error: 'Error adding client to database!'})
        }
        else {
            console.log('Got add data: ', data);
            res.status(200).send({client: data});
        }
    });
}

function update (req, res) {
    query.get(req.params.id, function (error, data) {
        if (error) {
            res.status(409).send({error: 'Error updating client in database!'})
        }
        else {
            console.log('Got update data: ', data);
            res.status(200).send({client: data});
        }
    });
}

function remove (req, res) {
    query.get(req.params.id, function (error, data) {
        if (error) {
            res.status(409).send({error: 'Error removing client from database!'})
        }
        else {
            console.log('Got remove data: ', data);
            res.status(200).send({client: data});
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
