'use strict';

const action = require('../../../controllers/clients/create');
const test = require('ava').test;
const sinon = require('sinon');

const req = { body: 'body' };
const res = { sendStatus: sinon.spy() };

test('POST /client - when database error', async t => {
  let model = { create: sinon.stub().throws(new Error()) };
  await action(req, res, null, model);
  t.true(res.sendStatus.calledWith(500)); 
});

test('POST /client - sends correct status code', async t => {
  let model = { create: sinon.stub() };
  await action(req, res, null, model);
  t.true(res.sendStatus.calledWith(200));
});

test('POST /client - uses correct ID', async t => {
  let model = { create: sinon.stub() };
  await action(req, res, null, model);
  t.true(model.create.calledWith('body'));
});
