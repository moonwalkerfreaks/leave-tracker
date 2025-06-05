const bcrypt = require('bcryptjs');

// Simulated user from "database"
const fakeUser = {
  username: 'admin',
  passwordHash: bcrypt.hashSync('password123', 10),
  role: 'admin'
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  if (username !== fakeUser.username) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  const isMatch = await bcrypt.compare(password, fakeUser.passwordHash);
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  // TODO: Add token later
  return res.json({ message: 'Login successful', role: fakeUser.role });
};

module.exports = { loginUser };
