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

module.exports = { applyLeave };
