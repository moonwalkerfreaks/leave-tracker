const bcrypt = require('bcryptjs');
const supabase = require('../supabaseClient');

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  // Validate request body
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  // Fetch user from Supabase
  const { data: users, error } = await supabase
    .from('users')
    .select('*')
    .eq('username', username);

  if (error) {
    console.error('Supabase error:', error);
    return res.status(500).json({ message: 'Database error' });
  }

  if (!users || users.length === 0) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  const user = users[0];

  // Compare hashed password
  const isMatch = await bcrypt.compare(password, user.password_hash);
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  // ✅ Login successful
  return res.json({
    message: 'Login successful',
    user: {
      id: user.id,
      username: user.username,
      role: user.role
    }
  });
};

module.exports = { loginUser };

