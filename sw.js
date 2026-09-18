const CACHE="gohan-otoomo-v3";
const ASSETS=["./","./index.html","./manifest.webmanifest"];

self.addEventListener("install",e=>e.waitUntil(
  caches.open(CACHE)
    .then(c=>c.addAll(ASSETS))
    .then(()=>self.skipWaiting())
));

self.addEventListener("activate",e=>e.waitUntil(
  caches.keys()
    .then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))
    .then(()=>self.clients.claim())
));

self.addEventListener("fetch",e=>{
  if(e.request.method!=="GET") return;
  const url=new URL(e.request.url);

  // HTMLは常にネットを優先。GitHub Pages更新後に古いindex.htmlを残さない。
  if(url.pathname.endsWith("/index.html") || url.pathname.endsWith("/gohan-no-otomo/")){
    e.respondWith(
      fetch(e.request,{cache:"no-store"})
        .then(res=>{
          const copy=res.clone();
          caches.open(CACHE).then(c=>c.put("./index.html",copy));
          return res;
        })
        .catch(()=>caches.match("./index.html"))
    );
    return;
  }

  e.respondWith(
    caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{
      const copy=res.clone();
      caches.open(CACHE).then(c=>c.put(e.request,copy));
      return res;
    }).catch(()=>caches.match("./index.html")))
  );
});
