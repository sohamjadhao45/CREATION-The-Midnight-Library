/* ============================================================
   CREATION — Midnight Library : REAL PAGE-TURN (peel / curl)
   ------------------------------------------------------------
   The old page is photographed into two layers (a "kept" part and
   a mirrored "flap" that curls over). A fold line sweeps across and
   the next page is revealed underneath. Works from snapshots, so it
   does NOT depend on your CSS animations.

   API
     flipPage(oldEl, newEl, 'next'|'prev', done)  -> auto-animated turn
     PageTurn.begin(oldEl, newEl, dir)            -> manual (finger drag)
        session.setProgress(0..1)
        session.animateTo(0|1, cb)
        session.commit()   // keep new page shown
        session.cancel()   // put old page back
     PageTurn.isBusy()
   ============================================================ */
(function () {
  'use strict';

  const DURATION = 900;   // ms for a full automatic turn
  const TILT = 8;         // degrees the fold line leans (natural look)
  let busy = false;

  const css = document.createElement('style');
  css.textContent = `
    .page{touch-action:pan-y;}
    body.pt-dragging, body.pt-dragging *{user-select:none !important;-webkit-user-select:none !important;}
    .pt-root{position:fixed;overflow:hidden;z-index:9000;pointer-events:none;}
    .pt-root *{pointer-events:none;}
  `;
  document.head.appendChild(css);

  /* ---------- tiny geometry helpers ---------- */
  const dot = (a, b) => a[0] * b[0] + a[1] * b[1];

  // keep the part of polygon where keepSign*dot(pt-P, n) <= 0
  function clipHalf(poly, P, n, keepSign) {
    const out = [];
    const val = p => keepSign * dot([p[0] - P[0], p[1] - P[1]], n);
    for (let i = 0; i < poly.length; i++) {
      const a = poly[i], b = poly[(i + 1) % poly.length];
      const va = val(a), vb = val(b);
      if (va <= 0) out.push(a);
      if ((va < 0 && vb > 0) || (va > 0 && vb < 0)) {
        const t = va / (va - vb);
        out.push([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]);
      }
    }
    return out;
  }
  // intersect polygon with a convex polygon
  function clipConvex(poly, clip) {
    const cen = [0, 0];
    clip.forEach(c => { cen[0] += c[0] / clip.length; cen[1] += c[1] / clip.length; });
    let out = poly;
    for (let i = 0; i < clip.length && out.length; i++) {
      const c1 = clip[i], c2 = clip[(i + 1) % clip.length];
      const nrm = [c2[1] - c1[1], -(c2[0] - c1[0])];
      const keepSign = dot([cen[0] - c1[0], cen[1] - c1[1]], nrm) > 0 ? -1 : 1;
      out = clipHalf(out, c1, nrm, keepSign);
    }
    return out;
  }
  const polyCss = pts => pts.length < 3
    ? 'polygon(0 0,0 0,0 0)'
    : 'polygon(' + pts.map(p => p[0].toFixed(1) + 'px ' + p[1].toFixed(1) + 'px').join(',') + ')';
  const ease = t => (t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

  /* ---------- the turn itself ---------- */
  function begin(oldEl, newEl, dir) {
    if (busy || !oldEl || !newEl || oldEl === newEl) return null;
    busy = true;

    const next = dir !== 'prev';
    const parent = oldEl.parentElement || document.body;
    const r = oldEl.getBoundingClientRect();
    const W = Math.max(1, r.width), H = Math.max(1, r.height);
    const light = document.documentElement.getAttribute('data-theme') === 'light';
    const paper = light ? '#e9dfc6' : '#15110c';

    const oldInline = oldEl.style.display;
    const newInline = newEl.style.display;

    // ---- build snapshot layers (before touching the real pages)
    const mkClone = () => {
      const c = oldEl.cloneNode(true);
      c.style.cssText += ';display:block;position:absolute;left:0;top:0;margin:0;box-sizing:border-box;' +
        'width:' + W + 'px;min-height:' + H + 'px;transform:none;opacity:1;visibility:visible;';
      c.style.setProperty('animation', 'none', 'important');
      c.style.setProperty('transition', 'none', 'important');
      return c;
    };

    const root = document.createElement('div');
    root.className = 'pt-root';
    root.style.cssText += 'left:' + r.left + 'px;top:' + r.top + 'px;width:' + W + 'px;height:' + H + 'px;';

    const keep = mkClone();
    keep.style.willChange = 'clip-path';

    const flapOuter = document.createElement('div');
    flapOuter.style.cssText = 'position:absolute;inset:0;filter:drop-shadow(0 0 9px rgba(0,0,0,.55));';
    const flap = document.createElement('div');
    flap.style.cssText = 'position:absolute;left:0;top:0;width:' + W + 'px;height:' + H + 'px;' +
      'background:' + paper + ';transform-origin:0 0;will-change:transform,clip-path;overflow:hidden;';
    const flapClone = mkClone();
    flapClone.style.opacity = '.28';          // text faintly showing through the paper back
    const flapShade = document.createElement('div');
    flapShade.style.cssText = 'position:absolute;transform-origin:0 50%;width:' + (W * 2) + 'px;height:' + (H * 3) + 'px;' +
      'background:linear-gradient(90deg,rgba(0,0,0,.5) 0px,rgba(255,245,220,.28) 14px,rgba(255,245,220,.06) ' +
      (W * .35) + 'px,rgba(0,0,0,.4) ' + W + 'px,rgba(0,0,0,.4) 100%);';
    flap.append(flapClone, flapShade);
    flapOuter.appendChild(flap);

    const cast = document.createElement('div');
    cast.style.cssText = 'position:absolute;transform-origin:0 50%;width:70px;height:' + (H * 3) + 'px;' +
      'background:linear-gradient(90deg,rgba(0,0,0,.45),rgba(0,0,0,0));';

    root.append(keep, flapOuter, cast);
    parent.appendChild(root);

    // if an ancestor (transform/filter) breaks position:fixed, fall back to <body>
    const chk = root.getBoundingClientRect();
    if (Math.abs(chk.left - r.left) > 2 || Math.abs(chk.top - r.top) > 2) document.body.appendChild(root);

    // ---- swap the real pages underneath
    oldEl.style.display = 'none';
    newEl.style.display = 'block';
    window.scrollTo(0, 0);
    const nr = newEl.getBoundingClientRect();
    const offX = r.left - nr.left, offY = r.top - nr.top;

    const BIG = [[-1e4, -1e4], [1e4, -1e4], [1e4, 1e4], [-1e4, 1e4]];
    const RECT = [[0, 0], [W, 0], [W, H], [0, H]];
    const th = (next ? 1 : -1) * TILT * Math.PI / 180;
    const k = (H / 2) * Math.tan(Math.abs(th));
    const n = [Math.cos(th), -Math.sin(th)];
    const keepSign = next ? 1 : -1;
    const deg = th * 180 / Math.PI;
    // reflection about the fold line
    const m00 = 1 - 2 * n[0] * n[0], m01 = -2 * n[0] * n[1], m11 = 1 - 2 * n[1] * n[1];

    const session = { p: 0 };

    function render(p) {
      session.p = p;
      const f = next ? (W + k) * (1 - p) - k * p : -k * (1 - p) + (W + k) * p;
      const P = [f, H / 2];
      const t2 = 2 * dot(P, n);
      const tx = t2 * n[0], ty = t2 * n[1];

      // kept (still-flat) part of the old page
      keep.style.clipPath = polyCss(clipHalf(RECT, P, n, keepSign));

      // revealed part of the new page
      const rev = clipHalf(BIG, P, n, -keepSign).map(q => [q[0] + offX, q[1] + offY]);
      newEl.style.clipPath = polyCss(rev);

      // curled flap = mirrored old page, clipped to where it lands
      const refl = RECT.map(q => [m00 * q[0] + m01 * q[1] + tx, m01 * q[0] + m11 * q[1] + ty]);
      const flapPoly = clipConvex(clipHalf(RECT, P, n, -keepSign), refl);
      flap.style.clipPath = polyCss(flapPoly);
      flap.style.transform = 'matrix(' + [m00, m01, m01, m11, tx, ty].join(',') + ')';

      // lighting anchored on the fold line (flap side = side opposite "kept")
      const rot = 'rotate(' + (next ? -deg : -deg + 180) + 'deg)';
      flapShade.style.left = P[0] + 'px';
      flapShade.style.top = (P[1] - H * 1.5) + 'px';
      flapShade.style.transform = rot;
      cast.style.left = (P[0] + offX * 0) + 'px';
      cast.style.top = (P[1] - H * 1.5) + 'px';
      cast.style.transform = rot;
      cast.style.opacity = Math.sin(Math.min(1, Math.max(0, p)) * Math.PI).toFixed(3);
    }

    let raf = 0;
    session.setProgress = p => render(Math.min(1, Math.max(0, p)));
    session.animateTo = (target, cb, ms) => {
      cancelAnimationFrame(raf);
      const from = session.p, t0 = performance.now();
      const dur = Math.max(120, (ms || DURATION) * Math.abs(target - from));
      const tick = now => {
        const t = Math.min(1, (now - t0) / dur);
        render(from + (target - from) * (target > from ? ease(t) : 1 - ease(1 - t)));
        if (t < 1) raf = requestAnimationFrame(tick); else if (cb) cb();
      };
      raf = requestAnimationFrame(tick);
    };
    const cleanup = () => {
      cancelAnimationFrame(raf);
      root.remove();
      newEl.style.clipPath = '';
      document.body.classList.remove('pt-dragging');
      busy = false;
    };
    session.commit = () => { cleanup(); oldEl.style.display = 'none'; newEl.style.display = 'block'; };
    session.cancel = () => { cleanup(); oldEl.style.display = oldInline; newEl.style.display = newInline; };

    render(0);
    return session;
  }

  window.PageTurn = { begin, isBusy: () => busy };

  window.flipPage = function (oldEl, newEl, dir, done) {
    const s = begin(oldEl, newEl, dir);
    if (!s) {                         // never break navigation
      if (oldEl) oldEl.style.display = 'none';
      if (newEl) newEl.style.display = 'block';
      if (done) done();
      return null;
    }
    s.animateTo(1, () => { s.commit(); if (done) done(); });
    return s;
  };
})();
