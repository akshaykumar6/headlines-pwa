console.log('Hello from service-worker.js');

workbox.precaching.precacheAndRoute(self.__precacheManifest || []);

workbox.routing.registerRoute(/(?:https:\/\/newsapi.org\/.*)/, workbox.strategies.networkFirst());
