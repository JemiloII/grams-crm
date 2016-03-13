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

describe('Client Controller', function () {
    describe('List', function () {
        it('Retrieves all clients from the database', function (done) {
            var req = {body: {}};
            var res = testRes(200, function (data) {
                assert.isArray(data.client, 'List data returned must be an array!');
                assert.isObject(data.client[0], 'List data within array must be an array!');
                assert.isAtLeast(data.client.length, 2, 'List data returned must be an array!');
                done();
            });
            clientCtrl.list(req, res);
        });

        //todo create test user
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
            var req = {body: {}};
            var res = testRes(200, function (data) {
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
                assert.isAtLeast(data.client.length, 2, 'List data returned must be an array!');
                done();
            });
            clientCtrl.list(req, res);
        });
    });
});