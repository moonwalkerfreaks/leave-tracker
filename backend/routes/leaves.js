const express = require('express');
const router = express.Router();
const {
  applyLeave,
  getPendingLeaves,
  updateLeaveStatus
} = require('../controllers/leaveController');
const supabase = require('../supabaseClient');

// Submit a leave request
router.post('/', applyLeave);

// Get all pending leave requests (for manager)
router.get('/pending', getPendingLeaves);

// Update status of a specific leave request
router.put('/:id', updateLeaveStatus);

// Get all leave requests by a specific user
router.get('/user/:username', async (req, res) => {
  const { username } = req.params;

  const { data, error } = await supabase
    .from('leaves')
    .select('*')
    .eq('employee', username)
    .order('created_at', { ascending: false });

  if (error) {
    return res.status(500).json({ message: 'Error fetching user leaves', error });
  }

  return res.json(data);
});

module.exports = router;
