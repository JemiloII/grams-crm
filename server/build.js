'use strict';

var fs = require('fs');
var path = require('path');

/**
 * Move files
 */

fs  /** Angular */
    .createReadStream(path.join(__dirname, '../bower_components/angular/angular.min.js'))
    .pipe(fs.createWriteStream(path.join(__dirname, '../public/js/angular.min.js')));

fs  /** Angular-Route */
    .createReadStream(path.join(__dirname, '../bower_components/angular-route/angular-route.min.js'))
    .pipe(fs.createWriteStream(path.join(__dirname, '../public/js/angular-route.min.js')));

fs  /** Angular-Local-Storage */
    .createReadStream(path.join(__dirname, '../bower_components/angular-local-storage/dist/angular-local-storage.min.js'))
    .pipe(fs.createWriteStream(path.join(__dirname, '../public/js/angular-local-storage.min.js')));

fs  /** Angular-Toastr */
    .createReadStream(path.join(__dirname, '../bower_components/angular-toastr/dist/angular-toastr.min.js'))
    .pipe(fs.createWriteStream(path.join(__dirname, '../public/js/angular-toastr.min.js')));

fs  /** Bulma */
    .createReadStream(path.join(__dirname, '../bower_components/bulma/css/bulma.min.css'))
    .pipe(fs.createWriteStream(path.join(__dirname, '../public/css/bulma.min.css')));
