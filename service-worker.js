"use strict";var precacheConfig=[["/index.html","548a63484c373426339512928f15f9a2"],["/static/css/main.41298ca1.css","41298ca13d4cc443874630d28b97bab1"],["/static/js/main.ad82267e.js","9683dc84977a61c095b4ffeae8b594ac"],["/static/media/Planets_logoFull.8d89233b.png","8d89233b0982979b840d0dcb1bd90a37"],["/static/media/Planets_logoSquareWhite_64.f2c338fd.png","f2c338fdf75cebd4c5bcb2ac47c5f430"],["/static/media/Planets_particle1.b28e91a8.png","b28e91a821534daf5cd1ec45217c340c"],["/static/media/Planets_pipe.f0179d68.png","f0179d6853c01c11b920b70ca2735454"],["/static/media/Planets_planetSelection.5cba8d78.png","5cba8d78aebff45fd60955e1312c6adb"],["/static/media/Planets_ship.de61aab6.png","de61aab6dc8d58b72e117a6d6740fdfc"],["/static/media/Planets_shipMaskColor1.bffa8282.png","bffa8282e3fbe3c4e9a879c7692cae97"],["/static/media/Planets_type1Color.d904506b.png","d904506b95fe61079101c319d664abbc"],["/static/media/Planets_type1Mask1.1d6efe9d.png","1d6efe9d4a7f03aeccb3801cc8a09be5"],["/static/media/Planets_type2Color.881d0ae7.png","881d0ae77fd1758aace83f12cb35e82c"],["/static/media/Planets_type2Mask1.56d298cd.png","56d298cd74737407e48034ea18f4b2ea"],["/static/media/backgroundNarrow.008c4692.jpg","008c46928abcc916adda422818f31083"],["/static/media/backgroundWide.58587a6e.jpg","58587a6e719f2d4524da11b609b65c8a"],["/static/media/createPlanet.56859f63.png","56859f631c60313814814febc1e0d680"],["/static/media/cup.37328c78.png","37328c785f25659c2b0e7987e688bd13"],["/static/media/flags16.109d8321.png","109d8321986851ee43cfc8673617910e"],["/static/media/overlayRanking.bde7c129.png","bde7c129ebbc1efc37c50f5a93b5606e"],["/static/media/sendShip.ec3ee91a.png","ec3ee91aebc8c5d6feae6788cd9521fb"],["/static/media/shipStream.46afdc18.png","46afdc189dfc22ffa574916664a924e7"],["/static/media/win.b5ddc4fa.png","b5ddc4faaf6dc2d16f79f022cec1e996"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var a=new URL(e);return"/"===a.pathname.slice(-1)&&(a.pathname+=t),a.toString()},cleanResponse=function(t){return t.redirected?("body"in t?Promise.resolve(t.body):t.blob()).then(function(e){return new Response(e,{headers:t.headers,status:t.status,statusText:t.statusText})}):Promise.resolve(t)},createCacheKey=function(e,t,a,n){var c=new URL(e);return n&&c.pathname.match(n)||(c.search+=(c.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(a)),c.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var a=new URL(t).pathname;return e.some(function(e){return a.match(e)})},stripIgnoredUrlParameters=function(e,a){var t=new URL(e);return t.hash="",t.search=t.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(t){return a.every(function(e){return!e.test(t[0])})}).map(function(e){return e.join("=")}).join("&"),t.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],a=e[1],n=new URL(t,self.location),c=createCacheKey(n,hashParamName,a,/\.\w{8}\./);return[n.toString(),c]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(n){return setOfCachedUrls(n).then(function(a){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(t){if(!a.has(t)){var e=new Request(t,{credentials:"same-origin"});return fetch(e).then(function(e){if(!e.ok)throw new Error("Request for "+t+" returned a response with status "+e.status);return cleanResponse(e).then(function(e){return n.put(t,e)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var a=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(t){return t.keys().then(function(e){return Promise.all(e.map(function(e){if(!a.has(e.url))return t.delete(e)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(t){if("GET"===t.request.method){var e,a=stripIgnoredUrlParameters(t.request.url,ignoreUrlParametersMatching),n="index.html";(e=urlsToCacheKeys.has(a))||(a=addDirectoryIndex(a,n),e=urlsToCacheKeys.has(a));var c="/index.html";!e&&"navigate"===t.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],t.request.url)&&(a=new URL(c,self.location).toString(),e=urlsToCacheKeys.has(a)),e&&t.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(a)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(e){return console.warn('Couldn\'t serve response for "%s" from cache: %O',t.request.url,e),fetch(t.request)}))}});