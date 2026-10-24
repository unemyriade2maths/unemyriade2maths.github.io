// Diapos de leçon, clic par clic. Chaque étape : h = ce qui s'affiche, v = ce que dit la voix.
// { pot: [a, b, k] } affiche la potence de la division de a par b, à l'étape k.
const LECONS = {
  'arithmetique': {
    A: {
      titre: 'Multiples et diviseurs',
      diapos: [
        { titre: 'Définition', cadre: true, etapes: [
          { h: '<p><strong>a</strong> et <strong>b</strong> sont deux entiers naturels, b non nul.</p><p>Si <span class="formule">a = b × k</span> &nbsp;(ou <span class="formule">a ÷ b = k</span>), où k est un entier naturel, alors :</p>',
            v: "Définition : a et b sont deux entiers naturels, et b n'est pas nul. Si a égale b fois k, ou si a divisé par b égale k, avec k un nombre entier, alors on peut dire plusieurs choses." },
          { h: '<p class="puce">a est un <strong>multiple</strong> de b ;</p>', v: 'a est un multiple de b.' },
          { h: '<p class="puce">a est <strong>divisible</strong> par b ;</p>', v: 'a est divisible par b.' },
          { h: '<p class="puce">b est un <strong>diviseur</strong> de a ;</p>', v: 'b est un diviseur de a.' },
          { h: '<p class="puce">b <strong>divise</strong> a ;</p>', v: 'b divise a.' },
          { h: '<p class="puce">le reste de la division euclidienne de a par b est <strong>nul</strong>.</p>', v: 'Le reste de la division euclidienne de a par b est nul.' }] },
        { titre: 'Exemple 1', etapes: [
          { h: '<p class="question">1 147 est-il un multiple de 37 ?</p>', v: 'Exemple : mille cent quarante-sept est-il un multiple de trente-sept ?' },
          { h: '<p class="calc">1 147 ÷ 37 = 31</p><p>31 est un nombre entier.</p>', v: "On calcule mille cent quarante-sept divisé par trente-sept. On trouve trente et un : c'est un nombre entier." },
          { h: '<p class="calc">1 147 = 37 × 31</p><p class="cc">1 147 est un multiple de 37.</p>', v: 'Donc mille cent quarante-sept égale trente-sept fois trente et un. On peut conclure : mille cent quarante-sept est un multiple de trente-sept.' }] },
        { titre: 'Exemple 2', etapes: [
          { h: '<p class="question">1 150 est-il divisible par 92 ?</p>', v: 'Autre exemple : mille cent cinquante est-il divisible par quatre-vingt-douze ?' },
          { h: '<p class="calc">1 150 ÷ 92 = 12,5</p><p>12,5 n’est pas un nombre entier.</p>', v: "Mille cent cinquante divisé par quatre-vingt-douze, égale douze virgule cinq : ce n'est pas un nombre entier." },
          { h: '<p class="cc">1 150 n’est pas divisible par 92.</p>', v: "On peut conclure : mille cent cinquante n'est pas divisible par quatre-vingt-douze." }] },
        { titre: 'Attention : erreur fréquente', alerte: true, etapes: [
          { h: '<p class="barre">« 5 est un multiple de 20 »</p><p>C’est l’inverse !</p>', v: "Attention ! Cette erreur est fréquente. Dire : cinq est un multiple de vingt. C'est l'inverse !" },
          { h: '<p class="calc">20 = 5 × 4</p><p class="cc">20 est un multiple de 5, et 5 est un diviseur de 20.</p>', v: 'Vingt égale cinq fois quatre : vingt est un multiple de cinq, et cinq est un diviseur de vingt.' }] },
      ],
    },
    B: {
      titre: 'Division euclidienne',
      diapos: [
        { titre: 'Définition', cadre: true, etapes: [
          { h: '<p>Effectuer la division euclidienne de <strong>a</strong> par <strong>b</strong> (b non nul), c’est trouver deux entiers naturels <strong>q</strong> et <strong>r</strong> tels que :</p><p class="formule grand">a = b × q + r &nbsp; avec &nbsp; r &lt; b</p>',
            v: "Définition : a et b sont deux nombres entiers, et b n'est pas nul. Effectuer la division euclidienne de a par b, c'est trouver deux nombres entiers q et r, tels que : a égale b fois q, plusse r, avec r plus petit que b." },
          { h: '<p class="vocab"><span>a : le <strong>dividende</strong></span><span>b : le <strong>diviseur</strong></span><span>q : le <strong>quotient</strong></span><span>r : le <strong>reste</strong></span></p>',
            v: "Le nombre a s'appelle le dividende. Le nombre b s'appelle le diviseur. Le nombre q s'appelle le quotient. Et le nombre r s'appelle le reste." }] },
        { titre: 'Exemple : 183 divisé par 12', etapes: [
          { h: { pot: [183, 12, 0] }, v: 'Exemple : effectuons la division euclidienne de cent quatre-vingt-trois par douze.' },
          { h: { pot: [183, 12, 1] }, v: 'Dans dix-huit, combien de fois douze ? Une fois.' },
          { h: { pot: [183, 12, 2] }, v: 'Dix-huit moins douze, égale six. On abaisse le trois : soixante-trois.' },
          { h: { pot: [183, 12, 3] }, v: 'Dans soixante-trois, combien de fois douze ? Cinq fois, car cinq fois douze égale soixante.' },
          { h: { pot: [183, 12, 4] }, v: "Soixante-trois moins soixante, égale trois. Il n'y a plus de chiffre à abaisser : le reste est trois." },
          { h: { pot: [183, 12, 4], apres: '<p class="formule grand">183 = 12 × 15 + 3 &nbsp; avec &nbsp; 3 &lt; 12</p>' }, v: 'On peut donc écrire : cent quatre-vingt-trois égale douze fois quinze, plusse trois, avec trois plus petit que douze.' }] },
        { titre: 'Le vocabulaire', etapes: [
          { h: '<p class="formule grand"><span class="c1">183</span> = <span class="c2">12</span> × <span class="c3">15</span> + <span class="c4">3</span></p>', v: 'Rappel du vocabulaire.' },
          { h: '<p class="puce"><span class="c1">183</span> est le <strong>dividende</strong> : le nombre que l’on divise.</p>', v: "Cent quatre-vingt-trois est le dividende : c'est le nombre que l'on divise." },
          { h: '<p class="puce"><span class="c2">12</span> est le <strong>diviseur</strong> : le nombre par lequel on divise.</p>', v: "Douze est le diviseur : c'est le nombre par lequel on divise." },
          { h: '<p class="puce"><span class="c3">15</span> est le <strong>quotient</strong>.</p>', v: 'Ensuite, le quotient est égal à quinze.' },
          { h: '<p class="puce"><span class="c4">3</span> est le <strong>reste</strong> : il est toujours plus petit que le diviseur.</p>', v: 'Et trois est le reste. Il est toujours plus petit que le diviseur.' }] },
        { titre: 'Quelle division euclidienne ?', etapes: [
          { h: '<p class="formule grand">233 = 7 × 32 + 9</p><p class="question">Quelle division euclidienne cette égalité représente-t-elle ?</p>', v: 'Autre exemple : deux cent trente-trois égale sept fois trente-deux, plusse neuf. Quelle division euclidienne cette égalité représente-t-elle ?' },
          { h: '<p class="puce ok">Quotient 32 : le reste 9 &lt; 32. <strong>C’est la division euclidienne de 233 par 32.</strong></p>', v: "Premier cas : le quotient est trente-deux. Le reste, neuf, est plus petit que trente-deux. Donc l'égalité représente la division euclidienne de deux cent trente-trois par trente-deux." },
          { h: '<p class="puce non">Quotient 7 : le reste 9 &gt; 7. <strong>Ce n’est pas la division euclidienne de 233 par 7.</strong></p>', v: "Deuxième cas : le quotient est sept. Mais le reste, neuf, est plus grand que sept. Donc l'égalité ne représente pas la division euclidienne de deux cent trente-trois par sept." }] },
        { titre: 'Remarque : reste nul', cadre: true, etapes: [
          { h: '<p>Si le reste de la division euclidienne de a par b est <strong>nul</strong>, alors a est un multiple de b, et b est un diviseur de a.</p>', v: 'Remarque : si le reste de la division euclidienne de a par b est égal à zéro, alors a est un multiple de b, et b est un diviseur de a.' },
          { h: '<p class="puce non">183 = 12 × 15 + 3 : le reste n’est pas nul, 12 ne divise pas 183.</p>', v: "Par exemple : cent quatre-vingt-trois égale douze fois quinze, plusse trois. Le reste n'est pas nul : douze ne divise pas cent quatre-vingt-trois." },
          { h: '<p class="puce ok">180 = 12 × 15 + 0 : le reste est nul, 180 est un multiple de 12.</p>', v: 'Mais cent quatre-vingts égale douze fois quinze, plusse zéro. Le reste est nul : douze divise cent quatre-vingts, et cent quatre-vingts est un multiple de douze.' }] },
      ],
    },
  },
};

