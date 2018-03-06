'use strict';

const action = require('../../../../controllers/projects/items/create');
const test = require('ava').test;
const sinon = require('sinon');

const req = { body: { a: 1 }, params: { projectId: 5 } };
const res = { sendStatus: sinon.spy() };

test('POST /projects/:id/items - when database error', async t => {
  let model = { create: sinon.stub().throws(new Error()) };
  await action(req, res, null, model);
  t.true(res.sendStatus.calledWith(500)); 
});

test('POST /projects/:id/items - sends correct status code', async t => {
  let model = { create: sinon.stub() };
  await action(req, res, null, model);
  t.true(res.sendStatus.calledWith(200));
});

test('POST /projects/:id/items - uses correct ID', async t => {
  let model = { create: sinon.stub() };
  await action(req, res, null, model);
  t.true(model.create.calledWith({ a: 1, projectId: 5 }));
});
