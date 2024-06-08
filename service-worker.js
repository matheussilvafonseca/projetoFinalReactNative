self.addEventListener('push', function(event) {
    const data = event.data.json();
    const title = data.title || 'Notificação';
    const options = {
      body: data.body || 'Você tem uma nova notificação!',
      icon: data.icon || '/icon.png',
      data: data.url || '/'
    };
  
    event.waitUntil(
      self.registration.showNotification(title, options)
    );
  });
  
  self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(
      clients.openWindow(event.notification.data)
    );
  });
  