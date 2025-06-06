async function fetchLeaveRequests() {
  const res = await fetch('http://3.110.132.46/:3000/api/leaves/pending');
  const data = await res.json();

  const container = document.getElementById('leave-requests');
  container.innerHTML = '';

  if (data.length === 0) {
    container.innerText = 'No pending leave requests';
    return;
  }

  data.forEach(leave => {
    const div = document.createElement('div');
    div.innerHTML = `
      <p><b>Employee:</b> ${leave.employee}</p>
      <p><b>From:</b> ${leave.from_date}</p>
      <p><b>To:</b> ${leave.to_date}</p>
      <p><b>Reason:</b> ${leave.reason}</p>
      <button onclick="updateLeaveStatus('${leave.id}', 'approved')">Approve</button>
      <button onclick="updateLeaveStatus('${leave.id}', 'rejected')">Reject</button>
      <hr>
    `;
    container.appendChild(div);
  });
}

async function updateLeaveStatus(id, status) {
  const res = await fetch(`http://3.110.132.46:3000/api/leaves/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status })
  });

  const data = await res.json();
  alert(data.message);
  fetchLeaveRequests();
}

fetchLeaveRequests();
