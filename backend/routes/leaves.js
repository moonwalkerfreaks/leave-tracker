const express = require('express');
const router = express.Router();
const { applyLeave } = require('../controllers/leaveController');
const { getPendingLeaves, updateLeaveStatus } = require('../controllers/leaveController');

router.post('/', applyLeave);
router.get('/pending', getPendingLeaves);
router.put('/:id', updateLeaveStatus);

module.exports = router;
