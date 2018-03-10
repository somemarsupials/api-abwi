'use strict';

const action = require('../../../controllers/clients/update');
const test = require('ava').test;
const sinon = require('sinon');

const client = { update: sinon.stub() };
const req = { params: { id: 5 }, body: 'body' };
const res = { sendStatus: sinon.spy() };

test('PATCH /clients/:id - when database error', async t => {
  let model = { find: sinon.stub().throws(new Error()) };
  await action(req, res, null, model);
  t.true(res.sendStatus.calledWith(500)); 
});

test('PATCH /clients/:id - when doesn\'t exist', async t => {
  let model = { find: sinon.stub().returns(null) };
  await action(req, res, null, model);
  t.true(res.sendStatus.calledWith(404));
});

test('PATCH /clients/:id - sends correct status code', async t => {
  let model = { find: sinon.stub().returns(client) };
  await action(req, res, null, model);
  t.true(res.sendStatus.calledWith(200));
});

test('PATCH /clients/:id - uses correct ID', async t => {
  let model = { find: sinon.stub().returns(client) };
  await action(req, res, null, model);
  t.true(model.find.calledWith({ where: { id: 5 } }));
});

test('PATCH /clients/:id - uses update parameters', async t => {
  let model = { find: sinon.stub().returns(client) };
  await action(req, res, null, model);
  t.true(client.update.calledWith('body'));
});
