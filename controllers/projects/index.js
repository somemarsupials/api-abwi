const express = require('express');
const router = express.Router();

// Project routes

router.get('/', require('./all'));
router.get('/:id', require('./show'));
router.post('/', require('./create'));
router.patch('/:id', require('./update'));
router.delete('/:id', require('./delete'));

// Item child routes

router.use('/:projectId/items', require('./items/'));

module.exports = router;
