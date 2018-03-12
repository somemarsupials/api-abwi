'use strict';

const action = require('../../../../controllers/projects/items/all');
const test = require('ava').test;
const sinon = require('sinon');

const items = [
  { json: sinon.stub().returns('hello') }, 
  { json: sinon.stub().returns('world') }
];

const query = { a: 1 };
const req = { params: { projectId: 2 }, query: query };

test('GET /projects/:id/items - when database error', async t => {
  let res = { sendStatus: sinon.spy() };
  let model = { findAll: sinon.stub().throws(new Error()) };
  await action(req, res, null, model);
  t.true(res.sendStatus.calledWith(500)); 
});

test('GET /projects/:id/items - selects correct project', async t => {
  let res = { json: sinon.spy() };
  let model = { findAll: sinon.stub().returns(items) };
  await action(req, res, null, model);
  t.true(model.findAll.calledWith({ where: { projectId: 2 } }));
});

test('GET /projects/:id/items  - sends correct JSON', async t => {
  let res = { json: sinon.spy() };
  let model = { findAll: sinon.stub().returns(items) };
  await action(req, res, null, model);
  t.true(res.json.calledWith(['hello', 'world']));
});

test('GET /projects/:id/items - passes query string', async t => {
  let res = { json: sinon.spy() };
  let model = { findAll: sinon.stub().returns(items) };
  await action(req, res, null, model);
  t.true(items.every((item) => item.json.calledWith(query)));
});
