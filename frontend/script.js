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
    // Store token or redirect to dashboard
    window.location.href = 'dashboard.html';
  } else {
    alert(data.message || 'Login failed');
  }
});
