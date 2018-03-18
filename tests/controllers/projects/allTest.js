'use strict';

const action = require('../../../controllers/projects/all');
const test = require('ava').test;
const sinon = require('sinon');

const projects = [
  { json: sinon.stub().returns('hello') }, 
  { json: sinon.stub().returns('world') }
];

const query = 0;
const databaseQuery = sinon.stub().returns({ a: 1 });
const req = { query: query, databaseQuery: databaseQuery };

test('GET /projects - when database error', async t => {
  let res = { sendStatus: sinon.spy() };
  let model = { findAll: sinon.stub().throws(new Error()) };
  await action(req, res, null, model);
  t.true(res.sendStatus.calledWith(500)); 
});

test('GET /projects - calls databaseQuery with model', async t => {
  let res = { json: sinon.spy() };
  let model = { findAll: sinon.stub().returns(projects) };
  await action(req, res, null, model);
  t.true(req.databaseQuery.calledWith(model));
});

test('GET /projects - uses correct fields in findAll', async t => {
  let res = { json: sinon.spy() };
  let model = { findAll: sinon.stub().returns(projects) };
  await action(req, res, null, model);
  t.true(model.findAll.calledWith({ where: { a: 1 } }));
});

test('GET /projects - passes query string', async t => {
  let res = { json: sinon.spy() };
  let model = { findAll: sinon.stub().returns(projects) };
  await action(req, res, null, model);
  t.true(projects.every((project) => project.json.calledWith(query)));
});

test('GET /projects - sends correct JSON', async t => {
  let res = { json: sinon.spy() };
  let model = { findAll: sinon.stub().returns(projects) };
  await action(req, res, null, model);
  t.true(res.json.calledWith(['hello', 'world']));
});
