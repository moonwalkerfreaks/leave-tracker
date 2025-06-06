// Save default username to localStorage for testing
//localStorage.setItem('username', 'mbhori'); // You can change this as needed

// Handle leave request form submission
document.getElementById('leave-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const from_date = document.getElementById('from_date').value;
  const to_date = document.getElementById('to_date').value;
  const reason = document.getElementById('reason').value;
  const employee = localStorage.getItem('username');

  try {
    const res = await fetch('http://3.110.132.46:3000/api/leaves', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ employee, from_date, to_date, reason })
    });

    const data = await res.json();
    document.getElementById('status-message').innerText = data.message;

    // Refresh the user's leave list after submission
    fetchMyLeaves();
  } catch (err) {
    console.error('Error submitting leave request:', err);
    document.getElementById('status-message').innerText = 'Failed to submit request.';
  }
});

// Fetch and display the current user's leave requests
async function fetchMyLeaves() {
  const employee = localStorage.getItem('username');

  try {
    const res = await fetch(`http://3.110.132.46:3000/api/leaves/user/${employee}`);
    const data = await res.json();

    const container = document.getElementById('my-leaves');
    container.innerHTML = '';

    if (data.length === 0) {
      container.innerText = 'No leave requests found';
      return;
    }

    data.forEach(leave => {
      const div = document.createElement('div');
      div.innerHTML = `
        <p><b>From:</b> ${leave.from_date}</p>
        <p><b>To:</b> ${leave.to_date}</p>
        <p><b>Reason:</b> ${leave.reason}</p>
        <p><b>Status:</b> <strong>${leave.status.toUpperCase()}</strong></p>
        <hr>
      `;
      container.appendChild(div);
    });
  } catch (err) {
    console.error('Error fetching user leaves:', err);
    document.getElementById('my-leaves').innerText = 'Error fetching leave requests.';
  }
}

// Call it on load
fetchMyLeaves();
