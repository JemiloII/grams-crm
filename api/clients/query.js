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

/**
 * Get Client
 * @description Retrieve an existing client from the database.
 * @param id {numeric}
 * @param cb {function}
 */
function get (id, cb) {
    db.run('SELECT * FROM clients WHERE id=$id;', {$id: id}, cb);
}

/**
 * Add Client
 * @description Inserts a new client into the database.
 * @param client {object}
 * @param client.company {string}
 * @param client.contact {string}
 * @param client.phone {string}
 * @param client.email {string}
 * @param client.fax {string}
 * @param client.title {string}
 * @param client.address1 {string}
 * @param client.address2 {string}
 * @param client.city {string}
 * @param client.state {string}
 * @param client.zip {string}
 * @param cb
 */
function add (client, cb) {
    db.run('INSERT INTO clients' +
        ' (company,contact,phone,email,fax,title,address1,address2,city,state,zip) VALUES' +
        ' ($company,$contact,$phone,$email,$fax,$title,$address1,$address2,$city,$state,$zip);',
        {
            $company: client.company,
            $contact: client.contact,
            $phone: client.phone,
            $email: client.email,
            $fax: client.fax,
            $title: client.title,
            $address1: client.address1,
            $address2: client.address2,
            $city: client.city,
            $state: client.state,
            $zip: client.zip
        },
        cb);
}

/**
 * Update Client
 * @description Updates an existing client in the database.
 * @param id {numeric}
 * @param client {object}
 * @param client.company {string}
 * @param client.contact {string}
 * @param client.phone {string}
 * @param client.email {string}
 * @param client.fax {string}
 * @param client.title {string}
 * @param client.address1 {string}
 * @param client.address2 {string}
 * @param client.city {string}
 * @param client.state {string}
 * @param client.zip {string}
 * @param cb
 */
function update (id, client, cb) {
    var set = [];
    var query = 'UPDATE clients SET ';
    Object.keys(client).forEach(function (key) {
        set.push(key + '=$' + client[key]);
    });
    query += set.join(', ') + 'WHERE id=$id;';
    db.run(query, {$id: id}, cb);
}

/**
 * Remove Client
 * @description Remove an existing client from the database.
 * @param id {numeric}
 * @param cb {function}
 */
function remove (id, cb) {
    db.run('DELETE FROM clients WHERE id=$id;', {$id: id}, cb);
}

module.exports = {
    add: add,
    update: update,
    get: get,
    list: list,
    remove: remove
};