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
                assert.isAtLeast(data.client.length, 1, 'List data returned must be an array!');
                done();
            });
            clientCtrl.list(req, res);
        });

        it('Retrieves companies with "GO PRO" in their name from the database', function (done) {
            var req = {body: {company: 'GO PRO'}};
            var res = testRes(200, function (data) {
                assert.isArray(data.client, 'List data returned must be an array!');
                assert.isAtLeast(data.client.length, 1, 'List data returned must be an array!');
                done();
            });
            clientCtrl.list(req, res);
        });

        it('Retrieves contacts with "Barb" and companies with "GO PRO" from the database', function (done) {
            var req = {body: {company: 'GO PRO', contact: 'Barb'}};
            var res = testRes(200, function (data) {
                assert.isArray(data.client, 'List data returned must be an array!');
                assert(data.client.length, 1, 'List data returned must be an array!');
                done();
            });
            clientCtrl.list(req, res);
        });
    });
});