document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const res = await fetch('http://3.110.132.46:3000/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });

  const data = await res.json();

  if (res.ok) {
    alert('Login successful!');

    // ✅ Role-based redirection
    switch (data.user.role) {
      case 'admin':
        window.location.href = 'admin-dashboard.html';
        break;
      case 'manager':
        window.location.href = 'manager-dashboard.html';
        break;
      case 'employee':
        window.location.href = 'employee-dashboard.html';
        break;
      default:
        alert('Unknown role');
    }
  } else {
    alert(data.message || 'Login failed');
  }
});

