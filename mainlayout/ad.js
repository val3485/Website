// Sales & Profit (bar chart)
const salesCtx = document.getElementById('salesChart').getContext('2d');
new Chart(salesCtx, {
  type: 'bar',
  data: {
    labels: ['Hot Coffee', 'Cold Coffee', 'Non-Coffee'],
    datasets: [
      {
        label: 'Sales',
        data: [12000, 15000, 8000],
        backgroundColor: '#8b5e3b'
      },
      {
        label: 'Profit',
        data: [7000, 9000, 4000],
        backgroundColor: '#3b2a1a'
      }
    ]
  },
  options: {
    responsive: true,
    plugins: { legend: { position: 'bottom' } },
    scales: { y: { beginAtZero: true } }
  }
});

// Gross Margin (doughnut)
const marginCtx = document.getElementById('marginChart').getContext('2d');
new Chart(marginCtx, {
  type: 'doughnut',
  data: {
    labels: ['Hot Coffee', 'Cold Coffee', 'Non-Coffee'],
    datasets: [
      {
        data: [45, 35, 20],
        backgroundColor: ['#8b5e3b', '#cfa87d', '#3b2a1a']
      }
    ]
  },
  options: { plugins: { legend: { position: 'right' } } }
});

// Actual vs Plan (line chart)
const planCtx = document.getElementById('planChart').getContext('2d');
new Chart(planCtx, {
  type: 'line',
  data: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Actual',
        data: [8000, 9500, 11000, 13000, 12500, 14000],
        borderColor: '#3b2a1a',
        tension: 0.4
      },
      {
        label: 'Plan',
        data: [9000, 10000, 12000, 13500, 13000, 14500],
        borderColor: '#8b5e3b',
        borderDash: [5, 5],
        tension: 0.4
      }
    ]
  },
  options: {
    responsive: true,
    plugins: { legend: { position: 'bottom' } }
  }
});