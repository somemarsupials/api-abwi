const queryFilter = require('../../middlewares/queryFilter');
const test = require('ava').test;
const sinon = require('sinon');

const req = { query: { a: 1, d: 2, e: 3, f: 4 } };
const next = sinon.spy();

test('queryFilter - queryFilter gets correct fields', t => {
  queryFilter(req, null, next);
  t.deepEqual(req.filterQuery(['a', 'd', 'e']), { a: 1, d: 2, e: 3});
});

test('queryFilter - queryFilter when no fields present', t => {
  queryFilter(req, null, next);
  t.deepEqual(req.filterQuery([]), {});
});

test('queryFilter - databaseQuery gets correct fields', t => {
  queryFilter(req, null, next);
  const model = { attributes: { a: 1, b: 2, c: 3 } }; 
  t.deepEqual(req.databaseQuery(model), { a: 1 });
});

test('queryFilter - databaseQuery when no fields present', t => {
  queryFilter(req, null, next);
  const model = { attributes: {} };
  t.deepEqual(req.filterQuery([]), {});
});

test('queryFilter - calls next middleware', t => {
  queryFilter(req, null, next);
  t.true(next.called);
});

