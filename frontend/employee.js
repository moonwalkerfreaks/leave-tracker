document.getElementById('leave-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const from_date = document.getElementById('from_date').value;
  const to_date = document.getElementById('to_date').value;
  const reason = document.getElementById('reason').value;
  localStorage.setItem('username', 'mbhori');

  const employee = localStorage.getItem('username');

  const res = await fetch('http://3.110.132.46:3000/api/leaves', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ employee, from_date, to_date, reason })
  });

  const data = await res.json();
  document.getElementById('status-message').innerText = data.message;
});
