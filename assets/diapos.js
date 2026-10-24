// Lecteur de diapos clic par clic (leçon), avec le bouton Écouter.
function lecteurDiapos(box, L, jouer, arreter) {
  box.innerHTML = `<div class="diapo" tabindex="0" aria-live="polite">
      <div class="diapo-haut"><span class="dt"></span><span class="cpt"></span></div>
      <div class="diapo-corps"></div><p class="astuce">Clique sur la diapo pour avancer</p></div>
    <p class="pas-cpt d-cpt"></p>
    <div class="barre-lecon">
      <button class="btn rond d-prec" aria-label="Revenir en arrière">◀</button>
      <button class="btn son d-son" aria-label="Écouter"><span aria-hidden="true">🔊</span> Écouter</button>
      <button class="btn rond plein d-suiv" aria-label="Avancer">▶</button></div>
    <label class="auto"><input type="checkbox" class="d-auto"> Lire à voix haute à chaque clic</label>`;
  const q = (s) => box.querySelector(s), auto = q('.d-auto');
  let di = 0, ei = 0;
  try { auto.checked = localStorage.getItem('lecon-auto') === '1'; } catch (e) {}
  auto.onchange = () => { try { localStorage.setItem('lecon-auto', auto.checked ? '1' : '0'); } catch (e) {} };
  const rendu = (h) => typeof h === 'string' ? h : potence(...h.pot) + (h.apres || '');
  const afficher = () => {
    const D = L.diapos[di];
    q('.dt').textContent = D.titre; q('.cpt').textContent = (di + 1) + ' / ' + L.diapos.length;
    q('.diapo').className = 'diapo' + (D.cadre ? ' cadre' : '') + (D.alerte ? ' alerte' : '');
    let html = '';
    for (let j = 0; j <= ei; j++) {
      const h = D.etapes[j].h;
      if (typeof h === 'string') html += `<div class="etape${j === ei ? ' nouvelle' : ''}">${h}</div>`;
      else if (j === ei || typeof D.etapes[j + 1].h === 'string') html += `<div class="etape pot">${rendu(h)}</div>`;
    }
    q('.diapo-corps').innerHTML = html;
    q('.d-suiv').disabled = di === L.diapos.length - 1 && ei === D.etapes.length - 1;
    q('.d-prec').disabled = di === 0 && ei === 0;
    q('.astuce').hidden = !(di === 0 && ei === 0);
    const r = D.etapes.length - 1 - ei;
    q('.d-cpt').textContent = r ? `Étape ${ei + 1} / ${D.etapes.length} de cette diapo · encore ${r} clic${r > 1 ? 's' : ''}` : (di < L.diapos.length - 1 ? `Diapo complète ✓ · clique pour la diapo suivante` : 'Fin de la leçon ✓');
  };
  const ecouter = () => jouer(L.diapos[di].etapes[ei].v);
  const avancer = () => {
    const D = L.diapos[di];
    if (ei < D.etapes.length - 1) ei++; else if (di < L.diapos.length - 1) { di++; ei = 0; } else return;
    afficher(); if (auto.checked) ecouter(); else arreter();
  };
  const reculer = () => { if (ei > 0) ei--; else if (di > 0) { di--; ei = L.diapos[di].etapes.length - 1; } arreter(); afficher(); };
  q('.d-suiv').onclick = avancer; q('.d-prec').onclick = reculer; q('.d-son').onclick = ecouter; q('.diapo').onclick = avancer;
  q('.diapo').addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); avancer(); }
    if (e.key === 'ArrowLeft') reculer();
  });
  afficher();
}
