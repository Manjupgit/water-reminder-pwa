let reminderInterval;

document.getElementById('start-btn').addEventListener('click', function() {
  if (Notification.permission !== 'granted') {
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        startReminder();
      } else {
        alert('Notifications are required to use this feature.');
      }
    });
  } else {
    startReminder();
  }
});

function startReminder() {
  reminderInterval = setInterval(() => {
    navigator.serviceWorker.ready.then(function(reg) {
      reg.showNotification('Water Reminder', {
        body: 'Time to drink some water!',
        icon: 'icon.png'
      });
    });
  }, 3600000); // 1 hour = 3600000 ms

  document.getElementById('status').textContent = 'Reminder started!';
}

document.getElementById('stop-btn').addEventListener('click', function() {
  clearInterval(reminderInterval);
  document.getElementById('status').textContent = 'Reminder stopped!';
});
