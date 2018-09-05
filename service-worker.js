console.log('Hello from service-worker.js');

workbox.precaching.precacheAndRoute(self.__precacheManifest || []);