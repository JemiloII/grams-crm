'use strict';

var assert = require('chai').assert;
var clientCtrl = require('../../../../api/clients/controller');

function testRes (httpCode, cb) {
    return {
        status: function (code) {
            assert(code, httpCode);
            this.send = cb;
            return this;
        }
    }
}

//todo create test user to retrieve
describe('Client Controller', function () {
    describe('List', function () {
        it('Retrieves all clients from the database', function (done) {
            var req = {body: {}};
            var res = testRes(200, function (data) {
                assert.isArray(data.client, 'List data returned must be an array!');
                assert.isObject(data.client[0], 'List data within array must be an array!');
                assert.isAtLeast(data.client.length, 2, 'List data returned must be an array!');
                assert(Object.keys(data.client[0]).length === 12, 'Client data returned must have 12 properties');
                assert.isObject(data.client[0], 'Client data returned must be an object!');
                assert.property(data.client[0], 'id', 'Must have a property named id.');
                assert.property(data.client[0], 'company', 'Must have a property named company.');
                assert.property(data.client[0], 'contact', 'Must have a property named id.');
                assert.property(data.client[0], 'phone', 'Must have a property named phone.');
                assert.property(data.client[0], 'email', 'Must have a property named email.');
                assert.property(data.client[0], 'fax', 'Must have a property named fax.');
                assert.property(data.client[0], 'title', 'Must have a property named title.');
                assert.property(data.client[0], 'address1', 'Must have a property named address1.');
                assert.property(data.client[0], 'address2', 'Must have a property named address2.');
                assert.property(data.client[0], 'city', 'Must have a property named city.');
                assert.property(data.client[0], 'state', 'Must have a property named state.');
                assert.property(data.client[0], 'zip', 'Must have a property named zip.');
                done();
            });
            clientCtrl.list(req, res);
        });

        it('Retrieves contacts with "Barb" from the database', function (done) {
            var req = {body: {contact: 'Barb'}};
            var res = testRes(200, function (data) {
                assert.isArray(data.client, 'List data returned must be an array!');
                assert.isObject(data.client[0], 'List data within array must be an array!');
                assert.isAtLeast(data.client.length, 1, 'List data returned must be an array!');
                done();
            });
            clientCtrl.list(req, res);
        });

        it('Retrieves companies with "GO PRO" in their name from the database', function (done) {
            var req = {body: {company: 'GO PRO'}};
            var res = testRes(200, function (data) {
                assert.isArray(data.client, 'List data returned must be an array!');
                assert.isObject(data.client[0], 'List data within array must be an array!');
                assert.isAtLeast(data.client.length, 1, 'List data returned must be an array!');
                done();
            });
            clientCtrl.list(req, res);
        });

        it('Retrieves contacts with "Barb" and companies with "GO PRO" from the database', function (done) {
            var req = {body: {company: 'GO PRO', contact: 'Barb'}};
            var res = testRes(200, function (data) {
                assert.isArray(data.client, 'List data returned must be an array!');
                assert.isObject(data.client[0], 'List data within array must be an array!');
                assert(data.client.length, 1, 'List data returned must be an array!');
                done();
            });
            clientCtrl.list(req, res);
        });
    });

    describe('Get', function () {
        it('Retrieves a client by id from the database', function (done) {
            var req = {params: {id: 315}};
            var res = testRes(200, function (data) {
                assert(Object.keys(data.client).length === 12, 'Client data returned must have 12 properties');
                assert.isObject(data.client, 'Client data returned must be an object!');
                assert.property(data.client, 'id', 'Must have a property named id.');
                assert.property(data.client, 'company', 'Must have a property named company.');
                assert.property(data.client, 'contact', 'Must have a property named id.');
                assert.property(data.client, 'phone', 'Must have a property named phone.');
                assert.property(data.client, 'email', 'Must have a property named email.');
                assert.property(data.client, 'fax', 'Must have a property named fax.');
                assert.property(data.client, 'title', 'Must have a property named title.');
                assert.property(data.client, 'address1', 'Must have a property named address1.');
                assert.property(data.client, 'address2', 'Must have a property named address2.');
                assert.property(data.client, 'city', 'Must have a property named city.');
                assert.property(data.client, 'state', 'Must have a property named state.');
                assert.property(data.client, 'zip', 'Must have a property named zip.');
                done();
            });
            clientCtrl.get(req, res);
        });
    });

    describe('Add', function () {
        it('Retrieves a client by id from the database', function (done) {
            var req = {body: {
                company: 'Visual Novel X',
                contact: 'Brian Jemilo II',
                phone: '(708)381-9854',
                email: 'brian@visualnovelx.com',
                fax: 'N/A',
                title: 'CEO',
                address1: '5148 Deerpath Rd',
                address2: 'N/A',
                city: 'Oakforest',
                state: 'IL',
                zip: '60452'
                }};
            var res = testRes(200, function (data) {
                console.log(data);
                assert(Object.keys(data.client).length === 12, 'Client data returned must have 12 properties');
                assert.isObject(data.client, 'Client data returned must be an object!');
                assert.property(data.client, 'id', 'Must have a property named id.');
                assert(data.client.company === req.body.company, 'Database entry for company does not match request.');
                assert(data.client.contact === req.body.contact, 'Database entry for contact does not match request.');
                assert(data.client.phone === req.body.phone, 'Database entry for phone does not match request.');
                assert(data.client.email === req.body.email, 'Database entry for email does not match request.');
                assert(data.client.fax === req.body.fax, 'Database entry for fax does not match request.');
                assert(data.client.title === req.body.title, 'Database entry for title does not match request.');
                assert(data.client.address1 === req.body.address1, 'Database entry for address1 does not match request.');
                assert(data.client.address2 === req.body.address2, 'Database entry for address2 does not match request.');
                assert(data.client.city === req.body.city, 'Database entry for city does not match request.');
                assert(data.client.state === req.body.state, 'Database entry for state does not match request.');
                assert(data.client.zip == req.body.zip, 'Database entry for zip does not match request.');
                done();
            });
            clientCtrl.add(req, res);
        });
    });
});