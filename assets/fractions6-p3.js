// 6e · Fractions · Partie 3 : comparer et ranger des fractions.
// Types « comparer » (toucher la fraction la plus petite : le signe apparaît, la pointe vers elle) et « ranger » (toucher la plus petite, ou la plus grande, qui reste).
(function () {
  const CID = 'fractions-6e', VERT = '#9DCF78', TR = '#28282D', ROUGE = '#E8483F', BL = '#0070C0', RG = '#C00000';
  const F = (n, d) => d === undefined ? `<span class="nb">${n}</span>` : `<span class="frac"><span>${n}</span><span>${d}</span></span>`;
  const Fx = (x) => Array.isArray(x) ? F(x[0], x[1]) : F(x);
  const val = (x) => Array.isArray(x) ? x[0] / x[1] : x;
  if (/c=fractions-6e/.test(location.search)) document.head.insertAdjacentHTML('beforeend', `<style>
    .cmp { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; margin: 6px 0; }
    .cmp .fr-b { border: 2px solid #D0D5DD; background: #FFF; border-radius: 12px; padding: 4px 12px; cursor: pointer; font-size: 1.2em; min-width: 3em; }
    .cmp .fr-b.petite { border-color: #F08A24; background: #FFF6EC; }
    .cmp .signe { font: 800 1.6em Nunito, sans-serif; min-width: 1.2em; text-align: center; color: #232328; }
    .cmp .eg { min-height: 34px; padding: 0 10px; }
    .nb { font-weight: 800; font-size: 1.1em; }
    .rg-zone { display: flex; flex-wrap: wrap; gap: 8px; margin: 8px 0; min-height: 56px; align-items: center; }
    .rg-ligne { border: 2px dashed #B9C7BE; border-radius: 12px; padding: 6px 8px; }
    .rg-ligne:empty::before { content: 'Ta réponse s’écrit ici'; color: #8A8F98; font-size: .9em; }
    .rg-zone .fr-b { border: 2px solid #D0D5DD; background: #FFF; border-radius: 12px; padding: 4px 12px; cursor: pointer; font-size: 1.15em; }
    .rg-ligne .sg { font: 800 1.3em Nunito, sans-serif; }
    .bd svg { max-width: 100%; height: auto; display: block; }
    .f-msg { margin: 6px 0 0; font-weight: 700; } .question.faux .f-msg { color: #B3261E; } .question.juste .f-msg { color: #1F6F3D; }
    .frac-in { display: inline-flex; flex-direction: column; vertical-align: middle; gap: 3px; margin: 0 6px; }
    .frac-in input { width: 3.2em; text-align: center; font-weight: 800; padding: 4px; }
    .frac-in .fn { color: ${BL}; border-bottom: 3px solid #232328; } .frac-in .fd { color: ${RG}; }
  </style>`);

  // ---------- bandes (même longueur = la même unité), une ligne par fraction ----------
  const bd = (fracs, o = {}) => {
    const h = 34, gap = 16, k = Math.max(1, ...fracs.map(([n, d]) => Math.ceil(n / d))), L = k === 1 ? 300 : 200;
    const W = 10 + k * (L + 10) + 70, H = fracs.length * (h + gap) + 10; let s = '';
    fracs.forEach(([n, d], r) => {
      const y = 6 + r * (h + gap);
      for (let u = 0; u < Math.max(1, Math.ceil(n / d)); u++) for (let i = 0; i < d; i++) {
        const x0 = 6 + u * (L + 10) + L * i / d;
        s += `<rect x="${x0.toFixed(1)}" y="${y}" width="${(L / d).toFixed(1)}" height="${h}" fill="${u * d + i < n ? VERT : '#FFF'}" stroke="${TR}" stroke-width="2.4"/>`;
      }
      const x = 6 + k * (L + 10) + 30;
      if (!o.sansNom) s += `<text x="${x}" y="${y + 14}" font-size="17" font-weight="800" fill="${BL}" text-anchor="middle">${n}</text><line x1="${x - 13}" y1="${y + 19}" x2="${x + 13}" y2="${y + 19}" stroke="${TR}" stroke-width="2"/><text x="${x}" y="${y + 36}" font-size="17" font-weight="800" fill="${RG}" text-anchor="middle">${d}</text>`;
    });
    const tir = (x) => { for (let y = 2; y < H - 2; y += 10) s += `<line x1="${x}" y1="${y}" x2="${x}" y2="${y + 5}" stroke="${ROUGE}" stroke-width="3"/>`; };
    if (o.moitie) tir(6 + L / 2); if (k > 1) tir(6 + L + 5);
    return `<div class="bd"><svg viewBox="0 0 ${W} ${H}" width="${W}" role="img" aria-label="bandes">${s}</svg></div>`;
  };

  const TYPES = window.TYPES_EXO = window.TYPES_EXO || {};
  const entete = (it) => `<h3 class="exo-titre">${it.titre}${it.ceinture ? ` <span class="ceinture">Ceinture ${it.ceinture}</span>` : ''}</h3><div class="enonce">${btnSon(it.v)}${it.enonce}</div>`;
  const pied = (it) => `<div class="indices"></div><div class="boutons"><button class="btn indice-b">💡 Indice (1/${it.indices.length})</button><button class="btn verif">Vérifier</button></div>
    <div class="verdict" hidden></div><div class="correction" hidden><h3>Correction</h3><div class="pas"></div><p class="pas-cpt"></p>
    <div class="pas-barre"><button class="btn verif pas-suiv">Suite ▶</button><button class="btn son pas-son">🔊 Écouter</button></div><p class="cc" hidden>${it.cc}</p></div>`;
  // indices, correction pas à pas et verdict : communs aux deux types
  const brancher = (S, it, juge) => {
    let ni = 0, pi = 0; const bi = S.querySelector('.indice-b');
    bi.onclick = () => { if (ni >= it.indices.length) return; S.querySelector('.indices').insertAdjacentHTML('beforeend', `<div class="indice"><small>Indice ${ni + 1}</small>${it.indices[ni]}</div>`); ni++; bi.textContent = ni < it.indices.length ? `💡 Indice (${ni + 1}/${it.indices.length})` : '💡 Plus d’indice'; bi.disabled = ni >= it.indices.length; };
    const C = S.querySelector('.correction'), pas = S.querySelector('.pas'), ps = S.querySelector('.pas-suiv');
    const montrer = () => { pas.innerHTML = pasHtml(it.correction, pi); labelSuiv(ps, it.correction, pi); S.querySelector('.cc').hidden = pi < it.correction.length - 1; };
    ps.onclick = () => { if (pi < it.correction.length - 1) { pi++; montrer(); jouer(voixDe(it.correction[pi])); } };
    S.querySelector('.pas-son').onclick = () => jouer(voixDe(it.correction[pi]));
    S.querySelector('.verif').onclick = () => {
      let bons = 0; const Q = [...S.querySelectorAll('.questions > .question')];
      Q.forEach((q, k) => { const r = juge(k); q.classList.toggle('juste', r.ok); q.classList.toggle('faux', !r.ok); if (r.ok) bons++; const m = q.querySelector(':scope > .f-msg'); m.hidden = false; m.innerHTML = r.ok ? 'Juste ✓' : r.msg; });
      const V = S.querySelector('.verdict'), tout = bons === Q.length; V.hidden = false; V.className = 'verdict ' + (tout ? 'ok' : 'non');
      V.textContent = tout ? 'Bravo, tout est juste ! Regarde la correction pas à pas.' : `${bons} réponse${bons > 1 ? 's' : ''} juste${bons > 1 ? 's' : ''} sur ${Q.length}. Lis le message sous chaque réponse, corrige si tu veux, puis regarde la correction pas à pas.`;
      if (C.hidden) { C.hidden = false; pi = 0; montrer(); jouer(voixDe(it.correction[0])); }
    };
  };

  // ---------- « comparer » : parts { l, a, b, rep: 'a' | 'b' | '=', eg: { de: [n, d], den, rep }, err: { a, b, '=' } } ----------
  TYPES.comparer = {
    carte(it, n) {
      return `<div class="item" id="ex${n}">${entete(it)}<div class="questions">${it.parts.map((p, k) => `<div class="question" data-k="${k}">
        ${p.eg ? `<div class="cmp"><span class="q">${p.l}.</span> ${Fx(p.eg.de)} = <span class="frac-in"><input class="fn" inputmode="numeric" autocomplete="off" aria-label="numérateur"><input class="fd" value="${p.eg.den}" disabled aria-label="dénominateur"></span></div>` : ''}
        <div class="cmp">${p.eg ? '' : `<span class="q">${p.l}.</span>`}<button class="fr-b" data-c="a">${Fx(p.a)}</button><span class="signe">…</span><button class="fr-b" data-c="b">${Fx(p.b)}</button>${it.egal ? '<button class="btn eg" data-c="=">=</button>' : ''}</div>
        <p class="f-msg" hidden></p></div>`).join('')}</div>${pied(it)}</div>`;
    },
    init(S, it) {
      const choix = {};
      S.querySelectorAll('.question').forEach((Q, k) => Q.querySelectorAll('[data-c]').forEach(b => b.onclick = () => {
        const c = b.dataset.c; choix[k] = c;
        Q.querySelector('.signe').textContent = c === 'a' ? '<' : c === 'b' ? '>' : '=';
        Q.querySelectorAll('.fr-b').forEach(x => x.classList.toggle('petite', x.dataset.c === c));
      }));
      brancher(S, it, (k) => {
        const p = it.parts[k], Q = S.querySelector(`.question[data-k="${k}"]`), c = choix[k], e = p.err || {};
        if (p.eg) {
          const v = parseInt(Q.querySelector('.fn').value, 10), f = p.eg.den / p.eg.de[1];
          if (v !== p.eg.rep) return { ok: false, msg: isNaN(v) ? 'Complète d’abord la fraction égale.' : v === p.eg.de[0] ? `Si on multiplie le dénominateur par ${f}, on multiplie aussi le numérateur par ${f}.` : v === p.eg.de[0] + (p.eg.den - p.eg.de[1]) ? `On ne fait pas une addition : on multiplie le numérateur et le dénominateur par ${f}.` : `${p.eg.de[1]} × ${f} = ${p.eg.den}, donc on calcule ${p.eg.de[0]} × ${f}.` };
        }
        if (!c) return { ok: false, msg: 'Touche la fraction la plus petite' + (it.egal ? ', ou le bouton =.' : '.') };
        if (c === p.rep) return { ok: true };
        return { ok: false, msg: e[c] || (p.rep === '=' ? 'Les deux nombres sont égaux : touche le bouton =.' : 'Ce n’est pas la plus petite. Regarde quelle méthode utiliser, puis réessaie.') };
      });
    },
  };

  // ---------- « ranger » : { liste: [[n, d]...], ordre: 'croissant' | 'decroissant', err: [{ si: [indices], msg }] } ----------
  TYPES.ranger = {
    carte(it, n) {
      const sg = it.ordre === 'croissant' ? '&lt;' : '&gt;';
      return `<div class="item" id="ex${n}">${entete(it)}<div class="questions"><div class="question" data-k="0">
        <p class="consigne">${it.ordre === 'croissant' ? 'Touche à chaque fois la <strong>plus petite</strong> fraction qui reste.' : 'Touche à chaque fois la <strong>plus grande</strong> fraction qui reste.'}</p>
        <div class="rg-zone rg-dep">${it.liste.map((f, i) => `<button class="fr-b" data-i="${i}">${Fx(f)}</button>`).join('')}</div>
        <div class="rg-zone rg-ligne" data-sg="${sg}"></div><p class="f-msg" hidden></p></div></div>${pied(it)}</div>`;
    },
    init(S, it) {
      const dep = S.querySelector('.rg-dep'), lig = S.querySelector('.rg-ligne'), sg = it.ordre === 'croissant' ? '<' : '>';
      let ordre = [];
      const dessiner = () => {
        dep.querySelectorAll('.fr-b').forEach(b => b.hidden = ordre.includes(+b.dataset.i));
        lig.innerHTML = ordre.map((i, j) => `${j ? `<span class="sg">${sg}</span>` : ''}<button class="fr-b" data-i="${i}">${Fx(it.liste[i])}</button>`).join('');
        lig.querySelectorAll('.fr-b').forEach(b => b.onclick = () => { ordre = ordre.filter(x => x !== +b.dataset.i); dessiner(); });
      };
      dep.querySelectorAll('.fr-b').forEach(b => b.onclick = () => { ordre.push(+b.dataset.i); dessiner(); });
      const bon = it.liste.map((f, i) => i).sort((x, y) => (val(it.liste[x]) - val(it.liste[y])) * (it.ordre === 'croissant' ? 1 : -1));
      brancher(S, it, () => {
        if (ordre.length < it.liste.length) return { ok: false, msg: 'Range toutes les fractions.' };
        if (ordre.every((x, j) => x === bon[j])) return { ok: true };
        if (ordre.every((x, j) => x === bon[bon.length - 1 - j])) return { ok: false, msg: it.ordre === 'croissant' ? 'Tu as rangé du plus grand au plus petit. Croissant : du plus petit au plus grand.' : 'Tu as rangé du plus petit au plus grand. Décroissant : du plus grand au plus petit.' };
        const e = (it.err || []).find(e => e.si.every((x, j) => ordre[j] === x)); if (e) return { ok: false, msg: e.msg };
        const j = ordre.findIndex((x, j) => x !== bon[j]);
        return { ok: false, msg: `Les ${j} première${j > 1 ? 's' : ''} sont bien rangée${j > 1 ? 's' : ''}. Regarde la fraction n° ${j + 1} : est-ce vraiment la ${it.ordre === 'croissant' ? 'plus petite' : 'plus grande'} qui reste ?` };
      });
    },
  };

  // ---------- chapitre et leçon ----------
  if (typeof CHAPITRES !== 'undefined' && CHAPITRES[CID]) { CHAPITRES[CID].videos.push({ titre: 'Comparer et ranger des fractions', id: '' }); CHAPITRES[CID].lecon.push(['D', 'Comparer et ranger des fractions']); }
  const M = (x) => `<p class="formule">${x}</p>`;
  if (typeof LECONS !== 'undefined' && LECONS[CID]) LECONS[CID].D = { titre: 'Comparer et ranger des fractions', diapos: [
    { titre: 'Ranger : croissant et décroissant', cadre: true, etapes: [
      { h: '<p>Ranger dans l’ordre <strong>croissant</strong> : du plus petit au plus grand (avec &lt;).</p>', v: 'Définition : ranger dans l’ordre croissant, c’est ranger du plus petit au plus grand. On utilise le signe plus petit que.' },
      { h: '<p>Ranger dans l’ordre <strong>décroissant</strong> : du plus grand au plus petit (avec &gt;).</p>', v: 'Ranger dans l’ordre décroissant, c’est ranger du plus grand au plus petit. On utilise le signe plus grand que.' },
      { h: M('2 &lt; 5 &lt; 9') + M('9 &gt; 5 &gt; 2') + '<p>La pointe du signe montre le plus petit.</p>', v: 'Par exemple : deux, plus petit que cinq, plus petit que neuf. Et dans l’autre sens : neuf, plus grand que cinq, plus grand que deux. La pointe du signe montre toujours le plus petit.' }] },
    { titre: 'Propriété 1 : même dénominateur', cadre: true, etapes: [
      { h: '<p>Si deux fractions ont le <strong>même dénominateur</strong>, la plus grande est celle qui a le <strong>plus grand numérateur</strong>.</p>', v: 'Propriété un : si deux fractions ont le même dénominateur, la plus grande est celle qui a le plus grand numérateur.' },
      { h: bd([[3, 7], [5, 7]]), v: 'Les deux bandes sont partagées en sept parts égales. On colorie trois parts, puis cinq parts.' },
      { h: M(`3 &lt; 5, donc ${F(3, 7)} &lt; ${F(5, 7)}`), v: 'Trois est plus petit que cinq, donc trois septièmes est plus petit que cinq septièmes.' }] },
    { titre: 'Propriété 2 : même numérateur', cadre: true, etapes: [
      { h: '<p>Si deux fractions ont le <strong>même numérateur</strong>, la plus grande est celle qui a le <strong>plus petit dénominateur</strong>.</p>', v: 'Propriété deux : si deux fractions ont le même numérateur, la plus grande est celle qui a le plus petit dénominateur.' },
      { h: bd([[3, 4], [3, 5]]), v: 'On prend trois parts dans chaque bande. Mais les quarts sont plus grands que les cinquièmes.' },
      { h: M(`Un quart est plus grand qu’un cinquième, donc ${F(3, 4)} &gt; ${F(3, 5)}`), v: 'Un quart est plus grand qu’un cinquième, donc trois quarts est plus grand que trois cinquièmes.' }] },
    { titre: 'Attention : erreur fréquente', alerte: true, etapes: [
      { h: `<p class="barre">${F(2, 9)} &gt; ${F(2, 5)} car 9 &gt; 5</p>`, v: 'Attention ! Ce n’est pas parce que le dénominateur est plus grand que la fraction est plus grande.' },
      { h: bd([[2, 9], [2, 5]]) + `<p class="cc">Plus on partage, plus les parts sont petites : <span class="formule">${F(2, 9)} &lt; ${F(2, 5)}</span></p>`, v: 'Plus on partage l’unité, plus les parts sont petites. Donc deux neuvièmes est plus petit que deux cinquièmes.' }] },
    { titre: 'Comparer une fraction à 1', cadre: true, etapes: [
      { h: '<p>On compare le <strong>numérateur</strong> et le <strong>dénominateur</strong>.</p>', v: 'Pour comparer une fraction à un, on compare le numérateur et le dénominateur.' },
      { h: bd([[5, 6], [6, 6], [7, 6]]) + '<p>Le trait rouge marque la fin de l’unité.</p>', v: 'Voici cinq sixièmes, six sixièmes et sept sixièmes. Le trait rouge marque la fin de l’unité.' },
      { h: M(`5 &lt; 6, donc ${F(5, 6)} &lt; 1`) + M(`${F(6, 6)} = 1`) + M(`7 &gt; 6, donc ${F(7, 6)} &gt; 1`), v: 'Cinq sixièmes : il manque une part, c’est plus petit que un. Six sixièmes, c’est l’unité entière. Sept sixièmes, c’est une bande entière et encore une part : c’est plus grand que un.' }] },
    { titre: 'Comparer une fraction à un demi', cadre: true, etapes: [
      { h: '<p>On compare le numérateur à la <strong>moitié du dénominateur</strong>.</p>', v: 'Pour comparer une fraction à un demi, on compare le numérateur à la moitié du dénominateur.' },
      { h: bd([[3, 8], [4, 8], [5, 8]], { moitie: true }) + '<p>La moitié de 8 est 4 : le trait rouge marque le milieu.</p>', v: 'La moitié de huit, c’est quatre. Le trait rouge marque le milieu de la bande.' },
      { h: M(`3 &lt; 4, donc ${F(3, 8)} &lt; ${F(1, 2)}`) + M(`${F(4, 8)} = ${F(1, 2)}`) + M(`5 &gt; 4, donc ${F(5, 8)} &gt; ${F(1, 2)}`), v: 'Trois huitièmes n’atteint pas le milieu : c’est plus petit qu’un demi. Quatre huitièmes, c’est un demi. Cinq huitièmes dépasse le milieu : c’est plus grand qu’un demi.' }] },
    { titre: 'Dénominateurs multiples : une fraction égale', cadre: true, etapes: [
      { h: `<p>Comparer ${F(2, 3)} et ${F(5, 6)} : 6 est un multiple de 3.</p>` + M(`${F(2, 3)} = ${F('2 × 2', '3 × 2')} = ${F(4, 6)}`), v: 'Pour comparer deux tiers et cinq sixièmes, on remarque que six est un multiple de trois. On écrit deux tiers en sixièmes : deux fois deux, quatre ; trois fois deux, six. Deux tiers égale quatre sixièmes.' },
      { h: bd([[2, 3], [4, 6], [5, 6]]) + M(`4 &lt; 5, donc ${F(2, 3)} &lt; ${F(5, 6)}`), v: 'Les bandes de deux tiers et de quatre sixièmes ont la même longueur coloriée. Quatre est plus petit que cinq, donc deux tiers est plus petit que cinq sixièmes.' }] }] };

  // ---------- exercices ----------
  const P = (l, a, b, rep, err) => ({ l, a, b, rep, err });
  const P3 = { titre: 'Comparer et ranger des fractions', items: [
    { type: 'lecon', rub: 'lecon', parties: ['D'] },
    { type: 'methode', rub: 'methode', titre: 'Comparer deux fractions',
      resume: '<ol class="meth"><li><strong>Même dénominateur</strong> : je compare les numérateurs.</li><li><strong>Même numérateur</strong> : le plus petit dénominateur donne la plus grande fraction.</li><li>L’une plus petite que 1, l’autre plus grande : je <strong>compare à 1</strong>.</li><li>L’une plus petite que un demi, l’autre plus grande : je <strong>compare à un demi</strong>.</li><li>Un dénominateur est un multiple de l’autre : j’écris une <strong>fraction égale</strong>.</li></ol>',
      etapes: [
        { h: bd([[5, 8], [3, 8]]) + M(`${F(5, 8)} &gt; ${F(3, 8)} car 5 &gt; 3`), r: 1, v: 'Méthode. Même dénominateur : on compare les numérateurs. Cinq huitièmes est plus grand que trois huitièmes.' },
        { h: bd([[2, 3], [2, 5]]) + M(`${F(2, 3)} &gt; ${F(2, 5)}`), r: 1, v: 'Même numérateur : les tiers sont plus grands que les cinquièmes. Deux tiers est plus grand que deux cinquièmes.' },
        { h: M(`${F(4, 5)} &lt; 1 &lt; ${F(9, 7)}`), r: 1, v: 'Quatre cinquièmes est plus petit que un, et neuf septièmes est plus grand que un.' },
        { h: M(`${F(2, 7)} &lt; ${F(1, 2)} &lt; ${F(5, 8)}`), r: 1, v: 'Deux septièmes est plus petit qu’un demi, et cinq huitièmes est plus grand qu’un demi.' },
        { h: bd([[3, 4], [6, 8], [5, 8]]) + M(`${F(3, 4)} = ${F(6, 8)} &gt; ${F(5, 8)}`), r: 1, v: 'Huit est un multiple de quatre : trois quarts égale six huitièmes, plus grand que cinq huitièmes.' }],
      cc: 'Je choisis la méthode qui convient, puis je conclus : par exemple, trois quarts est plus grand que cinq huitièmes.' },
    { type: 'flash', rub: 'flash', titre: 'Questions flash', consigne: 'Vrai ou faux ? Tu as 10 secondes par question.', duree: 10, questions: [
      { q: M(`${F(5, 9)} &lt; ${F(7, 9)}`), rep: true, expl: 'même dénominateur : 5 &lt; 7.', v: 'Cinq neuvièmes est plus petit que sept neuvièmes. Vrai, ou faux ?' },
      { q: M(`${F(3, 4)} &lt; ${F(3, 7)}`), rep: false, expl: `même numérateur : les quarts sont plus grands que les septièmes, donc ${F(3, 4)} &gt; ${F(3, 7)}.`, v: 'Trois quarts est plus petit que trois septièmes. Vrai, ou faux ?' },
      { q: 'Ranger dans l’ordre croissant, c’est ranger du plus grand au plus petit.', rep: false, expl: 'croissant : du plus petit au plus grand.', v: 'Ranger dans l’ordre croissant, c’est ranger du plus grand au plus petit. Vrai, ou faux ?' },
      { q: M(`${F(11, 12)} &gt; ${F(9, 12)}`), rep: true, expl: 'même dénominateur : 11 &gt; 9.', v: 'Onze douzièmes est plus grand que neuf douzièmes. Vrai, ou faux ?' },
      { q: M(`${F(2, 5)} &gt; ${F(2, 3)}`), rep: false, expl: 'les tiers sont plus grands que les cinquièmes.', v: 'Deux cinquièmes est plus grand que deux tiers. Vrai, ou faux ?' },
      { q: M(`${F(1, 3)} &lt; ${F(1, 2)}`), rep: true, expl: 'un tiers est plus petit qu’un demi.', v: 'Un tiers est plus petit qu’un demi. Vrai, ou faux ?' },
      { q: M(`${F(7, 6)} &gt; 1`), rep: true, expl: '7 &gt; 6 : une unité entière et encore un sixième.', v: 'Sept sixièmes est plus grand que un. Vrai, ou faux ?' },
      { q: M(`${F(3, 8)} &gt; ${F(1, 2)}`), rep: false, expl: 'la moitié de 8 est 4, et 3 &lt; 4.', v: 'Trois huitièmes est plus grand qu’un demi. Vrai, ou faux ?' }] },
    { type: 'guide', rub: 'guide', titre: 'Comparer quatre neuvièmes et sept neuvièmes',
      enonce: `<p>Compare ${F(4, 9)} et ${F(7, 9)}. On suit la méthode étape par étape.</p>`, v: 'Exercice guidé. Compare quatre neuvièmes et sept neuvièmes. On suit la méthode étape par étape.',
      vis: [bd([[0, 9], [0, 9]], { sansNom: true }), bd([[4, 9], [7, 9]])],
      etapes: [
        { q: 'Étape 1 : les deux fractions ont-elles le même dénominateur ou le même numérateur ?', choix: ['le même dénominateur', 'le même numérateur'], rep: ['le même dénominateur'], k: 0, aide: 'Le dénominateur est le nombre du bas : 9 et 9.' },
        { q: 'Étape 2 : compare les numérateurs. 4 … 7', choix: ['<', '>'], rep: ['<'], k: 1, aide: '4 est-il plus petit ou plus grand que 7 ?' },
        { q: `Donc ${F(4, 9)} … ${F(7, 9)}`, choix: ['<', '>'], rep: ['<'], k: 1, aide: 'Même dénominateur : le plus petit numérateur donne la plus petite fraction.' }],
      fin: M(`${F(4, 9)} &lt; ${F(7, 9)}`),
      cc: '4 < 7, donc quatre neuvièmes est plus petit que sept neuvièmes.' },

    { type: 'comparer', rub: 'exo', titre: 'Exercice 1', ceinture: 'blanche', enonce: '<p>Pour chaque paire, touche la fraction <strong>la plus petite</strong> : le signe apparaît.</p>',
      v: 'Exercice un. Pour chaque paire, touche la fraction la plus petite.',
      parts: [P('a', [3, 7], [5, 7], 'a', { b: 'Même dénominateur : compare les numérateurs. 3 est plus petit que 5.' }), P('b', [12, 13], [10, 13], 'b'), P('c', [21, 50], [29, 50], 'a'), P('d', [15, 4], [11, 4], 'b', { a: 'Même avec un numérateur plus grand que le dénominateur, on compare les numérateurs : 11 &lt; 15.' })],
      indices: ['Les dénominateurs sont les mêmes.', 'Compare seulement les numérateurs.', 'Le plus petit numérateur donne la plus petite fraction.'],
      correction: [
        { h: bd([[3, 7], [5, 7]]) + `<p><span class="q">a.</span> 3 &lt; 5, donc <span class="formule">${F(3, 7)} &lt; ${F(5, 7)}</span></p>`, v: 'Correction. a : trois est plus petit que cinq, donc trois septièmes est plus petit que cinq septièmes.' },
        { h: `<p><span class="q">b.</span> <span class="formule">${F(10, 13)} &lt; ${F(12, 13)}</span> · <span class="q">c.</span> <span class="formule">${F(21, 50)} &lt; ${F(29, 50)}</span> · <span class="q">d.</span> <span class="formule">${F(11, 4)} &lt; ${F(15, 4)}</span></p>`, v: 'b : dix treizièmes est le plus petit. c : vingt et un cinquantièmes. d : onze quarts.' }],
      cc: 'Les plus petites fractions sont trois septièmes, dix treizièmes, vingt et un cinquantièmes et onze quarts.' },
    { type: 'comparer', rub: 'exo', titre: 'Exercice 2', ceinture: 'blanche', enonce: '<p>Pour chaque paire, touche la fraction <strong>la plus petite</strong> : le signe apparaît.</p>',
      v: 'Exercice deux. Pour chaque paire, touche la fraction la plus petite.',
      parts: [P('a', [4, 9], [4, 7], 'a', { b: 'Même numérateur : plus on partage, plus les parts sont petites. Les neuvièmes sont plus petits que les septièmes.' }), P('b', [7, 10], [7, 12], 'b', { a: 'Les douzièmes sont plus petits que les dixièmes.' }), P('c', [11, 6], [11, 5], 'a'), P('d', [3, 20], [3, 16], 'a', { b: 'Les vingtièmes sont plus petits que les seizièmes.' })],
      indices: ['Les numérateurs sont les mêmes : on prend le même nombre de parts.', 'Quelles parts sont les plus petites ?', 'Le plus grand dénominateur donne la plus petite fraction.'],
      correction: [
        { h: bd([[4, 9], [4, 7]]) + `<p><span class="q">a.</span> un neuvième est plus petit qu’un septième, donc <span class="formule">${F(4, 9)} &lt; ${F(4, 7)}</span></p>`, v: 'Correction. a : un neuvième est plus petit qu’un septième, donc quatre neuvièmes est plus petit que quatre septièmes.' },
        { h: `<p><span class="q">b.</span> <span class="formule">${F(7, 12)} &lt; ${F(7, 10)}</span> · <span class="q">c.</span> <span class="formule">${F(11, 6)} &lt; ${F(11, 5)}</span> · <span class="q">d.</span> <span class="formule">${F(3, 20)} &lt; ${F(3, 16)}</span></p>`, v: 'b : sept douzièmes est le plus petit. c : onze sixièmes. d : trois vingtièmes.' }],
      cc: 'Les plus petites fractions sont quatre neuvièmes, sept douzièmes, onze sixièmes et trois vingtièmes.' },
    { type: 'comparer', rub: 'exo', titre: 'Exercice 3', ceinture: 'jaune', egal: true, enonce: '<p>Pour chaque paire, touche le nombre <strong>le plus petit</strong>, ou le bouton = s’ils sont égaux.</p>',
      v: 'Exercice trois. Pour chaque paire, touche le nombre le plus petit, ou le bouton égal.',
      parts: [P('a', [8, 7], 1, 'b', { a: `Compare le numérateur et le dénominateur : 8 &gt; 7, donc ${F(8, 7)} &gt; 1.` }), P('b', [5, 5], 1, '=', { a: '5 parts sur 5 : c’est l’unité entière.', b: '5 parts sur 5 : c’est l’unité entière.' }), P('c', [10, 13], 1, 'a', { b: `10 &lt; 13 : il manque 3 parts pour faire l’unité, donc ${F(10, 13)} &lt; 1.` }), P('d', [25, 24], 1, 'b', { a: '25 &gt; 24 : une unité entière et encore un vingt-quatrième.' })],
      indices: ['Compare le numérateur et le dénominateur.', 'Numérateur plus petit : il manque des parts pour faire l’unité.', 'Numérateur plus grand : on dépasse l’unité.'],
      correction: [
        { h: bd([[8, 7], [5, 5], [10, 13]]) + `<p><span class="q">a.</span> <span class="formule">1 &lt; ${F(8, 7)}</span> · <span class="q">b.</span> <span class="formule">${F(5, 5)} = 1</span></p>`, v: 'Correction. a : huit est plus grand que sept, donc huit septièmes est plus grand que un. b : cinq cinquièmes égale un.' },
        { h: `<p><span class="q">c.</span> <span class="formule">${F(10, 13)} &lt; 1</span> · <span class="q">d.</span> <span class="formule">1 &lt; ${F(25, 24)}</span></p>`, v: 'c : dix treizièmes est plus petit que un. d : vingt-cinq vingt-quatrièmes est plus grand que un.' }],
      cc: 'Huit septièmes et vingt-cinq vingt-quatrièmes sont plus grands que 1, cinq cinquièmes est égal à 1 et dix treizièmes est plus petit que 1.' },
    { type: 'comparer', rub: 'exo', titre: 'Exercice 4', ceinture: 'orange', egal: true, enonce: '<p>Pour chaque paire, touche le nombre <strong>le plus petit</strong>, ou le bouton = s’ils sont égaux.</p>',
      v: 'Exercice quatre. Pour chaque paire, touche le nombre le plus petit, ou le bouton égal.',
      parts: [P('a', [3, 8], [1, 2], 'a', { b: 'La moitié de 8 est 4, et 3 &lt; 4.' }), P('b', [7, 12], [1, 2], 'b', { a: 'La moitié de 12 est 6, et 7 &gt; 6.' }), P('c', [5, 10], [1, 2], '=', { a: 'La moitié de 10 est 5 : cinq dixièmes, c’est exactement la moitié.', b: 'La moitié de 10 est 5 : cinq dixièmes, c’est exactement la moitié.' }), P('d', [6, 14], [1, 2], 'a', { b: 'La moitié de 14 est 7, et 6 &lt; 7.' })],
      indices: ['Calcule la moitié du dénominateur.', 'Compare le numérateur à cette moitié.', 'Pour d., la moitié de 14 est 7.'],
      correction: [
        { h: bd([[3, 8], [7, 12], [5, 10]], { moitie: true }) + `<p><span class="q">a.</span> la moitié de 8 est 4 : <span class="formule">${F(3, 8)} &lt; ${F(1, 2)}</span> · <span class="q">b.</span> la moitié de 12 est 6 : <span class="formule">${F(1, 2)} &lt; ${F(7, 12)}</span></p>`, v: 'Correction. a : la moitié de huit est quatre, et trois est plus petit : trois huitièmes est plus petit qu’un demi. b : la moitié de douze est six, et sept est plus grand.' },
        { h: `<p><span class="q">c.</span> <span class="formule">${F(5, 10)} = ${F(1, 2)}</span> · <span class="q">d.</span> la moitié de 14 est 7 : <span class="formule">${F(6, 14)} &lt; ${F(1, 2)}</span></p>`, v: 'c : cinq dixièmes égale un demi. d : la moitié de quatorze est sept, et six est plus petit.' }],
      cc: 'Trois huitièmes et six quatorzièmes sont plus petits qu’un demi, sept douzièmes est plus grand qu’un demi et cinq dixièmes est égal à un demi.' },
    { type: 'comparer', rub: 'exo', titre: 'Exercice 5', ceinture: 'orange', enonce: '<p>Complète la fraction égale, puis touche la fraction <strong>la plus petite</strong>.</p>',
      v: 'Exercice cinq. Pour chaque question, complète la fraction égale, puis touche la fraction la plus petite.',
      parts: [
        Object.assign(P('a', [2, 3], [7, 9], 'a'), { eg: { de: [2, 3], den: 9, rep: 6 } }),
        Object.assign(P('b', [3, 5], [7, 10], 'a'), { eg: { de: [3, 5], den: 10, rep: 6 } }),
        Object.assign(P('c', [5, 6], [7, 12], 'b', { a: `${F(5, 6)} = ${F(10, 12)} et 10 &gt; 7 : c’est ${F(7, 12)} la plus petite.` }), { eg: { de: [5, 6], den: 12, rep: 10 } }),
        Object.assign(P('d', [3, 4], [11, 16], 'b', { a: `${F(3, 4)} = ${F(12, 16)} et 12 &gt; 11 : c’est ${F(11, 16)} la plus petite.` }), { eg: { de: [3, 4], den: 16, rep: 12 } })],
      indices: ['Par combien multiplie-t-on le dénominateur ? 3 × 3 = 9.', 'On multiplie le numérateur par le même nombre.', 'Les deux fractions ont maintenant le même dénominateur : compare les numérateurs.'],
      correction: [
        { h: bd([[2, 3], [6, 9], [7, 9]]) + `<p><span class="q">a.</span> <span class="formule">${F(2, 3)} = ${F('2 × 3', '3 × 3')} = ${F(6, 9)}</span> ; 6 &lt; 7, donc <span class="formule">${F(2, 3)} &lt; ${F(7, 9)}</span></p>`, v: 'Correction. a : deux tiers égale six neuvièmes. Six est plus petit que sept, donc deux tiers est plus petit que sept neuvièmes.' },
        { h: `<p><span class="q">b.</span> <span class="formule">${F(3, 5)} = ${F(6, 10)}</span> ; 6 &lt; 7, donc <span class="formule">${F(3, 5)} &lt; ${F(7, 10)}</span></p>`, v: 'b : trois cinquièmes égale six dixièmes, plus petit que sept dixièmes.' },
        { h: `<p><span class="q">c.</span> <span class="formule">${F(5, 6)} = ${F(10, 12)}</span>, donc <span class="formule">${F(7, 12)} &lt; ${F(5, 6)}</span> · <span class="q">d.</span> <span class="formule">${F(3, 4)} = ${F(12, 16)}</span>, donc <span class="formule">${F(11, 16)} &lt; ${F(3, 4)}</span></p>`, v: 'c : cinq sixièmes égale dix douzièmes, donc sept douzièmes est le plus petit. d : trois quarts égale douze seizièmes, donc onze seizièmes est le plus petit.' }],
      cc: 'Deux tiers est plus petit que sept neuvièmes, trois cinquièmes est plus petit que sept dixièmes, sept douzièmes est plus petit que cinq sixièmes et onze seizièmes est plus petit que trois quarts.' },
    { type: 'comparer', rub: 'exo', titre: 'Exercice 6 · Toutes les méthodes', ceinture: 'verte', enonce: '<p>Pour chaque paire, touche la fraction <strong>la plus petite</strong>. Rappelle-toi la méthode qui convient.</p>',
      v: 'Exercice six. Pour chaque paire, touche la fraction la plus petite. Rappelle-toi la méthode qui convient.',
      parts: [P('a', [9, 8], [7, 9], 'b', { a: `Compare chaque fraction à 1 : ${F(9, 8)} &gt; 1 car 9 &gt; 8, et ${F(7, 9)} &lt; 1 car 7 &lt; 9.` }),
        P('b', [2, 7], [5, 8], 'a', { b: 'Compare à un demi : 2 est plus petit que la moitié de 7, et 5 est plus grand que la moitié de 8.' }),
        P('c', [4, 11], [4, 9], 'a', { b: 'Même numérateur : les onzièmes sont plus petits que les neuvièmes.' }),
        P('d', [5, 12], [1, 4], 'b', { a: `12 est un multiple de 4 : écris ${F(1, 4)} en douzièmes, ${F(1, 4)} = ${F(3, 12)}. Puis compare 5 et 3.` }),
        P('e', [3, 4], [5, 8], 'b', { a: `8 est un multiple de 4 : ${F(3, 4)} = ${F(6, 8)}, et 6 &gt; 5.` }),
        P('f', [13, 15], [11, 15], 'b', { a: 'Même dénominateur : 11 &lt; 13.' }),
        P('g', [6, 5], [11, 12], 'b', { a: `Compare à 1 : ${F(6, 5)} &gt; 1 et ${F(11, 12)} &lt; 1.` }),
        P('h', [3, 10], [4, 7], 'a', { b: 'Compare à un demi : la moitié de 10 est 5 et 3 &lt; 5 ; la moitié de 7 est 3,5 et 4 &gt; 3,5.' })],
      indices: ['Même numérateur ? Même dénominateur ? Alors tu connais la règle.', 'Sinon : l’une est-elle plus grande que 1, ou plus petite qu’un demi ?', 'Sinon : un dénominateur est-il un multiple de l’autre ? Écris une fraction égale.'],
      correction: [
        { h: `<p><span class="q">a.</span> <span class="formule">${F(7, 9)} &lt; 1 &lt; ${F(9, 8)}</span> · <span class="q">g.</span> <span class="formule">${F(11, 12)} &lt; 1 &lt; ${F(6, 5)}</span> : on compare à 1.</p>`, v: 'Correction. a et g : on compare à un. Sept neuvièmes et onze douzièmes sont plus petits que un ; neuf huitièmes et six cinquièmes sont plus grands que un.' },
        { h: `<p><span class="q">b.</span> <span class="formule">${F(2, 7)} &lt; ${F(1, 2)} &lt; ${F(5, 8)}</span> · <span class="q">h.</span> <span class="formule">${F(3, 10)} &lt; ${F(1, 2)} &lt; ${F(4, 7)}</span> : on compare à un demi.</p>`, v: 'b et h : on compare à un demi. Deux septièmes et trois dixièmes sont plus petits qu’un demi ; cinq huitièmes et quatre septièmes sont plus grands.' },
        { h: `<p><span class="q">c.</span> même numérateur : <span class="formule">${F(4, 11)} &lt; ${F(4, 9)}</span> · <span class="q">f.</span> même dénominateur : <span class="formule">${F(11, 15)} &lt; ${F(13, 15)}</span></p>`, v: 'c : même numérateur, les onzièmes sont plus petits. f : même dénominateur, onze est plus petit que treize.' },
        { h: bd([[3, 4], [6, 8], [5, 8]]) + `<p><span class="q">d.</span> <span class="formule">${F(1, 4)} = ${F(3, 12)} &lt; ${F(5, 12)}</span> · <span class="q">e.</span> <span class="formule">${F(5, 8)} &lt; ${F(6, 8)} = ${F(3, 4)}</span> : on écrit une fraction égale.</p>`, v: 'd : un quart égale trois douzièmes, plus petit que cinq douzièmes. e : trois quarts égale six huitièmes, plus grand que cinq huitièmes.' }],
      cc: 'Les plus petites fractions sont : sept neuvièmes, deux septièmes, quatre onzièmes, un quart, cinq huitièmes, onze quinzièmes, onze douzièmes et trois dixièmes.' },
    { type: 'ranger', rub: 'exo', titre: 'Exercice 7', ceinture: 'bleue', ordre: 'croissant', enonce: '<p>Range dans l’ordre <strong>croissant</strong>.</p>',
      v: 'Exercice sept. Range dans l’ordre croissant : sept neuvièmes, deux neuvièmes, onze neuvièmes, cinq neuvièmes, neuf neuvièmes.',
      liste: [[7, 9], [2, 9], [11, 9], [5, 9], [9, 9]],
      indices: ['Croissant : du plus petit au plus grand.', 'Les dénominateurs sont les mêmes.', 'Range les numérateurs : 2 ; 5 ; 7 ; 9 ; 11.'],
      correction: [
        { h: '<p>Même dénominateur 9 : je range les numérateurs : 2 &lt; 5 &lt; 7 &lt; 9 &lt; 11</p>', v: 'Correction. Les dénominateurs sont les mêmes : on range les numérateurs, deux, cinq, sept, neuf, onze.' },
        { h: M(`${F(2, 9)} &lt; ${F(5, 9)} &lt; ${F(7, 9)} &lt; ${F(9, 9)} &lt; ${F(11, 9)}`), v: 'Deux neuvièmes, plus petit que cinq neuvièmes, plus petit que sept neuvièmes, plus petit que neuf neuvièmes, plus petit que onze neuvièmes.' }],
      cc: 'Dans l’ordre croissant : deux neuvièmes, cinq neuvièmes, sept neuvièmes, neuf neuvièmes, onze neuvièmes.' },
    { type: 'ranger', rub: 'exo', titre: 'Exercice 8', ceinture: 'marron', ordre: 'decroissant', enonce: '<p>Range dans l’ordre <strong>décroissant</strong>.</p>',
      v: 'Exercice huit. Range dans l’ordre décroissant : cinq sixièmes, cinq demis, cinq neuvièmes, cinq quarts, cinq onzièmes.',
      liste: [[5, 6], [5, 2], [5, 9], [5, 4], [5, 11]],
      err: [{ si: [4], msg: `Même numérateur : plus le dénominateur est grand, plus les parts sont petites. ${F(5, 11)} est donc la plus petite.` }],
      indices: ['Décroissant : du plus grand au plus petit.', 'Les numérateurs sont les mêmes : regarde la taille des parts.', 'Le plus petit dénominateur donne la plus grande fraction.'],
      correction: [
        { h: '<p>Même numérateur 5 : la plus grande fraction a le plus petit dénominateur : 2 &lt; 4 &lt; 6 &lt; 9 &lt; 11</p>', v: 'Correction. Les numérateurs sont les mêmes : la plus grande fraction a le plus petit dénominateur.' },
        { h: M(`${F(5, 2)} &gt; ${F(5, 4)} &gt; ${F(5, 6)} &gt; ${F(5, 9)} &gt; ${F(5, 11)}`), v: 'Cinq demis, plus grand que cinq quarts, plus grand que cinq sixièmes, plus grand que cinq neuvièmes, plus grand que cinq onzièmes.' }],
      cc: 'Dans l’ordre décroissant : cinq demis, cinq quarts, cinq sixièmes, cinq neuvièmes, cinq onzièmes.' },
    { type: 'ranger', rub: 'exo', titre: 'Défi · Plusieurs méthodes', ceinture: 'noire', ordre: 'croissant', enonce: '<p>Range dans l’ordre <strong>croissant</strong>.</p>',
      v: 'Défi. Range dans l’ordre croissant : quatre neuvièmes, quatre cinquièmes, deux neuvièmes, sept sixièmes, quatre septièmes.',
      liste: [[4, 9], [4, 5], [2, 9], [7, 6], [4, 7]],
      err: [{ si: [0], msg: `Même dénominateur 9 : ${F(2, 9)} est plus petit que ${F(4, 9)}.` }],
      indices: ['Cherche la fraction plus grande que 1.', 'Puis cherche deux fractions qui ont le même dénominateur, et celles qui ont le même numérateur.', `${F(2, 9)} &lt; ${F(4, 9)}, et ${F(4, 9)} &lt; ${F(4, 7)} &lt; ${F(4, 5)}.`],
      correction: [
        { h: `<p>Même dénominateur : <span class="formule">${F(2, 9)} &lt; ${F(4, 9)}</span></p>`, v: 'Correction. Deux neuvièmes et quatre neuvièmes ont le même dénominateur : deux neuvièmes est plus petit.' },
        { h: `<p>Même numérateur : <span class="formule">${F(4, 9)} &lt; ${F(4, 7)} &lt; ${F(4, 5)}</span></p>`, v: 'Quatre neuvièmes, quatre septièmes et quatre cinquièmes ont le même numérateur : les neuvièmes sont les plus petites parts, les cinquièmes les plus grandes.' },
        { h: bd([[2, 9], [4, 9], [4, 7], [4, 5], [7, 6]]) + `<p><span class="formule">${F(7, 6)} &gt; 1</span> : c’est la plus grande.</p>` + M(`${F(2, 9)} &lt; ${F(4, 9)} &lt; ${F(4, 7)} &lt; ${F(4, 5)} &lt; ${F(7, 6)}`), v: 'Sept sixièmes est plus grand que un, et les autres sont plus petites que un : c’est la plus grande. Dans l’ordre croissant : deux neuvièmes, quatre neuvièmes, quatre septièmes, quatre cinquièmes, sept sixièmes.' }],
      cc: 'Dans l’ordre croissant : deux neuvièmes, quatre neuvièmes, quatre septièmes, quatre cinquièmes, sept sixièmes.' },
  ] };
  if (typeof EXOS !== 'undefined' && EXOS[CID]) EXOS[CID][3] = P3;
})();
