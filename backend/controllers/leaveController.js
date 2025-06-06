const supabase = require('../supabaseClient');

const applyLeave = async (req, res) => {
  const { employee, from_date, to_date, reason } = req.body;

  // Basic input validation
  if (!employee || !from_date || !to_date || !reason) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const { error } = await supabase.from('leaves').insert([{
    employee,
    from_date,
    to_date,
    reason,
    status: 'pending' // can be omitted if 'pending' is already default in Supabase
  }]);

  if (error) {
    console.error('Supabase Insert Error:', error);
    return res.status(500).json({ message: 'Error submitting leave request', error });
  }

  return res.status(201).json({ message: 'Leave request submitted successfully' });
};

module.exports = { applyLeave };
