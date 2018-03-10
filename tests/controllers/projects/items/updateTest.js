'use strict';

const action = require('../../../../controllers/projects/items/update');
const test = require('ava').test;
const sinon = require('sinon');

const item = { update: sinon.stub() };
const req = { params: { id: 5, projectId: 3 }, body: 'body' };
const res = { sendStatus: sinon.spy() };

test('PATCH /projects/:id/items/:id - when database error', async t => {
  let model = { find: sinon.stub().throws(new Error()) };
  await action(req, res, null, model);
  t.true(res.sendStatus.calledWith(500)); 
});

test('PATCH /projects/:id/items/:id - when doesn\'t exist', async t => {
  let model = { find: sinon.stub().returns(null) };
  await action(req, res, null, model);
  t.true(res.sendStatus.calledWith(404));
});

test('PATCH /projects/:id/items/:id - sends correct status code', async t => {
  let model = { find: sinon.stub().returns(item) };
  await action(req, res, null, model);
  t.true(res.sendStatus.calledWith(200));
});

test('PATCH /projects/:id/items/:id - uses correct ID', async t => {
  let model = { find: sinon.stub().returns(item) };
  await action(req, res, null, model);
  t.true(model.find.calledWith({ where: { projectId: 3, id: 5 } }));
});

test('PATCH /projects/:id/items/:id - uses update parameters', async t => {
  let model = { find: sinon.stub().returns(item) };
  await action(req, res, null, model);
  t.true(item.update.calledWith('body'));
});

