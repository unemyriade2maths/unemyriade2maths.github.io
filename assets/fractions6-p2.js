// 6e · Fractions · Partie 2 : repérer une fraction sur une droite graduée.
// Type d'exercice « droite » (lire une abscisse, placer des points) et exercice guidé « gdroite » (les 4 étapes de la méthode).
(function () {
  const CID = 'fractions-6e', BL = '#0070C0', RG = '#C00000', TR = '#232328', VT = '#1F6F3D', OR = '#F08A24', BLC = '#5B9BD5', ROUGE = '#D93025';
  const F = (n, d) => `<span class="frac"><span>${n}</span><span>${d}</span></span>`;
  const ent = (k) => (k === 1 ? 'une graduation' : k + ' graduations');
  if (/c=fractions-6e/.test(location.search)) document.head.insertAdjacentHTML('beforeend', `<style>
    .dr { position: relative; width: 100%; max-width: 640px; margin: 6px 0; } .dr svg { width: 100%; height: auto; display: block; }
    .dr .hit { cursor: pointer; } .dr-box { position: absolute; transform: translateX(-50%); width: 2.6em; }
    .dr-box input { width: 100%; text-align: center; font-weight: 800; padding: 3px 0; }
    .dr-box.fr { display: flex; flex-direction: column; gap: 2px; } .dr-box.fr .fn { color: ${BL}; border-bottom: 3px solid ${TR}; } .dr-box.fr .fd { color: ${RG}; }
    .lettres { display: flex; gap: 8px; flex-wrap: wrap; margin: 6px 0; }
    .dr-q { margin: 8px 0; }
  </style>`);

  // ---------- la droite graduée en SVG ----------
  // o = { start, nint, sub, show: entiers écrits (défaut : tous), pts: { A: [t, couleur] }, lab: { t: [n, d] }, eg: entiers avec « = n/d »,
  //       fleche: t, bonds: [a, b], inter: unité dont on colore les intervalles, traits: unité dont on entoure les petits traits, faux: [t...] }
  const W = 640, X0 = 26, X1 = 590, Y = 86;
  const dr = (o, clic) => {
    const n = o.nint * o.sub, X = (t) => X0 + (X1 - X0) * t / n, r = (v) => Math.round(v * 10) / 10;
    const bas = o.eg || (o.lab && Object.keys(o.lab).length) ? 92 : 0, H = 150 + bas;
    let s = `<line x1="${X0 - 14}" y1="${Y}" x2="${X1 + 26}" y2="${Y}" stroke="${TR}" stroke-width="3"/><path d="M${X1 + 40} ${Y} L${X1 + 20} ${Y - 11} L${X1 + 20} ${Y + 11} Z" fill="${TR}"/>`;
    if (o.inter !== undefined) for (let k = 0; k < o.sub; k++) {
      const a = X(o.inter * o.sub + k), b = X(o.inter * o.sub + k + 1), c = k % 2 ? BLC : OR;
      s += `<line x1="${r(a + 2)}" y1="${Y}" x2="${r(b - 2)}" y2="${Y}" stroke="${c}" stroke-width="7"/><text x="${r((a + b) / 2)}" y="${Y - 22}" font-size="22" font-weight="800" fill="${c}" text-anchor="middle">${k + 1}</text>`;
    }
    for (let t = 0; t <= n; t++) {
      const g = t % o.sub === 0, h = g ? 20 : 11, x = r(X(t));
      s += `<line x1="${x}" y1="${Y - h}" x2="${x}" y2="${Y + h}" stroke="${TR}" stroke-width="${g ? 4 : 2.4}"/>`;
      if (o.traits !== undefined && !g && Math.floor(t / o.sub) === o.traits) s += `<circle cx="${x}" cy="${Y}" r="12" fill="none" stroke="${ROUGE}" stroke-width="2.5"/>`;
      if (g) {
        const v = o.start + t / o.sub;
        if (!o.show || o.show.includes(v)) s += `<text x="${x}" y="${Y + 50}" font-size="28" font-weight="800" fill="${TR}" text-anchor="middle">${v}</text>`;
        if (o.eg && o.eg.includes(v)) s += `<text x="${x - 9}" y="${Y + 112}" font-size="24" font-weight="800" fill="${TR}" text-anchor="end">=</text>` + sf(x + 12, Y + 62, v * o.sub, o.sub);
      }
    }
    Object.entries(o.lab || {}).forEach(([t, [a, b]]) => { t = +t; s += sf(r(X(t)), t % o.sub ? Y + 24 : Y + 62, a, b, t % o.sub ? 0 : 1); });
    if (o.bonds) for (let t = o.bonds[0]; t < o.bonds[1]; t++) { const a = X(t), b = X(t + 1); s += `<path d="M${r(a)} ${Y - 6} Q${r((a + b) / 2)} ${Y - 40} ${r(b)} ${Y - 6}" fill="none" stroke="${VT}" stroke-width="2.4"/><path d="M${r(b)} ${Y - 6} l-8 -5 l1 9 Z" fill="${VT}"/>`; }
    if (o.fleche !== undefined) { const x = r(X(o.fleche)); s += `<line x1="${x}" y1="${Y - 58}" x2="${x}" y2="${Y - 24}" stroke="${OR}" stroke-width="4"/><path d="M${x} ${Y - 16} l-8 -12 l16 0 Z" fill="${OR}"/><text x="${x}" y="${Y - 64}" font-size="26" font-weight="800" fill="${OR}" text-anchor="middle">?</text>`; }
    const croix = (t, c, L) => { const x = r(X(t)); return `<path d="M${x - 10} ${Y - 10} L${x + 10} ${Y + 10} M${x - 10} ${Y + 10} L${x + 10} ${Y - 10}" stroke="${c}" stroke-width="4"/>` + (L ? `<text x="${x}" y="${Y - 30}" font-size="26" font-weight="800" fill="${c}" text-anchor="middle">${L}</text>` : ''); };
    (o.faux || []).forEach(t => { s += croix(t, ROUGE, ''); });
    Object.entries(o.pts || {}).forEach(([L, [t, c]]) => { s += croix(t, c || TR, L); });
    if (clic) for (let t = 0; t <= n; t++) { const w = (X1 - X0) / n; s += `<rect class="hit" data-t="${t}" x="${r(X(t) - w / 2)}" y="${Y - 44}" width="${r(w)}" height="88" fill="transparent"/>`; }
    return `<div class="dr" data-n="${n}"><svg viewBox="0 0 ${W} ${H}" role="img" aria-label="demi-droite graduée">${s}</svg></div>`;
  };
  // une fraction écrite dans le SVG (numérateur bleu, trait, dénominateur rouge)
  const sf = (x, y, a, b, sous) => `<text x="${x}" y="${y + 20}" font-size="21" font-weight="800" fill="${BL}" text-anchor="middle">${a}</text><line x1="${x - 14}" y1="${y + 27}" x2="${x + 14}" y2="${y + 27}" stroke="${TR}" stroke-width="2.5"/><text x="${x}" y="${y + 49}" font-size="21" font-weight="800" fill="${RG}" text-anchor="middle">${b}</text>`;
  const pos = (o, t) => (100 * (X0 + (X1 - X0) * t / (o.nint * o.sub)) / W) + '%';
  const tickDe = (o, a, b) => a * o.sub / b - o.start * o.sub;    // graduation d'une fraction a/b

  const TYPES = window.TYPES_EXO = window.TYPES_EXO || {};
  // ---------- exercice « droite » ----------
  // parts : { l, q, mode: 'lire' (t = graduation, rep [n, d]) | 'placer' (pts { A: t }, noms { A: html }) | 'nombre' (rep) }, droite partagée it.d ou propre p.d
  TYPES.droite = {
    carte(it, n) {
      return `<div class="item" id="ex${n}"><h3 class="exo-titre">${it.titre}${it.ceinture ? ` <span class="ceinture">Ceinture ${it.ceinture}</span>` : ''}</h3>
        <div class="enonce">${btnSon(it.v)}${it.enonce}</div>${it.d ? '<div class="dr-zone" data-k="-1"></div>' : ''}
        <div class="questions">${it.parts.map((p, k) => `<div class="question" data-k="${k}">${p.l ? `<span class="q">${p.l}${p.l.length === 1 && p.l === p.l.toLowerCase() ? '.' : ''}</span> ` : ''}${p.q || ''}
          ${p.d ? `<div class="dr-zone" data-k="${k}"></div>` : ''}
          ${p.mode === 'lire' ? `<span class="frac-in"><input class="fn" inputmode="numeric" autocomplete="off" aria-label="numérateur"><input class="fd" inputmode="numeric" autocomplete="off" aria-label="dénominateur"></span>` : ''}
          ${p.mode === 'nombre' ? `<input type="text" class="court f-nb" inputmode="numeric" autocomplete="off">` : ''}
          ${p.mode === 'placer' && Object.keys(p.pts).length > 1 ? `<div class="lettres">${Object.keys(p.pts).map((L, j) => `<button class="opt${j ? '' : ' choisi'}" data-lettre="${L}">Placer ${L}</button>`).join('')}</div>` : ''}
          <p class="f-msg" hidden></p></div>`).join('')}</div>
        <div class="indices"></div>
        <div class="boutons"><button class="btn indice-b">💡 Indice (1/${it.indices.length})</button><button class="btn verif">Vérifier</button></div>
        <div class="verdict" hidden></div>
        <div class="correction" hidden><h3>Correction</h3><div class="pas"></div>
          <p class="pas-cpt"></p><div class="pas-barre"><button class="btn verif pas-suiv">Suite ▶</button><button class="btn son pas-son">🔊 Écouter</button></div>
          <p class="cc" hidden>${it.cc}</p></div></div>`;
    },
    init(S, it) {
      let ni = 0, pi = 0;
      const pk = it.parts.findIndex(p => p.mode === 'placer'), P = it.parts[pk], choix = {}, verifie = { on: false };
      let lettre = P ? Object.keys(P.pts)[0] : null;
      const cfg = (k) => k < 0 ? it.d : it.parts[k].d;
      const dessiner = (k) => {
        const Z = S.querySelector(`.dr-zone[data-k="${k}"]`); if (!Z) return;
        const o = Object.assign({}, cfg(k)), place = P && (k === -1 || it.parts[k] === P);
        if (place) {
          o.pts = Object.assign({}, o.pts); o.faux = [];
          Object.entries(choix).forEach(([L, t]) => { const bon = t === P.pts[L]; if (!verifie.on) o.pts[L] = [t, TR]; else if (bon) o.pts[L] = [t, VT]; else { o.faux.push(t); o.pts[L] = [P.pts[L], VT]; } });
          if (verifie.on) {
            const fx = Object.keys(P.pts).filter(L => choix[L] !== P.pts[L]); if (fx.length) {
              const m = Math.max(...fx.map(L => P.pts[L])); o.lab = {}; for (let t = 1; t <= m; t++) o.lab[t] = [o.start * o.sub + t, o.sub]; o.eg = null;
            }
          }
        }
        Z.innerHTML = dr(o, place && !verifie.on);
        if (place && !verifie.on) Z.querySelectorAll('.hit').forEach(h => h.onclick = () => { choix[lettre] = +h.dataset.t; dessiner(k); });
      };
      [-1, ...it.parts.keys()].forEach(dessiner);
      S.querySelectorAll('.lettres .opt').forEach(b => b.onclick = () => { S.querySelectorAll('.lettres .opt').forEach(x => x.classList.toggle('choisi', x === b)); lettre = b.dataset.lettre; });
      const juge = (p, k) => {
        const Q = S.querySelector(`.question[data-k="${k}"]`), o = cfg(k) || it.d, cus = p.err || [];
        if (p.mode === 'nombre') { const v = parseInt(Q.querySelector('.f-nb').value, 10), ok = (Array.isArray(p.rep) ? p.rep : [p.rep]).includes(v); return { ok, msg: ok ? '' : ((cus.find(e => e.v === v) || {}).msg || 'Relis la question et réessaie.') }; }
        if (p.mode === 'lire') {
          const a = parseInt(Q.querySelector('.fn').value, 10), b = parseInt(Q.querySelector('.fd').value, 10);
          if (isNaN(a) || isNaN(b)) return { ok: false, msg: 'Écris le numérateur en haut et le dénominateur en bas.' };
          if (a === p.rep[0] && b === p.rep[1]) return { ok: true };
          const c = cus.find(e => e.si[0] === a && e.si[1] === b); if (c) return { ok: false, msg: c.msg };
          const d = o.sub, t = p.t, v = o.start * d + t, kq = Math.floor(v / d), apres = v % d;
          if (b === d - 1) return { ok: false, msg: `Compte les intervalles entre deux entiers, pas les traits : il y a ${d - 1} petit${d > 2 ? 's' : ''} trait${d > 2 ? 's' : ''} mais ${d} parts égales.` };
          if (a === d && b === v) return { ok: false, msg: `Tu as inversé : le dénominateur est le nombre de parts égales de l’unité, ici ${d}.` };
          if (b === d && a === t && o.start) return { ok: false, msg: `La droite ne commence pas à 0 : la première grande graduation est ${o.start} = ${F(o.start * d, d)}.` };
          if (b === d && a === apres && kq > 0) return { ok: false, msg: `Le point est ${ent(apres)} après ${kq}. Écris d’abord ${kq} en fraction : ${kq} = ${F(kq * d, d)}.` };
          return { ok: false, msg: 'Écris les entiers en fractions, puis avance graduation par graduation depuis l’entier le plus proche.' };
        }
        const fx = Object.keys(p.pts).filter(L => choix[L] !== p.pts[L]);
        if (!fx.length) return { ok: true };
        const nonPl = fx.filter(L => choix[L] === undefined);
        if (nonPl.length) return { ok: false, msg: `Place aussi : ${nonPl.join(', ')}.` };
        const L = fx[0], c = choix[L], tg = p.pts[L], d = o.sub;
        let m = `${fx.join(', ')} : la croix rouge est ton point, le point vert est la bonne place. Le comptage depuis 0 est écrit sous la droite.`;
        if (c === tg + d) m = `${L} : tu as compté depuis 1. Pars de 0 : regarde le comptage sous la droite.`;
        else if (c === tg - d) m = `${L} : il te manque une unité. Regarde le comptage sous la droite.`;
        return { ok: false, msg: (cus.find(e => e.L === L && e.t === c) || {}).msg || m };
      };
      const bi = S.querySelector('.indice-b');
      bi.onclick = () => { if (ni >= it.indices.length) return; S.querySelector('.indices').insertAdjacentHTML('beforeend', `<div class="indice"><small>Indice ${ni + 1}</small>${it.indices[ni]}</div>`); ni++; bi.textContent = ni < it.indices.length ? `💡 Indice (${ni + 1}/${it.indices.length})` : '💡 Plus d’indice'; bi.disabled = ni >= it.indices.length; };
      const C = S.querySelector('.correction'), pas = S.querySelector('.pas'), ps = S.querySelector('.pas-suiv');
      const montrer = () => { pas.innerHTML = pasHtml(it.correction, pi); labelSuiv(ps, it.correction, pi); S.querySelector('.cc').hidden = pi < it.correction.length - 1; };
      ps.onclick = () => { if (pi < it.correction.length - 1) { pi++; montrer(); jouer(voixDe(it.correction[pi])); } };
      S.querySelector('.pas-son').onclick = () => jouer(voixDe(it.correction[pi]));
      S.querySelector('.verif').onclick = () => {
        let bons = 0;
        const res = it.parts.map((p, k) => juge(p, k));
        if (P && Object.keys(P.pts).every(L => choix[L] !== undefined)) { verifie.on = true; [-1, ...it.parts.keys()].forEach(dessiner); }
        res.forEach((r, k) => { const Q = S.querySelector(`.question[data-k="${k}"]`), m = Q.querySelector('.f-msg'); Q.classList.toggle('juste', r.ok); Q.classList.toggle('faux', !r.ok); if (r.ok) bons++; m.hidden = false; m.innerHTML = r.ok ? 'Juste ✓' : r.msg; });
        const V = S.querySelector('.verdict'), tout = bons === it.parts.length; V.hidden = false; V.className = 'verdict ' + (tout ? 'ok' : 'non');
        V.textContent = tout ? 'Bravo, tout est juste ! Regarde la correction pas à pas.' : `${bons} réponse${bons > 1 ? 's' : ''} juste${bons > 1 ? 's' : ''} sur ${it.parts.length}. Lis le message sous chaque réponse, puis regarde la correction pas à pas.`;
        if (C.hidden) { C.hidden = false; pi = 0; montrer(); jouer(voixDe(it.correction[0])); }
      };
    },
  };

  // ---------- exercice guidé sur la droite : une question par étape de la méthode ----------
  // etapes : { q, kind: 'entiers' (cases sous les grandes graduations) | 'fracs' (cases fraction sous les entiers) | 'nombre' | 'frac', t: [graduations], rep, aide, puis: options ajoutées à la droite }
  TYPES.gdroite = {
    carte(it, n) {
      return `<div class="item" id="ex${n}"><h3 class="exo-titre">${it.titre}</h3><div class="enonce">${btnSon(it.v)}${it.enonce}</div>
        <div class="guide-pot gd"></div><div class="guide-actuelle"></div><div class="guide-faites" hidden><p class="g-titre">Déjà fait</p></div><p class="cc" hidden>${it.cc}</p></div>`;
    },
    init(S, it) {
      const zp = S.querySelector('.gd'), za = S.querySelector('.guide-actuelle'), zf = S.querySelector('.guide-faites');
      let o = Object.assign({}, it.d);
      const etape = (i) => {
        const e = it.etapes[i], cases = e.kind === 'entiers' || e.kind === 'fracs';
        zp.innerHTML = dr(o);
        if (cases) {
          const D = zp.querySelector('.dr'); D.style.paddingBottom = e.kind === 'fracs' ? '64px' : '30px';
          e.t.forEach((t, j) => D.insertAdjacentHTML('beforeend', e.kind === 'entiers'
            ? `<div class="dr-box" style="left:${pos(o, t)};top:58%"><input data-j="${j}" inputmode="numeric" aria-label="entier"></div>`
            : `<div class="dr-box fr" style="left:${pos(o, t)};top:62%"><input class="fn" data-j="${j}" inputmode="numeric" aria-label="numérateur"><input class="fd" data-j="${j}" inputmode="numeric" aria-label="dénominateur"></div>`));
        }
        za.innerHTML = `<div class="g-etape question"><p class="lab"><span class="g-num">${i + 1}</span> ${e.q}</p>
          <div class="g-ligne">${e.kind === 'nombre' ? '<input type="text" class="court g-in" inputmode="numeric">' : e.kind === 'frac' ? '<span class="frac-in"><input class="fn g-in" inputmode="numeric" aria-label="numérateur"><input class="fd" inputmode="numeric" aria-label="dénominateur"></span>' : ''}<button class="btn verif g-ok">OK</button></div><p class="g-msg" hidden></p></div>`;
        const msg = za.querySelector('.g-msg'); let essais = 0;
        za.querySelector('.g-ok').onclick = () => {
          let ok, aff;
          if (e.kind === 'entiers') { const v = [...zp.querySelectorAll('.dr-box input')].map(x => parseInt(x.value, 10)); ok = v.every((x, j) => x === e.rep[j]); aff = e.rep.join(' ; '); }
          else if (e.kind === 'fracs') { const B = [...zp.querySelectorAll('.dr-box')]; ok = B.every((b, j) => +b.querySelector('.fn').value === e.rep[j][0] && +b.querySelector('.fd').value === e.rep[j][1]); aff = e.rep.map(r => F(r[0], r[1])).join(' ; '); }
          else if (e.kind === 'nombre') { ok = parseInt(za.querySelector('.g-in').value, 10) === e.rep; aff = e.rep; }
          else { ok = +za.querySelector('.fn').value === e.rep[0] && +za.querySelector('.fd').value === e.rep[1]; aff = F(e.rep[0], e.rep[1]); }
          if (!ok) { essais++; za.firstElementChild.classList.add('faux'); msg.hidden = false; msg.innerHTML = essais === 1 ? 'Pas tout à fait, réessaie.' : 'Coup de pouce : ' + e.aide; return; }
          o = Object.assign(o, e.puis || {});
          zf.insertAdjacentHTML('beforeend', `<p class="g-fait"><span class="g-num">${i + 1}</span> ${e.q} <strong>${aff}</strong> ✓</p>`); zf.hidden = false;
          if (i < it.etapes.length - 1) etape(i + 1);
          else { zp.innerHTML = dr(o); zp.classList.remove('anime'); void zp.offsetWidth; zp.classList.add('anime'); za.innerHTML = it.fin; S.querySelector('.cc').hidden = false; }
        };
      };
      etape(0);
    },
  };

  // ---------- chapitre, leçon, exercices ----------
  if (typeof CHAPITRES !== 'undefined' && CHAPITRES[CID]) {
    CHAPITRES[CID].videos.push({ titre: 'Repérer une fraction sur une droite graduée', id: '' });
    CHAPITRES[CID].lecon.push(['C', 'Compléter une demi-droite graduée']);
  }
  const LC = { start: 2, nint: 3, sub: 3, pts: { A: [1], B: [5], C: [7] } }, Lc = (x) => dr(Object.assign({}, LC, x));
  if (typeof LECONS !== 'undefined' && LECONS[CID]) LECONS[CID].C = { titre: 'Compléter une demi-droite graduée', diapos: [
    { titre: 'Étape 1 : les nombres entiers', etapes: [
      { h: Lc({ show: [2, 3] }) + '<p>On cherche l’abscisse des points A, B et C.</p>', r: 1, v: 'Voici une demi-droite graduée. On cherche l’abscisse des points A, B et C.' },
      { h: Lc({}) + '<p><strong>Étape 1 :</strong> on écrit les nombres entiers sous les grandes graduations.</p>', r: 1, v: 'Étape un : on écrit les nombres entiers sous les grandes graduations : quatre, puis cinq.' }] },
    { titre: 'Étape 2 : compter les intervalles', etapes: [
      { h: Lc({ inter: 0 }) + '<p><strong>Étape 2 :</strong> entre deux entiers qui se suivent, on compte les intervalles : il y en a 3.</p>', v: 'Étape deux : entre deux entiers qui se suivent, on compte les intervalles. Il y en a trois.' },
      { h: `<p>Écart : 3 − 2 = 1. Partage en 3 : <span class="formule">1 ÷ 3 = ${F(1, 3)}</span></p><p class="cc">D’une graduation à la suivante, on avance d’un tiers.</p>`, v: 'L’écart entre deux et trois est un. On le partage en trois : d’une graduation à la suivante, on avance d’un tiers.' }] },
    { titre: 'Étape 3 : les entiers en fractions', etapes: [
      { h: Lc({}) + '<p><strong>Étape 3 :</strong> sous chaque entier, on écrit la fraction qui lui correspond, avec le même dénominateur.</p>', r: 1, v: 'Étape trois : sous chaque nombre entier, on écrit la fraction qui lui correspond, avec le même dénominateur.' },
      { h: Lc({ eg: [2, 3, 4, 5] }) + '<p>Le numérateur s’obtient en multipliant l’entier par le dénominateur : 2 × 3 = 6, 3 × 3 = 9…</p>', r: 1, v: 'Le numérateur s’obtient en multipliant l’entier par trois : deux égale six tiers, trois égale neuf tiers, quatre égale douze tiers, cinq égale quinze tiers.' }] },
    { titre: 'Étape 4 : avancer graduation par graduation', etapes: [
      { h: Lc({ eg: [2, 3, 4, 5] }) + '<p><strong>Étape 4 :</strong> on part de l’entier le plus proche et on avance d’un tiers par graduation.</p>', r: 1, v: 'Étape quatre : on part de l’entier le plus proche, et on avance d’un tiers à chaque graduation.' },
      { h: Lc({ eg: [2, 3, 4, 5], bonds: [0, 1], lab: { 1: [7, 3] } }) + `<p>A est 1 graduation après 2 = ${F(6, 3)}, donc A(${F(7, 3)}).</p>`, r: 1, v: 'Le point A est une graduation après deux, c’est-à-dire après six tiers. Donc A a pour abscisse sept tiers.' },
      { h: Lc({ eg: [2, 3, 4, 5], bonds: [3, 5], lab: { 1: [7, 3], 5: [11, 3] } }) + `<p>B est 2 graduations après 3 = ${F(9, 3)}, donc B(${F(11, 3)}).</p>`, r: 1, v: 'Le point B est deux graduations après trois, c’est-à-dire après neuf tiers. Donc B a pour abscisse onze tiers.' },
      { h: Lc({ eg: [2, 3, 4, 5], bonds: [6, 7], lab: { 1: [7, 3], 5: [11, 3], 7: [13, 3] } }) + `<p>C est 1 graduation après 4 = ${F(12, 3)}, donc C(${F(13, 3)}).</p>`, r: 1, v: 'Le point C est une graduation après quatre, c’est-à-dire après douze tiers. Donc C a pour abscisse treize tiers.' }] },
    { titre: 'Attention : erreur fréquente', alerte: true, etapes: [
      { h: Lc({ traits: 0, inter: 0 }) + '<p>On compte les <strong>intervalles</strong> entre deux entiers, <strong>pas les traits</strong>.</p>', v: 'Attention ! Pour trouver en combien de parts égales l’unité est partagée, on compte les intervalles entre deux nombres entiers, pas les traits.' },
      { h: `<p class="cc">Entre 2 et 3, il y a 2 petits traits mais 3 parts égales : on avance de ${F(1, 3)}.</p>`, v: 'Entre deux et trois, il y a deux petits traits, mais trois parts égales : on avance d’un tiers.' }] }] };

  const D = (start, nint, sub, x) => Object.assign({ start, nint, sub }, x || {});
  const MP = D(1, 2, 4, { pts: { P: [7] } });
  const P2 = { titre: 'Repérer une fraction sur une droite graduée', items: [
    { type: 'lecon', rub: 'lecon', parties: ['C'] },
    { type: 'methode', rub: 'methode', titre: 'Trouver l’abscisse d’un point',
      resume: `<ol class="meth"><li>J’écris les <strong>nombres entiers</strong> sous les grandes graduations.</li><li>Entre deux entiers qui se suivent, je compte les <strong>intervalles</strong>.</li><li>J’écris chaque entier en <strong>fraction</strong>, avec ce dénominateur.</li><li>Je pars de l’entier le plus proche et j’<strong>avance graduation par graduation</strong>.</li></ol><p><strong>Exemple :</strong> l’abscisse du point P.</p>`,
      etapes: [
        { h: dr(Object.assign({}, MP, { show: [1, 2] })), r: 1, v: 'Méthode. On cherche l’abscisse du point P.' },
        { h: dr(MP) + '<p>Étape 1 : les entiers 1, 2, 3.</p>', r: 1, v: 'Étape un : on écrit les entiers, un, deux, trois.' },
        { h: dr(Object.assign({}, MP, { inter: 0 })) + `<p>Étape 2 : 4 intervalles, on avance de ${F(1, 4)} par graduation.</p>`, r: 1, v: 'Étape deux : il y a quatre intervalles entre deux entiers : on avance d’un quart par graduation.' },
        { h: dr(Object.assign({}, MP, { eg: [1, 2, 3] })) + `<p>Étape 3 : 1 = ${F(4, 4)} ; 2 = ${F(8, 4)} ; 3 = ${F(12, 4)}</p>`, r: 1, v: 'Étape trois : un égale quatre quarts, deux égale huit quarts, trois égale douze quarts.' },
        { h: dr(Object.assign({}, MP, { eg: [1, 2, 3], bonds: [4, 7], lab: { 7: [11, 4] } })) + `<p>Étape 4 : P est 3 graduations après 2 = ${F(8, 4)}, donc P(${F(11, 4)}).</p>`, r: 1, v: 'Étape quatre : P est trois graduations après deux, c’est-à-dire après huit quarts. Donc P a pour abscisse onze quarts.' }],
      cc: 'L’abscisse du point P est onze quarts.' },
    { type: 'flash', rub: 'flash', titre: 'Questions flash', consigne: 'Vrai ou faux ? Tu as 10 secondes par question.', duree: 10, questions: [
      { q: `L’unité est partagée en 5 parts égales : on avance de ${F(1, 5)} à chaque graduation.`, rep: true, expl: 'chaque intervalle vaut un cinquième.', v: 'L’unité est partagée en cinq parts égales : on avance d’un cinquième à chaque graduation. Vrai, ou faux ?' },
      { q: 'Entre 0 et 1, il y a 3 petits traits : l’unité est partagée en 3.', rep: false, expl: '3 petits traits font 4 intervalles : l’unité est partagée en 4.', v: 'Entre zéro et un, il y a trois petits traits : l’unité est partagée en trois. Vrai, ou faux ?' },
      { q: `<span class="formule">2 = ${F(6, 3)}</span>`, rep: true, expl: '2 × 3 = 6 : deux unités font six tiers.', v: 'Deux égale six tiers. Vrai, ou faux ?' },
      { q: `L’unité est partagée en 4. Le point situé 1 graduation après 1 a pour abscisse ${F(2, 4)}.`, rep: false, expl: `<span class="formule">1 = ${F(4, 4)}</span>, donc une graduation après, c’est ${F(5, 4)}.`, v: 'L’unité est partagée en quatre. Le point situé une graduation après un a pour abscisse deux quarts. Vrai, ou faux ?' },
      { q: `${F(7, 4)} est entre 1 et 2.`, rep: true, expl: `<span class="formule">1 = ${F(4, 4)}</span> et <span class="formule">2 = ${F(8, 4)}</span>.`, v: 'Sept quarts est entre un et deux. Vrai, ou faux ?' },
      { q: `<span class="formule">3 = ${F(12, 4)}</span>`, rep: true, expl: '3 × 4 = 12.', v: 'Trois égale douze quarts. Vrai, ou faux ?' }] },
    { type: 'gdroite', rub: 'guide', titre: 'L’abscisse du point A',
      enonce: '<p>Donne l’abscisse du point A. On suit les 4 étapes de la méthode.</p>', v: 'Exercice guidé. Donne l’abscisse du point A. On suit les quatre étapes de la méthode.',
      d: D(0, 3, 3, { show: [0, 1], pts: { A: [5] } }),
      etapes: [
        { q: 'Étape 1 : écris les nombres entiers sous les grandes graduations.', kind: 'entiers', t: [6, 9], rep: [2, 3], aide: 'Après 0 et 1, on continue : 2, puis 3.', puis: { show: null } },
        { q: 'Étape 2 : entre 0 et 1, combien y a-t-il d’intervalles ?', kind: 'nombre', rep: 3, aide: 'Compte les espaces entre les traits, pas les traits.', puis: { inter: 0 } },
        { q: 'De combien avance-t-on à chaque graduation ?', kind: 'frac', rep: [1, 3], aide: 'L’unité est partagée en 3 parts égales.', puis: { inter: undefined } },
        { q: 'Étape 3 : écris chaque entier en tiers, dans les cases sous 1, 2 et 3.', kind: 'fracs', t: [3, 6, 9], rep: [[3, 3], [6, 3], [9, 3]], aide: 'Multiplie l’entier par 3 : 1 × 3, 2 × 3, 3 × 3. Le dénominateur reste 3.', puis: { eg: [1, 2, 3] } },
        { q: `Étape 4 : A est 2 graduations après 1 = ${F(3, 3)}. Quelle est l’abscisse de A ?`, kind: 'frac', rep: [5, 3], aide: `Pars de ${F(3, 3)} et avance de 2 graduations : ${F(4, 3)}, puis…`, puis: { bonds: [3, 5], lab: { 5: [5, 3] }, pts: { A: [5, VT] } } }],
      fin: `<p class="cc">A(${F(5, 3)})</p>`,
      cc: 'Le point A est 2 graduations après trois tiers : l’abscisse du point A est cinq tiers.' },

    { type: 'droite', rub: 'exo', titre: 'Exercice 1', ceinture: 'blanche',
      enonce: '<p>Voici une demi-droite graduée.</p>', v: 'Exercice un. Voici une demi-droite graduée. a : l’unité est partagée en combien de parts égales ? b : quelle est l’abscisse du point A ? c : quelle est l’abscisse du point B, en cinquièmes ?',
      d: D(0, 3, 5, { pts: { A: [3], B: [10] } }),
      parts: [{ l: 'a', q: 'L’unité est partagée en combien de parts égales ?', mode: 'nombre', rep: 5, err: [{ v: 4, msg: 'Compte les espaces entre les traits : entre 0 et 1, il y a 4 petits traits mais 5 parts égales.' }] },
        { l: 'b', q: 'Abscisse du point A :', mode: 'lire', t: 3, rep: [3, 5] },
        { l: 'c', q: 'Abscisse du point B, en cinquièmes :', mode: 'lire', t: 10, rep: [10, 5], err: [{ si: [2, 1], msg: `Juste ! Écris-le maintenant en cinquièmes : 2 = ${F(10, 5)}.` }, { si: [5, 5], msg: `Pars de 0 : B est 10 graduations après 0. Ou : 2 = ${F(10, 5)}.` }] }],
      indices: ['Entre 0 et 1, compte les intervalles, pas les traits.', `Chaque graduation avance de ${F(1, 5)}.`, 'B est sur 2 : 2 = 2 × 5 cinquièmes.'],
      correction: [
        { h: dr(D(0, 3, 5, { pts: { A: [3], B: [10] }, inter: 0 })) + `<p>Entre 0 et 1 : 5 intervalles, on avance de ${F(1, 5)}.</p>`, r: 1, v: 'Correction. Entre zéro et un, il y a cinq intervalles : on avance d’un cinquième par graduation.' },
        { h: dr(D(0, 3, 5, { pts: { A: [3, VT], B: [10] }, eg: [1, 2, 3], bonds: [0, 3], lab: { 3: [3, 5] } })) + `<p>A est 3 graduations après 0 : A(${F(3, 5)}).</p>`, r: 1, v: 'A est trois graduations après zéro : trois cinquièmes.' },
        { h: dr(D(0, 3, 5, { pts: { A: [3, VT], B: [10, VT] }, eg: [1, 2, 3], lab: { 3: [3, 5] } })) + `<p>B est sur <span class="formule">2 = ${F(10, 5)}</span> : B(${F(10, 5)}).</p>`, r: 1, v: 'B est sur deux, et deux égale dix cinquièmes.' }],
      cc: 'L’unité est partagée en 5 parts égales ; l’abscisse de A est trois cinquièmes et celle de B est dix cinquièmes.' },

    { type: 'droite', rub: 'exo', titre: 'Exercice 2', ceinture: 'jaune',
      enonce: '<p>Quelle fraction correspond à la graduation montrée par la flèche ?</p>', v: 'Exercice deux. Pour chaque droite, écris la fraction qui correspond à la graduation montrée par la flèche.',
      parts: [
        { l: 'a', d: D(0, 2, 4, { fleche: 3 }), mode: 'lire', t: 3, rep: [3, 4] },
        { l: 'b', d: D(0, 2, 6, { fleche: 5, show: [0], lab: { 1: [1, 6] } }), mode: 'lire', t: 5, rep: [5, 6], err: [{ si: [5, 1], msg: `La première graduation vaut ${F(1, 6)} : chaque graduation avance d’un sixième.` }] },
        { l: 'c', d: D(0, 2, 4, { fleche: 6, show: [1] }), mode: 'lire', t: 6, rep: [6, 4], err: [{ si: [6, 3], msg: 'Compte les intervalles entre 0 et 1 : il y en a 4, donc des quarts.' }] },
        { l: 'd', d: D(2, 2, 5, { fleche: 2, show: [2, 3] }), mode: 'lire', t: 2, rep: [12, 5] }],
      indices: ['Trouve d’abord deux entiers qui se suivent.', 'Compte les intervalles dans une unité : c’est le dénominateur.', `Pour d., écris 2 en cinquièmes : 2 = ${F(10, 5)}.`],
      correction: [
        { h: dr(D(0, 2, 4, { fleche: 3, eg: [0, 1, 2], lab: { 3: [3, 4] } })) + `<p>a. 4 intervalles par unité ; 3 graduations après 0 : ${F(3, 4)}</p>`, v: 'Correction. a : trois quarts.' },
        { h: dr(D(0, 2, 6, { fleche: 5, eg: [0, 1, 2], lab: { 1: [1, 6], 5: [5, 6] } })) + `<p>b. La 1<sup>re</sup> graduation vaut ${F(1, 6)} ; la flèche est à la 5<sup>e</sup> : ${F(5, 6)}</p>`, v: 'b : cinq sixièmes.' },
        { h: dr(D(0, 2, 4, { fleche: 6, eg: [0, 1, 2], lab: { 6: [6, 4] } })) + `<p>c. <span class="formule">1 = ${F(4, 4)}</span> ; 2 graduations après : ${F(6, 4)}</p>`, v: 'c : un égale quatre quarts ; deux graduations après, c’est six quarts.' },
        { h: dr(D(2, 2, 5, { fleche: 2, eg: [2, 3, 4], lab: { 2: [12, 5] } })) + `<p>d. <span class="formule">2 = ${F(10, 5)}</span> ; 2 graduations après : ${F(12, 5)}</p>`, v: 'd : deux égale dix cinquièmes ; deux graduations après, c’est douze cinquièmes.' }],
      cc: 'Les flèches montrent trois quarts, cinq sixièmes, six quarts et douze cinquièmes.' },

    { type: 'droite', rub: 'exo', titre: 'Exercice 3', ceinture: 'orange',
      enonce: '<p>Écris l’abscisse de chaque point sous la forme d’une fraction.</p>', v: 'Exercice trois. Écris l’abscisse de chaque point sous la forme d’une fraction.',
      d: D(0, 3, 4, { show: [0, 1], pts: { A: [3], B: [6], C: [9], D: [11] } }),
      parts: [{ l: 'A', mode: 'lire', t: 3, rep: [3, 4] }, { l: 'B', mode: 'lire', t: 6, rep: [6, 4] }, { l: 'C', mode: 'lire', t: 9, rep: [9, 4] }, { l: 'D', mode: 'lire', t: 11, rep: [11, 4] }],
      indices: ['Écris d’abord les entiers sous les grandes graduations : 2 et 3.', 'Combien d’intervalles entre 0 et 1 ?', 'Écris chaque entier en quarts, puis avance depuis l’entier le plus proche.'],
      correction: [
        { h: dr(D(0, 3, 4, { pts: { A: [3], B: [6], C: [9], D: [11] }, inter: 0 })) + '<p>Les entiers 0, 1, 2, 3 ; 4 intervalles : ce sont des quarts.</p>', r: 1, v: 'Correction. Entre deux entiers, il y a quatre intervalles : on avance d’un quart.' },
        { h: dr(D(0, 3, 4, { pts: { A: [3], B: [6], C: [9], D: [11] }, eg: [1, 2, 3] })) + `<p><span class="formule">1 = ${F(4, 4)}</span> ; <span class="formule">2 = ${F(8, 4)}</span> ; <span class="formule">3 = ${F(12, 4)}</span></p>`, r: 1, v: 'Un égale quatre quarts, deux égale huit quarts, trois égale douze quarts.' },
        { h: dr(D(0, 3, 4, { pts: { A: [3, VT], B: [6, VT], C: [9, VT], D: [11, VT] }, eg: [1, 2, 3], lab: { 3: [3, 4], 6: [6, 4], 9: [9, 4], 11: [11, 4] } })) + `<p>A(${F(3, 4)}) ; B est 2 graduations après ${F(4, 4)} : B(${F(6, 4)}) ; C est 1 graduation après ${F(8, 4)} : C(${F(9, 4)}) ; D est 1 graduation avant ${F(12, 4)} : D(${F(11, 4)}).</p>`, r: 1, v: 'A : trois quarts. B : six quarts. C : neuf quarts. D : onze quarts.' }],
      cc: 'Les abscisses sont A trois quarts, B six quarts, C neuf quarts et D onze quarts.' },

    { type: 'droite', rub: 'exo', titre: 'Exercice 4', ceinture: 'verte',
      enonce: `<p>Place les points A(${F(2, 3)}), B(${F(7, 3)}), C(${F(10, 3)}) et D(${F(12, 3)}).</p><p>Choisis la lettre, puis touche une graduation. Touche ailleurs pour déplacer le point.</p>`,
      v: 'Exercice quatre. Place les points A deux tiers, B sept tiers, C dix tiers, et D douze tiers.',
      d: D(0, 4, 3, { show: [0, 1] }),
      parts: [{ mode: 'placer', pts: { A: 2, B: 7, C: 10, D: 12 }, err: [{ L: 'D', t: 4, msg: `D : ${F(12, 3)}, c’est 12 tiers et 12 ÷ 3 = 4. D est sur 4.` }] }],
      indices: ['Combien d’intervalles entre 0 et 1 ? Ce sont des tiers.', `Écris les entiers en tiers : 1 = ${F(3, 3)}, 2 = ${F(6, 3)}, 3 = ${F(9, 3)}.`, `${F(7, 3)} : pars de ${F(6, 3)} et avance d’une graduation.`],
      correction: [
        { h: dr(D(0, 4, 3, { eg: [1, 2, 3, 4] })) + '<p>On écrit les entiers en tiers.</p>', r: 1, v: 'Correction. On écrit les entiers en tiers : un égale trois tiers, deux égale six tiers, trois égale neuf tiers, quatre égale douze tiers.' },
        { h: dr(D(0, 4, 3, { eg: [1, 2, 3, 4], pts: { A: [2, VT], B: [7, VT], C: [10, VT], D: [12, VT] } })) + `<p>A est 2 graduations après 0 ; B, 1 graduation après ${F(6, 3)} ; C, 1 graduation après ${F(9, 3)} ; D est sur <span class="formule">${F(12, 3)} = 4</span>.</p>`, r: 1, v: 'A, deux graduations après zéro. B, une graduation après six tiers. C, une graduation après neuf tiers. D est sur douze tiers, c’est-à-dire quatre.' }],
      cc: 'J’ai placé A, B, C et D en avançant d’un tiers par graduation.' },

    { type: 'droite', rub: 'exo', titre: 'Exercice 5', ceinture: 'bleue',
      enonce: `<p>Place les points A(${F(5, 4)}), B(<span class="formule">2 + ${F(3, 4)}</span>), C(${F(14, 4)}) et D(<span class="formule">4 + ${F(1, 4)}</span>).</p>`,
      v: 'Exercice cinq. Place les points A cinq quarts, B deux plusse trois quarts, C quatorze quarts, et D quatre plusse un quart.',
      d: D(0, 5, 4),
      parts: [{ mode: 'placer', pts: { A: 5, B: 11, C: 14, D: 17 }, err: [{ L: 'B', t: 3, msg: 'B : n’oublie pas le 2. Va d’abord jusqu’à 2, puis avance de 3 quarts.' }, { L: 'D', t: 1, msg: 'D : n’oublie pas le 4. Va d’abord jusqu’à 4, puis avance d’un quart.' }] }],
      indices: ['L’unité est partagée en 4 : ce sont des quarts.', `<span class="formule">2 + ${F(3, 4)}</span> : va jusqu’à 2, puis avance de 3 quarts.`, `${F(14, 4)} : <span class="formule">3 = ${F(12, 4)}</span>, puis avance de 2 graduations.`],
      correction: [
        { h: dr(D(0, 5, 4, { eg: [1, 2, 3, 4, 5] })) + '<p>On écrit les entiers en quarts.</p>', r: 1, v: 'Correction. On écrit les entiers en quarts : un égale quatre quarts, deux égale huit quarts, trois égale douze quarts, quatre égale seize quarts, cinq égale vingt quarts.' },
        { h: dr(D(0, 5, 4, { eg: [1, 2, 3, 4, 5], pts: { A: [5, VT], B: [11, VT], C: [14, VT], D: [17, VT] } })) + `<p>A : 1 graduation après ${F(4, 4)} ; B : de 2, on avance de 3 quarts ; C : 2 graduations après ${F(12, 4)} ; D : de 4, on avance d’un quart.</p>`, r: 1, v: 'A : une graduation après quatre quarts. B : de deux, on avance de trois quarts. C : deux graduations après douze quarts. D : de quatre, on avance d’un quart.' }],
      cc: 'J’ai placé A, B, C et D en partant de l’entier le plus proche.' },

    { type: 'droite', rub: 'exo', titre: 'Exercice 6', ceinture: 'marron',
      enonce: '<p>Seuls 6 et 7 sont écrits. Écris l’abscisse des points G, H et I sous la forme d’une fraction.</p>', v: 'Exercice six. Sur cette demi-droite, seuls six et sept sont écrits. Écris l’abscisse des points G, H et I sous la forme d’une fraction.',
      d: D(5, 3, 5, { show: [6, 7], pts: { G: [3], H: [8], I: [12] } }),
      parts: [{ l: 'G', mode: 'lire', t: 3, rep: [28, 5] }, { l: 'H', mode: 'lire', t: 8, rep: [33, 5] }, { l: 'I', mode: 'lire', t: 12, rep: [37, 5] }],
      indices: ['Écris les autres entiers : avant 6, il y a 5 ; après 7, il y a 8.', 'Combien d’intervalles entre 6 et 7 ?', `Écris 6 en cinquièmes : 6 × 5 = 30, donc <span class="formule">6 = ${F(30, 5)}</span>.`],
      correction: [
        { h: dr(D(5, 3, 5, { pts: { G: [3], H: [8], I: [12] }, inter: 1 })) + '<p>Les entiers 5, 6, 7, 8 ; 5 intervalles : ce sont des cinquièmes.</p>', r: 1, v: 'Correction. Avant six, il y a cinq ; après sept, il y a huit. Entre deux entiers : cinq intervalles.' },
        { h: dr(D(5, 3, 5, { pts: { G: [3], H: [8], I: [12] }, eg: [5, 6, 7, 8] })) + `<p><span class="formule">5 = ${F(25, 5)}</span> ; <span class="formule">6 = ${F(30, 5)}</span> ; <span class="formule">7 = ${F(35, 5)}</span> ; <span class="formule">8 = ${F(40, 5)}</span></p>`, r: 1, v: 'Cinq égale vingt-cinq cinquièmes, six égale trente cinquièmes, sept égale trente-cinq cinquièmes, huit égale quarante cinquièmes.' },
        { h: dr(D(5, 3, 5, { pts: { G: [3, VT], H: [8, VT], I: [12, VT] }, eg: [5, 6, 7, 8], lab: { 3: [28, 5], 8: [33, 5], 12: [37, 5] } })) + `<p>G : 3 graduations après ${F(25, 5)}, G(${F(28, 5)}) ; H : 3 après ${F(30, 5)}, H(${F(33, 5)}) ; I : 2 après ${F(35, 5)}, I(${F(37, 5)}).</p>`, r: 1, v: 'G : vingt-huit cinquièmes. H : trente-trois cinquièmes. I : trente-sept cinquièmes.' }],
      cc: 'Les abscisses sont G vingt-huit cinquièmes, H trente-trois cinquièmes et I trente-sept cinquièmes.' },

    { type: 'droite', rub: 'exo', titre: 'Défi · Trois bonds de quatre tiers', ceinture: 'noire',
      enonce: `<p>a. Place A(${F(4, 3)}), B(${F(8, 3)}) et C(${F(12, 3)}).</p><p>b. Complète.</p>`,
      v: 'Défi. a : place A quatre tiers, B huit tiers et C douze tiers. b : complète. Quatre tiers plus quatre tiers plus quatre tiers égale combien ? Trois fois quatre tiers égale combien ? Douze tiers égale quel nombre entier ?',
      d: D(0, 4, 3, { show: [0, 1] }),
      parts: [{ l: 'a', mode: 'placer', pts: { A: 4, B: 8, C: 12 } },
        { l: 'b', q: `<span class="formule">${F(4, 3)} + ${F(4, 3)} + ${F(4, 3)} =</span>`, mode: 'lire', t: 12, rep: [12, 3], err: [{ si: [12, 9], msg: 'On compte des tiers : 4 tiers + 4 tiers + 4 tiers = 12 tiers. Le dénominateur reste 3.' }] },
        { l: 'c', q: `<span class="formule">3 × ${F(4, 3)} =</span>`, mode: 'lire', t: 12, rep: [12, 3], err: [{ si: [12, 9], msg: 'Trois fois 4 tiers, c’est 12 tiers : le dénominateur reste 3.' }] },
        { l: 'd', q: `<span class="formule">${F(12, 3)} =</span>`, mode: 'nombre', rep: 4, err: [{ v: 12, msg: '12 tiers : 3 tiers font 1, donc 12 tiers font 12 ÷ 3 = 4.' }] }],
      indices: ['De A à B, puis de B à C, on fait le même bond : 4 graduations.', `${F(4, 3)} + ${F(4, 3)} + ${F(4, 3)} : on ajoute les numérateurs, le dénominateur reste 3.`, `${F(12, 3)} : 12 ÷ 3 = ?`],
      correction: [
        { h: dr(D(0, 4, 3, { eg: [1, 2, 3, 4], pts: { A: [4, VT], B: [8, VT], C: [12, VT] }, bonds: [0, 12] })) + '<p>Chaque bond fait 4 graduations : 4 tiers.</p>', r: 1, v: 'Correction. Chaque bond fait quatre graduations, c’est-à-dire quatre tiers.' },
        { h: `<p class="formule">${F(4, 3)} + ${F(4, 3)} + ${F(4, 3)} = ${F(12, 3)}</p><p class="formule">3 × ${F(4, 3)} = ${F(12, 3)}</p><p class="formule">${F(12, 3)} = 4</p>`, v: 'Trois bonds de quatre tiers font douze tiers, et douze tiers égale quatre.' }],
      cc: 'Trois bonds de quatre tiers mènent à douze tiers, c’est-à-dire au nombre 4.' },
  ] };
  if (typeof EXOS !== 'undefined' && EXOS[CID]) EXOS[CID][2] = P2;
})();
