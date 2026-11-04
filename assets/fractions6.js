// 6e · Fractions · Partie 1 : représenter une fraction (leçon, méthode, questions flash, exercice guidé, exercices).
// Figures en SVG. Nouveau type d'exercice « figure » : lire une fraction, cocher, colorier (avec ＋ / − section).
(function () {
  const CID = 'fractions-6e';
  const VERT = '#9DCF78', TR = '#28282D', BORD = '#8B1A3A', HEX = '#FFC078';
  const COUL = { bleu: '#5B9BD5', rouge: '#E8483F', vert: '#70AD47' };
  const F = (n, d) => `<span class="frac"><span>${n}</span><span>${d}</span></span>`;
  const NOM = { bande: 'bande', disque: 'disque', hexa: 'hexagone', grille: 'rectangle' };
  const UN = { bande: 'une bande', disque: 'un disque', hexa: 'un hexagone', grille: 'un rectangle' }, SEUL = { bande: 'une seule bande', disque: 'un seul disque', hexa: 'un seul hexagone', grille: 'un seul rectangle' };
  const LES = { bande: 'Les bandes doivent être partagées', disque: 'Les disques doivent être partagés' };
  if (/c=fractions-6e/.test(location.search) || /fractions6/.test(location.pathname))
    document.head.insertAdjacentHTML('beforeend', `<style>
      .frac span:first-child { color: #0070C0; font-weight: 800; } .frac span:last-child { color: #C00000; font-weight: 800; }
      .f-unites { display: flex; flex-wrap: wrap; gap: 10px; align-items: center; margin: 6px 0; }
      .f-u { display: flex; flex-direction: column; align-items: center; gap: 4px; }
      .f-u svg { max-width: 100%; height: auto; } .f-u.clic path, .f-u.clic rect.p, .f-u.clic circle.p { cursor: pointer; }
      .f-sec { display: flex; gap: 6px; } .f-sec .btn { min-height: 36px; padding: 0 10px; font-size: 14px; }
      .frac-in { display: inline-flex; flex-direction: column; vertical-align: middle; gap: 3px; margin: 0 6px; }
      .frac-in input { width: 3.2em; text-align: center; font-weight: 800; padding: 4px; }
      .frac-in .fn { color: #0070C0; border-bottom: 3px solid #232328; } .frac-in .fd { color: #C00000; }
      .f-msg { margin: 6px 0 0; font-weight: 700; } .question.faux .f-msg { color: #B3261E; } .question.juste .f-msg { color: #1F6F3D; }
      .f-pal { display: flex; gap: 8px; margin: 6px 0; flex-wrap: wrap; } .f-pal .opt { border-width: 3px; }
      .f-pal .opt.choisi { outline: 3px solid #232328; background: #FFF; }
      .f-ligne { display: flex; align-items: center; gap: 10px; margin: 8px 0; } .f-ligne p { margin: 0; } .f-ligne svg { flex-shrink: 0; height: auto; }
      .f-lab { font-size: 1.1em; } .nw { white-space: nowrap; }
      .f-fig { display: flex; flex-wrap: wrap; gap: 10px; align-items: center; margin: 6px 0; }
      .f-lig { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; margin-top: 6px; }
      .formule .frac, .cc .frac, .etape .frac { font-size: 1.05em; }
    </style>`);

  // ---------- figures ----------
  // u = { f: 'bande' | 'disque' | 'hexa' | 'grille', n: nombre de parts, c: couleurs des parts (null = blanc), ineg: découpage inégal, rows, cols, grp }
  const norm = (u) => {
    const v = Object.assign({}, u);
    if (v.f === 'hexa') v.n = 6;
    if (v.f === 'grille') v.n = v.rows * v.cols;
    const c = new Array(v.n).fill(null);
    if (typeof u.c === 'number') for (let i = 0; i < u.c; i++) c[i] = u.col || VERT;
    else if (Array.isArray(u.c)) u.c.forEach((x, i) => { if (typeof x === 'number') c[x] = u.col || VERT; else if (x) c[i] = COUL[x] || x; });
    v.c = c; return v;
  };
  const r1 = (x) => Math.round(x * 10) / 10;
  const svg = (u0, opt = {}) => {
    const u = u0, fill = (i) => u.c[i] || '#FFF';
    const sw = 3; let s = '', W, H;
    if (u.f === 'bande') {
      W = opt.w || 280; H = 56;
      const xs = u.ineg || Array.from({ length: u.n + 1 }, (_, i) => i / u.n);
      for (let i = 0; i < xs.length - 1; i++) s += `<rect class="p" data-p="${i}" x="${r1(4 + xs[i] * (W - 8))}" y="4" width="${r1((xs[i + 1] - xs[i]) * (W - 8))}" height="${H - 8}" fill="${fill(i)}" stroke="${TR}" stroke-width="${sw}"/>`;
      if (u.grp) for (let i = 0; i < u.n; i += u.grp) s += `<rect x="${r1(4 + xs[i] * (W - 8))}" y="3" width="${r1((xs[Math.min(i + u.grp, u.n)] - xs[i]) * (W - 8))}" height="${H - 6}" fill="none" stroke="${BORD}" stroke-width="6"/>`;
    } else if (u.f === 'grille') {
      const cw = 52, ch = 42; W = u.cols * cw + 8; H = u.rows * ch + 8;
      for (let r = 0; r < u.rows; r++) for (let c = 0; c < u.cols; c++) { const k = r * u.cols + c; s += `<rect class="p" data-p="${k}" x="${4 + c * cw}" y="${4 + r * ch}" width="${cw}" height="${ch}" fill="${fill(k)}" stroke="${TR}" stroke-width="${sw}"/>`; }
      if (u.grp === 'col') for (let c = 0; c < u.cols; c++) s += `<rect x="${4 + c * cw}" y="3" width="${cw}" height="${u.rows * ch + 2}" fill="none" stroke="${BORD}" stroke-width="6"/>`;
    } else {
      const R = opt.r || 66, cx = R + 5, cy = R + 5; W = H = 2 * R + 10;
      const k = u.f === 'hexa' ? 6 : u.n;
      const P = (a, r = R) => [r1(cx + r * Math.cos((a - 90) * Math.PI / 180)), r1(cy + r * Math.sin((a - 90) * Math.PI / 180))];
      if (u.f === 'hexa') {
        for (let i = 0; i < 6; i++) { const a = P(60 * i), b = P(60 * (i + 1)); s += `<path class="p" data-p="${i}" d="M${cx} ${cy} L${a[0]} ${a[1]} L${b[0]} ${b[1]} Z" fill="${u.c[i] ? HEX : '#FFF'}" stroke="${TR}" stroke-width="${sw}" stroke-linejoin="round"/>`; }
      } else if (k === 1) s += `<circle class="p" data-p="0" cx="${cx}" cy="${cy}" r="${R}" fill="${fill(0)}" stroke="${TR}" stroke-width="${sw}"/>`;
      else {
        const an = u.ineg || Array.from({ length: k + 1 }, (_, i) => 360 * i / k);
        for (let i = 0; i < an.length - 1; i++) { const a = P(an[i]), b = P(an[i + 1]); s += `<path class="p" data-p="${i}" d="M${cx} ${cy} L${a[0]} ${a[1]} A${R} ${R} 0 ${an[i + 1] - an[i] > 180 ? 1 : 0} 1 ${b[0]} ${b[1]} Z" fill="${fill(i)}" stroke="${TR}" stroke-width="${sw}" stroke-linejoin="round"/>`; }
        s += `<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="${TR}" stroke-width="${sw}"/>`;
      }
    }
    return `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="${NOM[u.f]}">${s}</svg>`;
  };
  const fig = (...us) => `<div class="f-fig">${us.map(u => u.lab ? `<div class="f-u">${svg(norm(u))}<span class="f-lab">${u.lab}</span></div>` : svg(norm(u))).join('')}</div>`;
  // une ligne : la figure en petit, et l'écriture à côté
  const lig = (u, txt, ecr) => `<div class="f-ligne">${svg(norm(u), { w: 100, r: 34 })}<p>${txt}${ecr ? `${txt ? '<br>' : ''}<span class="nw">${ecr}</span>` : ''}</p></div>`;

  // ---------- type d'exercice « figure » ----------
  // parts : { l: 'a', unites: [...], mode: 'lire' | 'cocher' | 'colorier' | 'nombre', rep, ... }
  const TYPES = window.TYPES_EXO = window.TYPES_EXO || {};
  TYPES.figure = {
    carte(it, n) {
      const ctrl = (p, k) => {
        if (p.mode === 'lire') return `<div class="f-lig">${p.lab || ''}<span class="frac-in"><input class="fn" inputmode="numeric" autocomplete="off" aria-label="numérateur"><input class="fd" inputmode="numeric" autocomplete="off" aria-label="dénominateur"></span>
          ${p.lecture ? `<select class="f-lect" aria-label="Écris-la en lettres"><option value="">en lettres…</option>${p.lecture.choix.map(o => `<option>${o}</option>`).join('')}</select>` : ''}</div>`;
        if (p.mode === 'cocher') return `<div class="choix">${['Oui', 'Non'].map(o => `<button class="opt" data-o="${o}">${o}</button>`).join('')}</div>`;
        if (p.mode === 'nombre') return `<div class="f-lig">${p.lab} <input type="text" class="court f-nb" inputmode="numeric" autocomplete="off"></div>`;
        return (p.palette ? `<div class="f-pal">${p.palette.map((c, j) => `<button class="opt${j ? '' : ' choisi'}" data-c="${c}" style="border-color:${COUL[c]};color:${COUL[c]}">● ${c}</button>`).join('')}</div>` : '')
          + (p.ajout ? `<div class="f-sec"><button class="btn f-mu">− ${NOM[p.unites[0].f]}</button><button class="btn f-pu">＋ ${NOM[p.unites[0].f]}</button></div>` : '');
      };
      return `<div class="item" id="ex${n}"><h3 class="exo-titre">${it.titre}${it.ceinture ? ` <span class="ceinture">Ceinture ${it.ceinture}</span>` : ''}</h3>
        <div class="enonce">${btnSon(it.v)}${it.enonce}</div>
        <div class="questions">${it.parts.map((p, k) => `<div class="question fq" data-k="${k}">${p.l ? `<span class="q">${p.l}.</span> ` : ''}${p.q || ''}
          ${p.unites ? `<div class="f-unites"></div>` : ''}${ctrl(p, k)}<p class="f-msg" hidden></p></div>`).join('')}</div>
        <div class="indices"></div>
        <div class="boutons"><button class="btn indice-b">💡 Indice (1/${it.indices.length})</button><button class="btn verif">Vérifier</button></div>
        <div class="verdict" hidden></div>
        <div class="correction" hidden><h3>Correction</h3><div class="pas"></div>
          <p class="pas-cpt"></p><div class="pas-barre"><button class="btn verif pas-suiv">Suite ▶</button><button class="btn son pas-son">🔊 Écouter</button></div>
          <p class="cc" hidden>${it.cc}</p></div></div>`;
    },
    init(S, it) {
      let ni = 0, pi = 0;
      const etat = it.parts.map(p => p.unites ? p.unites.map(u => norm(u)) : null), coul = it.parts.map(p => p.palette ? p.palette[0] : null);
      const dessiner = (k) => {
        const p = it.parts[k], Z = S.querySelector(`.question[data-k="${k}"] .f-unites`); if (!Z) return;
        Z.innerHTML = etat[k].map((u, j) => `<div class="f-u${p.mode === 'colorier' ? ' clic' : ''}" data-u="${j}">${svg(u)}
          ${p.edit ? `<div class="f-sec"><button class="btn f-m" aria-label="Enlever une section">− section</button><button class="btn f-p" aria-label="Ajouter une section">＋ section</button></div>` : ''}</div>`).join('');
        Z.querySelectorAll('.f-u').forEach(D => {
          const j = +D.dataset.u, u = etat[k][j];
          if (p.mode === 'colorier') D.querySelectorAll('.p').forEach(P => P.onclick = () => {
            const i = +P.dataset.p, c = p.palette ? COUL[coul[k]] : VERT; u.c[i] = u.c[i] === c ? null : c; dessiner(k);
          });
          const chg = (d) => { const m = u.n + d; if (m < 1 || m > 12) return; u.n = m; u.c = new Array(m).fill(null); dessiner(k); };
          const bm = D.querySelector('.f-m'), bp = D.querySelector('.f-p');
          if (bm) { bm.onclick = () => chg(-1); bm.disabled = u.n <= 1; bp.onclick = () => chg(1); bp.disabled = u.n >= 12; }
        });
      };
      it.parts.forEach((p, k) => {
        if (p.unites) dessiner(k);
        const Q = S.querySelector(`.question[data-k="${k}"]`);
        Q.querySelectorAll('.choix .opt').forEach(o => o.onclick = () => { Q.querySelectorAll('.choix .opt').forEach(x => x.classList.remove('choisi')); o.classList.add('choisi'); });
        Q.querySelectorAll('.f-pal .opt').forEach(o => o.onclick = () => { Q.querySelectorAll('.f-pal .opt').forEach(x => x.classList.remove('choisi')); o.classList.add('choisi'); coul[k] = o.dataset.c; });
        const mu = Q.querySelector('.f-mu'), pu = Q.querySelector('.f-pu');
        if (mu) {
          const maj = () => { mu.disabled = etat[k].length <= 1; pu.disabled = etat[k].length >= 6; };
          mu.onclick = () => { if (etat[k].length > 1) { etat[k].pop(); dessiner(k); maj(); } };
          pu.onclick = () => { if (etat[k].length < 6) { etat[k].push(norm(Object.assign({}, p.unites[0], { c: 0, n: etat[k][0].n }))); dessiner(k); maj(); } };
          maj();
        }
      });
      // jugement d'une partie : { ok, msg }
      const juge = (p, k) => {
        const Q = S.querySelector(`.question[data-k="${k}"]`), cus = p.err || [];
        if (p.mode === 'lire') {
          const a = parseInt(Q.querySelector('.fn').value, 10), b = parseInt(Q.querySelector('.fd').value, 10);
          if (isNaN(a) || isNaN(b)) return { ok: false, msg: 'Écris le numérateur en haut et le dénominateur en bas.' };
          const reps = Array.isArray(p.rep[0]) ? p.rep : [p.rep];
          let ok = reps.some(r => r[0] === a && r[1] === b), msg = '';
          if (!ok) {
            const c = cus.find(e => e.si && e.si[0] === a && e.si[1] === b); if (c) msg = c.msg;
            else if (p.unites) {
              const U = etat[k], N = U[0].n, K = U.reduce((s, u) => s + u.c.filter(Boolean).length, 0), T = N * U.length, B = T - K;
              if (a === N && b === K) msg = `Tu as inversé : le nombre du bas dit en combien de parts égales l’unité est partagée. Ici, combien de parts dans ${UN[U[0].f]} ?`;
              else if (U.length > 1 && a === K && b === T) msg = `Attention : l’unité, c’est ${SEUL[U[0].f]}. Elle est partagée en combien de parts ?`;
              else if (a === B && b === T) msg = 'Tu as compté les parts blanches. Le numérateur, c’est le nombre de parts coloriées.';
              else if (a === K && b === B) msg = 'Le dénominateur, c’est le nombre total de parts de l’unité, coloriées et blanches.';
              else msg = 'Compte d’abord en combien de parts égales l’unité est partagée : ce nombre va en bas. Puis compte les parts coloriées : ce nombre va en haut.';
            } else msg = 'Relis l’énoncé et réessaie.';
          }
          if (ok && p.lecture) {
            const v = Q.querySelector('.f-lect').value;
            if (v !== p.lecture.rep) { ok = false; msg = (p.lecture.msg || {})[v] || (v ? 'La fraction est juste, mais pas sa lecture. On dit le numérateur, puis le dénominateur avec « -ième » (sauf demi, tiers, quart).' : 'La fraction est juste. Choisis maintenant comment elle se lit.'); }
          }
          return { ok, msg };
        }
        if (p.mode === 'cocher') {
          const o = Q.querySelector('.choix .opt.choisi'); if (!o) return { ok: false, msg: 'Choisis Oui ou Non.' };
          const ok = (o.dataset.o === 'Oui') === p.rep; return { ok, msg: ok ? '' : p.msg };
        }
        if (p.mode === 'nombre') {
          const v = parseInt(Q.querySelector('.f-nb').value, 10), ok = v === p.rep;
          return { ok, msg: ok ? '' : ((cus.find(e => e.v === v) || {}).msg || 'Réessaie.') };
        }
        // colorier
        const U = etat[k], tot = U.reduce((s, u) => s + u.c.filter(Boolean).length, 0);
        if (p.palette) {
          const nb = (c) => U.reduce((s, u) => s + u.c.filter(x => x === COUL[c]).length, 0);
          for (const c of p.palette) {
            const x = nb(c); if (x === p.rep[c]) continue;
            const e = cus.find(e => (e.coul === c || e.coul === '*') && e.n === x);
            return { ok: false, msg: e ? e.msg : `Revois le ${c} : il faut colorier ${p.cible[c]} de la bande.` };
          }
          return { ok: true, msg: '' };
        }
        const [a, b] = p.rep;
        if (p.edit) {
          if (U.some(u => u.n !== U[0].n)) return { ok: false, msg: `${LES[U[0].f]} de la même façon : en ${b} parts égales.` };
          const N = U[0].n;
          if (N !== b) {
            if (N % b === 0 && tot * b === a * N) return { ok: false, msg: `C’est une fraction égale, mais on demande ${F(a, b)} : partage en ${b} parts exactement.` };
            if (N === a && a !== b) return { ok: false, msg: `Le nombre du bas dit en combien de parts on partage. Ici : ${b} parts.` };
            return { ok: false, msg: `Le dénominateur est ${b} : partage chaque ${NOM[U[0].f]} en ${b} parts égales.` };
          }
        }
        const N = U[0].n, ok = p.egale ? tot * b === a * N : tot === a;
        if (ok && p.ajout && U.length > Math.ceil(a / b)) return { ok: false, msg: 'Tu peux faire avec moins : remplis bien chaque disque avant d’en prendre un autre.' };
        if (ok) return { ok: true, msg: '' };
        const e = cus.find(e => e.total === tot); if (e) return { ok: false, msg: e.msg };
        if (p.ajout && U.length * N < a) return { ok: false, msg: `${U.length} disque${U.length > 1 ? 's' : ''}, c’est ${U.length * N} quarts seulement : il manque des quarts.` };
        return { ok: false, msg: `Relis le numérateur : tu dois colorier ${p.egale ? 'la bonne part' : a + ' parts en tout'}. Tu en as colorié ${tot}.` };
      };
      const bi = S.querySelector('.indice-b');
      bi.onclick = () => {
        if (ni >= it.indices.length) return;
        S.querySelector('.indices').insertAdjacentHTML('beforeend', `<div class="indice"><small>Indice ${ni + 1}</small>${it.indices[ni]}</div>`);
        ni++; bi.textContent = ni < it.indices.length ? `💡 Indice (${ni + 1}/${it.indices.length})` : '💡 Plus d’indice'; bi.disabled = ni >= it.indices.length;
      };
      const C = S.querySelector('.correction'), pas = S.querySelector('.pas'), ps = S.querySelector('.pas-suiv');
      const montrer = () => { pas.innerHTML = pasHtml(it.correction, pi); labelSuiv(ps, it.correction, pi); S.querySelector('.cc').hidden = pi < it.correction.length - 1; };
      ps.onclick = () => { if (pi < it.correction.length - 1) { pi++; montrer(); jouer(voixDe(it.correction[pi])); } };
      S.querySelector('.pas-son').onclick = () => jouer(voixDe(it.correction[pi]));
      S.querySelector('.verif').onclick = () => {
        let bons = 0;
        it.parts.forEach((p, k) => {
          const Q = S.querySelector(`.question[data-k="${k}"]`), r = juge(p, k), m = Q.querySelector('.f-msg');
          Q.classList.toggle('juste', r.ok); Q.classList.toggle('faux', !r.ok); if (r.ok) bons++;
          m.hidden = false; m.innerHTML = r.ok ? 'Juste ✓' : r.msg;
        });
        const V = S.querySelector('.verdict'), tout = bons === it.parts.length; V.hidden = false;
        V.className = 'verdict ' + (tout ? 'ok' : 'non');
        V.textContent = tout ? 'Bravo, tout est juste ! Regarde la correction pas à pas.' : `${bons} réponse${bons > 1 ? 's' : ''} juste${bons > 1 ? 's' : ''} sur ${it.parts.length}. Lis le message sous chaque réponse, corrige si tu veux, puis regarde la correction pas à pas.`;
        if (C.hidden) { C.hidden = false; pi = 0; montrer(); jouer(voixDe(it.correction[0])); }
      };
    },
  };

  // ---------- chapitre ----------
  if (typeof CHAPITRES !== 'undefined') Object.assign(CHAPITRES[CID] = CHAPITRES[CID] || {}, {
    niveau: '6e', titre: 'Fractions simples et décimales', resume: 'Partager, mesurer, repérer et comparer avec des fractions',
    lecon: [['A', 'Partager une unité en parts égales'], ['B', 'Numérateur, dénominateur et lecture']],
    videos: [{ titre: 'Représenter une fraction', id: '' }], exercices: [] });

  // ---------- leçon ----------
  const B = (n, c, o) => Object.assign({ f: 'bande', n, c }, o || {}), D = (n, c, o) => Object.assign({ f: 'disque', n, c }, o || {});
  if (typeof LECONS !== 'undefined') LECONS[CID] = {
    A: { titre: 'Partager une unité en parts égales', diapos: [
      { titre: 'Une unité, des parts égales', etapes: [
        { h: fig(B(1, 0)) + '<p>Voici une bande : c’est notre <strong>unité</strong>.</p>', r: 1, v: 'Voici une bande. C’est notre unité.' },
        { h: fig(B(6, 0)) + '<p>On partage l’unité en <strong>6 parts égales</strong>.</p>', r: 1, v: 'On partage cette unité en six parts égales.' },
        { h: fig(B(6, 1)) + `<p>Une part, c’est <strong>un sixième</strong> de l’unité : ${F(1, 6)}</p>`, r: 1, v: 'Une part, c’est un sixième de l’unité.' },
        { h: `<p class="formule grand">6 × ${F(1, 6)} = 1</p>`, v: 'Six sixièmes, c’est l’unité entière : six fois un sixième égale un.' }] },
      { titre: 'Des tiers', etapes: [
        { h: lig(D(3, 0), 'Un disque partagé en <strong>3 parts égales</strong>.'), v: 'Ce disque est partagé en trois parts égales.' },
        { h: lig(D(3, 1), 'Une part sur trois :', `${F(1, 3)} <strong>un tiers</strong>`), v: 'Une part sur trois : un tiers.' },
        { h: lig(D(3, 2), 'Deux parts sur trois :', `${F(2, 3)} <strong>deux tiers</strong>`), v: 'Deux parts sur trois : deux tiers.' }] },
      { titre: 'Attention : des parts égales', alerte: true, etapes: [
        { h: fig(D(4, [null, VERT], { ineg: [0, 60, 150, 260, 360] })) + '<p>Ce disque est partagé en 4 parts.</p>', v: 'Ce disque est partagé en quatre parts.' },
        { h: `<p class="barre">La part colorée représente ${F(1, 4)}</p><p>Faux : les parts ne sont pas égales.</p>`, v: 'Mais les parts ne sont pas égales : la part colorée n’est pas un quart.' },
        { h: '<p class="cc">Pour écrire une fraction, les parts doivent être égales.</p>', v: 'Pour écrire une fraction, les parts doivent toujours être égales.' }] }] },
    B: { titre: 'Numérateur, dénominateur et lecture', diapos: [
      { titre: 'Le vocabulaire', cadre: true, etapes: [
        { h: `<p class="formule grand">${F(3, 5)}</p>`, v: 'Voici la fraction trois cinquièmes.' },
        { h: '<p class="puce"><span style="color:#0070C0;font-weight:800">3</span> : le <strong>numérateur</strong>, le nombre de parts prises ;</p>', v: 'Le nombre du haut s’appelle le numérateur : c’est le nombre de parts que l’on prend.' },
        { h: '<p class="puce"><span style="color:#C00000;font-weight:800">5</span> : le <strong>dénominateur</strong>, le nombre de parts égales dans l’unité.</p>', v: 'Le nombre du bas s’appelle le dénominateur : c’est en combien de parts égales on a partagé l’unité.' },
        { h: '<p>Le mot <strong>fraction</strong> vient du latin <em>fractio</em> : « casser en morceaux ».</p>', v: 'Le mot fraction vient du latin : il veut dire casser en morceaux.' }] },
      { titre: 'Lire une fraction : le cas général', cadre: true, etapes: [
        { h: '<p>On dit le <strong>numérateur</strong>, puis le <strong>dénominateur</strong> suivi de <strong class="nw">« -ième »</strong>.</p>', v: 'Pour lire une fraction, on dit le numérateur, puis le dénominateur, suivi de ième.' },
        { h: lig(B(5, 3), '', `${F(3, 5)} trois cinquièmes`), v: 'Trois parts coloriées sur cinq : trois cinquièmes.' },
        { h: lig(D(8, 5), '', `${F(5, 8)} cinq huitièmes`), v: 'Cinq parts coloriées sur huit : cinq huitièmes.' },
        { h: lig(B(10, 7), '', `${F(7, 10)} sept dixièmes`), v: 'Sept parts coloriées sur dix : sept dixièmes.' }] },
      { titre: 'Les exceptions : 2, 3 et 4', alerte: true, etapes: [
        { h: '<p>Quand le dénominateur est <strong>2</strong>, <strong>3</strong> ou <strong>4</strong>, on ne dit pas « -ième ».</p>', v: 'Attention, il y a trois exceptions : quand le dénominateur est deux, trois ou quatre, on ne dit pas ième.' },
        { h: lig(D(2, 1), '', `${F(1, 2)} un demi`), v: 'Une part sur deux : un demi.' },
        { h: lig(D(3, 1), '', `${F(1, 3)} un tiers`), v: 'Une part sur trois : un tiers.' },
        { h: lig(D(4, 1), '', `${F(1, 4)} un quart`), v: 'Une part sur quatre : un quart.' }] }] },
  };

  // ---------- exercices de la partie 1 ----------
  const H = { f: 'hexa' }, G = (rows, cols, c, o) => Object.assign({ f: 'grille', rows, cols, c }, o || {});
  const lire = (l, unites, rep, o) => Object.assign({ l, unites, mode: 'lire', rep }, o || {});
  const col = (l, unites, rep, o) => Object.assign({ l, unites, mode: 'colorier', rep }, o || {});
  const P1 = {
    titre: 'Représenter une fraction',
    items: [
      { type: 'lecon', rub: 'lecon', parties: ['A', 'B'] },
      { type: 'methode', rub: 'methode', titre: 'Représenter une fraction',
        resume: `<ol class="meth"><li>Je lis le <strong>dénominateur</strong> : il dit en combien de <strong>parts égales</strong> je partage l’unité.</li><li>Je lis le <strong>numérateur</strong> : il dit combien de parts je <strong>colorie</strong>.</li><li>Si le numérateur est plus grand que le dénominateur, je prends <strong>une autre unité</strong>, partagée de la même façon.</li></ol><p><strong>Exemple :</strong> représenter ${F(3, 4)}.</p>`,
        etapes: [
          { h: fig(B(1, 0)), r: 1, v: 'Méthode. Pour représenter trois quarts, on part d’une bande : c’est l’unité.' },
          { h: fig(B(4, 0)) + '<p>Dénominateur 4 : je partage en 4 parts égales.</p>', r: 1, v: 'Le dénominateur est quatre : je partage la bande en quatre parts égales.' },
          { h: fig(B(4, 3)) + '<p>Numérateur 3 : je colorie 3 parts.</p>', r: 1, v: 'Le numérateur est trois : je colorie trois parts.' },
          { h: fig(B(4, 4), B(4, 1)) + `<p>Et pour ${F(5, 4)} ? Une bande entière (4 parts) et encore 1 part dans une deuxième bande.</p>`, r: 1, v: 'Et pour cinq quarts ? Une bande ne suffit pas : je colorie une bande entière, puis une part d’une deuxième bande, partagée de la même façon.' }],
        cc: 'J’ai partagé l’unité en 4 parts égales et j’en ai colorié 3 : j’ai représenté trois quarts.' },
      { type: 'flash', rub: 'flash', titre: 'Questions flash', consigne: 'Vrai ou faux ? Tu as 10 secondes par question.', duree: 10, questions: [
        { q: `Une pizza est partagée en 8 parts égales. Une part représente ${F(1, 8)} de la pizza.`, rep: true, expl: 'l’unité est partagée en 8 parts égales : une part, c’est un huitième.', v: 'Une pizza est partagée en huit parts égales. Une part représente un huitième de la pizza. Vrai, ou faux ?' },
        { q: `${F(4, 9)} se lit « quatre neuvièmes ».`, rep: true, expl: 'on dit le numérateur, puis le dénominateur avec « -ième ».', v: 'Quatre sur neuf se lit : quatre neuvièmes. Vrai, ou faux ?' },
        { q: `Dans ${F(5, 7)}, le dénominateur est 5.`, rep: false, expl: 'le dénominateur est le nombre du bas : 7.', v: 'Dans cinq septièmes, le dénominateur est cinq. Vrai, ou faux ?' },
        { q: 'Il faut 3 quarts pour faire une unité.', rep: false, expl: `il faut 4 quarts : <span class="formule">${F(4, 4)} = 1</span>.`, v: 'Il faut trois quarts pour faire une unité. Vrai, ou faux ?' },
        { q: `Une tablette a 12 carrés égaux. Tom en mange 5 : il a mangé ${F(5, 12)} de la tablette.`, rep: true, expl: '5 carrés pris sur 12 carrés égaux.', v: 'Une tablette a douze carrés égaux. Tom en mange cinq : il a mangé cinq douzièmes de la tablette. Vrai, ou faux ?' },
        { q: `Un disque est coupé en 3 morceaux de tailles différentes. Un morceau représente ${F(1, 3)} du disque.`, rep: false, expl: 'les parts doivent être égales.', v: 'Un disque est coupé en trois morceaux de tailles différentes. Un morceau représente un tiers du disque. Vrai, ou faux ?' }] },
      { type: 'guide', rub: 'guide', titre: 'Représenter cinq quarts',
        enonce: `<p>Représente ${F(5, 4)} en coloriant des disques.</p>`, v: 'Exercice guidé. Représente cinq quarts en coloriant des disques.',
        vis: [fig(D(1, 0), D(1, 0)), fig(D(4, 0), D(4, 0)), fig(D(4, 4), D(4, 0)), fig(D(4, 4), D(4, 1))],
        etapes: [
          { q: `Quel est le dénominateur de ${F(5, 4)} ?`, rep: ['4'], k: 0, aide: 'C’est le nombre du bas.' },
          { q: 'En combien de parts égales partages-tu chaque disque ?', rep: ['4'], k: 1, aide: 'Le dénominateur te dit en combien de parts égales tu partages.' },
          { q: 'Combien de parts dois-tu colorier en tout ?', rep: ['5'], k: 1, aide: 'C’est le numérateur, le nombre du haut.' },
          { q: 'Combien de parts colories-tu dans le premier disque ?', rep: ['4'], k: 2, aide: 'Un disque contient 4 parts : tu peux toutes les colorier.' },
          { q: 'Combien de parts reste-t-il à colorier dans le deuxième disque ?', rep: ['1'], k: 3, aide: 'Calcule 5 − 4.' }],
        fin: '<p class="cc">Un disque entier et encore une part : cinq quarts.</p>',
        cc: 'J’ai partagé chaque disque en 4 parts égales et j’ai colorié 5 parts : un disque entier et encore une part. J’ai représenté cinq quarts.' },

      { type: 'figure', rub: 'exo', titre: 'Exercice 1', ceinture: 'blanche',
        enonce: '<p>Quelle fraction de la figure est coloriée ? Écris-la.</p><p>Pour la figure d, l’unité est <strong>une bande</strong>.</p>',
        v: 'Exercice un. Pour chaque figure, écris la fraction coloriée. Pour la figure d, l’unité est une bande.',
        parts: [lire('a', [B(8, 3)], [3, 8]), lire('b', [D(6, 5)], [5, 6]), lire('c', [Object.assign({}, H, { c: 2 })], [[2, 6], [1, 3]]), lire('d', [B(4, 4), B(4, 2)], [[6, 4], [3, 2]])],
        indices: ['Compte d’abord en combien de parts égales l’unité est partagée.', 'Ce nombre va en bas : c’est le dénominateur.', 'Compte maintenant les parts coloriées et écris ce nombre en haut.'],
        correction: [
          { h: fig(B(8, 3)) + `<p>a. 8 parts égales, 3 coloriées : ${F(3, 8)}</p>`, v: 'Correction. a : huit parts égales, trois coloriées : trois huitièmes.' },
          { h: fig(D(6, 5)) + `<p>b. 6 parts égales, 5 coloriées : ${F(5, 6)}</p>`, v: 'b : six parts égales, cinq coloriées : cinq sixièmes.' },
          { h: fig(Object.assign({}, H, { c: 2 })) + `<p>c. 6 parts égales, 2 coloriées : ${F(2, 6)}</p>`, v: 'c : six parts égales, deux coloriées : deux sixièmes.' },
          { h: fig(B(4, 4), B(4, 2)) + `<p>d. Une bande = 4 parts. 4 + 2 = 6 parts coloriées : ${F(6, 4)}</p>`, v: 'd : une bande est partagée en quatre. On colorie quatre plus deux, six parts : six quarts. C’est plus d’une unité.' }],
        cc: 'La fraction coloriée est a. trois huitièmes, b. cinq sixièmes, c. deux sixièmes, d. six quarts.' },

      { type: 'figure', rub: 'exo', titre: 'Exercice 2', ceinture: 'jaune',
        enonce: `<p>Dans quelles figures a-t-on colorié ${F(2, 3)} de la figure ? Réponds Oui ou Non sous chaque figure.</p>`,
        v: 'Exercice deux. Dans quelles figures a-t-on colorié deux tiers de la figure ? Réponds oui ou non sous chaque figure.',
        parts: [
          { l: 'a', unites: [B(3, 2)], mode: 'cocher', rep: true, msg: 'Les 3 parts sont égales et 2 sont coloriées : c’est bien deux tiers.' },
          { l: 'b', unites: [D(3, 2, { ineg: [0, 90, 160, 360] })], mode: 'cocher', rep: false, msg: 'Regarde bien les tailles des parts : sont-elles égales ? Sinon, on ne peut pas parler de tiers.' },
          { l: 'c', unites: [G(2, 3, [0, 1, 3, 4])], mode: 'cocher', rep: true, msg: 'Regroupe les cases deux par deux (par colonne) : combien de grandes parts ? Combien sont coloriées ?' },
          { l: 'd', unites: [Object.assign({}, H, { c: 3 })], mode: 'cocher', rep: false, msg: 'L’hexagone est partagé en 6 parts égales. 3 parts sur 6, est-ce 2 parts sur 3 ?' }],
        indices: ['Regarde d’abord si les parts sont égales.', 'Compte les parts en tout et les parts coloriées.', 'Pour la figure c, essaie de regrouper les cases par colonnes de 2.'],
        correction: [
          { h: fig(B(3, 2)) + `<p>a. 3 parts égales, 2 coloriées : ${F(2, 3)} ✔</p>`, v: 'Correction. a : trois parts égales, deux coloriées : deux tiers. Oui.' },
          { h: fig(D(3, 2, { ineg: [0, 90, 160, 360] })) + '<p>b. Les parts n’ont pas la même taille ✘</p>', v: 'b : les parts ne sont pas égales : ce n’est pas deux tiers. Non.' },
          { h: fig(G(2, 3, [0, 1, 3, 4], { grp: 'col' })) + `<p>c. 3 colonnes égales, 2 coloriées : <span class="formule">${F(4, 6)} = ${F(2, 3)}</span> ✔</p>`, v: 'c : en regroupant les cases par colonnes, on obtient trois parts égales, dont deux coloriées. Quatre sixièmes égale deux tiers. Oui.' },
          { h: fig(Object.assign({}, H, { c: 3 })) + `<p>d. 6 parts égales, 3 coloriées : ${F(3, 6)}, c’est la moitié ✘</p>`, v: 'd : trois sixièmes, c’est la moitié, pas deux tiers. Non.' }],
        cc: 'On a colorié deux tiers dans les figures a et c.' },

      { type: 'figure', rub: 'exo', titre: 'Exercice 3', ceinture: 'orange',
        enonce: '<p>Écris la fraction coloriée, puis choisis comment elle se lit.</p><p>Pour la figure c, l’unité est <strong>un disque</strong>.</p>',
        v: 'Exercice trois. Écris la fraction coloriée, puis choisis comment elle se lit. Pour la figure c, l’unité est un disque.',
        parts: [
          lire('a', [B(10, 4)], [4, 10], { lecture: { choix: ['quatre dixième', 'quatre dixièmes', 'dix quarts'], rep: 'quatre dixièmes', msg: { 'quatre dixième': 'Il y a plusieurs parts : on écrit « dixièmes » avec un s.' } } }),
          lire('b', [D(8, 6)], [6, 8], { lecture: { choix: ['huit sixièmes', 'six huitième', 'six huitièmes'], rep: 'six huitièmes', msg: { 'six huitième': 'Il y a plusieurs parts : on écrit « huitièmes » avec un s.' } } }),
          lire('c', [D(3, 3), D(3, 1)], [4, 3], { lecture: { choix: ['quatre troisièmes', 'quatre tiers', 'trois quarts'], rep: 'quatre tiers', msg: { 'quatre troisièmes': 'Pour 3, on ne dit pas « troisièmes » : on dit « tiers ».' } } })],
        indices: ['Compte les parts égales d’une unité : c’est le dénominateur.', 'Compte les parts coloriées : c’est le numérateur.', 'Pour lire, on dit le numérateur, puis le dénominateur avec « -ième », sauf demi, tiers et quart.'],
        correction: [
          { h: fig(B(10, 4)) + `<p>a. 10 parts égales, 4 coloriées : ${F(4, 10)} quatre dixièmes</p>`, v: 'Correction. a : dix parts égales, quatre coloriées : quatre dixièmes.' },
          { h: fig(D(8, 6)) + `<p>b. 8 parts égales, 6 coloriées : ${F(6, 8)} six huitièmes</p>`, v: 'b : huit parts égales, six coloriées : six huitièmes.' },
          { h: fig(D(3, 3), D(3, 1)) + `<p>c. Un disque = 3 parts. 3 + 1 = 4 parts coloriées : ${F(4, 3)} quatre tiers</p>`, v: 'c : un disque est partagé en trois. On colorie trois plus une, quatre parts : quatre tiers. Un disque entier et encore un tiers.' }],
        cc: 'La figure a représente quatre dixièmes, la figure b six huitièmes et la figure c quatre tiers.' },

      { type: 'figure', rub: 'exo', titre: 'Exercice 4', ceinture: 'verte',
        enonce: '<p>Clique sur les parts pour les colorier (clique encore pour effacer).</p>',
        v: 'Exercice quatre. Colorie trois cinquièmes de la bande a, sept huitièmes du rectangle b, cinq tiers pour la figure c, où l’unité est une bande, et un demi de la bande d.',
        parts: [
          col('a', [B(5, 0)], [3, 5], { q: `Colorie ${F(3, 5)} de la bande.` }),
          col('b', [G(2, 4, 0)], [7, 8], { q: `Colorie ${F(7, 8)} du rectangle.` }),
          col('c', [B(3, 0), B(3, 0)], [5, 3], { q: `Colorie ${F(5, 3)}. L’unité est une bande.`, err: [{ total: 3, msg: `${F(5, 3)}, c’est plus que 3 tiers : une bande ne suffit pas, continue sur la deuxième.` }] }),
          col('d', [B(6, 0)], [1, 2], { q: `Colorie ${F(1, 2)} de la bande.`, egale: true, err: [
            { total: 1, msg: 'La bande est partagée en 6 parts. Un demi, c’est la moitié de la bande : combien de parts ?' },
            { total: 2, msg: 'La moitié de 6 parts, ce n’est pas 2 parts. Essaie de couper la bande en deux morceaux égaux.' }] })],
        indices: ['Le numérateur te dit combien de parts colorier.', 'Pour la figure c, une bande, c’est 3 tiers : combien de tiers te manque-t-il ?', 'Pour la figure d, la bande a 6 parts : la moitié de 6 parts, c’est combien de parts ?'],
        correction: [
          { h: fig(B(5, 3)) + `<p>a. 3 parts sur 5 : ${F(3, 5)}</p>`, v: 'Correction. a : trois parts sur cinq : trois cinquièmes.' },
          { h: fig(G(2, 4, 7)) + `<p>b. 7 cases sur 8 : ${F(7, 8)}</p>`, v: 'b : sept cases sur huit : sept huitièmes.' },
          { h: fig(B(3, 3), B(3, 2)) + `<p>c. Une bande entière (3 tiers) et encore 2 tiers : ${F(5, 3)}</p>`, v: 'c : une bande entière, c’est trois tiers. Il faut encore deux tiers.' },
          { h: fig(B(6, 3, { grp: 3 })) + `<p>d. 3 parts sur 6, regroupées en bordeaux : <span class="formule">${F(3, 6)} = ${F(1, 2)}</span></p>`, v: 'd : trois sixièmes, c’est la moitié de la bande : un demi.' }],
        cc: 'J’ai colorié trois cinquièmes, sept huitièmes, cinq tiers et un demi.' },

      { type: 'figure', rub: 'exo', titre: 'Exercice 5', ceinture: 'bleue',
        enonce: '<p>Partage chaque figure avec les boutons <strong>＋ section</strong> et <strong>− section</strong>, puis clique sur les parts pour les colorier.</p>',
        v: 'Exercice cinq. Partage chaque figure en parts égales, puis colorie un quart de la bande, trois cinquièmes du disque, cinq tiers, puis sept quarts. Pour c et d, l’unité est un disque.',
        parts: [
          col('a', [B(1, 0)], [1, 4], { edit: true, q: `Colorie ${F(1, 4)} de la bande.` }),
          col('b', [D(1, 0)], [3, 5], { edit: true, q: `Colorie ${F(3, 5)} du disque.` }),
          col('c', [D(1, 0), D(1, 0)], [5, 3], { edit: true, q: `Colorie ${F(5, 3)}. L’unité est un disque.` }),
          col('d', [D(1, 0), D(1, 0)], [7, 4], { edit: true, q: `Colorie ${F(7, 4)}. L’unité est un disque.` })],
        indices: ['En combien de parts égales dois-tu partager chaque unité ?', 'C’est le dénominateur : utilise ＋ section jusqu’à ce nombre.', 'Colorie autant de parts que le numérateur ; si une unité est pleine, continue sur la suivante.'],
        correction: [
          { h: fig(B(4, 1)) + `<p>a. Bande en 4 parts, 1 coloriée : ${F(1, 4)}</p>`, v: 'Correction. a : un quart, une part sur quatre.' },
          { h: fig(D(5, 3)) + `<p>b. Disque en 5 parts, 3 coloriées : ${F(3, 5)}</p>`, v: 'b : trois cinquièmes.' },
          { h: fig(D(3, 3), D(3, 2)) + `<p>c. 2 disques en 3 parts : 3 + 2 = 5 tiers, ${F(5, 3)}</p>`, v: 'c : un disque entier, c’est trois tiers, plus deux tiers.' },
          { h: fig(D(4, 4), D(4, 3)) + `<p>d. 2 disques en 4 parts : 4 + 3 = 7 quarts, ${F(7, 4)}</p>`, v: 'd : un disque entier, c’est quatre quarts, plus trois quarts.' }],
        cc: 'J’ai partagé chaque unité en parts égales selon le dénominateur et colorié autant de parts que le numérateur.' },

      { type: 'figure', rub: 'exo', titre: 'Exercice 6', ceinture: 'marron',
        enonce: `<p>La bande est partagée en <strong>12 cases égales</strong>. Choisis une couleur, puis clique sur les cases.</p><p>Colorie ${F(1, 2)} de la bande en bleu, ${F(1, 4)} en rouge et ${F(1, 6)} en vert.</p>`,
        v: 'Exercice six. La bande est partagée en douze cases égales. Colorie un demi de la bande en bleu, un quart en rouge et un sixième en vert. Quelle fraction de la bande reste blanche ?',
        parts: [
          { l: 'a', unites: [B(12, 0)], mode: 'colorier', palette: ['bleu', 'rouge', 'vert'], rep: { bleu: 6, rouge: 3, vert: 2 }, cible: { bleu: 'un demi', rouge: 'un quart', vert: 'un sixième' }, err: [
            { coul: '*', n: 1, msg: 'La bande n’est pas partagée en 2 : elle a 12 cases. La moitié de 12 cases, c’est combien ?' },
            { coul: 'rouge', n: 4, msg: 'Un quart, ce n’est pas 4 cases : partage les 12 cases en 4 groupes égaux.' },
            { coul: 'vert', n: 6, msg: 'Un sixième, c’est 12 cases en 6 groupes égaux : combien de cases dans un groupe ?' }] },
          { l: 'b', q: 'Quelle fraction de la bande reste blanche ?', mode: 'lire', rep: [1, 12], err: [{ si: [1, 1], msg: 'Il reste 1 case sur les 12 cases de la bande : écris-le en fraction.' }] }],
        indices: ['La moitié de 12 cases, c’est combien de cases ?', 'Pour un quart, partage les 12 cases en 4 groupes égaux : combien de cases par groupe ?', 'Pour un sixième : 12 cases en 6 groupes égaux.'],
        correction: [
          { h: fig(B(12, [...Array(6).fill('bleu')], { grp: 6 })) + `<p>Bleu : 12 cases en 2 groupes de 6, donc 6 cases : <span class="formule">${F(6, 12)} = ${F(1, 2)}</span></p>`, r: 1, v: 'Correction. Un demi de douze cases, c’est six cases.' },
          { h: fig(B(12, [...Array(6).fill('bleu'), ...Array(3).fill('rouge')], { grp: 3 })) + `<p>Rouge : 12 cases en 4 groupes de 3, donc 3 cases : <span class="formule">${F(3, 12)} = ${F(1, 4)}</span></p>`, r: 1, v: 'Un quart de douze cases, c’est trois cases.' },
          { h: fig(B(12, [...Array(6).fill('bleu'), ...Array(3).fill('rouge'), 'vert', 'vert'], { grp: 2 })) + `<p>Vert : 12 cases en 6 groupes de 2, donc 2 cases : <span class="formule">${F(2, 12)} = ${F(1, 6)}</span></p>`, r: 1, v: 'Un sixième de douze cases, c’est deux cases.' },
          { h: `<p>6 + 3 + 2 = 11 cases coloriées. Il reste 1 case : ${F(1, 12)}</p>`, v: 'Onze cases coloriées : il reste une case blanche, un douzième.' }],
        cc: 'Il reste un douzième de la bande en blanc.' },

      { type: 'figure', rub: 'exo', titre: 'Défi · le moins de disques possible', ceinture: 'noire',
        enonce: `<p>Sami veut représenter ${F(11, 4)} avec <strong>le moins de disques possible</strong>.</p><p>Ajoute des disques, partage-les, colorie, puis écris combien il en faut.</p>`,
        v: 'Défi. Sami veut représenter onze quarts avec le moins de disques possible. Combien de disques lui faut-il ? Représente-le.',
        parts: [
          { l: 'a', unites: [D(1, 0)], mode: 'colorier', edit: true, ajout: true, rep: [11, 4], q: `Représente ${F(11, 4)}.` },
          { l: 'b', mode: 'nombre', lab: 'Nombre de disques :', rep: 3, err: [
            { v: 11, msg: 'Un disque entier contient 4 quarts : tu peux en colorier plusieurs dans le même disque.' },
            { v: 2, msg: 'Deux disques, c’est 8 quarts seulement : il manque des quarts.' },
            { v: 4, msg: 'Tu peux faire avec moins : remplis bien chaque disque avant d’en prendre un autre.' }] }],
        indices: ['Combien de quarts y a-t-il dans un disque entier ?', 'Combien de disques entiers peux-tu remplir avec 11 quarts ?', '8 quarts remplissent 2 disques : où vont les 3 quarts qui restent ?'],
        correction: [
          { r: 1, h: fig(D(4, 4)) + `<p>Un disque = <span class="formule">${F(4, 4)} = 1</span></p>`, v: 'Correction. Un disque contient quatre quarts.' },
          { h: fig(D(4, 4, { lab: F(4, 4) }), D(4, 4, { lab: F(4, 4) })) + '<p>2 disques pleins = 8 quarts. 11 − 8 = 3 quarts</p>', r: 1, v: 'Deux disques pleins donnent huit quarts ; il en reste trois.' },
          { h: fig(D(4, 4, { lab: F(4, 4) }), D(4, 4, { lab: F(4, 4) }), D(4, 3, { lab: F(3, 4) })) + `<p>2 disques pleins et 3 quarts du troisième disque :</p><p class="formule">${F(4, 4)} + ${F(4, 4)} + ${F(3, 4)} = ${F(11, 4)}</p>`, r: 1, v: 'Deux disques pleins, quatre quarts plus quatre quarts, et trois quarts du troisième disque : en tout, onze quarts. Il faut trois disques.' }],
        cc: 'Il faut 3 disques à Sami pour représenter onze quarts.' },
    ],
  };
  if (typeof EXOS !== 'undefined') EXOS[CID] = { 1: P1 };
})();
