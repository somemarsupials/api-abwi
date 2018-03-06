const express = require('express');
const router = express.Router({ mergeParams: true });

router.get('/', require('./all'));
router.post('/', require('./create'));

module.exports = router;

