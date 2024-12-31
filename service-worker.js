const staticSite = "website";
const assets = [
  "/index.html",
  "/style.css",
  "/app.js",
  // aggiungi altri file qui
];

// Evento di installazione del service worker
self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(staticSite).then(cache => {
      return cache.addAll(assets).catch(error => {
        console.error("Error adding assets to cache: ", error);
      });
    })
  );
});

// Evento di fetch per rispondere alle richieste
self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      // Se il file è presente nella cache, viene restituito
      if (res) {
        return res;
      }
      
      // Altrimenti si esegue la fetch normalmente
      return fetch(fetchEvent.request).catch(error => {
        console.error("Fetch error: ", error);
        // Se necessario, puoi restituire una risposta di fallback qui
      });
    })
  );
});

