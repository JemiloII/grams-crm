'use strict';

var validator = require('validator');

function isZipCode (input) {
    return /(\d{5}([\-]\d{4})?)/.test(input);
}

function validateClients (req, res, next) {
    var body = req.body;
    function resError (message) {
        res.status(400).send({error: message});
    }
    if (req.params.id && !validator.isNumeric(req.params.id)) {
        resError('Client id must be a number!');
    }
    else if (body.phone && validator.isMobilePhone(body.phone)) {
        resError('Must be a valid phone number!');
    }
    else if (body.email && validator.isEmail(body.email)) {
        resError('Must be a valid email!');
    }
    else if (body.fax && validator.isMobilePhone(body.fax)) {
        resError('Must be a valid fax number!');
    }
    else if (body.zip && isZipCode(body.zip)) {
        resError('Must be a valid zip code!');
    }
    else {
        next();
    }
}

module.exports = validateClients;
