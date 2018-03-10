'use strict';

const action = require('../../../controllers/projects/create');
const test = require('ava').test;
const sinon = require('sinon');

const req = { body: 'body' };
const res = { sendStatus: sinon.spy() };

test('POST /projects - when database error', async t => {
  let model = { create: sinon.stub().throws(new Error()) };
  await action(req, res, null, model);
  t.true(res.sendStatus.calledWith(500)); 
});

test('POST /projects - sends correct status code', async t => {
  let model = { create: sinon.stub() };
  await action(req, res, null, model);
  t.true(res.sendStatus.calledWith(200));
});

test('POST /projects - uses correct ID', async t => {
  let model = { create: sinon.stub() };
  await action(req, res, null, model);
  t.true(model.create.calledWith('body'));
});
