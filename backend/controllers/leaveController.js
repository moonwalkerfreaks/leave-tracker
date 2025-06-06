const supabase = require('../supabaseClient');

const applyLeave = async (req, res) => {
  const { employee, from_date, to_date, reason } = req.body;

  const { error } = await supabase.from('leaves').insert([{
    employee,
    from_date,
    to_date,
    reason,
    status: 'pending'
  }]);

  if (error) {
    console.error('Supabase Insert Error:', error);
    return res.status(500).json({ message: 'Error submitting leave request', error });
  }

  return res.status(201).json({ message: 'Leave request submitted successfully' });
};

const getPendingLeaves = async (req, res) => {
  const { data, error } = await supabase
    .from('leaves')
    .select('*')
    .eq('status', 'pending');

  if (error) return res.status(500).json({ message: 'Error fetching leaves', error });
  return res.json(data);
};

const updateLeaveStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!['approved', 'rejected'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }

  const { error } = await supabase
    .from('leaves')
    .update({ status })
    .eq('id', id);

  if (error) return res.status(500).json({ message: 'Error updating leave status', error });

  return res.json({ message: `Leave request ${status}` });
};

module.exports = { applyLeave, getPendingLeaves, updateLeaveStatus };
