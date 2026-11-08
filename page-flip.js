/* ============================================================
   CREATION — Midnight Library : page flip transition
   Drop-in. No changes to your HTML/CSS needed.

   USAGE (wherever you currently switch pages):
     flipPage(oldPageEl, newPageEl, 'next');   // turning forward
     flipPage(oldPageEl, newPageEl, 'prev');   // turning back

   - oldPageEl / newPageEl: the two page elements (your section/div).
   - Your own code decides what is shown; this just animates it.
   - Optional 4th arg: a callback that runs when the flip is done.
   ============================================================ */
(function () {
  const DURATION = 1100;           // ms, total flip time
  const EASE = 'cubic-bezier(.45,.05,.25,1)';

  // one-time: shadow overlay + blur layer
  const style = document.createElement('style');
  style.textContent = `
    .pf-stage{perspective:1800px;perspective-origin:50% 50%;}
    .pf-turning{transform-origin:left center;backface-visibility:hidden;
      will-change:transform,opacity,filter;z-index:50;}
    .pf-under{will-change:opacity,filter;}
    .pf-shade{position:fixed;inset:0;pointer-events:none;z-index:40;
      background:radial-gradient(ellipse at 20% 50%,rgba(0,0,0,.0),rgba(0,0,0,.65));
      opacity:0;backdrop-filter:blur(0px);-webkit-backdrop-filter:blur(0px);}
  `;
  document.head.appendChild(style);

  const shade = document.createElement('div');
  shade.className = 'pf-shade';
  document.body.appendChild(shade);

  let busy = false;

  window.flipPage = function (oldEl, newEl, dir = 'next', done) {
    if (busy || !oldEl || !newEl || oldEl === newEl) {
      // fall back to a plain swap so navigation never breaks
      if (oldEl) oldEl.style.display = 'none';
      if (newEl) newEl.style.display = 'block';
      if (done) done();
      return;
    }
    busy = true;

    const next = dir !== 'prev';
    const parent = oldEl.parentElement;
    parent.classList.add('pf-stage');

    // new page sits underneath, ready to be revealed
    const oldDisplay = oldEl.style.display;
    oldEl.style.display = 'block';   // keep old page visible while it turns
    newEl.style.display = 'block';
    newEl.classList.add('pf-under');

    // old page turns on top
    // lift the old page out of the flow so the new page sits exactly beneath it
    const o = {t:oldEl.offsetTop,l:oldEl.offsetLeft,w:oldEl.offsetWidth};
    oldEl.classList.add('pf-turning');
    oldEl.style.position='absolute';
    oldEl.style.top=o.t+'px'; oldEl.style.left=o.l+'px'; oldEl.style.width=o.w+'px';
    oldEl.style.margin='0'; oldEl.style.boxSizing='border-box';
    // flip around the spine: left edge going forward, right edge going back
    oldEl.style.transformOrigin = next ? 'left center' : 'right center';
    const endAngle = next ? -105 : 105;

    // room behind blurs and darkens, then clears
    shade.animate(
      [
        { opacity: 0, backdropFilter: 'blur(0px)' },
        { opacity: 1, backdropFilter: 'blur(7px)', offset: .5 },
        { opacity: 0, backdropFilter: 'blur(0px)' }
      ],
      { duration: DURATION, easing: 'ease-in-out' }
    );

    // the page itself: narrows toward the spine, dims, fades
    oldEl.animate(
      [
        { transform: 'rotateY(0deg)', opacity: 1, filter: 'brightness(1)' },
        { transform: `rotateY(${endAngle * .6}deg)`, opacity: .9, filter: 'brightness(.6)', offset: .55 },
        { transform: `rotateY(${endAngle}deg)`, opacity: 0, filter: 'brightness(.3)' }
      ],
      { duration: DURATION, easing: EASE, fill: 'forwards' }
    );

    // incoming page: soft settle from blur
    newEl.animate(
      [
        { opacity: 0, filter: 'blur(6px)', transform: 'scale(.985)' },
        { opacity: 1, filter: 'blur(0px)', transform: 'scale(1)' }
      ],
      { duration: DURATION, easing: 'ease-out', delay: DURATION * .25, fill: 'backwards' }
    );

    setTimeout(() => {
      oldEl.getAnimations().forEach(a => a.cancel());
      oldEl.classList.remove('pf-turning');
      oldEl.style.transformOrigin = '';
      ['position','top','left','width','margin','boxSizing'].forEach(k => oldEl.style[k] = '');
      oldEl.style.display = 'none';      // your logic can re-show it later
      newEl.classList.remove('pf-under');
      parent.classList.remove('pf-stage');
      busy = false;
      if (done) done();
    }, DURATION + 30);
  };
})();
