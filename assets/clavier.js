// Caractères mathématiques : une barre de touches toujours visible sous chaque question qui en a besoin
// (attribut data-touches). Un seul clic écrit le caractère dans la réponse de cette question.
(function () {
  const zone = document.querySelector('.zone-exos') || document.body;
  const ESP = ['×', '÷', '+', '−', '=', '<', '>', '≠', '≈'];
  const poser = (Q) => {
    const t = (Q.dataset.touches || '').split(' ').filter(Boolean);
    if (!t.length || Q.querySelector('.car-maths')) return;
    let inp = Q.querySelector('input[type=text]'); if (!inp) return;
    Q.addEventListener('focusin', (e) => { if (e.target.matches('input[type=text]')) inp = e.target; });   // plusieurs trous : la dernière case touchée
    const B = document.createElement('div');
    B.className = 'car-maths'; B.setAttribute('aria-label', 'Caractères mathématiques');
    B.innerHTML = '<p>Caractères mathématiques</p><div class="car-touches">' + t.map(x => `<button type="button" data-t="${x}">${x === ';' ? ' ; ' : x}</button>`).join('')
      + '<button type="button" class="eff" data-t="⌫" aria-label="Effacer">⌫</button></div>';
    if (Q.classList.contains('redac-zone')) { B.classList.add('car-haut'); Q.prepend(B); } else (inp.closest('.g-ligne') || inp).after(B);
    B.querySelectorAll('button').forEach(b => {
      b.addEventListener('pointerdown', e => e.preventDefault());   // le curseur reste dans la réponse
      b.onclick = () => {
        const actif = document.activeElement === inp, fin = inp.value.length;
        const s = actif ? (inp.selectionStart ?? fin) : fin, e = actif ? (inp.selectionEnd ?? s) : s, k = b.dataset.t;
        if (k === '⌫') { const a = s === e ? Math.max(0, s - 1) : s; inp.value = inp.value.slice(0, a) + inp.value.slice(e); inp.focus(); inp.setSelectionRange(a, a); return; }
        const t2 = ESP.includes(k) ? ' ' + k + ' ' : (k === ';' ? ' ; ' : k);
        inp.value = inp.value.slice(0, s) + t2 + inp.value.slice(e); inp.focus(); inp.setSelectionRange(s + t2.length, s + t2.length);
      };
    });
  };
  const tout = () => zone.querySelectorAll('[data-touches]').forEach(poser);
  tout();
  new MutationObserver(tout).observe(zone, { childList: true, subtree: true });   // questions ajoutées ensuite (exercice guidé)
})();
