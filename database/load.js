'use strict';

var fs = require('fs');
var csvParse = require('csv-parse');
var path = require('path');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(path.join(__dirname, 'database.db'));

function formatData (csvRows) {
    if (csvRows[0][0] === 'Contact Type' && csvRows[0][1] === 'Private') {
        console.log('Formatting csv!');
        csvRows.forEach(function(csvRow) {
            csvRow.splice(0,2);
            csvRow.forEach(function (csvColumn) {
                csvColumn.replace('"','').replace('  ', ' ');
            });
            csvRow[2] = formatPhoneNumbers(csvRow[2]);
        });
        delete csvRows[0];
        console.log('Format Complete!');
    }
}

function formatPhoneNumbers (phoneNumber) {
    switch (true) {
        case /\d{3}-\d{3}-\d{4}/.test(phoneNumber):
            return '(' + phoneNumber.replace('-', ')');
        case /\(\d{3}\)\s\d{3}-\d{4}/.test(phoneNumber):
            return phoneNumber.replace(' ', '');
        case /\d{3}-\d{3}-\d/.test(phoneNumber):
            return phoneNumber.slice(0,7) + phoneNumber.slice(8,phoneNumber.length);
        default:
            return phoneNumber;
    }
}

function insertData (csvRows) {
    db.run('BEGIN TRANSACTION;');
    csvRows.forEach(function (csvRow) {
        console.log('csvRow: ', csvRow);
        db.run('INSERT OR IGNORE INTO clients (Company,Contact,Phone,Fax,Title,Address1,Address2,City,State,Zip) VALUES (?,?,?,?,?,?,?,?,?,?);', csvRow, insertError);
    });
    db.run('END;');
}
function insertError (error) {
    if (error) {
        console.log('There was an error inserting the data!');
        console.log('Error: ', error);
    }
}

function loadCSV (csv) {
    if(fs.existsSync(csv)) {
        console.log('Reading the csv file!');
        var data = fs.readFileSync(csv);
        csvParse(data, function (error, csvRows) {
            if (error) {
                console.log('Error loading csv!');
            }
            else {
                formatData(csvRows);
                insertData(csvRows);
            }
        });
    }
    else {
        console.log('File does not exist!');
    }
}

module.exports = {
    csv: loadCSV
};
