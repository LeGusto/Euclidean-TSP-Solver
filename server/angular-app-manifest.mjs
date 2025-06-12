
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/Euclidean-TSP-Solver/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/Euclidean-TSP-Solver"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 543, hash: '57a04cdc572f652fbc5792fecf3cdc5d95c5c218a9ad7b06692ddcafeeee0f3f', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1060, hash: '832f8ba753ef355cc2709eb1cca354c7b3a6724d29ff6c9973725806ee145205', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 3912, hash: 'a5d23da5897181800e9f7a5a5f586778c7f48a06e8f6730668458548410d477f', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-5INURTSO.css': {size: 0, hash: 'menYUTfbRu8', text: () => import('./assets-chunks/styles-5INURTSO_css.mjs').then(m => m.default)}
  },
};
