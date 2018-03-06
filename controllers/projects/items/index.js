const express = require('express');
const router = express.Router({ mergeParams: true });

router.get('/', require('./all'));
router.get('/:id', require('./show'));
router.post('/', require('./create'));

module.exports = router;

