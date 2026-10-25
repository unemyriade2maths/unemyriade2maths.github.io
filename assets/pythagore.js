// 3e · Pythagore et racine carrée : chapitre, leçon (d'après mon cours), exercices, QCM et DS.
// Les figures sont dessinées en SVG à partir des vraies longueurs.
(function () {
  // ---------- figures ----------
  const COUL = { trait: '#232328', hyp: '#F08A24', droit: '#1F6F3D', lab: '#1F4FA0', inc: '#C76A0E' };
  const memeSeg = (s, t) => s === t || s === t[1] + t[0];
  // o.P : points (y vers le haut) · o.seg : segments · o.droit : [[sommet, voisin1, voisin2]] · o.lab : longueurs affichées
  // o.hyp : segments en orange · o.pts : noms à écrire (par défaut tous)
  const fig = (o) => {
    const ks = Object.keys(o.P), X = ks.map(k => o.P[k][0]), Y = ks.map(k => o.P[k][1]);
    const x0 = Math.min(...X), x1 = Math.max(...X), y0 = Math.min(...Y), y1 = Math.max(...Y);
    const W = o.w || 210, H = o.h || 130, pad = 30, padx = 62;
    const s = Math.min(W / ((x1 - x0) || 1), H / ((y1 - y0) || 1));
    const T = (k) => [padx + (o.P[k][0] - x0) * s, pad + (y1 - o.P[k][1]) * s];
    const larg = (x1 - x0) * s + 2 * padx, haut = (y1 - y0) * s + 2 * pad;
    const cx = ks.reduce((a, k) => a + T(k)[0], 0) / ks.length, cy = ks.reduce((a, k) => a + T(k)[1], 0) / ks.length;
    const unit = (x, y) => { const n = Math.hypot(x, y) || 1; return [x / n, y / n]; };
    const f = (n) => Math.round(n * 10) / 10;
    let svg = '';
    (o.seg || []).forEach(sg => {
      const [a, b] = [T(sg[0]), T(sg[1])], h = (o.hyp || []).some(t => memeSeg(sg, t));
      svg += `<line x1="${f(a[0])}" y1="${f(a[1])}" x2="${f(b[0])}" y2="${f(b[1])}" stroke="${h ? COUL.hyp : COUL.trait}" stroke-width="${h ? 4.5 : 2.2}" stroke-linecap="round"/>`;
    });
    (o.droit || []).forEach(([v, a, b]) => {
      const V = T(v), u = unit(T(a)[0] - V[0], T(a)[1] - V[1]), w = unit(T(b)[0] - V[0], T(b)[1] - V[1]), q = 12;
      svg += `<path d="M${f(V[0] + u[0] * q)} ${f(V[1] + u[1] * q)} L${f(V[0] + u[0] * q + w[0] * q)} ${f(V[1] + u[1] * q + w[1] * q)} L${f(V[0] + w[0] * q)} ${f(V[1] + w[1] * q)}" fill="none" stroke="${COUL.droit}" stroke-width="2.2"/>`;
    });
    Object.entries(o.lab || {}).forEach(([sg, txt]) => {
      const [a, b] = [T(sg[0]), T(sg[1])], m = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
      let n = unit(-(b[1] - a[1]), b[0] - a[0]);
      if ((m[0] - cx) * n[0] + (m[1] - cy) * n[1] < 0) n = [-n[0], -n[1]];
      const anc = n[0] > 0.35 ? 'start' : (n[0] < -0.35 ? 'end' : 'middle'), d = anc === 'middle' ? 15 : 9;
      svg += `<text x="${f(m[0] + n[0] * d)}" y="${f(m[1] + n[1] * d)}" text-anchor="${anc}" dominant-baseline="middle" font-size="15" font-weight="700" fill="${txt === '?' ? COUL.inc : COUL.lab}">${txt}</text>`;
    });
    (o.pts || ks).forEach(k => {
      const p = T(k), d = unit(p[0] - cx, p[1] - cy);
      svg += `<text x="${f(p[0] + d[0] * 16)}" y="${f(p[1] + d[1] * 16)}" text-anchor="middle" dominant-baseline="middle" font-size="17" font-weight="800" fill="${COUL.trait}">${k}</text>`;
    });
    return `<svg class="fig" viewBox="0 0 ${f(larg)} ${f(haut)}" width="${f(larg)}" role="img" aria-label="${o.alt || 'Figure'}">${o.extra ? o.extra(T, s) : ''}${svg}</svg>`;
  };
  // triangle n = 'ABC' de longueurs AB, AC, BC (pour la forme) ; o.droit = 'A' code l'angle droit en A
  const tri = (n, [c, b, a], o = {}) => {
    const [p, q, r] = n, x = (b * b + c * c - a * a) / (2 * c), y = Math.sqrt(Math.max(0, b * b - x * x));
    const P = { [p]: [0, 0], [q]: [c, 0], [r]: [x, y] };
    const vois = { [p]: [q, r], [q]: [p, r], [r]: [p, q] };
    return fig(Object.assign({}, o, { P, seg: [p + q, q + r, r + p], droit: o.droit ? [[o.droit, ...vois[o.droit]]] : [] }));
  };
  // une ligne de rédaction : à gauche ce qu'on écrit, à droite pourquoi
  const R = (l, p) => `<div class="redac"><span class="l">${l}</span>${p ? `<span class="p">← ${p}</span>` : ''}</div>`;
  const Rs = (L) => L.map(([l, p]) => R(l, p)).join('');
  // les écritures acceptées pour une égalité de Pythagore
  // l'égalité attendue commence par l'hypoténuse ; l'ordre des lettres et des deux carrés de droite est libre (voir canon)
  const eg = (h, a, b) => [`${h}²=${a}²+${b}²`];
  const seg = (s) => [s, '[' + s + ']', s[1] + s[0], '[' + s[1] + s[0] + ']'];
  const T2 = ['²', '=', '+'];
  // exercice guidé : à chaque bonne réponse, la figure se code et la rédaction s'écrit ligne par ligne
  const pasVis = (figK, lignes, nb) => nb.map((n, k) => figK(k) + Rs(lignes.slice(0, n)));
  // ma méthode : 1) le triangle est rectangle, 2) son hypoténuse, 3) les conditions sont réunies, 4) on applique le théorème
  const CONDL = ['Les conditions sont réunies pour appliquer le théorème de Pythagore.', 'le triangle est rectangle et son hypoténuse est repérée'];
  const COND = R(...CONDL);
  const CHOIX = { q: 'Peut-on appliquer le théorème de Pythagore ?', choix: ['Oui, car le triangle est rectangle', 'Oui, car on connaît deux longueurs', 'Non'], rep: ['Oui, car le triangle est rectangle'], aide: 'Le théorème de Pythagore s’applique seulement dans un triangle rectangle.' };
  const FIN = '<p class="g-fin">✓ La rédaction est complète : recopie-la dans ton cahier.</p>';

  CHAPITRES['3e-3'] = {
    niveau: '3e', titre: 'Pythagore et racine carrée', resume: 'Racine carrée, théorème de Pythagore et sa réciproque',
    lecon: [['A', 'Racine carrée d’un nombre'], ['B', 'Calculer avec les racines carrées'], ['C', 'Le théorème de Pythagore'], ['D', 'Calculer l’hypoténuse'],
      ['E', 'Calculer un côté de l’angle droit'], ['F', 'Démontrer qu’un triangle est rectangle'], ['G', 'Démontrer qu’un triangle n’est pas rectangle'], ['H', 'Les erreurs fréquentes']],
    videos: [
      { titre: 'La racine carrée d’un nombre', id: '' },
      { titre: 'L’égalité de Pythagore', id: '' },
      { titre: 'Calculer la longueur de l’hypoténuse', id: '' },
      { titre: 'Calculer un côté de l’angle droit', id: '' },
      { titre: 'Le triangle est-il rectangle ?', id: '' },
      { titre: 'Problèmes avec Pythagore', id: '' }],
    exercices: [],
  };

  // ---------- figures du cours ----------
  const fABC = tri('ABC', [6, 9, Math.hypot(6, 9)], { droit: 'A', hyp: ['BC'], lab: { AB: '6 cm', AC: '9 cm', BC: '?' }, alt: 'Triangle ABC rectangle en A, AB = 6 cm, AC = 9 cm' });
  const fCDE = tri('CED', [5, Math.sqrt(39), 8], { droit: 'C', hyp: ['ED'], lab: { CE: '5 cm', ED: '8 cm', CD: '?' }, alt: 'Triangle CDE rectangle en C, CE = 5 cm, ED = 8 cm' });
  const fThm = tri('ABC', [4, 3, 5], { droit: 'A', hyp: ['BC'], alt: 'Triangle ABC rectangle en A, l’hypoténuse [BC] en orange' });
  const carre = `<svg class="fig" viewBox="0 0 170 150" width="170" role="img" aria-label="Carré d’aire 25 cm² et de côté 5 cm"><rect x="35" y="15" width="100" height="100" fill="#EAF2FF" stroke="#232328" stroke-width="2.2"/><text x="85" y="68" text-anchor="middle" font-size="15" font-weight="700" fill="#1F4FA0">aire 25 cm²</text><text x="85" y="135" text-anchor="middle" font-size="15" font-weight="700" fill="#C76A0E">côté √25 = 5 cm</text></svg>`;

  (typeof LECONS !== 'undefined' ? LECONS : {})['3e-3'] = {
    A: { lettre: 'A', titre: 'Racine carrée d’un nombre', diapos: [
      { titre: 'Du carré au nombre de départ', etapes: [
        { h: '<p class="calc">6² = 36</p>', v: 'Six au carré, égale trente-six.' },
        { h: '<p>Le nombre positif dont le carré est 36, c’est 6.</p>' },
        { h: '<p class="formule grand">On note : √36 = 6</p>', v: 'On note : racine carrée de trente-six, égale six.' }] },
      { titre: 'Définition', cadre: true, etapes: [
        { h: '<p>La <strong>racine carrée</strong> d’un nombre positif a est le nombre <strong>positif</strong> dont le carré est a.</p><p class="formule grand">On la note √a.</p>',
          v: 'Définition : la racine carrée d’un nombre positif a, est le nombre positif dont le carré est a. On la note : racine carrée de a.' }] },
      { titre: 'Les racines carrées à connaître', etapes: [
        { h: '<p class="vocab"><span>√4 = 2</span><span>√9 = 3</span><span>√16 = 4</span><span>√25 = 5</span><span>√36 = 6</span><span>√49 = 7</span></p>',
          v: 'Les racines carrées à connaître. Racine carrée de quatre, égale deux. Racine carrée de neuf, égale trois. Racine carrée de seize, égale quatre. Racine carrée de vingt-cinq, égale cinq. Racine carrée de trente-six, égale six. Racine carrée de quarante-neuf, égale sept.' },
        { h: '<p class="vocab"><span>√64 = 8</span><span>√81 = 9</span><span>√100 = 10</span><span>√121 = 11</span><span>√144 = 12</span></p>',
          v: 'Racine carrée de soixante-quatre, égale huit. Racine carrée de quatre-vingt-un, égale neuf. Racine carrée de cent, égale dix. Racine carrée de cent vingt et un, égale onze. Racine carrée de cent quarante-quatre, égale douze.' }] },
      { titre: 'Propriété 1', cadre: true, etapes: [
        { h: '<p>Pour tout nombre a positif, <strong>√a est la longueur du côté d’un carré d’aire a</strong>.</p>',
          v: 'Propriété : pour tout nombre a positif, racine carrée de a est la longueur du côté d’un carré d’aire a.' },
        { h: carre + '<p>Un carré d’aire 25 cm² a un côté de √25 = 5 cm.</p>',
          v: 'Par exemple, un carré d’aire vingt-cinq centimètres carrés a un côté de racine carrée de vingt-cinq, donc cinq centimètres.' }] },
      { titre: 'Attention : √−5 ?', alerte: true, etapes: [
        { h: '<p class="question">√−5 serait le nombre dont le carré est −5.</p>', v: 'Attention ! Racine carrée de moins cinq, ce serait le nombre dont le carré est moins cinq.' },
        { h: '<p>Un carré est toujours positif (règle des signes).</p>', v: 'Or un carré est toujours positif, à cause de la règle des signes.' },
        { h: '<p class="cc">Donc la racine carrée d’un nombre négatif n’existe pas : √−5 n’existe pas.</p>', v: 'Donc la racine carrée d’un nombre négatif n’existe pas : racine carrée de moins cinq n’existe pas.' }] },
      { titre: 'Propriété 2', cadre: true, etapes: [
        { h: '<p>Pour tout nombre a positif :</p><p class="formule grand">√(a²) = a</p>', v: 'Propriété : pour tout nombre a positif, la racine carrée de a au carré, égale a.' },
        { h: '<p class="calc">√(7²) = √49 = 7</p>', v: 'Par exemple, la racine carrée de sept au carré, c’est la racine carrée de quarante-neuf, donc sept.' }] },
    ] },
    B: { lettre: 'B', titre: 'Calculer avec les racines carrées', diapos: [
      { titre: 'Méthode 1 : encadrer √20 par deux entiers consécutifs', etapes: [
        { h: '<p class="question">Encadre √20 par deux entiers consécutifs.</p>', v: 'Méthode : encadrer racine carrée de vingt par deux nombres entiers qui se suivent.' },
        { h: R('16 &lt; 20 &lt; 25', '16 et 25 sont les carrés parfaits qui entourent 20'), v: 'Seize et vingt-cinq sont les carrés parfaits qui entourent vingt : seize est plus petit que vingt, et vingt est plus petit que vingt-cinq.' },
        { h: R('√16 &lt; √20 &lt; √25', 'on prend la racine carrée de chaque nombre'), v: 'On prend la racine carrée de chaque nombre : racine carrée de seize, plus petit que racine carrée de vingt, plus petit que racine carrée de vingt-cinq.' },
        { h: R('4 &lt; √20 &lt; 5', '√16 = 4 et √25 = 5'), v: 'Racine carrée de seize égale quatre, et racine carrée de vingt-cinq égale cinq. Donc racine carrée de vingt est comprise entre quatre et cinq.' },
        { h: '<p class="cc">√20 est compris entre 4 et 5.</p>' }] },
      { titre: 'Méthode 2 : trouver un nombre positif x', etapes: [
        { h: '<p class="question">Trouve le nombre positif x tel que x² = 81.</p>', v: 'Méthode : trouver le nombre positif x, tel que x au carré égale quatre-vingt-un.' },
        { h: R('x = √81 = 9', 'le nombre positif dont le carré est 81'), v: 'On cherche le nombre positif dont le carré est quatre-vingt-un : c’est racine carrée de quatre-vingt-un, donc neuf.' },
        { h: '<p class="cc">Donc x = 9.</p>', v: 'Donc x égale neuf.' },
        { h: '<p class="question">Et si y² = 100 ?</p>' + R('y = √100 = 10', 'car 10² = 100'), v: 'Autre exemple : y au carré égale cent. Alors y égale racine carrée de cent, donc dix, car dix au carré égale cent.' }] },
      { titre: 'Méthode 2 : avec la calculatrice', etapes: [
        { h: '<p class="question">z² = 5,5225</p>' + R('z = √5,5225 = 2,35', 'on tape la touche √ de la calculatrice'), v: 'Si z au carré égale cinq virgule cinq mille deux cent vingt-cinq, on utilise la touche racine carrée de la calculatrice : z égale deux virgule trente-cinq.' },
        { h: '<p class="question">t² = 14</p><p>Aucun nombre décimal n’a pour carré 14 : on donne une valeur approchée.</p>', v: 'Si t au carré égale quatorze : aucun nombre décimal n’a pour carré quatorze. On donne donc une valeur approchée.' },
        { h: R('t = √14 ≈ 3,74', 'valeur exacte, puis arrondi au centième'), v: 't égale racine carrée de quatorze : c’est la valeur exacte. Arrondi au centième, t est environ égal à trois virgule soixante-quatorze.' }] },
    ] },
    C: { lettre: 'C', titre: 'Le théorème de Pythagore', diapos: [
      { titre: 'Théorème de Pythagore', cadre: true, etapes: [
        { h: '<p>Dans un triangle rectangle, la somme des carrés des longueurs des deux côtés de l’angle droit est égale au carré de la longueur de l’hypoténuse.</p>',
          v: 'Théorème de Pythagore : dans un triangle rectangle, la somme des carrés des longueurs des deux côtés de l’angle droit, est égale au carré de la longueur de l’hypoténuse.' }] },
      { titre: 'Autrement dit', etapes: [
        { h: fThm + '<p>Si le triangle ABC est rectangle en A,</p>', v: 'Autrement dit : si le triangle ABC est rectangle en A,' },
        { h: '<p class="formule grand">alors BC² = AB² + AC²</p>', v: 'alors BC au carré, égale AB au carré, plusse AC au carré.' },
        { h: '<p>L’hypoténuse [BC] est le côté opposé à l’angle droit : c’est le plus grand côté.</p>', v: 'L’hypoténuse, le côté BC, est le côté opposé à l’angle droit : c’est le plus grand côté du triangle.' }] },
      { titre: 'Astuce', etapes: [
        { h: '<p>La lettre de l’angle droit, ici <strong>A</strong>, est dans les deux carrés de la somme : <strong>A</strong>B² et <strong>A</strong>C².</p>',
          v: 'Astuce : la lettre de l’angle droit, ici A, se trouve dans les deux carrés de la somme : AB au carré, et AC au carré.' },
        { h: '<p>L’hypoténuse est le seul côté sans cette lettre : BC.</p>', v: 'L’hypoténuse est le seul côté qui ne contient pas cette lettre : c’est BC.' }] },
    ] },
    D: { lettre: 'D', titre: 'Calculer l’hypoténuse', diapos: [
      { titre: 'Méthode 3 : l’énoncé', etapes: [
        { h: '<p class="question">ABC est un triangle rectangle en A tel que AB = 6 cm et AC = 9 cm. Calcule BC.</p><p>Donne la valeur exacte, puis l’arrondi au dixième de cm.</p>',
          v: 'Méthode : calculer la longueur de l’hypoténuse. ABC est un triangle rectangle en A, tel que AB égale six centimètres et AC égale neuf centimètres. On veut calculer BC. On donne la valeur exacte, puis l’arrondi au dixième de centimètre.' },
        { h: fABC + '<p>On commence par un schéma codé.</p>', v: 'On commence toujours par un schéma codé, avec l’angle droit et les longueurs.' }] },
      { titre: 'Méthode 3 : la rédaction attendue au brevet', etapes: [
        { h: R('Je sais que le triangle ABC est rectangle en A.', 'on vérifie que le triangle est rectangle'), v: 'Je sais que le triangle ABC est rectangle en A. On vérifie toujours que le triangle est rectangle, avant d’utiliser le théorème.' },
        { h: R('Son hypoténuse est le côté [BC].', 'le côté opposé à l’angle droit'), v: 'Son hypoténuse est le côté BC : c’est le côté opposé à l’angle droit.' },
        { h: COND, v: 'Le triangle est rectangle et on connaît son hypoténuse : les conditions sont réunies pour appliquer le théorème de Pythagore.' },
        { h: R('D’après le théorème de Pythagore, on a :', 'on applique le théorème'), v: 'D’après le théorème de Pythagore, on a :' },
        { h: R('BC² = AB² + AC²', 'l’égalité avec les lettres de l’énoncé'), v: 'BC au carré, égale AB au carré, plusse AC au carré. On écrit l’égalité avec les lettres de l’énoncé.' },
        { h: R('BC² = 6² + 9²', 'on remplace par les longueurs'), v: 'On remplace par les longueurs : BC au carré, égale six au carré, plusse neuf au carré.' },
        { h: R('BC² = 36 + 81', 'on calcule les carrés'), v: 'On calcule les carrés : BC au carré, égale trente-six, plusse quatre-vingt-un.' },
        { h: R('BC² = 117', 'on cherche BC, et non BC²'), v: 'BC au carré égale cent dix-sept. Mais on cherche BC, et non BC au carré.' },
        { h: R('BC = √117 cm', 'le nombre positif dont le carré est 117 : valeur exacte'), v: 'BC est le nombre positif dont le carré est cent dix-sept : BC égale racine carrée de cent dix-sept centimètres. C’est la valeur exacte.' },
        { h: R('BC ≈ 10,8 cm', 'valeur arrondie au dixième de cm'), v: 'Avec la calculatrice, BC est environ égal à dix virgule huit centimètres : c’est la valeur arrondie au dixième.' },
        { h: '<p class="cc">Donc BC = √117 cm, soit environ 10,8 cm.</p>', v: 'Donc BC mesure racine carrée de cent dix-sept centimètres, soit environ dix virgule huit centimètres.' }] },
    ] },
    E: { lettre: 'E', titre: 'Calculer un côté de l’angle droit', diapos: [
      { titre: 'Méthode 4 : l’énoncé', etapes: [
        { h: '<p class="question">CDE est un triangle rectangle en C tel que CE = 5 cm et ED = 8 cm. Calcule CD.</p><p>Donne la valeur exacte, puis l’arrondi au dixième de cm.</p>',
          v: 'Méthode : calculer la longueur d’un côté de l’angle droit. CDE est un triangle rectangle en C, tel que CE égale cinq centimètres et ED égale huit centimètres. On veut calculer CD.' },
        { h: fCDE + '<p>On commence par un schéma codé. Ici, on connaît l’hypoténuse [ED].</p>', v: 'On commence par un schéma codé. Attention : ici, on connaît déjà l’hypoténuse, le côté ED.' }] },
      { titre: 'Méthode 4 : la rédaction attendue au brevet', etapes: [
        { h: R('Je sais que le triangle CDE est rectangle en C.', 'on vérifie que le triangle est rectangle'), v: 'Je sais que le triangle CDE est rectangle en C. On vérifie que le triangle est rectangle.' },
        { h: R('Son hypoténuse est le côté [ED].', 'le côté opposé à l’angle droit'), v: 'Son hypoténuse est le côté ED : c’est le côté opposé à l’angle droit.' },
        { h: COND, v: 'Le triangle est rectangle et on connaît son hypoténuse : les conditions sont réunies pour appliquer le théorème de Pythagore.' },
        { h: R('D’après le théorème de Pythagore, on a :', 'on applique le théorème'), v: 'D’après le théorème de Pythagore, on a :' },
        { h: R('ED² = CE² + CD²', 'l’égalité avec les lettres de l’énoncé'), v: 'ED au carré, égale CE au carré, plusse CD au carré.' },
        { h: R('8² = 5² + CD²', 'on remplace par les longueurs'), v: 'On remplace par les longueurs : huit au carré, égale cinq au carré, plusse CD au carré.' },
        { h: R('64 = 25 + CD²', 'on calcule les carrés'), v: 'On calcule les carrés : soixante-quatre, égale vingt-cinq, plusse CD au carré.' },
        { h: R('CD² = 64 − 25', 'on isole l’inconnue CD² : on soustrait'), v: 'On isole l’inconnue CD au carré : CD au carré, égale soixante-quatre moins vingt-cinq. Pour un côté de l’angle droit, on soustrait.' },
        { h: R('CD² = 39', 'on cherche CD, et non CD²'), v: 'CD au carré égale trente-neuf. Mais on cherche CD, et non CD au carré.' },
        { h: R('CD = √39 cm', 'valeur exacte'), v: 'CD est le nombre positif dont le carré est trente-neuf : CD égale racine carrée de trente-neuf centimètres. C’est la valeur exacte.' },
        { h: R('CD ≈ 6,2 cm', 'valeur arrondie au dixième de cm'), v: 'Avec la calculatrice, CD est environ égal à six virgule deux centimètres.' },
        { h: '<p class="cc">Donc CD = √39 cm, soit environ 6,2 cm.</p>', v: 'Donc CD mesure racine carrée de trente-neuf centimètres, soit environ six virgule deux centimètres.' }] },
    ] },
    F: { lettre: 'F', titre: 'Démontrer qu’un triangle est rectangle', diapos: [
      { titre: 'La réciproque du théorème de Pythagore', cadre: true, etapes: [
        { h: '<p>Si, dans un triangle, le carré de la longueur du plus grand côté est égal à la somme des carrés des longueurs des deux autres côtés, alors ce triangle est rectangle.</p>',
          v: 'La réciproque du théorème de Pythagore : si, dans un triangle, le carré de la longueur du plus grand côté est égal à la somme des carrés des longueurs des deux autres côtés, alors ce triangle est rectangle.' }] },
      { titre: 'Méthode 5 : l’énoncé', etapes: [
        { h: '<p class="question">ABC est un triangle tel que AB = 12, AC = 5 et BC = 13. Démontre que ce triangle est rectangle.</p>',
          v: 'Méthode : démontrer qu’un triangle est rectangle. ABC est un triangle tel que AB égale douze, AC égale cinq, et BC égale treize. Démontre que ce triangle est rectangle.' },
        { h: tri('ABC', [12, 5, 13], { lab: { AB: '12', AC: '5', BC: '13' }, hyp: ['BC'], alt: 'Triangle ABC, AB = 12, AC = 5, BC = 13' }) + '<p>On commence par un schéma, <strong>sans</strong> coder l’angle droit : on ne le sait pas encore !</p>',
          v: 'On commence par un schéma, sans coder l’angle droit : on ne sait pas encore si le triangle est rectangle.' }] },
      { titre: 'Méthode 5 : la rédaction attendue au brevet', etapes: [
        { h: R('Le plus grand côté est [BC].', 'c’est la possible hypoténuse'), v: 'Le plus grand côté est BC : c’est la possible hypoténuse.' },
        { h: R('D’une part : BC² = 13² = 169', 'le carré du plus grand côté, seul'), v: 'D’une part, on calcule le carré du plus grand côté, tout seul : BC au carré, égale treize au carré, égale cent soixante-neuf.' },
        { h: R('D’autre part : AB² + AC² = 12² + 5² = 144 + 25 = 169', 'la somme des carrés des deux autres côtés, à part'), v: 'D’autre part, on calcule à part la somme des carrés des deux autres côtés : AB au carré plusse AC au carré, égale cent quarante-quatre plusse vingt-cinq, égale cent soixante-neuf.' },
        { h: R('On en déduit que BC² = AB² + AC².', 'les deux résultats sont égaux'), v: 'On en déduit que BC au carré, égale AB au carré plusse AC au carré, car les deux résultats sont égaux.' },
        { h: R('D’après la réciproque du théorème de Pythagore, le triangle ABC est rectangle en A.', 'on conclut, en donnant le sommet de l’angle droit'), v: 'D’après la réciproque du théorème de Pythagore, le triangle ABC est rectangle en A. L’angle droit est en face du plus grand côté.' },
        { h: '<p class="cc">Donc le triangle ABC est rectangle en A.</p>' }] },
    ] },
    G: { lettre: 'G', titre: 'Démontrer qu’un triangle n’est pas rectangle', diapos: [
      { titre: 'Méthode 6 : l’énoncé', etapes: [
        { h: '<p class="question">CDE est un triangle tel que DE = 12, CE = 7 et DC = 15. Ce triangle est-il rectangle ?</p>',
          v: 'Méthode : démontrer qu’un triangle n’est pas rectangle. CDE est un triangle tel que DE égale douze, CE égale sept, et DC égale quinze. Ce triangle est-il rectangle ?' },
        { h: tri('ECD', [7, 12, 15], { lab: { DE: '12', CE: '7', DC: '15' }, hyp: ['DC'], alt: 'Triangle CDE, DE = 12, CE = 7, DC = 15' }), v: 'On fait un schéma, sans coder d’angle droit.' }] },
      { titre: 'Méthode 6 : la rédaction attendue au brevet', etapes: [
        { h: R('Le plus grand côté est [DC].', 's’il était rectangle, ce serait l’hypoténuse'), v: 'Le plus grand côté est DC. Si le triangle était rectangle, ce serait son hypoténuse.' },
        { h: R('D’une part : DC² = 15² = 225', 'le carré du plus grand côté, seul'), v: 'D’une part : DC au carré, égale quinze au carré, égale deux cent vingt-cinq.' },
        { h: R('D’autre part : DE² + CE² = 12² + 7² = 144 + 49 = 193', 'la somme des carrés des deux autres côtés, à part'), v: 'D’autre part : DE au carré plusse CE au carré, égale cent quarante-quatre plusse quarante-neuf, égale cent quatre-vingt-treize.' },
        { h: R('On en déduit que DC² ≠ DE² + CE².', 'les deux résultats sont différents'), v: 'On en déduit que DC au carré n’est pas égal à DE au carré plusse CE au carré : les deux résultats sont différents.' },
        { h: R('L’égalité de Pythagore n’est pas vérifiée, donc d’après la contraposée du théorème de Pythagore, le triangle CDE n’est pas rectangle.', 'on conclut avec la contraposée'), v: 'L’égalité de Pythagore n’est pas vérifiée. Donc, d’après la contraposée du théorème de Pythagore, le triangle CDE n’est pas rectangle.' },
        { h: '<p class="cc">Donc le triangle CDE n’est pas rectangle.</p>' }] },
    ] },
    H: { lettre: 'H', titre: 'Les erreurs fréquentes au brevet', diapos: [
      { titre: 'Erreur 1 : oublier que le triangle est rectangle', alerte: true, etapes: [
        { h: '<p class="barre">« AC² = AB² + BC² » écrit directement</p>', v: 'Erreur fréquente : écrire directement l’égalité, AC au carré égale AB au carré plusse BC au carré, sans rien justifier.' },
        { h: '<p class="cc">On écrit : « Le triangle ABC est rectangle en B. Son hypoténuse est [AC]. Les conditions sont réunies pour appliquer le théorème de Pythagore. D’après le théorème de Pythagore : AC² = AB² + BC². »</p>', v: 'Il faut écrire : le triangle ABC est rectangle en B. Son hypoténuse est AC. Les conditions sont réunies pour appliquer le théorème de Pythagore. Et, d’après ce théorème, AC au carré égale AB au carré plusse BC au carré.' }] },
      { titre: 'Erreur 2 : se tromper d’hypoténuse', alerte: true, etapes: [
        { h: '<p>ABC est rectangle en B, AB = 6,4 et AC = 8.</p><p class="barre">« BC² = 6,4² + 8² »</p>', v: 'Deuxième erreur. ABC est rectangle en B, AB égale six virgule quatre, et AC égale huit. Un élève écrit : BC au carré, égale six virgule quatre au carré, plusse huit au carré. C’est faux.' },
        { h: '<p>L’hypoténuse est [AC], le côté opposé à l’angle droit B.</p><p class="calc">BC² = 8² − 6,4² = 64 − 40,96 = 23,04</p>', v: 'L’hypoténuse est le côté AC, en face de l’angle droit B. Donc BC au carré, égale huit au carré moins six virgule quatre au carré, égale vingt-trois virgule zéro quatre.' },
        { h: '<p class="cc">Donc BC = √23,04 = 4,8 cm : il est bien plus petit que l’hypoténuse.</p>', v: 'Donc BC égale racine carrée de vingt-trois virgule zéro quatre, égale quatre virgule huit centimètres. On vérifie : il est bien plus petit que l’hypoténuse.' }] },
      { titre: 'Erreur 3 : confondre carré et double', alerte: true, etapes: [
        { h: '<p class="barre">« 6,4² = 12,8 »</p>', v: 'Troisième erreur : dire que six virgule quatre au carré, égale douze virgule huit. Ça, c’est le double !' },
        { h: '<p class="cc">6,4² = 6,4 × 6,4 = 40,96</p>', v: 'Six virgule quatre au carré, c’est six virgule quatre fois six virgule quatre, donc quarante virgule quatre-vingt-seize.' }] },
      { titre: 'Erreur 4 : oublier la racine carrée', alerte: true, etapes: [
        { h: '<p class="barre">« BC = 23,04 cm »</p>', v: 'Quatrième erreur : écrire BC égale vingt-trois virgule zéro quatre centimètres. On a oublié la racine carrée !' },
        { h: '<p class="cc">BC² = 23,04, donc BC = √23,04 = 4,8 cm.</p>', v: 'BC au carré égale vingt-trois virgule zéro quatre, donc BC égale racine carrée de vingt-trois virgule zéro quatre, égale quatre virgule huit centimètres.' }] },
      { titre: 'Erreur 5 : partir de l’égalité à démontrer', alerte: true, etapes: [
        { h: '<p class="barre">« AD² = AE² + DE², donc 53,29 = 53,29 »</p>', v: 'Cinquième erreur, pour la réciproque : écrire tout de suite l’égalité qu’on veut démontrer.' },
        { h: '<p class="cc">On calcule d’une part AD², d’autre part AE² + DE², puis on compare.</p>', v: 'Il faut calculer d’une part AD au carré, d’autre part AE au carré plusse DE au carré, et seulement ensuite comparer les deux résultats.' }] },
      { titre: 'Erreur 6 : réciproque ou contraposée ?', alerte: true, etapes: [
        { h: '<p>Si les deux résultats sont <strong>égaux</strong> : on cite la <strong>réciproque</strong>, le triangle est rectangle.</p>', v: 'Dernière erreur : confondre la réciproque et la contraposée. Si les deux résultats sont égaux, on cite la réciproque : le triangle est rectangle.' },
        { h: '<p>S’ils sont <strong>différents</strong> : on cite la <strong>contraposée</strong>, le triangle n’est pas rectangle.</p>', v: 'Si les deux résultats sont différents, on cite la contraposée : le triangle n’est pas rectangle.' },
        { h: '<p class="cc">Et on donne toujours le sommet de l’angle droit : « rectangle en E ». On garde la valeur exacte jusqu’au bout, et on écrit l’unité.</p>', v: 'Et on donne toujours le sommet de l’angle droit. On garde la valeur exacte jusqu’au bout, et on n’oublie pas l’unité.' }] },
    ] },
  };

  // ---------- les parties ----------
  const X = (typeof EXOS !== 'undefined' ? EXOS : {})['3e-3'] = {};
  const calcAide = (touches, txt) => ({ bouton: 'Voir les touches', html: `<p>${txt}</p><p class="touches">${touches.map(t => `<kbd>${t}</kbd>`).join('')}</p><p class="petit">Sur ta calculatrice, la touche √ est parfois au-dessus de la touche x² : on l’obtient alors avec la touche SECONDE.</p>` });

  X[1] = { titre: 'La racine carrée d’un nombre', items: [
    { type: 'lecon', rub: 'lecon', parties: ['A', 'B'] },
    { type: 'flash', rub: 'flash', titre: 'Questions flash', consigne: 'Vrai ou faux ? Tu as 8 secondes par question.', duree: 8, questions: [
      { q: '√49 = 7', rep: true, expl: '7² = 49, donc √49 = 7.', v: 'Racine carrée de quarante-neuf, égale sept. Vrai, ou faux ?' },
      { q: '√16 = 8', rep: false, expl: '8² = 64. C’est 4² = 16, donc √16 = 4.', v: 'Racine carrée de seize, égale huit. Vrai, ou faux ?' },
      { q: '√−9 = −3', rep: false, expl: 'Un carré est toujours positif, donc √−9 n’existe pas.', v: 'Racine carrée de moins neuf, égale moins trois. Vrai, ou faux ?' },
      { q: '3 &lt; √10 &lt; 4', rep: true, expl: '9 &lt; 10 &lt; 16, donc √9 &lt; √10 &lt; √16, soit 3 &lt; √10 &lt; 4.', v: 'Racine carrée de dix est comprise entre trois et quatre. Vrai, ou faux ?' }] },
    { type: 'guide', rub: 'guide', titre: 'Encadrer √50', enonce: '<p>Encadre <strong>√50</strong> par deux entiers consécutifs.</p>',
      v: 'Exercice guidé. Encadre racine carrée de cinquante par deux nombres entiers qui se suivent.',
      vis: ['<p class="calc">… &lt; 50 &lt; …</p>', '<p class="calc">49 &lt; 50 &lt; …</p>', '<p class="calc">49 &lt; 50 &lt; 64</p>', '<p class="calc">49 &lt; 50 &lt; 64</p><p class="calc">√49 &lt; √50 &lt; √64</p><p class="calc">7 &lt; √50 &lt; …</p>', '<p class="calc">49 &lt; 50 &lt; 64</p><p class="calc">√49 &lt; √50 &lt; √64</p><p class="calc">7 &lt; √50 &lt; 8</p>'],
      etapes: [
        { q: 'Quel est le carré parfait juste en dessous de 50 ?', rep: ['49'], k: 1, aide: '7 × 7 = 49.' },
        { q: 'Quel est le carré parfait juste au-dessus de 50 ?', rep: ['64'], k: 2, aide: '8 × 8 = 64.' },
        { q: '√49 = ?', rep: ['7'], k: 3, aide: 'Quel nombre positif a pour carré 49 ?' },
        { q: '√64 = ?', rep: ['8'], k: 4, aide: 'Quel nombre positif a pour carré 64 ?' }],
      fin: '<p class="formule grand">7 &lt; √50 &lt; 8</p>', cc: 'Donc √50 est compris entre 7 et 8.' },
    { type: 'exo', rub: 'exo', titre: 'Exercice 1', ceinture: 'blanche',
      enonce: '<p>Trouve le nombre <strong>positif</strong> qui vérifie l’égalité.</p><p><span class="q">a)</span> x² = 64 &nbsp;&nbsp; <span class="q">b)</span> y² = 121</p>',
      v: 'Exercice un. Trouve le nombre positif qui vérifie l’égalité. Question a : x au carré égale soixante-quatre. Question b : y au carré égale cent vingt et un.',
      champs: [{ q: 'a', lab: 'x =', rep: ['8', '√64'], court: true }, { q: 'b', lab: 'y =', rep: ['11', '√121'], court: true }],
      indices: ['Quel nombre positif a pour carré 64 ?', 'Revois les racines carrées à connaître.'],
      correction: [
        { q: 'a', h: R('x = √64 = 8', 'le nombre positif dont le carré est 64'), v: 'Correction. x est le nombre positif dont le carré est soixante-quatre : x égale racine carrée de soixante-quatre, donc huit.' },
        { q: 'b', h: R('y = √121 = 11', 'car 11² = 121'), v: 'y égale racine carrée de cent vingt et un, donc onze, car onze au carré égale cent vingt et un.' }],
      cc: 'a) x = 8. b) y = 11.' },
    { type: 'exo', rub: 'exo', titre: 'Exercice 2', ceinture: 'jaune',
      enonce: '<p>Calcule sans calculatrice.</p><p><span class="q">a)</span> √(9²) &nbsp;&nbsp; <span class="q">b)</span> √(2,5²) &nbsp;&nbsp; <span class="q">c)</span> (√13)²</p>',
      v: 'Exercice deux. Calcule sans calculatrice. Question a : la racine carrée de neuf au carré. Question b : la racine carrée de deux virgule cinq au carré. Question c : racine carrée de treize, le tout au carré.',
      champs: [{ q: 'a', lab: '√(9²) =', rep: ['9'], court: true }, { q: 'b', lab: '√(2,5²) =', rep: ['2,5'], court: true }, { q: 'c', lab: '(√13)² =', rep: ['13'], court: true }],
      indices: ['Pour tout nombre a positif, √(a²) = a.', '√13 est le nombre positif dont le carré est 13.'],
      correction: [
        { q: 'a', h: R('√(9²) = √81 = 9', '√(a²) = a, pour a positif'), v: 'Correction. La racine carrée de neuf au carré, c’est la racine carrée de quatre-vingt-un, donc neuf.' },
        { q: 'b', h: R('√(2,5²) = 2,5', 'même propriété'), v: 'De même, la racine carrée de deux virgule cinq au carré, égale deux virgule cinq.' },
        { q: 'c', h: R('(√13)² = 13', '√13 est le nombre dont le carré est 13'), v: 'Racine carrée de treize est le nombre positif dont le carré est treize, donc son carré égale treize.' }],
      cc: 'a) 9. b) 2,5. c) 13.' },
    { type: 'exo', rub: 'exo', titre: 'Exercice 3', ceinture: 'orange',
      enonce: '<p>Encadre <strong>√30</strong> par deux entiers consécutifs.</p>',
      v: 'Exercice trois. Encadre racine carrée de trente par deux nombres entiers qui se suivent.',
      champs: [{ lab: 'Le plus petit entier :', rep: ['5'], court: true }, { lab: 'Le plus grand entier :', rep: ['6'], court: true }],
      indices: ['Cherche les carrés parfaits qui entourent 30.', '25 &lt; 30 &lt; 36.'],
      correction: [
        { h: R('25 &lt; 30 &lt; 36', 'les carrés parfaits qui entourent 30'), v: 'Correction. Vingt-cinq et trente-six sont les carrés parfaits qui entourent trente.' },
        { h: R('√25 &lt; √30 &lt; √36', 'on prend les racines carrées'), v: 'On prend les racines carrées : racine carrée de vingt-cinq, plus petit que racine carrée de trente, plus petit que racine carrée de trente-six.' },
        { h: R('5 &lt; √30 &lt; 6', '√25 = 5 et √36 = 6'), v: 'Donc cinq, plus petit que racine carrée de trente, plus petit que six.' }],
      cc: 'Donc √30 est compris entre 5 et 6.' },
    { type: 'exo', rub: 'calc', titre: 'La touche √',
      enonce: '<p>Avec ta calculatrice, trouve le nombre <strong>positif</strong> :</p><p><span class="q">a)</span> z² = 7,29 &nbsp;&nbsp; <span class="q">b)</span> t² = 20 (arrondi au centième)</p>',
      v: 'Avec ta calculatrice, trouve le nombre positif. Question a : z au carré égale sept virgule vingt-neuf. Question b : t au carré égale vingt. Donne l’arrondi au centième.',
      champs: [{ q: 'a', lab: 'z =', rep: ['2,7'], court: true }, { q: 'b', lab: 't ≈', rep: ['4,47'], court: true }],
      indices: ['Tape la touche √, puis le nombre, puis EXE.', '√20 = 4,472… : regarde le chiffre des millièmes pour arrondir.'],
      aide: calcAide(['√', '7', ',', '2', '9', 'EXE'], 'Pour z : on tape la touche racine carrée, puis le nombre, puis EXE.'),
      correction: [
        { q: 'a', h: R('z = √7,29 = 2,7', 'la calculatrice affiche 2,7'), v: 'Correction. z égale racine carrée de sept virgule vingt-neuf. La calculatrice affiche deux virgule sept.' },
        { q: 'b', h: R('t = √20 ≈ 4,47', 'la calculatrice affiche 4,472… ; le chiffre des millièmes est 2'), v: 't égale racine carrée de vingt. La calculatrice affiche quatre virgule quatre cent soixante-douze, et la suite. Le chiffre des millièmes est deux, donc on arrondit à quatre virgule quarante-sept.' }],
      cc: 'a) z = 2,7. b) t = √20 ≈ 4,47.' },
  ] };

  // figure guidée : triangle MNP rectangle en P
  const mnp = (k) => tri('PNM', [4, 3, 5], { droit: k >= 1 ? 'P' : null, hyp: k >= 2 ? ['MN'] : [], lab: { MP: '3', NP: '4', MN: k >= 6 ? '5' : (k >= 2 ? '?' : '') }, alt: 'Triangle MNP, MP = 3 cm, NP = 4 cm' });
  X[2] = { titre: 'L’égalité de Pythagore', items: [
    { type: 'lecon', rub: 'lecon', parties: ['C'] },
    { type: 'methode', rub: 'methode', titre: 'Écrire l’égalité de Pythagore',
      resume: '<ol class="meth"><li>On repère le sommet de l’<strong>angle droit</strong>.</li><li>L’<strong>hypoténuse</strong> est le côté en face : celui sans cette lettre.</li><li>On écrit : <strong>hypoténuse² = somme des carrés des deux autres côtés</strong>.</li></ol><p><strong>Exemple :</strong> le triangle DEF est rectangle en E.</p>',
      etapes: [
        { r: true, h: tri('EFD', [4, 3, 5], { droit: 'E', alt: 'Triangle DEF rectangle en E' }), v: 'Méthode. Pour écrire l’égalité de Pythagore, prenons un exemple : le triangle DEF est rectangle en E.' },
        { r: true, h: tri('EFD', [4, 3, 5], { droit: 'E', hyp: ['DF'], alt: 'Triangle DEF rectangle en E, hypoténuse [DF]' }) + R('Hypoténuse : [DF]', 'le seul côté sans la lettre E'), v: 'L’angle droit est en E. L’hypoténuse est le seul côté sans la lettre E : c’est le côté DF.' },
        { h: tri('EFD', [4, 3, 5], { droit: 'E', hyp: ['DF'], alt: 'Triangle DEF rectangle en E, hypoténuse [DF]' }) + R('Hypoténuse : [DF]', 'le seul côté sans la lettre E') + R('DF² = DE² + EF²', 'les deux autres côtés contiennent E'), r: true, v: 'On écrit : DF au carré, égale DE au carré, plusse EF au carré. Les deux côtés de l’angle droit contiennent bien la lettre E.' }],
      cc: 'L’égalité de Pythagore est DF² = DE² + EF².' },
    { type: 'flash', rub: 'flash', titre: 'Questions flash', consigne: 'Vrai ou faux ? Tu as 8 secondes par question.', duree: 8, questions: [
      { q: 'Dans un triangle rectangle, l’hypoténuse est le plus grand côté.', rep: true, expl: 'L’hypoténuse est le côté opposé à l’angle droit : c’est le plus grand côté.' },
      { q: 'EFG est rectangle en F, donc EF² = FG² + EG².', rep: false, expl: 'L’angle droit est en F, donc l’hypoténuse est [EG] : EG² = EF² + FG².', v: 'EFG est rectangle en F, donc EF au carré, égale FG au carré plusse EG au carré. Vrai, ou faux ?' },
      { q: 'L’hypoténuse est le côté opposé à l’angle droit.', rep: true, expl: 'C’est la définition de l’hypoténuse.' },
      { q: 'On peut utiliser le théorème de Pythagore dans n’importe quel triangle.', rep: false, expl: 'Le théorème de Pythagore ne s’utilise que dans un triangle rectangle.' }] },
    { type: 'guide', rub: 'guide', titre: 'Le triangle MNP', enonce: '<p>Le triangle MNP est rectangle en P, avec MP = 3 cm et NP = 4 cm.</p>',
      v: 'Exercice guidé. Le triangle MNP est rectangle en P, avec MP égale trois centimètres, et NP égale quatre centimètres.',
      vis: pasVis(mnp, [['Je sais que le triangle MNP est rectangle en P.', 'on vérifie que le triangle est rectangle'], ['Son hypoténuse est le côté [MN].', 'le côté opposé à l’angle droit'], CONDL,
        ['D’après le théorème de Pythagore, on a : MN² = MP² + NP²', 'on applique le théorème'], ['MN² = 3² + 4² = 9 + 16 = 25', 'on remplace et on calcule'], ['MN = √25 = 5 cm', 'le nombre positif dont le carré est 25']], [0, 1, 2, 3, 4, 5, 6]),
      etapes: [
        { q: 'Le triangle MNP est rectangle en quel point ?', rep: ['P'], k: 1, texte: true, aide: 'On lit « rectangle en P ».' },
        { q: 'Quelle est son hypoténuse ?', rep: seg('MN'), k: 2, texte: true, aide: 'C’est le seul côté sans la lettre P.' },
        Object.assign({ k: 3 }, CHOIX),
        { q: 'Écris l’égalité de Pythagore.', rep: eg('MN', 'MP', 'NP'), k: 4, touches: T2, place: 'MN² = …', aide: 'MN² = MP² + NP².' },
        { q: 'Calcule MN² = 3² + 4².', rep: ['25'], k: 5, aide: '9 + 16.' },
        { q: 'MN = ? (en cm)', rep: ['5', '√25', '5cm'], k: 6, touches: ['√'], aide: 'Le nombre positif dont le carré est 25.' }],
      fin: FIN,
      cc: 'Donc l’hypoténuse MN mesure 5 cm.' },
    { type: 'exo', rub: 'exo', titre: 'Exercice 1', ceinture: 'blanche',
      enonce: '<p>Écris l’égalité de Pythagore pour chaque triangle.</p><p><span class="q">a)</span> RST est rectangle en R.</p><p><span class="q">b)</span> IJK est rectangle en K.</p><p><span class="q">c)</span> XYZ est rectangle en Y.</p>',
      v: 'Exercice un. Écris l’égalité de Pythagore pour chaque triangle. Question a : RST est rectangle en R. Question b : IJK est rectangle en K. Question c : XYZ est rectangle en Y.',
      champs: [
        { q: 'a', lab: 'RST :', rep: eg('ST', 'RS', 'RT').concat(eg('ST', 'SR', 'RT'), eg('TS', 'RS', 'RT')), touches: T2, place: '…² = …² + …²' },
        { q: 'b', lab: 'IJK :', rep: eg('IJ', 'IK', 'JK').concat(eg('IJ', 'KI', 'KJ'), eg('JI', 'IK', 'JK')), touches: T2, place: '…² = …² + …²' },
        { q: 'c', lab: 'XYZ :', rep: eg('XZ', 'XY', 'YZ').concat(eg('XZ', 'YX', 'YZ'), eg('ZX', 'XY', 'YZ')), touches: T2, place: '…² = …² + …²' }],
      indices: ['L’hypoténuse est le côté sans la lettre de l’angle droit.', 'Pour RST rectangle en R, l’hypoténuse est [ST].'],
      correction: [
        { q: 'a', h: R('ST² = RS² + RT²', 'angle droit en R : l’hypoténuse est [ST]'), v: 'Correction. RST est rectangle en R : l’hypoténuse est ST. Donc ST au carré, égale RS au carré, plusse RT au carré.' },
        { q: 'b', h: R('IJ² = IK² + JK²', 'angle droit en K : l’hypoténuse est [IJ]'), v: 'IJK est rectangle en K : l’hypoténuse est IJ. Donc IJ au carré, égale IK au carré, plusse JK au carré.' },
        { q: 'c', h: R('XZ² = XY² + YZ²', 'angle droit en Y : l’hypoténuse est [XZ]'), v: 'XYZ est rectangle en Y : l’hypoténuse est XZ. Donc XZ au carré, égale XY au carré, plusse YZ au carré.' }],
      cc: 'a) ST² = RS² + RT². b) IJ² = IK² + JK². c) XZ² = XY² + YZ².' },
    { type: 'exo', rub: 'exo', titre: 'Exercice 2', ceinture: 'jaune',
      enonce: '<p>Le triangle ABC est rectangle en B. Léo écrit : <strong>« BC² = AB² + AC² »</strong>.</p><p><span class="q">a)</span> Léo a-t-il raison ?</p><p><span class="q">b)</span> Écris la bonne égalité.</p>',
      v: 'Exercice deux. Le triangle ABC est rectangle en B. Léo écrit : BC au carré, égale AB au carré, plusse AC au carré. Question a : Léo a-t-il raison ? Question b : écris la bonne égalité.',
      champs: [{ q: 'a', lab: 'Léo a-t-il raison ?', choix: ['Oui', 'Non'], rep: 'Non' }, { q: 'b', lab: 'La bonne égalité :', rep: eg('AC', 'AB', 'BC').concat(eg('CA', 'AB', 'BC')), touches: T2, place: '…² = …² + …²' }],
      indices: ['Où est l’angle droit ? Quel côté est en face ?', 'L’hypoténuse ne contient pas la lettre B.'],
      correction: [
        { q: 'a', h: R('L’angle droit est en B, donc l’hypoténuse est [AC], et non [BC].', 'le côté sans la lettre B'), v: 'Correction. L’angle droit est en B, donc l’hypoténuse est le côté AC, et non BC. Léo a tort.' },
        { q: 'b', h: R('AC² = AB² + BC²', 'l’hypoténuse au carré, seule à gauche'), v: 'La bonne égalité est : AC au carré, égale AB au carré, plusse BC au carré.' }],
      cc: 'a) Non, Léo s’est trompé d’hypoténuse. b) AC² = AB² + BC².' },
  ] };

  // figure guidée : RST rectangle en S, RS = 9, ST = 12
  const rst = (k) => tri('STR', [12, 9, 15], { droit: k >= 1 ? 'S' : null, hyp: k >= 2 ? ['RT'] : [], lab: { RS: '9 cm', ST: '12 cm', RT: k >= 2 ? (k >= 6 ? '15 cm' : '?') : '' }, alt: 'Triangle RST, RS = 9 cm, ST = 12 cm' });
  const lignesRST = [['Je sais que le triangle RST est rectangle en S.', 'on vérifie que le triangle est rectangle'], ['Son hypoténuse est le côté [RT].', 'le côté opposé à l’angle droit'], CONDL,
    ['D’après le théorème de Pythagore, on a : RT² = RS² + ST²', 'on applique le théorème'], ['RT² = 9² + 12² = 81 + 144 = 225', 'on remplace et on calcule'], ['RT = √225 = 15 cm', 'le nombre positif dont le carré est 225']];
  X[3] = { titre: 'Calculer la longueur de l’hypoténuse', items: [
    { type: 'lecon', rub: 'lecon', parties: ['D'] },
    { type: 'flash', rub: 'flash', titre: 'Questions flash', consigne: 'Vrai ou faux ? Tu as 10 secondes par question.', duree: 10, questions: [
      { q: 'ABC rectangle en A, AB = 3 et AC = 4, donc BC = 5.', rep: true, expl: 'BC² = 3² + 4² = 9 + 16 = 25, donc BC = √25 = 5.', v: 'ABC est rectangle en A, AB égale trois et AC égale quatre, donc BC égale cinq. Vrai, ou faux ?' },
      { q: 'Si BC² = 49, alors BC = 24,5.', rep: false, expl: 'On ne divise pas par 2 ! BC = √49 = 7.', v: 'Si BC au carré égale quarante-neuf, alors BC égale vingt-quatre virgule cinq. Vrai, ou faux ?' },
      { q: '5² = 10', rep: false, expl: '5² = 5 × 5 = 25. Le double de 5, c’est 10.', v: 'Cinq au carré égale dix. Vrai, ou faux ?' },
      { q: 'L’hypoténuse est plus longue que chaque côté de l’angle droit.', rep: true, expl: 'L’hypoténuse est le plus grand côté du triangle rectangle.' }] },
    { type: 'guide', rub: 'guide', titre: 'Le triangle RST', enonce: '<p>Le triangle RST est rectangle en S, avec RS = 9 cm et ST = 12 cm. Calcule RT.</p>',
      v: 'Exercice guidé. Le triangle RST est rectangle en S, avec RS égale neuf centimètres, et ST égale douze centimètres. Calcule RT.',
      vis: pasVis(rst, lignesRST, [0, 1, 2, 3, 4, 5, 6]),
      etapes: [
        { q: 'Le triangle RST est rectangle en quel point ?', rep: ['S'], k: 1, texte: true, aide: 'On lit « rectangle en S ».' },
        { q: 'Quelle est son hypoténuse ?', rep: seg('RT'), k: 2, texte: true, aide: 'Le côté opposé à l’angle droit : celui sans la lettre S.' },
        Object.assign({ k: 3 }, CHOIX),
        { q: 'Écris l’égalité de Pythagore.', rep: eg('RT', 'RS', 'ST'), k: 4, touches: T2, place: 'RT² = …', aide: 'RT² = RS² + ST².' },
        { q: 'Remplace et calcule : RT² = 9² + 12² = ?', rep: ['225'], k: 5, aide: '81 + 144.' },
        { q: 'RT = ? (en cm)', rep: ['15', '√225', '15cm'], k: 6, touches: ['√'], aide: 'Le nombre positif dont le carré est 225 : 15 × 15 = 225.' }],
      fin: FIN, cc: 'Donc RT mesure 15 cm.' },
    { type: 'exo', rub: 'exo', titre: 'Exercice 1', ceinture: 'jaune',
      enonce: tri('KLM', [3.6, 4.8, 6], { droit: 'K', hyp: ['LM'], lab: { KL: '3,6 cm', KM: '4,8 cm', LM: '?' }, alt: 'Triangle KLM rectangle en K' }) + '<p>KLM est un triangle rectangle en K tel que KL = 3,6 cm et KM = 4,8 cm. Calcule LM.</p>',
      v: 'Exercice un. KLM est un triangle rectangle en K, tel que KL égale trois virgule six centimètres, et KM égale quatre virgule huit centimètres. Calcule LM.',
      champs: [
        { q: 'a', lab: 'L’hypoténuse est :', rep: seg('LM'), touches: ['[', ']'] },
        { q: 'b', lab: 'L’égalité de Pythagore :', rep: eg('LM', 'KL', 'KM').concat(eg('ML', 'KL', 'KM'), eg('LM', 'LK', 'MK')), touches: T2, place: 'LM² = …' },
        { q: 'c', lab: 'LM² =', rep: ['36'], court: true },
        { q: 'd', lab: 'LM = (en cm)', rep: ['6', '√36'], court: true }],
      indices: ['L’angle droit est en K : l’hypoténuse est le côté sans la lettre K.', '3,6² = 3,6 × 3,6 = 12,96 et 4,8² = 23,04.', '12,96 + 23,04 = 36.'],
      correction: [
        { q: 'a', h: R('Je sais que le triangle KLM est rectangle en K.', 'on vérifie que le triangle est rectangle') + R('Son hypoténuse est le côté [LM].', 'le côté opposé à l’angle droit'), v: 'Correction. Je sais que le triangle KLM est rectangle en K. Son hypoténuse est le côté LM, opposé à l’angle droit.' },
        { q: 'b', h: COND + R('D’après le théorème de Pythagore : LM² = KL² + KM²', 'l’égalité avec les lettres de l’énoncé'), v: 'Les conditions sont réunies pour appliquer le théorème de Pythagore. D’après le théorème de Pythagore : LM au carré, égale KL au carré, plusse KM au carré.' },
        { q: 'c', h: R('LM² = 3,6² + 4,8²', 'on remplace') + R('LM² = 12,96 + 23,04 = 36', 'on calcule les carrés'), v: 'On remplace : LM au carré, égale trois virgule six au carré, plusse quatre virgule huit au carré, égale douze virgule quatre-vingt-seize, plusse vingt-trois virgule zéro quatre, égale trente-six.' },
        { q: 'd', h: R('LM = √36 = 6 cm', 'le nombre positif dont le carré est 36'), v: 'Donc LM égale racine carrée de trente-six, égale six centimètres.' }],
      cc: 'Donc LM mesure 6 cm.' },
    { type: 'exo', rub: 'exo', titre: 'Exercice 2', ceinture: 'orange',
      enonce: tri('BCA', [9, 5, Math.sqrt(106)], { droit: 'B', hyp: ['AC'], lab: { AB: '5 cm', BC: '9 cm', AC: '?' }, alt: 'Triangle ABC rectangle en B' }) + '<p>ABC est un triangle rectangle en B tel que AB = 5 cm et BC = 9 cm. Calcule AC : donne la valeur exacte, puis l’arrondi au dixième.</p>',
      v: 'Exercice deux. ABC est un triangle rectangle en B, tel que AB égale cinq centimètres, et BC égale neuf centimètres. Calcule AC. Donne la valeur exacte, puis l’arrondi au dixième.',
      champs: [
        { q: 'a', lab: 'AC² =', rep: ['106'], court: true },
        { q: 'b', lab: 'Valeur exacte : AC =', rep: ['√106', '√106cm'], touches: ['√'] },
        { q: 'c', lab: 'Arrondi au dixième : AC ≈', rep: ['10,3', '10,3cm'], court: true }],
      indices: ['L’angle droit est en B : l’hypoténuse est [AC].', 'AC² = 5² + 9² = 25 + 81.', '√106 = 10,29… : arrondis au dixième.'],
      correction: [
        { q: 'a', h: R('Je sais que le triangle ABC est rectangle en B.', 'on vérifie que le triangle est rectangle') + R('Son hypoténuse est le côté [AC].', 'le côté opposé à l’angle droit') + COND + R('D’après le théorème de Pythagore : AC² = AB² + BC²', 'l’égalité'), v: 'Correction. Je sais que le triangle ABC est rectangle en B. Son hypoténuse est le côté AC. Les conditions sont réunies pour appliquer le théorème de Pythagore. D’après le théorème de Pythagore, AC au carré, égale AB au carré, plusse BC au carré.' },
        { q: 'a', h: R('AC² = 5² + 9² = 25 + 81 = 106', 'on remplace et on calcule'), v: 'AC au carré, égale cinq au carré, plusse neuf au carré, égale vingt-cinq plusse quatre-vingt-un, égale cent six.' },
        { q: 'b', h: R('AC = √106 cm', 'valeur exacte'), v: 'AC égale racine carrée de cent six centimètres : c’est la valeur exacte.' },
        { q: 'c', h: R('AC ≈ 10,3 cm', 'la calculatrice affiche 10,29… ; le chiffre des centièmes est 9'), v: 'La calculatrice affiche dix virgule vingt-neuf, et la suite. Le chiffre des centièmes est neuf, donc on arrondit à dix virgule trois centimètres.' }],
      cc: 'Donc AC = √106 cm, soit environ 10,3 cm.' },
    { type: 'exo', rub: 'calc', titre: 'Arrondir une racine carrée',
      enonce: '<p>Avec ta calculatrice, donne l’arrondi <strong>au dixième</strong>.</p><p><span class="q">a)</span> √58 &nbsp;&nbsp; <span class="q">b)</span> √200</p>',
      v: 'Avec ta calculatrice, donne l’arrondi au dixième. Question a : racine carrée de cinquante-huit. Question b : racine carrée de deux cents.',
      champs: [{ q: 'a', lab: '√58 ≈', rep: ['7,6'], court: true }, { q: 'b', lab: '√200 ≈', rep: ['14,1'], court: true }],
      indices: ['Tape la touche √, puis le nombre, puis EXE.', 'Pour arrondir au dixième, regarde le chiffre des centièmes.'],
      aide: calcAide(['√', '5', '8', 'EXE'], 'On tape la touche racine carrée, puis le nombre, puis EXE.'),
      correction: [
        { q: 'a', h: R('√58 ≈ 7,6', 'la calculatrice affiche 7,615… ; le chiffre des centièmes est 1'), v: 'Correction. La calculatrice affiche sept virgule six cent quinze, et la suite. Le chiffre des centièmes est un, donc on garde sept virgule six.' },
        { q: 'b', h: R('√200 ≈ 14,1', 'la calculatrice affiche 14,142… ; le chiffre des centièmes est 4'), v: 'La calculatrice affiche quatorze virgule cent quarante-deux, et la suite. Le chiffre des centièmes est quatre, donc on garde quatorze virgule un.' }],
      cc: 'a) √58 ≈ 7,6. b) √200 ≈ 14,1.' },
    { type: 'exo', rub: 'scratch', titre: 'Le programme de l’hypoténuse',
      enonce: `<pre class="blocks">quand @greenFlag est cliqué
demander [Longueur du premier côté de l’angle droit ?] et attendre
mettre [a v] à (réponse)
demander [Longueur du second côté de l’angle droit ?] et attendre
mettre [b v] à (réponse)
mettre [h v] à ([racine v] de (((a) * (a)) + ((b) * (b))))
dire (h)</pre>
        <p><span class="q">a)</span> Que dit le lutin si on donne <strong>a = 6</strong> et <strong>b = 8</strong> ?</p><p><span class="q">b)</span> Quel théorème ce programme utilise-t-il ?</p>`,
      v: 'Débranché. Voici un programme Scratch. Il demande la longueur du premier côté de l’angle droit, et la range dans la variable a. Il demande la longueur du second côté, et la range dans la variable b. Puis il calcule la variable h : la racine carrée de a fois a, plusse b fois b. Question a : que dit le lutin, pour a égale six et b égale huit ? Question b : quel théorème ce programme utilise-t-il ?',
      champs: [{ q: 'a', lab: 'Le lutin dit :', rep: ['10'], court: true }, { q: 'b', lab: 'Le théorème :', choix: ['Pythagore', 'Thalès'], rep: 'Pythagore' }],
      indices: ['a × a, c’est a².', 'Calcule 6 × 6 + 8 × 8, puis la racine carrée.'],
      correction: [
        { q: 'a', h: R('a × a + b × b = 6 × 6 + 8 × 8 = 36 + 64 = 100', 'le programme calcule a² + b²') + R('h = √100 = 10', 'puis la racine carrée'), v: 'Correction. Le programme calcule six fois six, plusse huit fois huit, égale trente-six plusse soixante-quatre, égale cent. Puis la racine carrée de cent, égale dix. Le lutin dit dix.' },
        { q: 'b', h: R('h² = a² + b²', 'c’est l’égalité de Pythagore : h est l’hypoténuse'), v: 'Le programme calcule h tel que h au carré égale a au carré plusse b au carré : c’est le théorème de Pythagore, et h est l’hypoténuse.' }],
      cc: 'a) Le lutin dit 10. b) Le programme utilise le théorème de Pythagore.' },
    { type: 'exo', rub: 'tableur', titre: 'La formule RACINE',
      enonce: `<div class="tableur"><div class="fx"><span>fx</span>=RACINE(A2^2+B2^2)</div>
        <table><tr><th></th><th>A</th><th>B</th><th>C</th></tr><tr><th>1</th><td>côté 1</td><td>côté 2</td><td>hypoténuse</td></tr><tr><th>2</th><td>5</td><td>12</td><td class="sel">=RACINE(A2^2+B2^2)</td></tr><tr><th>3</th><td>8</td><td>15</td><td></td></tr></table></div>
        <p>On tape la formule dans la case C2, puis on la recopie vers le bas en C3.</p><p><span class="q">a)</span> Qu’affiche la case C2 ?</p><p><span class="q">b)</span> Qu’affiche la case C3 ?</p>`,
      v: 'Tableur. Dans la case C2, on tape : égale RACINE de A2 au carré plusse B2 au carré. Puis on recopie la formule vers le bas, en C3. Question a : qu’affiche la case C2 ? Question b : qu’affiche la case C3 ?',
      champs: [{ q: 'a', lab: 'La case C2 affiche :', rep: ['13'], court: true }, { q: 'b', lab: 'La case C3 affiche :', rep: ['17'], court: true }],
      indices: ['A2^2 veut dire A2 au carré.', 'Pour C2 : 5² + 12² = 25 + 144.', 'En C3, la formule devient =RACINE(A3^2+B3^2).'],
      correction: [
        { q: 'a', h: R('5² + 12² = 25 + 144 = 169', 'la formule calcule A2² + B2²') + R('√169 = 13', 'puis RACINE donne la racine carrée'), v: 'Correction. La formule calcule cinq au carré plusse douze au carré, égale vingt-cinq plusse cent quarante-quatre, égale cent soixante-neuf. Puis RACINE donne la racine carrée : treize. La case C2 affiche treize.' },
        { q: 'b', h: R('=RACINE(A3^2+B3^2)', 'en recopiant, le 2 devient 3') + R('8² + 15² = 64 + 225 = 289 et √289 = 17', 'même calcul'), v: 'En recopiant vers le bas, la formule devient : égale RACINE de A3 au carré plusse B3 au carré. On calcule huit au carré, plusse quinze au carré. Cela donne soixante-quatre plusse deux cent vingt-cinq, égale deux cent quatre-vingt-neuf. La racine carrée de deux cent quatre-vingt-neuf est dix-sept, donc la case C3 affiche dix-sept.' }],
      cc: 'a) La case C2 affiche 13. b) La case C3 affiche 17.' },
  ] };

  // figure guidée : EFG rectangle en G, EF = 13, FG = 5
  const efg = (k) => tri('GFE', [5, 12, 13], { droit: k >= 1 ? 'G' : null, hyp: k >= 2 ? ['EF'] : [], lab: { EF: '13 cm', FG: '5 cm', EG: k >= 6 ? '12 cm' : '?' }, alt: 'Triangle EFG, EF = 13 cm, FG = 5 cm' });
  const lignesEFG = [['Je sais que le triangle EFG est rectangle en G.', 'on vérifie que le triangle est rectangle'], ['Son hypoténuse est le côté [EF].', 'le côté opposé à l’angle droit'], CONDL, ['D’après le théorème de Pythagore, on a : EF² = EG² + FG²', 'l’égalité avec les lettres'], ['13² = EG² + 5², soit 169 = EG² + 25', 'on remplace et on calcule les carrés'], ['EG² = 169 − 25 = 144', 'on isole EG² : on soustrait'], ['EG = √144 = 12 cm', 'le nombre positif dont le carré est 144']];
  X[4] = { titre: 'Calculer un côté de l’angle droit', items: [
    { type: 'lecon', rub: 'lecon', parties: ['E'] },
    { type: 'flash', rub: 'flash', titre: 'Questions flash', consigne: 'Vrai ou faux ? Tu as 10 secondes par question.', duree: 10, questions: [
      { q: 'Pour calculer un côté de l’angle droit, on additionne les carrés.', rep: false, expl: 'On soustrait : côté² = hypoténuse² − autre côté².' },
      { q: 'Si 100 = AB² + 36, alors AB² = 64.', rep: true, expl: 'AB² = 100 − 36 = 64.', v: 'Si cent égale AB au carré plusse trente-six, alors AB au carré égale soixante-quatre. Vrai, ou faux ?' },
      { q: 'Un côté de l’angle droit peut être plus long que l’hypoténuse.', rep: false, expl: 'L’hypoténuse est toujours le plus grand côté : si on trouve plus long, on s’est trompé.' },
      { q: 'Si EG² = 144, alors EG = 12.', rep: true, expl: '12² = 144, donc EG = √144 = 12.', v: 'Si EG au carré égale cent quarante-quatre, alors EG égale douze. Vrai, ou faux ?' }] },
    { type: 'guide', rub: 'guide', titre: 'Le triangle EFG', enonce: '<p>Le triangle EFG est rectangle en G, avec EF = 13 cm et FG = 5 cm. Calcule EG.</p>',
      v: 'Exercice guidé. Le triangle EFG est rectangle en G, avec EF égale treize centimètres, et FG égale cinq centimètres. Calcule EG.',
      vis: pasVis(efg, lignesEFG, [0, 1, 2, 3, 4, 6, 7]),
      etapes: [
        { q: 'Le triangle EFG est rectangle en quel point ?', rep: ['G'], k: 1, texte: true, aide: 'On lit « rectangle en G ».' },
        { q: 'Quelle est son hypoténuse ?', rep: seg('EF'), k: 2, texte: true, aide: 'Le côté sans la lettre G : ici on connaît sa longueur, 13 cm.' },
        Object.assign({ k: 3 }, CHOIX),
        { q: 'Écris l’égalité de Pythagore.', rep: eg('EF', 'EG', 'FG'), k: 4, touches: T2, place: 'EF² = …', aide: 'EF² = EG² + FG².' },
        { q: 'On isole EG² : EG² = 13² − 5² = ?', rep: ['144'], k: 5, aide: '169 − 25.' },
        { q: 'EG = ? (en cm)', rep: ['12', '√144', '12cm'], k: 6, touches: ['√'], aide: '12 × 12 = 144.' }],
      fin: FIN,
      cc: 'Donc EG mesure 12 cm.' },
    { type: 'exo', rub: 'exo', titre: 'Exercice 1', ceinture: 'jaune',
      enonce: tri('UVW', [5, Math.sqrt(56), 9], { droit: 'U', hyp: ['VW'], lab: { UV: '5 cm', VW: '9 cm', UW: '?' }, alt: 'Triangle UVW rectangle en U' }) + '<p>UVW est un triangle rectangle en U tel que UV = 5 cm et VW = 9 cm. Calcule UW : donne la valeur exacte, puis l’arrondi au dixième.</p>',
      v: 'Exercice un. UVW est un triangle rectangle en U, tel que UV égale cinq centimètres, et VW égale neuf centimètres. Calcule UW. Donne la valeur exacte, puis l’arrondi au dixième.',
      champs: [
        { q: 'a', lab: 'L’égalité de Pythagore :', rep: eg('VW', 'UV', 'UW').concat(eg('WV', 'UV', 'UW'), eg('VW', 'VU', 'WU')), touches: T2, place: 'VW² = …' },
        { q: 'b', lab: 'UW² =', rep: ['56'], court: true },
        { q: 'c', lab: 'Valeur exacte : UW =', rep: ['√56', '√56cm'], touches: ['√'] },
        { q: 'd', lab: 'Arrondi au dixième : UW ≈', rep: ['7,5', '7,5cm'], court: true }],
      indices: ['L’angle droit est en U : l’hypoténuse est [VW], et on connaît sa longueur.', '9² = UV² + UW², donc UW² = 81 − 25.', '√56 = 7,48… : arrondis au dixième.'],
      correction: [
        { q: 'a', h: R('Je sais que le triangle UVW est rectangle en U.', 'on vérifie que le triangle est rectangle') + R('Son hypoténuse est le côté [VW].', 'le côté opposé à l’angle droit') + COND + R('D’après le théorème de Pythagore : VW² = UV² + UW²', 'l’égalité'), v: 'Correction. Je sais que le triangle UVW est rectangle en U. Son hypoténuse est le côté VW. Les conditions sont réunies pour appliquer le théorème de Pythagore. D’après le théorème de Pythagore, VW au carré, égale UV au carré, plusse UW au carré.' },
        { q: 'b', h: R('9² = 5² + UW², soit 81 = 25 + UW²', 'on remplace') + R('UW² = 81 − 25 = 56', 'on isole UW² : on soustrait'), v: 'On remplace : quatre-vingt-un, égale vingt-cinq plusse UW au carré. On isole UW au carré : UW au carré, égale quatre-vingt-un moins vingt-cinq, égale cinquante-six.' },
        { q: 'c', h: R('UW = √56 cm', 'valeur exacte'), v: 'UW égale racine carrée de cinquante-six centimètres : c’est la valeur exacte.' },
        { q: 'd', h: R('UW ≈ 7,5 cm', 'la calculatrice affiche 7,48… ; le chiffre des centièmes est 8'), v: 'La calculatrice affiche sept virgule quarante-huit, et la suite. Le chiffre des centièmes est huit, donc on arrondit à sept virgule cinq centimètres.' }],
      cc: 'Donc UW = √56 cm, soit environ 7,5 cm.' },
    { type: 'exo', rub: 'exo', titre: 'Exercice 2', ceinture: 'orange',
      enonce: '<p>ABC est rectangle en B, avec AB = 6,4 cm et AC = 8 cm. Sami écrit : <strong>« BC² = 6,4² + 8² = 104,96 donc BC ≈ 10,2 cm »</strong>.</p><p><span class="q">a)</span> Pourquoi Sami aurait-il dû se méfier de son résultat ?</p><p><span class="q">b)</span> Calcule la bonne longueur BC.</p>',
      v: 'Exercice deux. ABC est rectangle en B, avec AB égale six virgule quatre centimètres, et AC égale huit centimètres. Sami trouve que BC est environ égal à dix virgule deux centimètres. Question a : pourquoi Sami aurait-il dû se méfier de son résultat ? Question b : calcule la bonne longueur BC.',
      champs: [
        { q: 'a', lab: 'Sami aurait dû se méfier car :', choix: ['BC est plus grand que l’hypoténuse AC', 'BC n’est pas un nombre entier'], rep: 'BC est plus grand que l’hypoténuse AC' },
        { q: 'b', lab: 'BC = (en cm)', rep: ['4,8', '4,8cm'], court: true }],
      indices: ['L’angle droit est en B : quelle est l’hypoténuse ?', 'BC² = 8² − 6,4² = 64 − 40,96.'],
      correction: [
        { q: 'a', h: R('L’angle droit est en B, donc l’hypoténuse est [AC] = 8 cm.', 'le côté sans la lettre B') + R('BC ≈ 10,2 cm serait plus grand que 8 cm : c’est impossible.', 'l’hypoténuse est le plus grand côté'), v: 'Correction. L’angle droit est en B, donc l’hypoténuse est AC, qui mesure huit centimètres. Sami trouve dix virgule deux centimètres, plus grand que l’hypoténuse : c’est impossible.' },
        { q: 'b', h: R('AC² = AB² + BC², donc BC² = 8² − 6,4²', 'on isole BC²') + R('BC² = 64 − 40,96 = 23,04', 'on calcule') + R('BC = √23,04 = 4,8 cm', 'le nombre positif dont le carré est 23,04'), v: 'AC au carré égale AB au carré plusse BC au carré, donc BC au carré égale huit au carré moins six virgule quatre au carré, égale vingt-trois virgule zéro quatre. Donc BC égale quatre virgule huit centimètres.' }],
      cc: 'a) Le résultat de Sami est plus grand que l’hypoténuse. b) BC = 4,8 cm.' },
  ] };

  // figure guidée : IJK, IJ = 9,7, JK = 7,2, IK = 6,5
  const ijk = (k) => tri('KJI', [7.2, 6.5, 9.7], { droit: k >= 5 ? 'K' : null, hyp: k >= 1 ? ['IJ'] : [], lab: { IJ: '9,7', JK: '7,2', IK: '6,5' }, alt: 'Triangle IJK, IJ = 9,7, JK = 7,2, IK = 6,5' });
  const lignesIJK = [['Le plus grand côté est [IJ].', 'la possible hypoténuse'], ['D’une part : IJ² = 9,7² = 94,09', 'le carré du plus grand côté, seul'], ['D’autre part : IK² + JK² = 6,5² + 7,2² = 42,25 + 51,84 = 94,09', 'la somme des deux autres carrés, à part'],
    ['On en déduit que IJ² = IK² + JK².', 'les deux résultats sont égaux'], ['D’après la réciproque du théorème de Pythagore, le triangle IJK est rectangle en K.', 'l’angle droit est en face du plus grand côté']];
  X[5] = { titre: 'Le triangle est-il rectangle ?', items: [
    { type: 'lecon', rub: 'lecon', parties: ['F', 'G'] },
    { type: 'flash', rub: 'flash', titre: 'Questions flash', consigne: 'Vrai ou faux ? Tu as 10 secondes par question.', duree: 10, questions: [
      { q: 'Un triangle de côtés 3, 4 et 5 est rectangle.', rep: true, expl: '5² = 25 et 3² + 4² = 9 + 16 = 25 : d’après la réciproque, il est rectangle.', v: 'Un triangle de côtés trois, quatre et cinq est rectangle. Vrai, ou faux ?' },
      { q: 'Un triangle de côtés 4, 5 et 6 est rectangle.', rep: false, expl: '6² = 36 et 4² + 5² = 16 + 25 = 41 : 36 ≠ 41, il n’est pas rectangle.', v: 'Un triangle de côtés quatre, cinq et six est rectangle. Vrai, ou faux ?' },
      { q: 'Pour la réciproque, on compare le carré du plus grand côté à la somme des deux autres carrés.', rep: true, expl: 'Oui : d’une part le plus grand côté au carré, d’autre part la somme des deux autres.' },
      { q: 'Si l’égalité est fausse, on cite la réciproque du théorème de Pythagore.', rep: false, expl: 'Si l’égalité est fausse, on cite la contraposée : le triangle n’est pas rectangle.' }] },
    { type: 'guide', rub: 'guide', titre: 'Le triangle IJK', enonce: '<p>IJK est un triangle tel que IJ = 9,7 cm, JK = 7,2 cm et IK = 6,5 cm. Est-il rectangle ?</p>',
      v: 'Exercice guidé. IJK est un triangle tel que IJ égale neuf virgule sept centimètres, JK égale sept virgule deux centimètres, et IK égale six virgule cinq centimètres. Est-il rectangle ?',
      vis: pasVis(ijk, lignesIJK, [0, 1, 2, 3, 4, 5]),
      etapes: [
        { q: 'Quel est le plus grand côté ?', rep: seg('IJ'), k: 1, texte: true, aide: 'Compare 9,7 ; 7,2 et 6,5.' },
        { q: 'D’une part : IJ² = 9,7² = ?', rep: ['94,09'], k: 2, aide: '9,7 × 9,7.' },
        { q: 'D’autre part : IK² + JK² = 6,5² + 7,2² = ?', rep: ['94,09'], k: 3, aide: '42,25 + 51,84.' },
        { q: 'Les deux résultats sont-ils égaux ? (oui ou non)', rep: ['oui'], k: 4, texte: true, aide: 'Compare 94,09 et 94,09.' },
        { q: 'Le triangle est donc rectangle en quel point ?', rep: ['K'], k: 5, texte: true, aide: 'Le sommet en face du plus grand côté [IJ].' }],
      fin: FIN, cc: 'Donc le triangle IJK est rectangle en K.' },
    { type: 'exo', rub: 'exo', titre: 'Exercice 1', ceinture: 'jaune',
      enonce: tri('RTS', [8, 10, 14], { lab: { RS: '10 cm', ST: '14 cm', RT: '8 cm' }, alt: 'Triangle RST, RS = 10 cm, ST = 14 cm, RT = 8 cm' }) + '<p>RST est un triangle tel que RS = 10 cm, ST = 14 cm et RT = 8 cm. Ce triangle est-il rectangle ?</p>',
      v: 'Exercice un. RST est un triangle tel que RS égale dix centimètres, ST égale quatorze centimètres, et RT égale huit centimètres. Ce triangle est-il rectangle ?',
      champs: [
        { q: 'a', lab: 'D’une part : ST² =', rep: ['196'], court: true },
        { q: 'b', lab: 'D’autre part : RS² + RT² =', rep: ['164'], court: true },
        { q: 'c', lab: 'Le triangle RST est-il rectangle ?', choix: ['Oui', 'Non'], rep: 'Non' }],
      indices: ['Le plus grand côté est [ST].', '10² + 8² = 100 + 64.', 'Les deux résultats sont-ils égaux ?'],
      correction: [
        { q: 'a', h: R('Le plus grand côté est [ST].', 'la possible hypoténuse') + R('D’une part : ST² = 14² = 196', 'le carré du plus grand côté, seul'), v: 'Correction. Le plus grand côté est ST. D’une part, ST au carré égale quatorze au carré, égale cent quatre-vingt-seize.' },
        { q: 'b', h: R('D’autre part : RS² + RT² = 10² + 8² = 100 + 64 = 164', 'la somme des deux autres carrés'), v: 'D’autre part, RS au carré plusse RT au carré, égale cent plusse soixante-quatre, égale cent soixante-quatre.' },
        { q: 'c', h: R('On en déduit que ST² ≠ RS² + RT².', 'les deux résultats sont différents') + R('L’égalité de Pythagore n’est pas vérifiée, donc d’après la contraposée du théorème de Pythagore, le triangle RST n’est pas rectangle.', 'on conclut avec la contraposée'), v: 'On en déduit que ST au carré n’est pas égal à RS au carré plusse RT au carré. L’égalité de Pythagore n’est pas vérifiée, donc d’après la contraposée du théorème de Pythagore, le triangle RST n’est pas rectangle.' }],
      cc: 'Donc le triangle RST n’est pas rectangle.' },
    { type: 'exo', rub: 'exo', titre: 'Exercice 2', ceinture: 'orange',
      enonce: tri('ABC', [7, 11, 9], { lab: { AB: '7 cm', BC: '9 cm', AC: '11 cm' }, alt: 'Triangle ABC, AB = 7 cm, BC = 9 cm, AC = 11 cm' }) + '<p>ABC est un triangle tel que AB = 7 cm, BC = 9 cm et AC = 11 cm. Ce triangle est-il rectangle ?</p>',
      v: 'Exercice deux. ABC est un triangle tel que AB égale sept centimètres, BC égale neuf centimètres, et AC égale onze centimètres. Ce triangle est-il rectangle ?',
      champs: [
        { q: 'a', lab: 'D’une part : AC² =', rep: ['121'], court: true },
        { q: 'b', lab: 'D’autre part : AB² + BC² =', rep: ['130'], court: true },
        { q: 'c', lab: 'Le triangle ABC est-il rectangle ?', choix: ['Oui', 'Non'], rep: 'Non' }],
      indices: ['Le plus grand côté est [AC].', '7² + 9² = 49 + 81.'],
      correction: [
        { q: 'a', h: R('Le plus grand côté est [AC].', 'la possible hypoténuse') + R('D’une part : AC² = 11² = 121', 'le carré du plus grand côté, seul'), v: 'Correction. Le plus grand côté est AC. D’une part, AC au carré égale onze au carré, égale cent vingt et un.' },
        { q: 'b', h: R('D’autre part : AB² + BC² = 7² + 9² = 49 + 81 = 130', 'la somme des deux autres carrés'), v: 'D’autre part, AB au carré plusse BC au carré, égale quarante-neuf plusse quatre-vingt-un, égale cent trente.' },
        { q: 'c', h: R('On en déduit que AC² ≠ AB² + BC².', 'les deux résultats sont différents') + R('L’égalité de Pythagore n’est pas vérifiée, donc d’après la contraposée du théorème de Pythagore, le triangle ABC n’est pas rectangle.', 'on conclut avec la contraposée'), v: 'On en déduit que AC au carré n’est pas égal à AB au carré plusse BC au carré. Donc d’après la contraposée du théorème de Pythagore, le triangle ABC n’est pas rectangle.' }],
      cc: 'Donc le triangle ABC n’est pas rectangle.' },
    { type: 'exo', rub: 'calc', titre: 'Vérifier avec la calculatrice',
      enonce: '<p>DEF est un triangle tel que DE = 2,8 cm, EF = 4,5 cm et DF = 5,3 cm. Avec ta calculatrice :</p><p><span class="q">a)</span> calcule DF² ;</p><p><span class="q">b)</span> calcule DE² + EF² ;</p><p><span class="q">c)</span> conclus.</p>',
      v: 'Avec ta calculatrice. DEF est un triangle tel que DE égale deux virgule huit centimètres, EF égale quatre virgule cinq centimètres, et DF égale cinq virgule trois centimètres. Question a : calcule DF au carré. Question b : calcule DE au carré plusse EF au carré. Question c : conclus.',
      champs: [
        { q: 'a', lab: 'DF² =', rep: ['28,09'], court: true },
        { q: 'b', lab: 'DE² + EF² =', rep: ['28,09'], court: true },
        { q: 'c', lab: 'Le triangle DEF est :', choix: ['rectangle en D', 'rectangle en E', 'rectangle en F', 'pas rectangle'], rep: 'rectangle en E' }],
      indices: ['Tape 5,3 puis la touche x², puis EXE.', 'L’angle droit est en face du plus grand côté [DF].'],
      aide: { bouton: 'Voir les touches', html: '<p>Pour DE² + EF² : on tape 2,8, la touche x², puis +, puis 4,5, la touche x², puis EXE.</p><p class="touches"><kbd>2</kbd><kbd>,</kbd><kbd>8</kbd><kbd>x²</kbd><kbd>+</kbd><kbd>4</kbd><kbd>,</kbd><kbd>5</kbd><kbd>x²</kbd><kbd>EXE</kbd></p>' },
      correction: [
        { q: 'a', h: R('D’une part : DF² = 5,3² = 28,09', 'le carré du plus grand côté, seul'), v: 'Correction. Le plus grand côté est DF. D’une part, DF au carré, égale cinq virgule trois au carré, égale vingt-huit virgule zéro neuf.' },
        { q: 'b', h: R('D’autre part : DE² + EF² = 2,8² + 4,5² = 7,84 + 20,25 = 28,09', 'la somme des deux autres carrés'), v: 'D’autre part, DE au carré plusse EF au carré, égale sept virgule quatre-vingt-quatre, plusse vingt virgule vingt-cinq, égale vingt-huit virgule zéro neuf.' },
        { q: 'c', h: R('On en déduit que DF² = DE² + EF².', 'les deux résultats sont égaux') + R('D’après la réciproque du théorème de Pythagore, le triangle DEF est rectangle en E.', 'E est en face de [DF]'), v: 'On en déduit que DF au carré égale DE au carré plusse EF au carré. D’après la réciproque du théorème de Pythagore, le triangle DEF est rectangle en E, le sommet en face du plus grand côté.' }],
      cc: 'Donc le triangle DEF est rectangle en E.' },
  ] };

  // échelle contre un mur : H pied du mur, S haut de l'échelle, P pied de l'échelle
  const echelle = (k) => fig({ P: { H: [0, 0], S: [0, 4], P: [0.9, 0] }, seg: ['HS', 'HP', 'PS'], droit: k >= 1 ? [['H', 'S', 'P']] : [], hyp: k >= 2 ? ['PS'] : [],
    lab: { PS: '4,1 m', HS: '4 m', HP: k >= 6 ? '0,9 m' : '?' }, w: 120, h: 170, alt: 'Échelle [PS] de 4,1 m contre un mur [HS] de 4 m',
    extra: (T) => { const a = T('H'), b = T('S'); return `<rect x="${a[0] - 14}" y="${b[1] - 6}" width="14" height="${a[1] - b[1] + 6}" fill="#E8DCCB"/><line x1="${a[0] - 30}" y1="${a[1]}" x2="${a[0] + 90}" y2="${a[1]}" stroke="#8B5A2B" stroke-width="3"/>`; } });
  const lignesEch = [['Le mur est perpendiculaire au sol, donc le triangle PHS est rectangle en H.', 'on justifie l’angle droit'], ['Son hypoténuse est [PS], l’échelle.', 'le côté opposé à l’angle droit'], CONDL,
    ['D’après le théorème de Pythagore : PS² = PH² + HS²', 'l’égalité'], ['4,1² = PH² + 4², soit 16,81 = PH² + 16', 'on remplace'], ['PH² = 16,81 − 16 = 0,81', 'on isole PH²'], ['PH = √0,81 = 0,9 m', 'le nombre positif dont le carré est 0,81']];
  // parcours en triangle rectangle
  const parcours = fig({ P: { D: [0, 0], E: [160, 0], F: [0, 120] }, seg: ['DE', 'EF', 'FD'], droit: [['D', 'E', 'F']], hyp: ['EF'], lab: { DE: '160 m', DF: '120 m', EF: '?' }, alt: 'Parcours DEF rectangle en D, DE = 160 m, DF = 120 m' });
  // figure MICA : triangle MIC rectangle en I, et triangle MAC
  const mica = fig({ P: { M: [0, 0], C: [15, 0], I: [9.6, -7.2], A: [0, 20] }, seg: ['MC', 'CI', 'IM', 'MA', 'AC'], droit: [['I', 'M', 'C']], lab: { MI: '12', IC: '9', MA: '20', AC: '25' }, h: 160, alt: 'Triangle MIC rectangle en I, MI = 12, IC = 9 ; triangle MAC, MA = 20, AC = 25' });
  X[6] = { titre: 'Problèmes avec Pythagore', items: [
    { type: 'lecon', rub: 'lecon', parties: ['H'] },
    { type: 'flash', rub: 'flash', titre: 'Questions flash', consigne: 'Vrai ou faux ? Tu as 10 secondes par question.', duree: 10, questions: [
      { q: 'Un mur vertical et le sol horizontal forment un angle droit.', rep: true, expl: 'Le mur est perpendiculaire au sol : on peut utiliser le théorème de Pythagore.' },
      { q: 'On peut arrondir une longueur avant de la réutiliser dans un calcul.', rep: false, expl: 'On garde la valeur exacte jusqu’au bout, sinon le résultat final devient faux.' },
      { q: 'La diagonale d’un rectangle de 6 cm sur 8 cm mesure 10 cm.', rep: true, expl: 'Le rectangle a des angles droits : d² = 6² + 8² = 100, donc d = 10 cm.', v: 'La diagonale d’un rectangle de six centimètres sur huit centimètres mesure dix centimètres. Vrai, ou faux ?' },
      { q: '« BC² = 23,04 donc BC = 23,04 cm »', rep: false, expl: 'On a oublié la racine carrée : BC = √23,04 = 4,8 cm.', v: 'BC au carré égale vingt-trois virgule zéro quatre, donc BC égale vingt-trois virgule zéro quatre centimètres. Vrai, ou faux ?' }] },
    { type: 'guide', rub: 'guide', titre: 'L’échelle', enonce: '<p>Une échelle de <strong>4,1 m</strong> est posée contre un mur vertical. Son sommet S touche le mur à <strong>4 m</strong> du sol. À quelle distance du mur est le pied P de l’échelle ?</p>',
      v: 'Exercice guidé. Une échelle de quatre virgule un mètres est posée contre un mur vertical. Son sommet touche le mur à quatre mètres du sol. À quelle distance du mur est le pied de l’échelle ?',
      vis: pasVis(echelle, lignesEch, [0, 1, 2, 3, 4, 6, 7]),
      etapes: [
        { q: 'Le triangle PHS est rectangle en quel point ?', rep: ['H'], k: 1, texte: true, aide: 'H est le pied du mur : le mur est perpendiculaire au sol.' },
        { q: 'Quelle est son hypoténuse ?', rep: seg('PS'), k: 2, texte: true, aide: 'C’est l’échelle : le côté sans la lettre H.' },
        Object.assign({ k: 3 }, CHOIX),
        { q: 'Écris l’égalité de Pythagore.', rep: eg('PS', 'PH', 'HS'), k: 4, touches: T2, place: 'PS² = …', aide: 'PS² = PH² + HS².' },
        { q: 'On isole PH² : PH² = 4,1² − 4² = ?', rep: ['0,81'], k: 5, aide: '16,81 − 16.' },
        { q: 'PH = ? (en m)', rep: ['0,9', '√0,81', '0,9m'], k: 6, touches: ['√'], aide: '0,9 × 0,9 = 0,81.' }],
      fin: FIN, cc: 'Donc le pied de l’échelle est à 0,9 m du mur.' },
    { type: 'exo', rub: 'exo', titre: 'Exercice 1', ceinture: 'jaune',
      enonce: parcours + '<p>Pour la course du collège, le parcours DEF est un triangle rectangle en D, avec DE = 160 m et DF = 120 m.</p><p><span class="q">a)</span> Calcule la longueur EF.</p><p><span class="q">b)</span> Quelle est la longueur d’un tour de parcours ?</p>',
      v: 'Exercice un. Pour la course du collège, le parcours DEF est un triangle rectangle en D, avec DE égale cent soixante mètres, et DF égale cent vingt mètres. Question a : calcule la longueur EF. Question b : quelle est la longueur d’un tour de parcours ?',
      champs: [{ q: 'a', lab: 'EF = (en m)', rep: ['200', '200m'], court: true }, { q: 'b', lab: 'Un tour = (en m)', rep: ['480', '480m'], court: true }],
      indices: ['Le triangle est rectangle en D : l’hypoténuse est [EF].', 'EF² = 160² + 120² = 25 600 + 14 400.', 'Un tour : DE + EF + FD.'],
      correction: [
        { q: 'a', h: R('Je sais que le triangle DEF est rectangle en D.', 'on vérifie que le triangle est rectangle') + R('Son hypoténuse est le côté [EF].', 'le côté opposé à l’angle droit') + COND + R('D’après le théorème de Pythagore : EF² = DE² + DF²', 'l’égalité'), v: 'Correction. Je sais que le triangle DEF est rectangle en D. Son hypoténuse est EF. Les conditions sont réunies pour appliquer le théorème de Pythagore. D’après le théorème de Pythagore, EF au carré égale DE au carré plusse DF au carré.' },
        { q: 'a', h: R('EF² = 160² + 120² = 25 600 + 14 400 = 40 000', 'on remplace et on calcule') + R('EF = √40 000 = 200 m', 'car 200² = 40 000'), v: 'EF au carré, égale vingt-cinq mille six cents plusse quatorze mille quatre cents, égale quarante mille. Donc EF égale racine carrée de quarante mille, égale deux cents mètres.' },
        { q: 'b', h: R('DE + EF + FD = 160 + 200 + 120 = 480 m', 'le périmètre du triangle'), v: 'Un tour, c’est le périmètre du triangle : cent soixante plusse deux cents plusse cent vingt, égale quatre cent quatre-vingts mètres.' }],
      cc: 'a) EF mesure 200 m. b) Un tour de parcours mesure 480 m.' },
    { type: 'exo', rub: 'exo', titre: 'Exercice 2', ceinture: 'verte',
      enonce: mica + '<p>Sur la figure, le triangle MIC est rectangle en I, avec MI = 12 cm et IC = 9 cm. De plus, MA = 20 cm et AC = 25 cm.</p><p><span class="q">a)</span> Calcule MC.</p><p><span class="q">b)</span> Le triangle MAC est-il rectangle ? Justifie.</p>',
      v: 'Exercice deux. Sur la figure, le triangle MIC est rectangle en I, avec MI égale douze centimètres et IC égale neuf centimètres. De plus, MA égale vingt centimètres et AC égale vingt-cinq centimètres. Question a : calcule MC. Question b : le triangle MAC est-il rectangle ? Justifie.',
      champs: [
        { q: 'a', lab: 'MC = (en cm)', rep: ['15', '15cm'], court: true },
        { q: 'b', lab: 'Le triangle MAC est :', choix: ['rectangle en M', 'rectangle en A', 'rectangle en C', 'pas rectangle'], rep: 'rectangle en M' }],
      indices: ['Dans MIC rectangle en I, l’hypoténuse est [MC].', 'MC² = 12² + 9² = 144 + 81.', 'Pour MAC : le plus grand côté est [AC]. Compare AC² et MA² + MC².'],
      correction: [
        { q: 'a', h: R('Je sais que le triangle MIC est rectangle en I. Son hypoténuse est [MC].', 'on vérifie, puis on repère l’hypoténuse') + COND + R('D’après le théorème de Pythagore : MC² = MI² + IC²', 'l’égalité'), v: 'Correction. Je sais que le triangle MIC est rectangle en I. Son hypoténuse est MC. Les conditions sont réunies pour appliquer le théorème de Pythagore. D’après le théorème de Pythagore, MC au carré égale MI au carré plusse IC au carré.' },
        { q: 'a', h: R('MC² = 12² + 9² = 144 + 81 = 225', 'on remplace et on calcule') + R('MC = √225 = 15 cm', 'le nombre positif dont le carré est 225'), v: 'MC au carré, égale cent quarante-quatre plusse quatre-vingt-un, égale deux cent vingt-cinq. Donc MC égale quinze centimètres.' },
        { q: 'b', h: R('Dans MAC, le plus grand côté est [AC].', 'la possible hypoténuse') + R('D’une part : AC² = 25² = 625', 'seul') + R('D’autre part : MA² + MC² = 20² + 15² = 400 + 225 = 625', 'à part'), v: 'Dans le triangle MAC, le plus grand côté est AC. D’une part, AC au carré égale six cent vingt-cinq. D’autre part, MA au carré plusse MC au carré, égale quatre cents plusse deux cent vingt-cinq, égale six cent vingt-cinq.' },
        { q: 'b', h: R('On en déduit que AC² = MA² + MC².', 'égaux') + R('D’après la réciproque du théorème de Pythagore, le triangle MAC est rectangle en M.', 'M est en face de [AC]'), v: 'On en déduit que AC au carré égale MA au carré plusse MC au carré. D’après la réciproque du théorème de Pythagore, le triangle MAC est rectangle en M.' }],
      cc: 'a) MC = 15 cm. b) Le triangle MAC est rectangle en M.' },
    { type: 'exo', rub: 'exo', titre: 'Exercice 3 · comme au brevet', ceinture: 'bleue',
      enonce: '<p>Une rampe d’accès monte de <strong>1,4 m</strong> sur une longueur au sol de <strong>4,8 m</strong>. Le sol est horizontal et le mur vertical.</p><p><span class="q">a)</span> Calcule la longueur de la rampe.</p><p><span class="q">b)</span> Une rampe est conseillée si sa longueur dépasse 4,5 m. Cette rampe est-elle conseillée ?</p>',
      v: 'Exercice trois, comme au brevet. Une rampe d’accès monte de un virgule quatre mètre, sur une longueur au sol de quatre virgule huit mètres. Le sol est horizontal et le mur vertical. Question a : quelle est la longueur de la rampe ? Question b : une rampe est conseillée si sa longueur dépasse quatre virgule cinq mètres. Cette rampe est-elle conseillée ?',
      champs: [{ q: 'a', lab: 'Longueur de la rampe (en m) :', rep: ['5', '5m'], court: true }, { q: 'b', lab: 'Est-elle conseillée ?', choix: ['Oui', 'Non'], rep: 'Oui' }],
      indices: ['Le sol et le mur forment un angle droit : la rampe est l’hypoténuse.', 'ℓ² = 4,8² + 1,4² = 23,04 + 1,96.'],
      correction: [
        { q: 'a', h: R('Le sol est perpendiculaire au mur : le triangle formé est rectangle. La rampe est son hypoténuse.', 'on justifie l’angle droit') + COND + R('D’après le théorème de Pythagore : ℓ² = 4,8² + 1,4²', 'l’égalité'), v: 'Correction. Le sol est perpendiculaire au mur, donc le triangle formé est rectangle, et la rampe est son hypoténuse. Les conditions sont réunies pour appliquer le théorème de Pythagore. D’après le théorème de Pythagore, la longueur au carré égale quatre virgule huit au carré, plusse un virgule quatre au carré.' },
        { q: 'a', h: R('ℓ² = 23,04 + 1,96 = 25', 'on calcule') + R('ℓ = √25 = 5 m', 'le nombre positif dont le carré est 25'), v: 'La longueur au carré égale vingt-trois virgule zéro quatre, plusse un virgule quatre-vingt-seize, égale vingt-cinq. Donc la rampe mesure cinq mètres.' },
        { q: 'b', h: R('5 m &gt; 4,5 m', 'on compare'), v: 'Cinq mètres est plus grand que quatre virgule cinq mètres.' }],
      cc: 'a) La rampe mesure 5 m. b) Oui, elle dépasse 4,5 m : elle est conseillée.' },
  ] };

  // ---------- rédactions à compléter (attendues au brevet) ----------
  // trou : { rep, w (largeur), touches, grp (trous échangeables) } · menu : { choix, rep }
  const TL = ['²', '=', '+', '−', '√', '≈', '≠'];
  const Tr = (rep, o = {}) => Object.assign({ rep: [].concat(rep) }, o);
  const Li = (rep, w = 13) => Tr(rep, { w, touches: TL });          // une ligne entière à écrire
  const Ch = (choix, rep) => ({ choix, rep });
  const PYT = Ch(['Pythagore', 'Thalès'], 'Pythagore');
  const RECI = (rep) => Ch(['la réciproque', 'la contraposée'], rep), EST = (rep) => Ch(['est rectangle', 'n’est pas rectangle'], rep);
  const enRedac = (part, titre, o) => { const it = X[part].items.find(i => i.titre === titre); it.type = 'redac'; delete it.champs; if (part < 6) it.correction.forEach(e => delete e.q); Object.assign(it, o); };
  const enCahier = (part, titre, o) => { const it = X[part].items.find(i => i.titre === titre); it.type = 'cahier'; delete it.champs; Object.assign(it, o); };

  enRedac(3, 'Exercice 1', { lignes: [
    ['Je sais que le triangle KLM est rectangle en ', Tr('K', { w: 2.5 }), '.'],
    ['Son hypoténuse est le côté ', Tr(seg('LM'), { w: 3.5 }), '.'],
    ['Les conditions sont réunies pour appliquer le théorème de ', PYT, '.'],
    ['D’après le théorème de Pythagore, on a : ', Tr(eg('LM', 'KL', 'KM'), { w: 10, touches: T2 })],
    ['LM² = ', Tr('3,6', { grp: 'a' }), '² + ', Tr('4,8', { grp: 'a' }), '²'],
    ['LM² = ', Tr('12,96', { grp: 'b', w: 4.5 }), ' + ', Tr('23,04', { grp: 'b', w: 4.5 })],
    ['LM² = ', Tr('36')],
    ['LM = √', Tr('36'), ' = ', Tr('6'), ' cm'],
    ['Phrase réponse : la longueur LM mesure ', Tr('6'), ' cm.']] });
  enRedac(3, 'Exercice 2', { lignes: [
    ['Je sais que le triangle ABC est rectangle en ', Tr('B', { w: 2.5 }), '.'],
    ['Son hypoténuse est le côté ', Tr(seg('AC'), { w: 3.5 }), '.'],
    ['Les conditions sont réunies pour appliquer le théorème de ', PYT, '.'],
    ['D’après le théorème de Pythagore, on a : ', Tr(eg('AC', 'AB', 'BC'), { w: 10, touches: T2 })],
    [Li('AC²=5²+9²')],
    [Li('AC²=25+81=106')],
    [Li(['AC=√106', 'AC=√106cm'], 9), ' ← valeur exacte'],
    [Li(['AC≈10,3', 'AC≈10,3cm'], 9), ' ← arrondi au dixième'],
    ['Phrase réponse : la longueur AC mesure √', Tr('106'), ' cm, soit environ ', Tr('10,3'), ' cm.']] });
  enRedac(4, 'Exercice 1', { lignes: [
    ['Je sais que le triangle UVW est rectangle en ', Tr('U', { w: 2.5 }), '.'],
    ['Son hypoténuse est le côté ', Tr(seg('VW'), { w: 3.5 }), '.'],
    ['Les conditions sont réunies pour appliquer le théorème de ', PYT, '.'],
    ['D’après le théorème de Pythagore, on a : ', Tr(eg('VW', 'UV', 'UW'), { w: 10, touches: T2 })],
    ['', Tr('9'), '² = ', Tr('5'), '² + UW²'],
    ['', Tr('81'), ' = ', Tr('25'), ' + UW²'],
    ['UW² = ', Tr('81'), ' − ', Tr('25'), ' ← on isole UW² : on soustrait'],
    ['UW² = ', Tr('56')],
    ['UW = √', Tr('56'), ' cm ← valeur exacte'],
    ['UW ≈ ', Tr('7,5'), ' cm ← arrondi au dixième'],
    ['Phrase réponse : la longueur UW mesure √', Tr('56'), ' cm, soit environ ', Tr('7,5'), ' cm.']] });
  enRedac(5, 'Exercice 1', { lignes: [
    ['Le plus grand côté est ', Tr(seg('ST'), { w: 3.5 }), ' : c’est la possible hypoténuse.'],
    ['D’une part : ', Li('ST²=14²=196', 11)],
    ['D’autre part : ', Li('RS²+RT²=10²+8²=100+64=164', 17)],
    ['On en déduit que ', Li('ST²≠RS²+RT²', 11), '.'],
    ['Donc, d’après ', RECI('la contraposée'), ' du théorème de Pythagore, le triangle RST ', EST('n’est pas rectangle'), '.']] });
  enRedac(5, 'Exercice 2', { lignes: [
    ['Le plus grand côté est ', Tr(seg('AC'), { w: 3.5 }), ' : c’est la possible hypoténuse.'],
    ['D’une part : ', Li('AC²=11²=121', 11)],
    ['D’autre part : ', Li('AB²+BC²=7²+9²=49+81=130', 17)],
    ['On en déduit que ', Li('AC²≠AB²+BC²', 11), '.'],
    ['Donc, d’après ', RECI('la contraposée'), ' du théorème de Pythagore, le triangle ABC ', EST('n’est pas rectangle'), '.']] });
  enRedac(6, 'Exercice 1', { lignes: [
    ['a) Je sais que le triangle DEF est rectangle en ', Tr('D', { w: 2.5 }), '.'],
    ['Son hypoténuse est le côté ', Tr(seg('EF'), { w: 3.5 }), '.'],
    ['Les conditions sont réunies pour appliquer le théorème de ', PYT, '.'],
    ['D’après le théorème de Pythagore, on a : ', Tr(eg('EF', 'DE', 'DF'), { w: 10, touches: T2 })],
    [Li('EF²=160²+120²', 13)],
    [Li('EF²=25600+14400=40000', 16)],
    [Li(['EF=√40000=200', 'EF=√40000=200m'], 13)],
    ['b) Un tour = ', Li(['160+200+120=480', 'DE+EF+FD=160+200+120=480'], 13), ' m'],
    ['Phrase réponse : EF mesure ', Tr('200'), ' m et un tour de parcours mesure ', Tr('480'), ' m.']] });
  enRedac(6, 'Exercice 2', { lignes: [
    ['a) Je sais que le triangle MIC est rectangle en ', Tr('I', { w: 2.5 }), '.'],
    ['Son hypoténuse est le côté ', Tr(seg('MC'), { w: 3.5 }), '.'],
    ['Les conditions sont réunies pour appliquer le théorème de ', PYT, '.'],
    ['D’après le théorème de Pythagore, on a : ', Tr(eg('MC', 'MI', 'IC'), { w: 10, touches: T2 })],
    [Li('MC²=12²+9²=144+81=225', 16)],
    [Li(['MC=√225=15', 'MC=√225=15cm'], 12)],
    ['b) Le plus grand côté du triangle MAC est ', Tr(seg('AC'), { w: 3.5 }), ' : c’est la possible hypoténuse.'],
    ['D’une part : ', Li('AC²=25²=625', 11)],
    ['D’autre part : ', Li('MA²+MC²=20²+15²=400+225=625', 17)],
    ['On en déduit que ', Li('AC²=MA²+MC²', 11), '.'],
    ['Donc, d’après ', RECI('la réciproque'), ' du théorème de Pythagore, le triangle MAC ', EST('est rectangle'), ' en ', Tr('M', { w: 2.5 }), '.'],
    ['Phrase réponse : MC mesure ', Tr('15'), ' cm et le triangle MAC est rectangle en ', Tr('M', { w: 2.5 }), '.']] });
  enCahier(6, 'Exercice 3 · comme au brevet', { liste: [
    'écrit que le triangle est rectangle (le sol est perpendiculaire au mur) ;', 'nommé l’hypoténuse : la rampe ;', 'écrit que les conditions sont réunies pour appliquer le théorème de Pythagore ;',
    'cité le théorème et écrit l’égalité en commençant par l’hypoténuse ;', 'remplacé, calculé, puis pris la racine carrée ;', 'écrit l’unité (m) ;', 'fini par une phrase réponse pour a) et pour b).'] });

  // ---------- QCM et DS ----------
  if (typeof BILANS !== 'undefined') BILANS['3e-3'] = {
    qcm: [
      { q: '√81 = ', o: ['9', '40,5', '−9'], r: 0, e: '9² = 81 et 9 est positif.', cc: '√81 = 9.' },
      { q: '√20 est compris entre :', o: ['2 et 3', '4 et 5', '19 et 21'], r: 1, e: '16 &lt; 20 &lt; 25, donc 4 &lt; √20 &lt; 5.', cc: '√20 est entre 4 et 5.' },
      { q: '√−16 = ', o: ['−4', '4', 'n’existe pas'], r: 2, e: 'Un carré est toujours positif : la racine carrée d’un nombre négatif n’existe pas.', cc: '√−16 n’existe pas.' },
      { q: 'Le triangle EFG est rectangle en F. Son hypoténuse est :', o: ['[EF]', '[FG]', '[EG]'], r: 2, e: 'L’hypoténuse est le côté opposé à l’angle droit : celui sans la lettre F.', cc: 'L’hypoténuse est [EG].' },
      { q: 'Le triangle RST est rectangle en S. On a :', o: ['RS² = ST² + RT²', 'RT² = RS² + ST²', 'ST² = RS² + RT²'], r: 1, e: 'L’hypoténuse est [RT].', cc: 'RT² = RS² + ST².' },
      { q: 'ABC est rectangle en A, AB = 6 et AC = 8. Alors BC = ', o: ['14', '10', '√28'], r: 1, e: '<p>BC² = 6² + 8² = 36 + 64 = 100</p><p>BC = √100 = 10</p>', cc: 'BC = 10.' },
      { q: 'KLM est rectangle en K, LM = 10 et KL = 6. Alors KM = ', o: ['8', '√136', '4'], r: 0, e: '<p>LM² = KL² + KM², donc KM² = 10² − 6² = 100 − 36 = 64</p><p>KM = √64 = 8</p>', cc: 'KM = 8.' },
      { q: 'Un triangle a pour côtés 5 ; 12 et 13. Il est :', o: ['rectangle', 'pas rectangle', 'on ne peut pas savoir'], r: 0, e: '<p>13² = 169</p><p>5² + 12² = 25 + 144 = 169</p><p>D’après la réciproque du théorème de Pythagore, il est rectangle.</p>', cc: 'Il est rectangle.' },
      { q: 'Un triangle a pour côtés 6 ; 7 et 9. Il est :', o: ['rectangle', 'pas rectangle', 'on ne peut pas savoir'], r: 1, e: '<p>9² = 81</p><p>6² + 7² = 36 + 49 = 85</p><p>81 ≠ 85 : d’après la contraposée, il n’est pas rectangle.</p>', cc: 'Il n’est pas rectangle.' },
      { q: 'Si BC² = 50, l’arrondi de BC au dixième est :', o: ['25', '7,1', '7'], r: 1, e: 'BC = √50 = 7,07… : le chiffre des centièmes est 7, donc on arrondit à 7,1.', cc: 'BC ≈ 7,1.' }],
    ds: {
      duree: 45, titre: 'DS · Pythagore et racine carrée (3e)',
      consigne: 'Calculatrice autorisée. <strong>Justifie chaque calcul</strong> et fais un schéma codé. Chaque question est notée sur 2 points : 1 point pour le calcul, ½ point pour la réponse, ½ point pour la phrase réponse.',
      exos: [
        { titre: 'Exercice 1', enonce: '<p><span class="q">a.</span> Encadre √70 par deux entiers consécutifs.</p><p><span class="q">b.</span> Trouve le nombre positif x tel que x² = 144.</p>',
          corr: [
            { q: 'a', calc: '<p>64 &lt; 70 &lt; 81</p><p>√64 &lt; √70 &lt; √81</p>', rep: '<p>8 &lt; √70 &lt; 9</p>', phrase: '√70 est compris entre 8 et 9.' },
            { q: 'b', calc: '<p>x est le nombre positif dont le carré est 144.</p><p>x = √144</p>', rep: '<p>x = 12</p>', phrase: 'Le nombre positif x est 12.' }] },
        { titre: 'Exercice 2', enonce: '<p>Le triangle DEF est rectangle en D, avec DE = 7 cm et DF = 24 cm. Calcule EF.</p>',
          corr: [
            { q: 'a', calc: '<p>Je sais que le triangle DEF est rectangle en D. Son hypoténuse est [EF].</p><p>Les conditions sont réunies pour appliquer le théorème de Pythagore.</p><p>D’après le théorème de Pythagore : EF² = DE² + DF²</p><p>EF² = 7² + 24² = 49 + 576 = 625</p>', rep: '<p>EF = √625 = 25 cm</p>', phrase: 'EF mesure 25 cm.' }] },
        { titre: 'Exercice 3', enonce: '<p><span class="q">a.</span> Le triangle GHK est rectangle en H, avec GK = 10 cm et GH = 6 cm. Calcule HK.</p><p><span class="q">b.</span> Le triangle LMN est tel que LM = 9 cm, MN = 12 cm et LN = 16 cm. Est-il rectangle ?</p>',
          corr: [
            { q: 'a', calc: '<p>Je sais que le triangle GHK est rectangle en H. Son hypoténuse est [GK].</p><p>Les conditions sont réunies pour appliquer le théorème de Pythagore.</p><p>D’après le théorème de Pythagore : GK² = GH² + HK²</p><p>10² = 6² + HK², soit 100 = 36 + HK²</p><p>HK² = 100 − 36 = 64</p>', rep: '<p>HK = √64 = 8 cm</p>', phrase: 'HK mesure 8 cm.' },
            { q: 'b', calc: '<p>Le plus grand côté est [LN].</p><p>D’une part : LN² = 16² = 256</p><p>D’autre part : LM² + MN² = 9² + 12² = 81 + 144 = 225</p>', rep: '<p>LN² ≠ LM² + MN²</p>', phrase: 'D’après la contraposée du théorème de Pythagore, LMN n’est pas rectangle.' }] },
        { titre: 'Exercice 4', enonce: '<p>Un écran rectangulaire mesure 72 cm de large et 54 cm de haut.</p><p><span class="q">a.</span> Calcule la longueur de sa diagonale.</p><p><span class="q">b.</span> La taille d’un écran se donne en pouces : 1 pouce = 2,54 cm. Donne la diagonale de cet écran en pouces, arrondie à l’unité.</p>',
          corr: [
            { q: 'a', calc: '<p>Les angles d’un rectangle sont droits : la diagonale est l’hypoténuse d’un triangle rectangle.</p><p>Les conditions sont réunies pour appliquer le théorème de Pythagore.</p><p>D’après le théorème de Pythagore : d² = 72² + 54²</p><p>d² = 5 184 + 2 916 = 8 100</p>', rep: '<p>d = √8 100 = 90 cm</p>', phrase: 'La diagonale de l’écran mesure 90 cm.' },
            { q: 'b', calc: '<p>90 ÷ 2,54 ≈ 35,4</p>', rep: '<p>environ 35 pouces</p>', phrase: 'La diagonale de l’écran mesure environ 35 pouces.' }] }],
    },
  };
})();
