const bcrypt = require('bcryptjs');
const supabase = require('../supabaseClient');

// Login controller
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  // Validate input
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  // Fetch user by username
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

  // Verify password
  const isMatch = await bcrypt.compare(password, user.password_hash);
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  return res.json({
    message: 'Login successful',
    user: {
      id: user.id,
      username: user.username,
      role: user.role
    }
  });
};

// Signup controller
const signupUser = async (req, res) => {
  const { username, password, role } = req.body;

  // Basic validation
  if (!username || !password || !role) {
    return res.status(400).json({ message: 'Username, password, and role are required' });
  }

  // Check for existing user
  const { data: existingUsers, error: userCheckError } = await supabase
    .from('users')
    .select('id')
    .eq('username', username);

  if (userCheckError) {
    console.error('Supabase error:', userCheckError);
    return res.status(500).json({ message: 'Error checking user' });
  }

  if (existingUsers.length > 0) {
    return res.status(409).json({ message: 'Username already taken' });
  }

  // Hash password and insert new user
  const password_hash = await bcrypt.hash(password, 10);

  const { error } = await supabase
    .from('users')
    .insert([{ username, password_hash, role }]);

  if (error) {
    console.error('Supabase insert error:', error);
    return res.status(500).json({ message: 'Signup failed' });
  }

  return res.status(201).json({ message: 'User registered successfully' });
};

module.exports = {
  loginUser,
  signupUser
};

