const express = require('express');
const router = express.Router();
const { applyLeave } = require('../controllers/leaveController');

router.post('/', applyLeave);

module.exports = router;
