'use strict';

const action = require('../../../controllers/clients/delete');
const test = require('ava').test;
const sinon = require('sinon');

const req = { params: { id: 5 } };
const res = { sendStatus: sinon.spy() };

test('DELETE /clients/:id - when database error', async t => {
  let model = { destroy: sinon.stub().throws(new Error()) };
  await action(req, res, null, model);
  t.true(res.sendStatus.calledWith(500)); 
});

test('DELETE /clients/:id - sends status code', async t => {
  let model = { destroy: sinon.stub() };
  await action(req, res, null, model);
  t.true(res.sendStatus.calledWith(200));
});

test('DELETE /clients/:id - uses correct ID', async t => {
  let model = { destroy: sinon.stub() };
  await action(req, res, null, model);
  t.true(model.destroy.calledWith({ where: { id: 5 }, cascade: true }));
});

