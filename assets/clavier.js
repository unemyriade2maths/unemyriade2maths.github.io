// Clavier de touches spéciales : il se place à côté de la question en cours
// et n'affiche que les touches utiles (attribut data-touches de la question).
(function () {
  const zone = document.querySelector('.zone-exos');
  const K = document.createElement('div');
  K.className = 'clavier-flottant'; K.hidden = true; K.setAttribute('aria-label', 'Touches spéciales');
  zone.appendChild(K);
  const ESP = ['×', '÷', '+', '−', '=', '<', '>'];
  let cible = null, cache = null;
  document.addEventListener('focusin', (ev) => {
    const inp = ev.target;
    if (!inp.matches || !inp.matches('input[type=text]')) return;
    const Q = inp.closest('[data-touches]');
    const t = Q ? Q.dataset.touches.split(' ').filter(Boolean) : [];
    clearTimeout(cache); cible = inp;
    if (!t.length) { K.hidden = true; return; }
    K.innerHTML = '<p>Touches</p>' + t.map(x => `<button type="button" data-t="${x}">${x === ';' ? ' ; ' : x}</button>`).join('')
      + '<button type="button" class="eff" data-t="⌫" aria-label="Effacer">⌫</button>';
    K.hidden = false;
    const z = zone.getBoundingClientRect(), r = Q.getBoundingClientRect();
    K.style.setProperty('--y', Math.max(0, r.top - z.top) + 'px');
    K.querySelectorAll('button').forEach(b => {
      b.addEventListener('pointerdown', e => e.preventDefault());
      b.onclick = () => {
        const s = cible.selectionStart ?? cible.value.length, e = cible.selectionEnd ?? s, k = b.dataset.t;
        if (k === '⌫') { const a = s === e ? Math.max(0, s - 1) : s; cible.value = cible.value.slice(0, a) + cible.value.slice(e); cible.setSelectionRange(a, a); }
        else {
          const t2 = ESP.includes(k) ? ' ' + k + ' ' : (k === ';' ? ' ; ' : k);
          cible.value = cible.value.slice(0, s) + t2 + cible.value.slice(e); cible.setSelectionRange(s + t2.length, s + t2.length);
        }
        cible.focus();
      };
    });
  });
  document.addEventListener('focusout', () => { cache = setTimeout(() => { K.hidden = true; }, 200); });
})();
