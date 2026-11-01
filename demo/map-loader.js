// 加载真实地图：解析 JSON、解码贴图到离屏 canvas，挂到 window.__map 供 Java 侧读取
function loadRwMap() {
  // 数据由 <script src="maps/xxx.js"> 同步注入
  const m = window.__RW_MAP_JSON;
  if (!m) throw new Error('地图数据未注入');

  // 贴图已在 HTML 里以 <img> 预加载，这里同步转成 canvas；
  // 缺失的贴图用 1x1 透明占位，保证 tileset 索引不错位。
  const names = m.availableImages || [];
  const tiles = [];
  const indexOf = {};
  for (let i = 0; i < names.length; i++) {
    const el = document.getElementById('tile' + i);
    const cv = document.createElement('canvas');
    if (el && el.naturalWidth) {
      cv.width = el.naturalWidth;
      cv.height = el.naturalHeight;
      cv.getContext('2d').drawImage(el, 0, 0);
    } else {
      cv.width = 1; cv.height = 1;
    }
    indexOf[names[i]] = i;
    tiles.push(cv);
  }

  // 2. tileset 元信息（firstgid / 列数 / tile 尺寸 / 贴图索引）
  const tsMeta = [];
  for (const ts of m.tilesets) {
    if (!ts.image || indexOf[ts.image] === undefined) {
      tsMeta.push(-1, 0, 0, 0, 0);
      continue;
    }
    tsMeta.push(ts.firstgid, ts.columns, ts.tilewidth, ts.tileheight, indexOf[ts.image]);
  }

  // 3. 所有层（Ground → Items → Units 依次叠加）
  const layers = m.layers.map(l => ({
    name: l.name,
    w: l.width,
    h: l.height,
    gids: Int32Array.from(l.data),
  }));
  const first = m.layers[0];

  window.__map = {
    w: first.width,
    h: first.height,
    tw: m.tilewidth,
    th: m.tileheight,
    layers: layers,
    tsMeta: Int32Array.from(tsMeta),
    tsCount: m.tilesets.length,
    tiles: tiles,
  };
  return window.__map;
}
