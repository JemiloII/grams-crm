'use strict';

var fs = require('fs');
var path = require('path');

function createClientsTable (db, cb) {
    db.run('CREATE TABLE clients (' +
        'id integer primary key autoincrement,' +
        'company string,' +
        'contact string,' +
        'phone string,' +
        'email string,' +
        'fax string,' +
        'title string,' +
        'address1 string,' +
        'address2 string,' +
        'city string,' +
        'state string,' +
        'zip string);', cb);
}

function createDatabase (savePath, name, cb) {
    if (typeof savePath === 'function') {
        cb = savePath;
        savePath = undefined;
    }
    else if (typeof name === 'function') {
        cb = name;
        name = undefined;
    }

    name = name && (/\.db/.test(name) ? name : name + '.db') || 'database.db';
    savePath = savePath || __dirname;
    var file = path.join(savePath, name);

    if (!fs.existsSync(file)) {
        console.log('Creating Database file.');
        var sqlite3 = require('sqlite3').verbose();
        var db = new sqlite3.Database(file);
        createClientsTable(db, function (error) {
            if (error) {
                console.log('There was an error creating the table!');
            }
            else {
                console.log('Clients table was created successfully!');
            }
            db.close(cb);
        });
    }
    else {
        console.log('Database already created!');
    }
}

module.exports = {
    clientsTable: createClientsTable,
    database: createDatabase
};
