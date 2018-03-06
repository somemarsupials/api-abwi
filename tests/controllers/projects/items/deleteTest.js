'use strict';

const action = require('../../../../controllers/projects/items/delete');
const test = require('ava').test;
const sinon = require('sinon');

const req = { params: { id: 3, projectId: 5 } };
const res = { sendStatus: sinon.spy() };

test('DELETE /project/:id/items - when database error', async t => {
  let model = { destroy: sinon.stub().throws(new Error()) };
  await action(req, res, null, model);
  t.true(res.sendStatus.calledWith(500)); 
});

test('DELETE /project/:id/items - sends status code', async t => {
  let model = { destroy: sinon.stub() };
  await action(req, res, null, model);
  t.true(res.sendStatus.calledWith(200));
});

test('GET /project/:id/items - uses correct ID', async t => {
  let model = { destroy: sinon.stub() };
  await action(req, res, null, model);
  t.true(model.destroy.calledWith(
    { where: { projectId: 5, id: 3 } }
  ));
});

