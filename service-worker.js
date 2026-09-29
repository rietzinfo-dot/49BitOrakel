// 29.09.2026: Die alte Fassung ("Intuitions-Kompass") ist abgeschaltet.
// Dieser Service Worker löscht seinen alten Zwischenspeicher, meldet sich ab
// und lädt offene Fenster neu, damit alle nur noch die neue Seite sehen.
self.addEventListener('install', function(){ self.skipWaiting(); });
self.addEventListener('activate', function(event){
  event.waitUntil(
    caches.keys()
      .then(function(keys){ return Promise.all(keys.map(function(k){ return caches.delete(k); })); })
      .then(function(){ return self.registration.unregister(); })
      .then(function(){ return self.clients.matchAll({ type: 'window' }); })
      .then(function(clients){ clients.forEach(function(c){ c.navigate(c.url); }); })
  );
});
