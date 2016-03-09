'use strict';

var path = require('path');
var file = path(__dirname, '../database/database.db');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(file);

/**
 * Client List
 * @description Retrieves list of clients from the database.
 * @param search {object, function}
 * @param search.company {string} Refines list of clients by company.
 * @param search.contact {string} Refines list of clients by contact.
 * @param cb {function}
 */
function list (search, cb) {
    var query = 'SELECT * FROM clients';
    if (typeof search === 'function') {
        cb = search;
    }
    else {
        query += ' WHERE';
        if (search.company) {
            query += ' company=' + search.company;
        }
        if (search.contact) {
            query += ' contact=' + search.contact;
        }
    }
    db.run(query + ';', cb);
}

function get (id, cb) {
    db.run('SELECT * FROM clients WHERE id=$id;', {$id: id}, cb);
}

function add (id, client, cb) {
    db.run(cb);
}

function edit (id, client, cb) {
    db.run(cb);
}

function remove (id, cb) {
    db.run(cb);
}

module.exports = {
    add: add,
    edit: edit,
    get: get,
    list: list,
    remove: remove
};