'use strict';

const action = require('../../../controllers/clients/all');
const test = require('ava').test;
const sinon = require('sinon');

const clients = [
  { json: sinon.stub().returns('hello') }, 
  { json: sinon.stub().returns('world') }
];

const query = 0;
const databaseQuery = sinon.stub().returns({ a: 1 });
const req = { query: query, databaseQuery: databaseQuery };


test('GET /clients - when database error', async t => {
  let res = { sendStatus: sinon.spy() };
  let model = { findAll: sinon.stub().throws(new Error()) };
  await action(req, res, null, model);
  t.true(res.sendStatus.calledWith(500)); 
});

test('GET /clients - calls databaseQuery with model', async t => {
  let res = { json: sinon.spy() };
  let model = { findAll: sinon.stub().returns(clients) };
  await action(req, res, null, model);
  t.true(req.databaseQuery.calledWith(model));
});

test('GET /clients - uses correct fields in findAll', async t => {
  let res = { json: sinon.spy() };
  let model = { findAll: sinon.stub().returns(clients) };
  await action(req, res, null, model);
  t.true(model.findAll.calledWith({ where: { a: 1 } }));
});

test('GET /clients - passes query string', async t => {
  let res = { json: sinon.spy() };
  let model = { findAll: sinon.stub().returns(clients) };
  await action(req, res, null, model);
  t.true(clients.every((client) => client.json.calledWith(0)));
});

test('GET /clients - sends correct JSON', async t => {
  let res = { json: sinon.spy() };
  let model = { findAll: sinon.stub().returns(clients) };
  await action(req, res, null, model);
  t.true(res.json.calledWith(['hello', 'world']));
});