// Potence de la division euclidienne de a par b, jusqu'à l'étape k (2 étapes par chiffre du quotient).
function etapesDivision(a, b) {
  const d = String(a).split('').map(Number); let i = 0, ch = 0;
  do { ch = ch * 10 + d[i]; i++; } while (ch < b && i < d.length);
  const st = [];
  while (true) {
    const q = Math.floor(ch / b), p = q * b, r = ch - p;
    st.push({ ch, fin: i - 1, q, p, r });
    if (i >= d.length) break;
    ch = r * 10 + d[i]; i++;
  }
  return st;
}
function potence(a, b, k) {
  const d = String(a).split(''), st = etapesDivision(a, b), n = d.length, lignes = [];
  const ligne = () => Array(n + 1).fill('');
  const l0 = ligne(); d.forEach((c, j) => l0[j + 1] = c); lignes.push({ c: l0 });
  let fleche = null;
  st.forEach((s, i) => {
    if (k >= 2 * i + 1) {
      const l = ligne(), ps = String(s.p); const deb = s.fin + 1 - ps.length + 1;
      ps.split('').forEach((c, j) => l[deb + j] = c); l[deb - 1] = '−';
      lignes.push({ c: l, sous: true, neuf: k === 2 * i + 1 });
    }
    if (k >= 2 * i + 2) {
      const l = ligne(), rs = String(s.r); const deb = s.fin + 1 - rs.length + 1;
      rs.split('').forEach((c, j) => l[deb + j] = c);
      const der = i === st.length - 1;
      if (!der) { l[s.fin + 2] = d[s.fin + 1]; if (k === 2 * i + 2) fleche = { col: s.fin + 2, ligne: lignes.length }; }
      lignes.push({ c: l, reste: der, neuf: k === 2 * i + 2 });
    }
  });
  const nq = Math.min(st.length, Math.ceil(k / 2));
  const quot = st.slice(0, nq).map(s => s.q).join('');
  let g = `<div class="potence" style="--n:${n + 1}"><div class="pg">`;
  lignes.forEach((l, li) => {
    g += `<div class="pl${l.sous ? ' moins' : ''}${l.neuf ? ' neuf' : ''}${l.reste ? ' reste' : ''}">`;
    l.c.forEach((c, ci) => {
      let cl = '';
      if (fleche && ci === fleche.col && li > 0 && li < fleche.ligne) cl = 'tige';
      if (fleche && ci === fleche.col && li === fleche.ligne) cl = 'abaisse';
      if (fleche && ci === fleche.col && li === 0) cl = 'depart';
      g += `<span class="${cl}">${c}</span>`;
    });
    g += '</div>';
  });
  g += `</div><div class="pd"><div class="pdiv">${b}</div><div class="pquot">${quot}</div></div></div>`;
  return g;
}
