'use strict';

var fs = require('fs');

fs
    .createReadStream('../bower_components/angular/angular.min.js')
    .pipe(fs.createWriteStream('../public/js/angular.min.js'));

fs
    .createReadStream('../bower_components/angular-toastr/dist/angular-toastr.min.js')
    .pipe(fs.createWriteStream('../public/js/angular-toastr.min.js'));

fs
    .createReadStream('../bower_components/angular-toastr/dist/angular-toastr.css')
    .pipe(fs.createWriteStream('../public/css/angular-toastr.css'));

fs
    .createReadStream('../bower_components/angular-toastr/dist/angular-toastr.min.css')
    .pipe(fs.createWriteStream('../public/css/angular-toastr.min.css'));