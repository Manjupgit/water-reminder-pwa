self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open('water-reminder-cache').then((cache) => {
        return cache.addAll([
          '/',
          '/index.html',
          '/script.js',
          '/icon.png',
          '/manifest.json'
        ]);
      })
    );
    self.skipWaiting();
  });
  
  self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  });
  
  // Background sync for notifications
  self.addEventListener('push', function(event) {
    const title = 'Water Reminder';
    const options = {
      body: event.data ? event.data.text() : 'Time to drink water!',
      icon: 'icon.png',
      badge: 'icon.png'
    };
    
    event.waitUntil(self.registration.showNotification(title, options));
  });
  