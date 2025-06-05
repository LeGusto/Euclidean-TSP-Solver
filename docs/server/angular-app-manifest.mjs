
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
    'index.csr.html': {size: 543, hash: 'ef31600e730f13636053df1e2ed110fc68d5dc92c8a4022795942e8f2612aa2d', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1060, hash: '9580c1e8e8079d33db1ec41643b690df5f754f70bd0ab1db49b50630519fe6e9', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 3852, hash: '1956310ca28a57e07ec8d116f6f690df2071dc006e665b44fee8517e9e905751', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-5INURTSO.css': {size: 0, hash: 'menYUTfbRu8', text: () => import('./assets-chunks/styles-5INURTSO_css.mjs').then(m => m.default)}
  },
};
