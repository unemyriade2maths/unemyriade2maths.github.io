// Arithmétique 3e : parties 2 à 11 (leçons et exercices). Même modèle que la partie 1.
// Les voix sont lues à partir du texte affiché (voix.js), sauf quand « v » est donné.
(function () {
  const fr = (a, b) => frac(a, b);
  // divisions successives jusqu'à la ligne k (k = nombre de divisions faites)
  const dsK = (n, k) => {
    const L = []; let x = n, p = 2;
    while (x > 1) { while (x % p) p++; L.push([x, p]); x /= p; }
    L.push([1, '']);
    const C = { 2: '#E07B00', 3: '#7B3FB5', 5: '#1F5FC4', 7: '#8B5A2B', 11: '#B03A3A', 13: '#2E8B57' };
    return `<div class="divsucc">${L.filter((_, i) => i <= k).map(([a, b], i) => `<span>${a}</span><span style="color:${C[b] || '#C76A0E'}">${i < k ? b : ''}</span>`).join('')}</div>`;
  };
  const lignes = (...l) => l.map(x => `<p>${x}</p>`).join('');
  const blocs = (scr) => `<pre class="blocks">${scr}</pre>`;
  const tableur = (fx, a1, b1) => `<div class="tableur"><div class="fx"><span>fx</span>${fx}</div><table><tr><th></th><th>A</th><th>B</th></tr><tr><th>1</th><td class="sel">${a1}</td><td>${b1}</td></tr><tr><th>2</th><td></td><td></td></tr></table></div>`;
  const touches = (...k) => `<p class="touches">${k.map(x => `<kbd>${x}</kbd>`).join('')}</p>`;
  const COUL = { rouge: '#D9534F', jaune: '#F5C518', vert: '#2E8B57', bleu: '#1F5FC4' };
  const frise = (n, hl) => `<div class="frise">${Array.from({ length: n }, (_, i) => { const c = ['rouge', 'jaune', 'vert', 'bleu'][i % 4]; return `<span style="background:${COUL[c]}" class="${hl && i + 1 === hl ? 'hl' : ''}"></span>`; }).join('')}<span class="pts">…</span></div>`;

  // ---------------- LEÇONS ----------------
  Object.assign(LECONS.arithmetique, {
    C: { titre: 'Critères de divisibilité', diapos: [
      { titre: 'Pourquoi des critères ?', etapes: [
        { h: '<p>Un nombre a est divisible par un nombre b si le reste de la division euclidienne de a par b est nul.</p>' },
        { h: '<p>Pour les grands nombres, les <strong>critères de divisibilité</strong> permettent de le savoir rapidement, sans poser la division.</p>' }] },
      { titre: 'Par 2, par 5 et par 10', cadre: true, etapes: [
        { h: '<p class="puce">Divisible par <strong>2</strong> si le chiffre des unités est 0, 2, 4, 6 ou 8 : c’est un nombre pair.</p>' },
        { h: '<p class="puce">Divisible par <strong>5</strong> si le chiffre des unités est 0 ou 5.</p>' },
        { h: '<p class="puce">Divisible par <strong>10</strong> si le chiffre des unités est 0.</p>', v: 'Pour être divisible par dix, le chiffre des unités doit être un zéro.' },
        { h: '<p class="cc">Exemple : 745 se termine par 5, donc 745 est divisible par 5.</p>' }] },
      { titre: 'Par 3 et par 9', cadre: true, etapes: [
        { h: '<p class="puce">Divisible par <strong>3</strong> si la somme de ses chiffres est divisible par 3.</p>' },
        { h: '<p class="puce">Divisible par <strong>9</strong> si la somme de ses chiffres est divisible par 9.</p>' },
        { h: '<p class="calc">2 + 5 + 1 + 7 = 15</p>', v: 'Exemple : pour deux mille cinq cent dix-sept, on additionne ses chiffres. Deux plusse cinq plusse un plusse sept, égale quinze.' },
        { h: '<p class="cc">15 = 3 × 5 : 15 est dans la table de 3, donc 2 517 est divisible par 3.</p>' },
        { h: '<p class="cc">15 n’est pas dans la table de 9, donc 2 517 n’est pas divisible par 9.</p>' }] },
      { titre: 'Attention : erreur fréquente', alerte: true, etapes: [
        { h: '<p class="barre">« 23 est divisible par 3, car il se termine par 3 »</p><p>Cette phrase est fausse !</p>' },
        { h: '<p class="calc">2 + 3 = 5</p><p class="cc">5 n’est pas divisible par 3, donc 23 n’est pas divisible par 3.</p>' }] }] },
    B2: { lettre: 'B', titre: 'Utiliser la division euclidienne', diapos: [
      { titre: 'Rappel', cadre: true, etapes: [
        { h: '<p>Effectuer la division euclidienne de a par b, c’est trouver q et r tels que :</p><p class="formule grand">a = b × q + r &nbsp; avec &nbsp; r &lt; b</p>' }] },
      { titre: 'Quand l’utiliser ?', etapes: [
        { h: '<p class="puce">Quand on range des objets en <strong>paquets identiques</strong>.</p>' },
        { h: '<p class="puce">Quand quelque chose <strong>se répète régulièrement</strong> (une frise, les jours de la semaine…).</p>' }] },
      { titre: 'Exemple : les œufs', etapes: [
        { h: '<p class="question">On range 26 œufs dans des boîtes de 6.</p>' },
        { h: '<p class="calc">26 = 6 × 4 + 2</p>' },
        { h: '<p class="cc">Le quotient 4 est le nombre de boîtes pleines, donc on remplit 4 boîtes ; le reste 2 est le nombre d’œufs qui restent.</p>' }] }] },
    D: { titre: 'Nombres premiers', diapos: [
      { titre: 'Définition', cadre: true, etapes: [
        { h: '<p>Un nombre entier est <strong>premier</strong> s’il possède exactement deux diviseurs : 1 et lui-même.</p>' }] },
      { titre: 'Remarques', etapes: [
        { h: '<p class="puce">1 n’a qu’un seul diviseur, donc 1 n’est pas premier.</p>' },
        { h: '<p class="puce">2 est le seul nombre premier pair.</p>' },
        { h: '<p class="puce non">33 = 3 × 11 : 33 a d’autres diviseurs que 1 et 33, donc 33 n’est pas premier.</p>' },
        { h: '<p class="puce ok">Les seuls diviseurs de 17 sont 1 et 17, donc 17 est premier.</p>' }] },
      { titre: 'Les nombres premiers inférieurs à 100', etapes: [
        { h: '<p class="liste-prem">2 · 3 · 5 · 7 · 11 · 13 · 17 · 19 · 23 · 29 · 31 · 37 · 41 · 43 · 47 · 53 · 59 · 61 · 67 · 71 · 73 · 79 · 83 · 89 · 97</p>', v: 'Voici la liste des nombres premiers inférieurs à cent. Elle est à connaître !' }] },
      { titre: 'Comment savoir si un nombre est premier ?', cadre: true, etapes: [
        { h: '<p class="puce">S’il est inférieur à 100, on regarde dans la liste.</p>' },
        { h: '<p class="puce">Sinon, on teste les divisions par 2, 3, 5, 7, 11… et on s’arrête dès que le nombre premier testé dépasse la racine carrée du nombre.</p>' }] },
      { titre: 'Attention : erreur fréquente', alerte: true, etapes: [
        { h: '<p class="barre">« 39 est premier, car il est impair »</p><p>Cette phrase est fausse !</p>' },
        { h: '<p class="calc">3 + 9 = 12</p><p class="cc">12 est divisible par 3, donc 39 est divisible par 3 : 39 = 3 × 13, et 39 n’est pas premier.</p>' }] }] },
    F: { titre: 'Fraction irréductible', diapos: [
      { titre: 'Définition', cadre: true, etapes: [
        { h: '<p>Une fraction est <strong>irréductible</strong> lorsque son numérateur et son dénominateur n’ont pas d’autre diviseur commun que 1.</p>' }] },
      { titre: 'Exemples', etapes: [
        { h: `<p class="puce ok">Les diviseurs de 4 sont 1, 2, 4 ; ceux de 9 sont 1, 3, 9. Le seul diviseur commun est 1, donc ${fr(4, 9)} est irréductible.</p>` },
        { h: `<p class="puce non">2 et 8 ont deux diviseurs communs, 1 et 2, donc ${fr(2, 8)} n’est pas irréductible.</p>` }] },
      { titre: 'Méthode : rendre une fraction irréductible', etapes: [
        { h: `<p class="question">Rendons ${fr(60, 126)} irréductible.</p><p>On décompose le numérateur et le dénominateur en produit de facteurs premiers.</p>` },
        { h: '<p class="calc">60 = 2 × 2 × 3 × 5</p><p class="calc">126 = 2 × 3 × 3 × 7</p>' },
        { h: `<p class="calc">${fr('<s>2</s> × 2 × <s>3</s> × 5', '<s>2</s> × <s>3</s> × 3 × 7')} = ${fr('2 × 5', '3 × 7')}</p>`, v: 'On barre les facteurs communs en haut et en bas : le facteur deux, puis le facteur trois. Il reste deux fois cinq, sur trois fois sept.' },
        { h: `<p class="cc">La fraction irréductible égale à ${fr(60, 126)} est ${fr(10, 21)}.</p>` }] }] },
    E: { titre: 'Décomposition en produit de facteurs premiers', diapos: [
      { titre: 'Définition', cadre: true, etapes: [
        { h: '<p>Décomposer un nombre en produit de facteurs premiers, c’est l’écrire comme un produit dont chaque facteur est un nombre premier.</p>' },
        { h: '<p class="puce ok">30 = 2 × 3 × 5 est une décomposition, car 2, 3 et 5 sont premiers.</p>' },
        { h: '<p class="puce non">30 = 6 × 5 n’est pas une décomposition, car 6 n’est pas premier.</p>' }] },
      { titre: 'Méthode : les divisions successives', cadre: true, etapes: [
        { h: '<p class="puce">On divise par le plus petit nombre premier possible : 2, puis 3, puis 5…</p>' },
        { h: '<p class="puce">On écrit le quotient en dessous, et on recommence avec ce quotient.</p>' },
        { h: '<p class="puce">On s’arrête quand on obtient 1.</p>' }] },
      { titre: 'Exemple : 12', etapes: [
        { r: true, h: dsK(12, 0), v: 'Exemple avec douze.' },
        { r: true, h: dsK(12, 1), v: 'Douze est pair : douze divisé par deux, égale six.' },
        { r: true, h: dsK(12, 2), v: 'Six est pair : six divisé par deux, égale trois.' },
        { r: true, h: dsK(12, 3), v: 'Trois est premier : trois divisé par trois, égale un. On s’arrête.' },
        { h: '<p class="cc">12 = 2 × 2 × 3, donc la décomposition de 12 est 2² × 3.</p>' }] },
      { titre: 'Attention : erreur fréquente', alerte: true, etapes: [
        { h: '<p class="barre">« 360 = 4 × 90 »</p><p>Ce n’est pas une décomposition en produit de facteurs premiers.</p>' },
        { h: '<p class="cc">4 et 90 ne sont pas premiers, donc il faut continuer : 360 = 2³ × 3² × 5.</p>' }] }] },
    G1: { lettre: 'G', titre: 'Le PGCD', diapos: [
      { titre: 'Définitions', cadre: true, etapes: [
        { h: '<p>Un <strong>diviseur commun</strong> à deux nombres est un nombre qui divise ces deux nombres.</p>' },
        { h: '<p>Le <strong>PGCD</strong> de deux nombres entiers est leur plus grand diviseur commun.</p>' }] },
      { titre: 'Exemple : 12 et 18', etapes: [
        { h: '<p>Diviseurs de 12 : 1 ; 2 ; 3 ; 4 ; 6 ; 12</p><p>Diviseurs de 18 : 1 ; 2 ; 3 ; 6 ; 9 ; 18</p>' },
        { h: '<p class="cc">Les diviseurs communs sont 1, 2, 3 et 6 ; le plus grand est 6, donc PGCD(12 ; 18) = 6.</p>' }] },
      { titre: 'Méthode avec la décomposition', cadre: true, etapes: [
        { h: '<p class="puce">On décompose chaque nombre avec les divisions successives.</p>' },
        { h: '<p class="puce">On garde les facteurs <strong>communs</strong>, avec le <strong>plus petit exposant</strong>.</p>' },
        { h: '<p class="puce">On les multiplie : on obtient le PGCD.</p>' }] },
      { titre: 'Attention : erreur fréquente', alerte: true, etapes: [
        { h: '<p class="barre">Prendre le plus grand exposant</p><p>60 = 2² × 3 × 5 et 84 = 2² × 3 × 7</p>' },
        { h: '<p class="cc">Pour le PGCD, on garde le plus petit exposant : PGCD(60 ; 84) = 2² × 3 = 12. Vérifie que ton PGCD divise bien les deux nombres.</p>' }] }] },
    G1b: { lettre: 'G', titre: 'Utiliser le PGCD', diapos: [
      { titre: 'Quand utiliser le PGCD ?', cadre: true, etapes: [
        { h: '<p>Quand on veut répartir deux quantités en un <strong>maximum de groupes identiques</strong>, en utilisant tout, <strong>sans reste</strong>.</p>' },
        { h: '<p>Mots-clés : <strong>identiques</strong>, <strong>sans reste</strong>, <strong>le plus grand possible</strong>.</p>' }] },
      { titre: 'Exemple : les bouquets', etapes: [
        { h: '<p class="question">Avec 12 roses et 18 tulipes, on veut le plus grand nombre de bouquets identiques.</p>' },
        { h: '<p>Le nombre de bouquets divise 12 et 18 : c’est un diviseur commun, et le plus grand est PGCD(12 ; 18) = 6.</p>' },
        { h: '<p class="cc">On fait donc 6 bouquets, avec 2 roses et 3 tulipes dans chaque bouquet.</p>' }] },
      { titre: 'Nombres premiers entre eux', cadre: true, etapes: [
        { h: '<p>Deux nombres sont <strong>premiers entre eux</strong> quand leur PGCD est égal à 1.</p>' },
        { h: `<p class="cc">PGCD(10 ; 21) = 1, donc 10 et 21 sont premiers entre eux, et ${fr(10, 21)} est irréductible.</p>` }] }] },
    H1: { lettre: 'G', titre: 'Le PPCM', diapos: [
      { titre: 'Définitions', cadre: true, etapes: [
        { h: '<p>Un <strong>multiple commun</strong> à deux nombres est un multiple de chacun de ces deux nombres.</p>' },
        { h: '<p>Le <strong>PPCM</strong> de deux nombres entiers non nuls est leur plus petit multiple commun.</p>' }] },
      { titre: 'Exemple : 4 et 6', etapes: [
        { h: '<p>Multiples de 4 : 4 ; 8 ; 12 ; 16 ; 20 ; 24</p><p>Multiples de 6 : 6 ; 12 ; 18 ; 24</p>' },
        { h: '<p class="cc">Les multiples communs sont 12 et 24 ; le plus petit est 12, donc PPCM(4 ; 6) = 12.</p>' }] },
      { titre: 'Méthode avec la décomposition', cadre: true, etapes: [
        { h: '<p class="puce">On décompose chaque nombre avec les divisions successives.</p>' },
        { h: '<p class="puce">On garde <strong>tous</strong> les facteurs premiers, avec le <strong>plus grand exposant</strong>.</p>' },
        { h: '<p class="puce">On les multiplie : on obtient le PPCM.</p>' }] },
      { titre: 'Attention : erreur fréquente', alerte: true, etapes: [
        { h: '<p class="barre">Garder seulement les facteurs communs</p><p>60 = 2² × 3 × 5 et 72 = 2³ × 3²</p>' },
        { h: '<p class="cc">Pour le PPCM, on garde tous les facteurs avec le plus grand exposant : PPCM(60 ; 72) = 2³ × 3² × 5 = 360. Vérifie que ton PPCM est un multiple des deux nombres.</p>' }] }] },
    H1b: { lettre: 'G', titre: 'Utiliser le PPCM', diapos: [
      { titre: 'Quand utiliser le PPCM ?', cadre: true, etapes: [
        { h: '<p>Quand deux évènements <strong>se répètent régulièrement</strong>, et qu’on cherche quand ils se produiront de nouveau <strong>en même temps</strong>.</p>' },
        { h: '<p>Mots-clés : <strong>en même temps</strong>, <strong>de nouveau ensemble</strong>, <strong>le plus tôt possible</strong>.</p>' }] },
      { titre: 'Exemple : la piscine', etapes: [
        { h: '<p class="question">Léo va à la piscine tous les 4 jours, Zoé tous les 6 jours. Ils y sont allés ensemble aujourd’hui.</p>' },
        { h: '<p>Le nombre de jours est un multiple commun de 4 et 6, et le plus petit est PPCM(4 ; 6) = 12.</p>' },
        { h: '<p class="cc">Léo et Zoé se retrouveront donc ensemble à la piscine dans 12 jours.</p>' }] },
      { titre: 'Attention : PGCD ou PPCM ?', alerte: true, etapes: [
        { h: '<p class="puce">Partager en parts identiques : on cherche un <strong>diviseur</strong> commun, le PGCD.</p>' },
        { h: '<p class="puce">Se retrouver ensemble : on cherche un <strong>multiple</strong> commun, le PPCM.</p>' }] }] },
    K: { lettre: '★', titre: 'Curiosités des nombres premiers', diapos: [
      { titre: 'Les nombres premiers de Sophie Germain', cadre: true, etapes: [
        { h: '<p>Un nombre premier p est un nombre premier de <strong>Sophie Germain</strong> si 2 × p + 1 est aussi premier.</p>' },
        { h: '<p class="puce ok">2 × 5 + 1 = 11, et 11 est premier, donc 5 est un nombre premier de Sophie Germain.</p>' },
        { h: '<p class="puce non">2 × 13 + 1 = 27 = 3 × 9, et 27 n’est pas premier, donc 13 n’en est pas un.</p>' }] },
      { titre: 'Les nombres premiers palindromes', cadre: true, etapes: [
        { h: '<p>Un <strong>palindrome</strong> se lit de la même façon dans les deux sens : 101, 131, 191.</p>', v: 'Un nombre palindrome se lit de la même façon dans les deux sens. Par exemple : cent un, cent trente et un, et cent quatre-vingt-onze.' },
        { h: '<p class="puce ok">101, 131 et 191 sont des nombres premiers palindromes.</p>', v: 'Les nombres cent un, cent trente et un, et cent quatre-vingt-onze, sont des nombres premiers palindromes.' },
        { h: '<p class="puce non">121 est un palindrome, mais 121 = 11 × 11, donc 121 n’est pas premier.</p>' }] },
      { titre: 'Attention : erreur fréquente', alerte: true, etapes: [
        { h: '<p class="barre">« 121 est premier, car il n’est divisible ni par 2, ni par 3, ni par 5 »</p>' },
        { h: '<p class="cc">Il faut tester jusqu’à la racine carrée : √121 = 11 et 121 = 11 × 11, donc 121 n’est pas premier.</p>' }] }] },
    P: { lettre: '★', titre: 'Nombres parfaits et nombres amicaux', diapos: [
      { titre: 'Le nombre de diviseurs', cadre: true, etapes: [
        { h: '<p>Si N = aⁿ × bᵖ × cʳ avec a, b, c premiers, alors N a (n + 1) × (p + 1) × (r + 1) diviseurs.</p>', v: 'Propriété : on écrit le nombre en produit de facteurs premiers, avec les exposants. On ajoute un à chaque exposant, puis on multiplie ces résultats : on obtient le nombre de diviseurs.' },
        { h: '<p class="calc">50 = 2 × 5²</p><p class="cc">(1 + 1) × (2 + 1) = 6, donc 50 a 6 diviseurs.</p>' }] },
      { titre: 'Les nombres parfaits', cadre: true, etapes: [
        { h: '<p>Un nombre est <strong>parfait</strong> s’il est égal à la somme de ses diviseurs autres que lui-même.</p>' },
        { h: '<p class="calc">1 + 2 + 3 = 6</p><p class="cc">La somme des diviseurs de 6 autres que 6 est 6, donc 6 est parfait.</p>' },
        { h: '<p class="calc">1 + 2 + 4 + 7 + 14 = 28</p><p class="cc">28 est donc aussi un nombre parfait.</p>' }] },
      { titre: 'Les nombres amicaux', cadre: true, etapes: [
        { h: '<p>Deux nombres sont <strong>amicaux</strong> si chacun est égal à la somme des diviseurs de l’autre, autres que lui-même.</p>' },
        { h: '<p class="cc">220 et 284 sont amicaux : la somme des diviseurs de 220 (sans 220) est 284, et celle de 284 (sans 284) est 220.</p>' }] }] },
  });

  // Ce que dit la voix dans les leçons, quand le texte affiché seul perdrait son sens à l'oral.
  const VO = {
    'C|0|0': 'Rappel : un nombre a est divisible par un nombre b, si le reste de la division euclidienne de a par b est nul.',
    'C|1|0': 'Propriété : un nombre entier est divisible par deux, si son chiffre des unités est zéro, deux, quatre, six ou huit. On dit que c’est un nombre pair.',
    'C|1|1': 'Propriété : un nombre entier est divisible par cinq, si son chiffre des unités est zéro ou cinq.',
    'C|1|2': 'Propriété : un nombre entier est divisible par dix, si son chiffre des unités est zéro.',
    'C|1|3': 'Exemple : le chiffre des unités de sept cent quarante-cinq est cinq. Donc sept cent quarante-cinq est divisible par cinq.',
    'C|2|0': 'Propriété : un nombre entier est divisible par trois, si la somme de ses chiffres est divisible par trois.',
    'C|2|1': 'Propriété : un nombre entier est divisible par neuf, si la somme de ses chiffres est divisible par neuf.',
    'C|2|3': 'Quinze égale trois fois cinq : quinze est dans la table de trois. Donc deux mille cinq cent dix-sept est divisible par trois.',
    'C|2|4': 'Mais quinze n’est pas dans la table de neuf. Donc deux mille cinq cent dix-sept n’est pas divisible par neuf.',
    'C|3|0': 'Attention, cette erreur est fréquente. Dire : vingt-trois est divisible par trois, car il se termine par trois. C’est faux !',
    'C|3|1': 'Pour trois, on calcule la somme des chiffres : deux plusse trois, égale cinq. Cinq n’est pas dans la table de trois, donc vingt-trois n’est pas divisible par trois.',
    'B2|0|0': 'Rappel : effectuer la division euclidienne de a par b, c’est trouver deux nombres entiers q et r, tels que : a égale b fois q, plusse r, avec r plus petit que b.',
    'B2|1|0': 'Quand utilise-t-on la division euclidienne ? D’abord, quand on range des objets en paquets identiques.',
    'B2|1|1': 'Ensuite, quand quelque chose se répète régulièrement : par exemple une frise, ou les jours de la semaine.',
    'B2|2|0': 'Exemple : on range vingt-six œufs dans des boîtes de six.',
    'B2|2|1': 'Vingt-six égale six fois quatre, plusse deux.',
    'B2|2|2': 'Le quotient, quatre, est le nombre de boîtes pleines : on remplit quatre boîtes. Le reste, deux, est le nombre d’œufs qui restent.',
    'D|0|0': 'Définition : un nombre entier est premier, s’il possède exactement deux diviseurs : un, et lui-même.',
    'D|1|0': 'Remarque : le nombre un n’a qu’un seul diviseur. Donc un n’est pas un nombre premier.',
    'D|1|1': 'Le nombre deux est le seul nombre premier pair.',
    'D|1|2': 'Trente-trois égale trois fois onze : trente-trois a d’autres diviseurs que un et lui-même. Donc trente-trois n’est pas premier.',
    'D|1|3': 'Les seuls diviseurs de dix-sept sont un et dix-sept. Donc dix-sept est un nombre premier.',
    'D|3|0': 'Comment savoir si un nombre est premier ? S’il est inférieur à cent, on regarde dans la liste.',
    'D|3|1': 'Sinon, on teste les divisions par deux, trois, cinq, sept, onze, et ainsi de suite. On s’arrête dès que le nombre premier testé dépasse la racine carrée du nombre.',
    'D|4|0': 'Attention, cette erreur est fréquente. Dire : trente-neuf est premier, car il est impair. C’est faux !',
    'D|4|1': 'Trois plusse neuf, égale douze, et douze est dans la table de trois. Donc trente-neuf est divisible par trois : trente-neuf égale trois fois treize. Trente-neuf n’est donc pas premier.',
    'F|0|0': 'Définition : une fraction est irréductible, lorsque son numérateur et son dénominateur n’ont pas d’autre diviseur commun que un.',
    'F|1|0': 'Les diviseurs de quatre sont un, deux et quatre. Ceux de neuf sont un, trois et neuf. Leur seul diviseur commun est un, donc la fraction quatre sur neuf est irréductible.',
    'F|1|1': 'Les nombres deux et huit ont deux diviseurs communs : un et deux. Donc la fraction deux sur huit n’est pas irréductible.',
    'F|2|0': 'Méthode : rendons la fraction soixante sur cent vingt-six irréductible. On décompose le numérateur et le dénominateur en produit de facteurs premiers.',
    'F|2|1': 'Soixante égale deux fois deux, fois trois, fois cinq. Cent vingt-six égale deux, fois trois, fois trois, fois sept.',
    'F|2|3': 'On peut conclure : la fraction irréductible égale à soixante sur cent vingt-six, est dix sur vingt et un.',
    'E|0|0': 'Définition : décomposer un nombre en produit de facteurs premiers, c’est l’écrire comme un produit dont chaque facteur est un nombre premier.',
    'E|0|1': 'Par exemple : trente égale deux fois trois fois cinq. C’est une décomposition, car deux, trois et cinq sont des nombres premiers.',
    'E|0|2': 'Mais écrire : trente égale six fois cinq, ce n’est pas une décomposition, car six n’est pas un nombre premier.',
    'E|1|0': 'Méthode des divisions successives. On divise par le plus petit nombre premier possible : deux, puis trois, puis cinq, et ainsi de suite.',
    'E|1|1': 'On écrit le quotient en dessous, et on recommence avec ce quotient.',
    'E|1|2': 'On s’arrête quand on obtient un.',
    'E|2|4': 'Donc douze égale deux fois deux fois trois. La décomposition de douze est : deux au carré, fois trois.',
    'E|3|0': 'Attention, cette erreur est fréquente. Écrire : trois cent soixante égale quatre fois quatre-vingt-dix, ce n’est pas une décomposition en produit de facteurs premiers.',
    'E|3|1': 'Quatre et quatre-vingt-dix ne sont pas des nombres premiers : il faut continuer. Trois cent soixante égale deux au cube, fois trois au carré, fois cinq.',
    'G1|0|0': 'Définition : un diviseur commun à deux nombres est un nombre qui divise ces deux nombres.',
    'G1|0|1': 'Définition : le pé-gé-cé-dé de deux nombres entiers est leur plus grand diviseur commun.',
    'G1|1|0': 'Par exemple, les diviseurs de douze sont : un, deux, trois, quatre, six et douze. Les diviseurs de dix-huit sont : un, deux, trois, six, neuf et dix-huit.',
    'G1|1|1': 'Les diviseurs communs sont : un, deux, trois et six. Le plus grand est six. Donc, le pé-gé-cé-dé de douze et de dix-huit est six.',
    'G1|2|0': 'Méthode : pour trouver le pé-gé-cé-dé de deux nombres, on décompose chaque nombre avec les divisions successives.',
    'G1|2|1': 'On repère les facteurs communs aux deux décompositions, et on garde le plus petit exposant.',
    'G1|2|2': 'On multiplie ces facteurs : on obtient le pé-gé-cé-dé.',
    'G1|3|0': 'Attention, cette erreur est fréquente : prendre le plus grand exposant. Par exemple, soixante égale deux au carré, fois trois, fois cinq. Et quatre-vingt-quatre égale deux au carré, fois trois, fois sept.',
    'G1|3|1': 'Pour le pé-gé-cé-dé, on garde toujours le plus petit exposant : deux au carré fois trois, c’est-à-dire douze. Astuce : vérifie que ton pé-gé-cé-dé divise bien les deux nombres.',
    'G1b|0|0': 'Quand utilise-t-on le pé-gé-cé-dé ? Quand on veut répartir deux quantités en un maximum de groupes identiques, en utilisant tout, sans reste.',
    'G1b|0|1': 'Retiens les mots-clés : identiques, sans reste, le plus grand possible. Ils te disent d’utiliser le pé-gé-cé-dé.',
    'G1b|1|0': 'Par exemple : avec douze roses et dix-huit tulipes, on veut faire le plus grand nombre de bouquets identiques.',
    'G1b|1|1': 'Le nombre de bouquets doit diviser douze et dix-huit : c’est un diviseur commun. Le plus grand, c’est le pé-gé-cé-dé de douze et de dix-huit, qui est six.',
    'G1b|1|2': 'On peut conclure : on fait six bouquets, avec deux roses et trois tulipes dans chaque bouquet.',
    'G1b|2|0': 'Définition : deux nombres sont premiers entre eux, quand leur pé-gé-cé-dé est égal à un.',
    'G1b|2|1': 'Par exemple, le pé-gé-cé-dé de dix et de vingt et un est égal à un. Donc dix et vingt et un sont premiers entre eux, et la fraction dix sur vingt et un est irréductible.',
    'H1|0|0': 'Définition : un multiple commun à deux nombres est un multiple de chacun de ces deux nombres.',
    'H1|0|1': 'Définition : le pé-pé-cé-ème de deux nombres entiers non nuls est leur plus petit multiple commun.',
    'H1|1|0': 'Par exemple, les multiples de quatre sont : quatre, huit, douze, seize, vingt, vingt-quatre. Les multiples de six sont : six, douze, dix-huit, vingt-quatre.',
    'H1|1|1': 'Les multiples communs sont : douze, et vingt-quatre. Le plus petit est douze. Donc, le pé-pé-cé-ème de quatre et de six est douze.',
    'H1|2|0': 'Méthode : pour trouver le pé-pé-cé-ème de deux nombres, on décompose chaque nombre avec les divisions successives.',
    'H1|2|1': 'On garde tous les facteurs premiers des deux décompositions, avec le plus grand exposant.',
    'H1|2|2': 'On multiplie ces facteurs : on obtient le pé-pé-cé-ème.',
    'H1|3|0': 'Attention, cette erreur est fréquente : garder seulement les facteurs communs. Par exemple, soixante égale deux au carré, fois trois, fois cinq. Et soixante-douze égale deux au cube, fois trois au carré.',
    'H1|3|1': 'Pour le pé-pé-cé-ème, on garde tous les facteurs, avec le plus grand exposant : deux au cube, fois trois au carré, fois cinq, c’est-à-dire trois cent soixante. Astuce : vérifie que ton pé-pé-cé-ème est un multiple des deux nombres.',
    'H1b|0|0': 'Quand utilise-t-on le pé-pé-cé-ème ? Quand deux évènements se répètent régulièrement, et qu’on cherche quand ils se produiront de nouveau en même temps.',
    'H1b|0|1': 'Retiens les mots-clés : en même temps, de nouveau ensemble, le plus tôt possible. Ils te disent d’utiliser le pé-pé-cé-ème.',
    'H1b|1|0': 'Par exemple : Léo va à la piscine tous les quatre jours, et Zoé tous les six jours. Aujourd’hui, ils y sont allés ensemble.',
    'H1b|1|1': 'Le nombre de jours doit être un multiple commun de quatre et de six. Le plus petit, c’est le pé-pé-cé-ème de quatre et de six, qui est douze.',
    'H1b|1|2': 'On peut conclure : Léo et Zoé se retrouveront ensemble à la piscine dans douze jours.',
    'H1b|2|0': 'Attention à ne pas confondre. Pour partager en parts identiques, on cherche un diviseur commun : c’est le pé-gé-cé-dé.',
    'H1b|2|1': 'Pour savoir quand des évènements se produiront de nouveau ensemble, on cherche un multiple commun : c’est le pé-pé-cé-ème.',
    'K|0|0': 'Définition : un nombre premier p est un nombre premier de Sophie Germain, si deux fois p, plusse un, est aussi un nombre premier.',
    'K|0|1': 'Par exemple : deux fois cinq, plusse un, égale onze, et onze est premier. Donc cinq est un nombre premier de Sophie Germain.',
    'K|0|2': 'Mais deux fois treize, plusse un, égale vingt-sept. Et vingt-sept égale trois fois neuf : vingt-sept n’est pas premier. Donc treize n’est pas un nombre premier de Sophie Germain.',
    'K|1|2': 'Attention : cent vingt et un est bien un palindrome. Mais cent vingt et un égale onze fois onze, donc cent vingt et un n’est pas premier.',
    'K|2|0': 'Attention, cette erreur est fréquente. Dire : cent vingt et un est premier, car il n’est divisible ni par deux, ni par trois, ni par cinq. C’est faux !',
    'K|2|1': 'Il faut tester jusqu’à la racine carrée. La racine carrée de cent vingt et un est onze, et cent vingt et un égale onze fois onze. Donc cent vingt et un n’est pas premier.',
    'P|0|1': 'Par exemple, cinquante égale deux, fois cinq au carré. Un plusse un, fois deux plusse un, égale six. Donc cinquante a six diviseurs.',
    'P|1|0': 'Définition : un nombre est parfait, s’il est égal à la somme de ses diviseurs autres que lui-même.',
    'P|1|1': 'Par exemple, les diviseurs de six autres que six sont un, deux et trois. Un plusse deux plusse trois, égale six. Donc six est un nombre parfait.',
    'P|1|2': 'De même, un plusse deux plusse quatre plusse sept plusse quatorze, égale vingt-huit. Donc vingt-huit est aussi un nombre parfait.',
    'P|2|0': 'Définition : deux nombres sont amicaux, si chacun est égal à la somme des diviseurs de l’autre, autres que lui-même.',
    'P|2|1': 'Par exemple, deux cent vingt et deux cent quatre-vingt-quatre sont amicaux. La somme des diviseurs de deux cent vingt, sans lui-même, est deux cent quatre-vingt-quatre. Et la somme des diviseurs de deux cent quatre-vingt-quatre, sans lui-même, est deux cent vingt.',
  };
  for (const [cle, v] of Object.entries(VO)) {
    const [l, d, e] = cle.split('|'); const et = LECONS.arithmetique[l].diapos[+d].etapes[+e];
    if (!et) throw new Error('voix : étape introuvable ' + cle); et.v = v;
  }

  // ---------------- EXERCICES ----------------
  const A = EXOS.arithmetique;
  A[2] = { titre: 'Les critères de divisibilité', items: [
    { type: 'lecon', rub: 'lecon', parties: ['C'] },
    { type: 'methode', rub: 'methode', titre: 'Simplifier une fraction avec les critères',
      resume: '<ol class="meth"><li>On cherche un nombre qui divise le numérateur <strong>et</strong> le dénominateur (critères).</li><li>On divise les deux par ce nombre.</li><li>On recommence jusqu’à ce que la fraction soit irréductible.</li></ol>' + `<p><strong>Exemple :</strong> ${fr(126, 180)}.</p>`,
      etapes: [
        { h: '<p>126 et 180 sont pairs : on divise les deux par 2.</p>' },
        { h: `<p class="calc">${fr(126, 180)} = ${fr(63, 90)}</p>` },
        { h: '<p>6 + 3 = 9 et 9 + 0 = 9 : 63 et 90 sont divisibles par 9.</p>' },
        { h: `<p class="calc">${fr(63, 90)} = ${fr(7, 10)}</p>` }],
      cc: `La fraction irréductible est ${fr(7, 10)}.` },
    { type: 'flash', rub: 'flash', titre: 'Questions flash', consigne: 'Vrai ou faux ? Tu as 8 secondes par question.', duree: 8, questions: [
      { q: '3 456 est divisible par 9.', rep: true, expl: '3 + 4 + 5 + 6 = 18, et 18 est divisible par 9, donc 3 456 est divisible par 9.' },
      { q: '1 001 est divisible par 3.', rep: false, expl: '1 + 0 + 0 + 1 = 2, et 2 n’est pas divisible par 3, donc 1 001 n’est pas divisible par 3.' },
      { q: '4 560 est divisible par 5.', rep: true, expl: '4 560 se termine par 0, donc 4 560 est divisible par 5.' },
      { q: '2 358 est divisible par 10.', rep: false, expl: '2 358 se termine par 8 et non par 0, donc 2 358 n’est pas divisible par 10.' }] },
    { type: 'guide', rub: 'guide', titre: 'Le nombre 1 638', enonce: '<p>1 638 est-il divisible par 2 ? par 9 ? Réponds étape par étape.</p>',
      vis: ['<p class="calc">1 638</p>', '<p class="calc">1 63<b class="hl-t">8</b></p>', '<p class="calc">1 63<b class="hl-t">8</b></p><p>pair : divisible par 2</p>', '<p class="calc">1 + 6 + 3 + 8 = 18</p>', '<p class="calc">1 + 6 + 3 + 8 = 18</p><p>18 = 9 × 2 : divisible par 9</p>'],
      etapes: [
        { q: 'Quel est le chiffre des unités de 1 638 ?', rep: ['8'], k: 1, aide: 'C’est le dernier chiffre.' },
        { q: '1 638 est-il divisible par 2 ? (oui ou non)', rep: ['oui'], k: 2, texte: true, aide: '8 est pair.' },
        { q: 'Calcule la somme des chiffres de 1 638.', rep: ['18'], k: 3, aide: '1 + 6 + 3 + 8.' },
        { q: '1 638 est-il divisible par 9 ? (oui ou non)', rep: ['oui'], k: 4, texte: true, aide: '18 = 9 × 2.' }],
      fin: '<p class="cc">1 638 est divisible par 2 et par 9.</p>', cc: '1 638 est pair et la somme de ses chiffres, 18, est divisible par 9.' },
    { type: 'exo', rub: 'exo', titre: 'Exercice 1', ceinture: 'blanche',
      enonce: '<p>Le nombre <strong>7 215</strong> est-il divisible par 2 ? par 3 ? par 5 ? par 9 ? par 10 ?</p>',
      champs: ['2', '3', '5', '9', '10'].map((d, j) => ({ q: 'abcde'[j], lab: `par ${d} :`, choix: ['Oui', 'Non'], rep: ['Non', 'Oui', 'Oui', 'Non', 'Non'][j] })),
      indices: ['Pour 2, 5 et 10, regarde le chiffre des unités.', 'Pour 3 et 9, calcule la somme des chiffres.'],
      correction: [
        { q: 'a', h: '<p>7 215 se termine par 5, qui est impair, donc 7 215 n’est pas divisible par 2.</p>' },
        { q: 'b', h: '<p class="calc">7 + 2 + 1 + 5 = 15</p><p>15 est dans la table de 3, donc 7 215 est divisible par 3.</p>' },
        { q: 'c', h: '<p>7 215 se termine par 5, donc 7 215 est divisible par 5.</p>' },
        { q: 'd', h: '<p>15 n’est pas dans la table de 9, donc 7 215 n’est pas divisible par 9.</p>' },
        { q: 'e', h: '<p>7 215 ne se termine pas par 0, donc 7 215 n’est pas divisible par 10.</p>' }],
      cc: '7 215 est divisible par 3 et par 5 seulement.' },
    { type: 'exo', rub: 'exo', titre: 'Exercice 2', ceinture: 'jaune',
      enonce: `<p>En utilisant les critères de divisibilité, rends la fraction ${fr(90, 135)} irréductible.</p>`,
      champs: [{ lab: 'Fraction irréductible :', rep: ['2/3'], touches: ['/'], place: 'ex. : 3/4' }],
      indices: ['90 et 135 se terminent par 0 et par 5.', 'Divise les deux par 5, puis cherche un critère avec la somme des chiffres.'],
      correction: [
        { h: '<p>90 se termine par 0 et 135 par 5 : on divise les deux par 5.</p>' },
        { h: `<p class="calc">${fr(90, 135)} = ${fr(18, 27)}</p>` },
        { h: '<p>1 + 8 = 9 et 2 + 7 = 9 : 18 et 27 sont divisibles par 9.</p>' },
        { h: `<p class="calc">${fr(18, 27)} = ${fr(2, 3)}</p>` }],
      cc: `La fraction irréductible est ${fr(2, 3)}.` },
    { type: 'exo', rub: 'scratch', titre: 'Que dit le lutin ?',
      enonce: blocs('quand @greenFlag est cliqué\ndemander [Donne un nombre] et attendre\nsi <((réponse) modulo (9)) = (0)> alors\ndire [divisible par 9]\nsinon\ndire [non]\nfin') +
        '<p><span class="q">a)</span> Que dit le lutin si on donne <strong>4 671</strong> ?</p><p><span class="q">b)</span> Que dit le lutin si on donne <strong>1 234</strong> ?</p>',
      champs: [{ q: 'a', lab: 'Pour 4 671, le lutin dit :', choix: ['divisible par 9', 'non'], rep: 'divisible par 9' }, { q: 'b', lab: 'Pour 1 234, le lutin dit :', choix: ['divisible par 9', 'non'], rep: 'non' }],
      indices: ['« modulo 9 » donne le reste de la division par 9.', 'Utilise le critère : la somme des chiffres.'],
      correction: [
        { q: 'a', h: '<p class="calc">4 + 6 + 7 + 1 = 18</p><p>18 est divisible par 9, donc le reste est 0 : le lutin dit « divisible par 9 ».</p>' },
        { q: 'b', h: '<p class="calc">1 + 2 + 3 + 4 = 10</p><p>10 n’est pas divisible par 9, donc le reste n’est pas 0 : le lutin dit « non ».</p>' }],
      cc: 'a) Le lutin dit « divisible par 9 ». b) Il dit « non ».' },
    { type: 'exo', rub: 'calc', titre: 'Vérifier une fraction irréductible',
      enonce: `<p>Avec ta calculatrice, vérifie ton résultat : ${fr(90, 135)} = ?</p>` + touches('9', '0', '÷', '1', '3', '5', 'EXE'),
      champs: [{ lab: 'La calculatrice affiche :', rep: ['2/3'], touches: ['/'] }],
      indices: ['Tape 90, la touche ÷, puis 135 et EXE.', 'La calculatrice affiche directement la fraction irréductible.'],
      correction: [{ h: `<p>La calculatrice affiche ${fr(2, 3)}, c’est bien le même résultat.</p><p>Attention : la calculatrice sert à vérifier ; tu dois rédiger les étapes.</p>` }],
      cc: `${fr(90, 135)} = ${fr(2, 3)}.` },
    { type: 'exo', rub: 'tableur', titre: 'La fonction MOD',
      enonce: tableur('=MOD(7215;3)', '=MOD(7215;3)', '=MOD(7215;9)') + '<p><span class="q">a)</span> Qu’affiche la case A1 ?</p><p><span class="q">b)</span> Qu’affiche la case B1 ?</p>',
      champs: [{ q: 'a', lab: 'La case A1 affiche :', rep: ['0'], court: true }, { q: 'b', lab: 'La case B1 affiche :', rep: ['6'], court: true }],
      indices: ['MOD donne le reste de la division euclidienne.', 'La somme des chiffres de 7 215 est 15.', '15 = 9 × 1 + 6.'],
      correction: [
        { q: 'a', h: '<p class="calc">7 + 2 + 1 + 5 = 15</p><p>15 est divisible par 3, donc 7 215 aussi : le reste est 0 et la case A1 affiche <strong>0</strong>.</p>' },
        { q: 'b', h: '<p>7 215 = 9 × 801 + 6, donc le reste de la division par 9 est 6 : la case B1 affiche <strong>6</strong>.</p>' }],
      cc: 'a) La case A1 affiche 0. b) La case B1 affiche 6.' },
  ] };

  A[3] = { titre: 'Applications de la division euclidienne', items: [
    { type: 'lecon', rub: 'lecon', parties: ['B2'] },
    { type: 'methode', rub: 'methode', titre: 'Un problème de partage',
      resume: '<ol class="meth"><li>On pose la division euclidienne.</li><li>On dit ce que représentent le <strong>quotient</strong> et le <strong>reste</strong> dans le problème.</li><li>On répond avec une phrase.</li></ol><p><strong>Exemple :</strong> 230 élèves voyagent en cars de 52 places. Combien de cars faut-il ?</p>',
      etapes: [
        { h: { pot: [230, 52, 0] }, v: 'On pose la division euclidienne de deux cent trente par cinquante-deux.' },
        { h: { pot: [230, 52, 1] }, v: 'Dans deux cent trente, combien de fois cinquante-deux ? Quatre fois, car quatre fois cinquante-deux égale deux cent huit.' },
        { h: { pot: [230, 52, 2], apres: '<p class="formule grand">230 = 52 × 4 + 22</p>' }, v: 'Deux cent trente moins deux cent huit, égale vingt-deux. Deux cent trente égale cinquante-deux fois quatre, plusse vingt-deux.' },
        { h: '<p>4 cars sont pleins, mais il reste 22 élèves : il faut un car de plus.</p>' }],
      cc: 'Il faut donc réserver 5 cars.' },
    { type: 'flash', rub: 'flash', titre: 'Questions flash', consigne: 'Vrai ou faux ? Tu as 8 secondes par question.', duree: 8, questions: [
      { q: '50 = 7 × 7 + 1 : dans la division euclidienne de 50 par 7, le quotient est 7.', rep: true, expl: 'Le reste 1 est plus petit que 7, donc le quotient est bien 7.' },
      { q: 'Dans la division euclidienne de 23 par 4, le reste est 7.', rep: false, expl: '23 = 4 × 5 + 3, donc le reste est 3.' },
      { q: '29 élèves font des équipes de 4 : on fait 7 équipes complètes.', rep: true, expl: '29 = 4 × 7 + 1, donc on fait 7 équipes complètes et il reste 1 élève.' },
      { q: 'Il faut 6 boîtes de 6 pour ranger 40 œufs.', rep: false, expl: '40 = 6 × 6 + 4 : il reste 4 œufs, donc il faut 7 boîtes.' }] },
    { type: 'guide', rub: 'guide', titre: 'La frise', enonce: '<p>Le motif <strong>rouge, jaune, vert, bleu</strong> se répète. Quelle est la couleur du <strong>75ᵉ</strong> carré ?</p>',
      vis: [frise(12), frise(12, 4), '<p class="formule grand">75 = 4 × 18 + …</p>', '<p class="formule grand">75 = 4 × 18 + 3</p>', '<p class="formule grand">75 = 4 × 18 + 3</p>' + frise(4, 3)],
      etapes: [
        { q: 'Combien de carrés différents y a-t-il dans ce motif ?', rep: ['4'], k: 1, aide: 'Rouge, jaune, vert, bleu.' },
        { q: 'Dans 75, combien de fois 4 ? (le quotient)', rep: ['18'], k: 2, aide: '4 × 18 = 72 et 4 × 19 = 76.' },
        { q: 'Quel est le reste ?', rep: ['3'], k: 3, aide: '75 − 72.' },
        { q: 'Quelle est la couleur du 75ᵉ carré ?', rep: ['vert'], k: 4, texte: true, aide: 'Le reste 3 donne la place dans le motif : le 3ᵉ carré.' }],
      fin: '<p class="cc">Le 75ᵉ carré est le 3ᵉ du motif, donc il est vert.</p>', cc: '18 motifs complets, puis 3 carrés.' },
    { type: 'exo', rub: 'exo', titre: 'Exercice 1', ceinture: 'jaune',
      enonce: '<p>345 supporters partent en car. Chaque car a 48 places.</p><p><span class="q">a)</span> Combien de cars faut-il réserver ?</p><p><span class="q">b)</span> Combien de places restent libres dans le dernier car ?</p>',
      champs: [{ q: 'a', lab: 'Nombre de cars :', rep: ['8'], court: true }, { q: 'b', lab: 'Places libres :', rep: ['39'], court: true }],
      indices: ['Pose la division euclidienne de 345 par 48.', 'Les supporters qui restent doivent aussi monter dans un car.'],
      correction: [
        { q: 'a', h: { pot: [345, 48, 2], apres: '<p class="formule grand">345 = 48 × 7 + 9</p>' }, v: 'Trois cent quarante-cinq égale quarante-huit fois sept, plusse neuf.' },
        { q: 'a', h: '<p>7 cars sont pleins et il reste 9 supporters, donc il faut un 8ᵉ car.</p>' },
        { q: 'b', h: '<p class="calc">48 − 9 = 39</p><p>Le dernier car a 9 supporters, donc il reste 39 places libres.</p>' }],
      cc: 'a) Il faut 8 cars. b) Il reste 39 places libres dans le dernier car.' },
    { type: 'exo', rub: 'exo', titre: 'Exercice 2', ceinture: 'jaune',
      enonce: '<p>Aujourd’hui, c’est <strong>lundi</strong>. Quel jour serons-nous dans <strong>100 jours</strong> ?</p>',
      champs: [{ lab: 'Ce sera un :', rep: ['mercredi'], texte: true }],
      indices: ['Les jours se répètent toutes les 7 jours.', 'Fais la division euclidienne de 100 par 7.'],
      correction: [
        { h: '<p class="calc">100 = 7 × 14 + 2</p><p>Dans 98 jours, on est de nouveau lundi.</p>' },
        { h: '<p>Il reste 2 jours : lundi + 2 jours, c’est mercredi.</p>' }],
      cc: 'Dans 100 jours, ce sera un mercredi.' },
    { type: 'exo', rub: 'calc', titre: 'Le quotient et le reste',
      enonce: '<p>Avec ta calculatrice, effectue la division euclidienne de <strong>317</strong> par <strong>24</strong>.</p>',
      champs: [{ q: 'a', lab: 'Le quotient :', rep: ['13'], court: true }, { q: 'b', lab: 'Le reste :', rep: ['5'], court: true }],
      indices: ['Utilise la touche de la division euclidienne.', 'Q est le quotient, R est le reste.'],
      aide: { bouton: 'Voir les touches', html: `<div class="calcs"><figure><img src="assets/img/calc-sc-de.png" alt="Calculatrice collège : 317⊢24, l'écran affiche Q=13 R=5" width="190"><figcaption>fx-92+ Spéciale Collège</figcaption></figure>
        <figure><img src="assets/img/calc-cw-de.png" alt="Calculatrice collège 2023" width="190"><figcaption>Modèle 2023</figcaption></figure></div>
        <p class="touches"><strong>Spéciale Collège :</strong> <kbd>3</kbd><kbd>1</kbd><kbd>7</kbd><kbd>⊢</kbd><kbd>2</kbd><kbd>4</kbd><kbd>EXE</kbd></p>
        <p class="touches"><strong>Modèle 2023 :</strong> <kbd>3</kbd><kbd>1</kbd><kbd>7</kbd><kbd>SECONDE</kbd><kbd>÷</kbd><kbd>2</kbd><kbd>4</kbd><kbd>EXE</kbd></p>` },
      correction: [
        { q: 'a', h: '<p>L’écran affiche Q = 13 : c’est le quotient.</p>' },
        { q: 'b', h: '<p>L’écran affiche R = 5 : c’est le reste, et 5 &lt; 24.</p><p class="calc">317 = 24 × 13 + 5</p>' }],
      cc: 'Le quotient est 13 et le reste est 5.' },
    { type: 'exo', rub: 'scratch', titre: 'Diviser en soustrayant',
      enonce: blocs('quand @greenFlag est cliqué\nmettre [n v] à (30)\nmettre [q v] à (0)\nrépéter jusqu\'à <(n) < (7)>\nmettre [n v] à ((n) - (7))\najouter (1) à [q v]\nfin\ndire (q) pendant (2) secondes\ndire (n)') +
        '<p><span class="q">a)</span> Que dit le lutin en premier ?</p><p><span class="q">b)</span> Que dit-il ensuite ?</p>',
      champs: [{ q: 'a', lab: 'Il dit d’abord :', rep: ['4'], court: true }, { q: 'b', lab: 'Puis il dit :', rep: ['2'], court: true }],
      indices: ['À chaque tour, on enlève 7 à n et on ajoute 1 à q.', 'Compte combien de fois on peut enlever 7 à 30.'],
      correction: [
        { q: 'a', h: '<p>30 → 23 → 16 → 9 → 2 : on enlève 7 quatre fois, donc q = 4 et le lutin dit d’abord 4.</p>' },
        { q: 'b', h: '<p>Il reste n = 2, qui est plus petit que 7, donc le lutin dit ensuite 2.</p><p class="calc">30 = 7 × 4 + 2</p>' }],
      cc: 'Le programme calcule le quotient (4) et le reste (2) de la division de 30 par 7.' },
    { type: 'exo', rub: 'tableur', titre: 'Les formules ENT et MOD',
      enonce: tableur('=ENT(345/48)', '=ENT(345/48)', '=MOD(345;48)') + '<p><span class="q">a)</span> Qu’affiche la case A1 ?</p><p><span class="q">b)</span> Qu’affiche la case B1 ?</p>',
      champs: [{ q: 'a', lab: 'La case A1 affiche :', rep: ['7'], court: true }, { q: 'b', lab: 'La case B1 affiche :', rep: ['9'], court: true }],
      indices: ['ENT donne le quotient, MOD donne le reste.', 'Pose la division euclidienne de 345 par 48.'],
      correction: [
        { q: 'a', h: '<p class="calc">345 = 48 × 7 + 9</p><p>ENT garde la partie entière : c’est le quotient, donc la case A1 affiche <strong>7</strong>.</p>' },
        { q: 'b', h: '<p>MOD donne le reste, donc la case B1 affiche <strong>9</strong>.</p>' }],
      cc: 'a) La case A1 affiche 7. b) La case B1 affiche 9.' },
  ] };

  A[4] = { titre: 'Nombres premiers et fraction irréductible', items: [
    { type: 'lecon', rub: 'lecon', parties: ['D', 'F'] },
    { type: 'methode', rub: 'methode', titre: 'Savoir si un nombre est premier',
      resume: '<ol class="meth"><li>On calcule la racine carrée du nombre.</li><li>On teste les divisions par 2, 3, 5, 7, 11…</li><li>On s’arrête quand le nombre premier testé dépasse la racine carrée.</li></ol><p><strong>Exemple :</strong> 151 est-il premier ?</p>',
      etapes: [
        { h: '<p class="calc">√151 ≈ 12,3</p>', v: 'La racine carrée de cent cinquante et un est environ douze virgule trois.' },
        { h: '<p>151 est impair, donc il n’est pas divisible par 2.</p>' },
        { h: '<p>1 + 5 + 1 = 7, donc 151 n’est pas divisible par 3.</p>' },
        { h: '<p>151 ne se termine ni par 0 ni par 5, donc il n’est pas divisible par 5.</p>' },
        { h: '<p class="calc">151 = 7 × 21 + 4</p><p class="calc">151 = 11 × 13 + 8</p><p>151 n’est divisible ni par 7, ni par 11.</p>' },
        { h: '<p>Le nombre premier suivant, 13, est plus grand que 12,3 : on s’arrête.</p>' }],
      cc: '151 n’a pas d’autre diviseur que 1 et lui-même, donc 151 est un nombre premier.' },
    { type: 'flash', rub: 'flash', titre: 'Questions flash', consigne: 'Vrai ou faux ? Tu as 8 secondes par question.', duree: 8, questions: [
      { q: '1 est un nombre premier.', rep: false, expl: '1 n’a qu’un seul diviseur, donc 1 n’est pas premier.' },
      { q: '2 est le seul nombre premier pair.', rep: true, expl: 'Tous les autres nombres pairs sont divisibles par 2, donc ils ne sont pas premiers.' },
      { q: '51 est un nombre premier.', rep: false, expl: '51 = 3 × 17, donc 51 n’est pas premier.' },
      { q: '37 est un nombre premier.', v: 'Le nombre trente-sept est un nombre premier. Vrai, ou faux ?', rep: true, expl: '37 est dans la liste des nombres premiers, donc 37 est premier.' }] },
    { type: 'guide', rub: 'guide', titre: 'Rendre une fraction irréductible', enonce: `<p>Rends la fraction ${fr(72, 120)} irréductible, étape par étape.</p>`,
      vis: [`<p class="calc">${fr(72, 120)}</p>`, `<p class="calc">72 = 2³ × 3²</p>`, `<p class="calc">72 = 2³ × 3²</p><p class="calc">120 = 2³ × 3 × 5</p>`, `<p class="calc">72 = 2³ × 3²</p><p class="calc">120 = 2³ × 3 × 5</p><p>facteurs communs : 2³ × 3 = 24</p>`, `<p class="calc">${fr(72, 120)} = ${fr('72 ÷ 24', '120 ÷ 24')} = ${fr(3, 5)}</p>`],
      etapes: [
        { q: 'Décompose 72 : 72 = …', rep: ['2³×3²', '2×2×2×3×3', '3²×2³'], k: 1, touches: ['×', '²', '³'], aide: '72 ÷ 2 = 36 ; 36 ÷ 2 = 18 ; 18 ÷ 2 = 9 ; 9 ÷ 3 = 3 ; 3 ÷ 3 = 1.' },
        { q: 'Décompose 120 : 120 = …', rep: ['2³×3×5', '2×2×2×3×5'], k: 2, touches: ['×', '²', '³'], aide: '120 ÷ 2 = 60 ; 60 ÷ 2 = 30 ; 30 ÷ 2 = 15 ; 15 ÷ 3 = 5 ; 5 ÷ 5 = 1.' },
        { q: 'Calcule le produit des facteurs communs.', rep: ['24'], k: 3, aide: 'Les facteurs communs sont 2³ et 3 : 8 × 3.' },
        { q: 'Écris la fraction irréductible.', rep: ['3/5'], k: 4, touches: ['/'], aide: '72 ÷ 24 = 3 et 120 ÷ 24 = 5.' }],
      fin: `<p class="cc">La fraction irréductible égale à ${fr(72, 120)} est ${fr(3, 5)}.</p>`, cc: 'On a simplifié par 24.' },
    { type: 'exo', rub: 'exo', titre: 'Exercice 1', ceinture: 'blanche',
      enonce: '<p>Ces nombres sont-ils premiers ? Justifie.</p><p><span class="q">a)</span> 91 &nbsp; <span class="q">b)</span> 97 &nbsp; <span class="q">c)</span> 221</p>',
      champs: [{ q: 'a', lab: '91 :', choix: ['premier', 'pas premier'], rep: 'pas premier' }, { q: 'b', lab: '97 :', choix: ['premier', 'pas premier'], rep: 'premier' }, { q: 'c', lab: '221 :', choix: ['premier', 'pas premier'], rep: 'pas premier' }],
      indices: ['Pour 91 et 97, regarde la liste des nombres premiers.', 'Pour 221 : √221 ≈ 14,9. Teste 2, 3, 5, 7, 11 et 13.'],
      correction: [
        { q: 'a', h: '<p class="calc">91 = 7 × 13</p><p>91 a d’autres diviseurs que 1 et 91, donc 91 n’est pas premier.</p>' },
        { q: 'b', h: '<p>97 est dans la liste des nombres premiers, donc 97 est premier.</p>' },
        { q: 'c', h: '<p class="calc">221 = 13 × 17</p><p>221 est divisible par 13, donc 221 n’est pas premier.</p>' }],
      cc: 'Seul 97 est premier.' },
    { type: 'exo', rub: 'exo', titre: 'Exercice 2', ceinture: 'jaune',
      enonce: `<p>Rends la fraction ${fr(126, 210)} irréductible.</p>`,
      champs: [{ lab: 'Fraction irréductible :', rep: ['3/5'], touches: ['/'], place: 'ex. : 3/4' }],
      indices: ['Décompose 126 et 210 avec les divisions successives.', 'Barre les facteurs communs en haut et en bas.'],
      correction: [
        { h: '<p>Divisions successives de 126 :</p>' + divsucc(126) + '<p class="calc">126 = 2 × 3 × 3 × 7</p>', v: 'Avec les divisions successives : cent vingt-six égale deux fois trois fois trois fois sept.' },
        { h: '<p>Divisions successives de 210 :</p>' + divsucc(210) + '<p class="calc">210 = 2 × 3 × 5 × 7</p>', v: 'Deux cent dix égale deux fois trois fois cinq fois sept.' },
        { h: `<p class="calc">${fr('<s>2</s> × <s>3</s> × 3 × <s>7</s>', '<s>2</s> × <s>3</s> × 5 × <s>7</s>')} = ${fr(3, 5)}</p>`, v: 'On barre les facteurs communs deux, trois et sept : il reste trois sur cinq.' }],
      cc: `La fraction irréductible égale à ${fr(126, 210)} est ${fr(3, 5)}.` },
    { type: 'exo', rub: 'calc', titre: 'Vérifier à la calculatrice',
      enonce: `<p>Vérifie ton résultat avec la calculatrice : ${fr(126, 210)} = ?</p>` + touches('1', '2', '6', '÷', '2', '1', '0', 'EXE'),
      champs: [{ lab: 'La calculatrice affiche :', rep: ['3/5'], touches: ['/'] }],
      indices: ['La calculatrice affiche directement la fraction irréductible.'],
      correction: [{ h: `<p>La calculatrice affiche ${fr(3, 5)}.</p><p>Attention : au brevet, dans les automatismes, cette question se fait sans calculatrice.</p>` }],
      cc: `${fr(126, 210)} = ${fr(3, 5)}.` },
  ] };

  A[5] = { titre: 'Décomposer en produit de facteurs premiers', items: [
    { type: 'lecon', rub: 'lecon', parties: ['E'] },
    { type: 'methode', rub: 'methode', titre: 'Décomposer 360',
      resume: '<p>On utilise les divisions successives : on divise par le plus petit nombre premier possible, jusqu’à obtenir 1.</p>',
      etapes: [0, 1, 2, 3, 4, 5, 6].map(k => ({ r: true, h: dsK(360, k), v: ['On écrit trois cent soixante, et on trace la barre verticale.', 'Trois cent soixante divisé par deux, égale cent quatre-vingts.', 'Cent quatre-vingts divisé par deux, égale quatre-vingt-dix.', 'Quatre-vingt-dix divisé par deux, égale quarante-cinq.', 'Quarante-cinq est impair. Quatre plus cinq égale neuf : quarante-cinq divisé par trois, égale quinze.', 'Quinze divisé par trois, égale cinq.', 'Cinq est premier : cinq divisé par cinq, égale un. On s’arrête.'][k] }))
        .concat([{ h: '<p class="calc">360 = 2 × 2 × 2 × 3 × 3 × 5</p>' }]),
      cc: 'La décomposition de 360 en produit de facteurs premiers est 2³ × 3² × 5.' },
    { type: 'flash', rub: 'flash', titre: 'Questions flash', consigne: 'Décomposition en facteurs premiers, vrai ou faux ? 8 secondes par question.', duree: 8, questions: [
      { q: '30 = 2 × 3 × 5 est une décomposition en facteurs premiers.', rep: true, expl: '2, 3 et 5 sont premiers, donc c’est bien une décomposition.' },
      { q: '48 = 6 × 8 est une décomposition en facteurs premiers.', rep: false, expl: '6 et 8 ne sont pas premiers, donc ce n’est pas une décomposition : 48 = 2⁴ × 3.' },
      { q: '18 = 2 × 3² est une décomposition en facteurs premiers.', rep: true, expl: '2 et 3 sont premiers, donc c’est bien une décomposition.' },
      { q: '100 = 10² est une décomposition en facteurs premiers.', rep: false, expl: '10 n’est pas premier, donc ce n’est pas une décomposition : 100 = 2² × 5².' }] },
    { type: 'guide', rub: 'guide', titre: 'Décomposer 84', enonce: '<p>Décompose 84 en produit de facteurs premiers, étape par étape.</p>',
      vis: [0, 1, 2, 3, 4].map(k => dsK(84, k)),
      etapes: [
        { q: '84 est pair : 84 ÷ 2 = ?', rep: ['42'], k: 1, aide: 'La moitié de 84.' },
        { q: '42 est pair : 42 ÷ 2 = ?', rep: ['21'], k: 2, aide: 'La moitié de 42.' },
        { q: '21 n’est pas pair, mais 2 + 1 = 3 : 21 ÷ 3 = ?', rep: ['7'], k: 3, aide: 'Table de 3.' },
        { q: '7 est premier : 7 ÷ 7 = ?', rep: ['1'], k: 4, aide: 'Un nombre divisé par lui-même.' },
        { q: 'Écris la décomposition : 84 = …', rep: ['2²×3×7', '2×2×3×7'], k: 4, touches: ['×', '²', '³'], aide: 'Lis la colonne de droite : 2, 2, 3 et 7.' }],
      fin: '<p class="cc">La décomposition de 84 est 2² × 3 × 7.</p>', cc: 'On lit les facteurs dans la colonne de droite.' },
    { type: 'exo', rub: 'exo', titre: 'Exercice 1', ceinture: 'blanche',
      enonce: '<p>Décompose <strong>252</strong> en produit de facteurs premiers.</p>',
      champs: [{ lab: '252 =', rep: ['2²×3²×7', '2×2×3×3×7'], touches: ['×', '²', '³'], place: 'ex. : 2² × 3' }],
      indices: ['252 est pair : commence par diviser par 2.', 'Divise par 2 tant que tu peux, puis passe à 3.', 'Ton tableau a 6 lignes, de 252 jusqu’à 1.'],
      correction: [
        { h: '<p>Divisions successives :</p>' + divsucc(252), v: 'Avec les divisions successives : deux cent cinquante-deux, cent vingt-six, soixante-trois, vingt et un, sept, un.' },
        { h: '<p class="calc">252 = 2 × 2 × 3 × 3 × 7</p>' }],
      cc: 'La décomposition de 252 est 2² × 3² × 7.' },
    { type: 'exo', rub: 'exo', titre: 'Exercice 2', ceinture: 'jaune',
      enonce: '<p>Décompose <strong>1 000</strong> en produit de facteurs premiers.</p>',
      champs: [{ lab: '1 000 =', rep: ['2³×5³', '5³×2³', '2×2×2×5×5×5'], touches: ['×', '²', '³'] }],
      indices: ['1 000 = 10 × 10 × 10.', 'Et 10 = 2 × 5.'],
      correction: [
        { h: '<p>Divisions successives :</p>' + divsucc(1000), v: 'Avec les divisions successives : on divise trois fois par deux, puis trois fois par cinq.' },
        { h: '<p class="calc">1 000 = 2 × 2 × 2 × 5 × 5 × 5</p>' }],
      cc: 'La décomposition de 1 000 est 2³ × 5³.' },
    { type: 'exo', rub: 'calc', titre: 'Décomposer avec la calculatrice',
      enonce: '<p>Sur le modèle 2023, vérifie la décomposition de <strong>252</strong>.</p>' + touches('2', '5', '2', 'EXE', 'FORMAT', '▼ Facteur premier', 'EXE'),
      champs: [{ lab: 'La calculatrice affiche :', rep: ['2²×3²×7'], touches: ['×', '²', '³'] }],
      indices: ['Tape 252 puis EXE, puis FORMAT et descends jusqu’à « Facteur premier ».'],
      correction: [{ h: '<p>La calculatrice affiche 2² × 3² × 7.</p><p>Attention : la calculatrice sert à vérifier ; tu dois rédiger les divisions successives.</p>' }],
      cc: '252 = 2² × 3² × 7.' },
  ] };

  A[6] = { titre: 'PGCD : définition et méthode', items: [
    { type: 'lecon', rub: 'lecon', parties: ['G1'] },
    { type: 'methode', rub: 'methode', titre: 'Calculer le PGCD de 84 et 90',
      resume: '<ol class="meth"><li>On décompose chaque nombre.</li><li>On garde les facteurs communs avec le plus petit exposant.</li><li>On les multiplie.</li></ol>',
      etapes: [
        { h: '<p>Divisions successives de 84 :</p>' + divsucc(84) + '<p class="calc">84 = 2² × 3 × 7</p>', v: 'Avec les divisions successives : quatre-vingt-quatre égale deux au carré, fois trois, fois sept.' },
        { h: '<p>Divisions successives de 90 :</p>' + divsucc(90) + '<p class="calc">90 = 2 × 3² × 5</p>', v: 'Quatre-vingt-dix égale deux, fois trois au carré, fois cinq.' },
        { h: '<p>2 est commun : 2² et 2, on garde le plus petit exposant, 2.</p>' },
        { h: '<p>3 est commun : 3 et 3², on garde 3. 7 et 5 ne sont pas communs.</p>' },
        { h: '<p class="calc">PGCD(84 ; 90) = 2 × 3 = 6</p>' }],
      cc: 'Le PGCD de 84 et 90 est 6.' },
    { type: 'flash', rub: 'flash', titre: 'Questions flash', consigne: 'Vrai ou faux ? Tu as 8 secondes par question.', duree: 8, questions: [
      { q: 'Le PGCD de 6 et 9 est 3.', rep: true, expl: '3 divise 6 et 9, et c’est le plus grand diviseur commun.' },
      { q: 'Le PGCD de 14 et 21 est 42.', rep: false, expl: '42 est un multiple, pas un diviseur : PGCD(14 ; 21) = 7.' },
      { q: 'Le PGCD de 5 et 8 est 1.', rep: true, expl: '5 et 8 n’ont qu’un seul diviseur commun, 1.' },
      { q: 'Le PGCD de 10 et 20 est 10.', rep: true, expl: '10 divise 20, donc le PGCD de 10 et 20 est 10.' }] },
    { type: 'guide', rub: 'guide', titre: 'Le PGCD de 60 et 45', enonce: '<p>Calcule le PGCD de 60 et 45, étape par étape.</p>',
      vis: ['<p class="calc">PGCD(60 ; 45) = ?</p>', '<p class="calc">60 = 2² × 3 × 5</p>', '<p class="calc">60 = 2² × 3 × 5</p><p class="calc">45 = 3² × 5</p>', '<p class="calc">60 = 2² × <b>3</b> × <b>5</b></p><p class="calc">45 = <b>3</b>² × <b>5</b></p>', '<p class="calc">PGCD(60 ; 45) = 3 × 5 = 15</p>'],
      etapes: [
        { q: 'Décompose 60 : 60 = …', rep: ['2²×3×5', '2×2×3×5'], k: 1, touches: ['×', '²'], aide: '60 ÷ 2 = 30 ; 30 ÷ 2 = 15 ; 15 ÷ 3 = 5 ; 5 ÷ 5 = 1.' },
        { q: 'Décompose 45 : 45 = …', rep: ['3²×5', '3×3×5'], k: 2, touches: ['×', '²'], aide: '45 ÷ 3 = 15 ; 15 ÷ 3 = 5 ; 5 ÷ 5 = 1.' },
        { q: 'Quels facteurs premiers sont communs ? (sépare-les par ;)', rep: ['3;5', '5;3'], k: 3, touches: [';'], aide: '2 n’est que dans 60.' },
        { q: 'PGCD(60 ; 45) = ?', rep: ['15'], k: 4, aide: 'On garde 3 et 5 avec le plus petit exposant.' }],
      fin: '<p class="cc">Le PGCD de 60 et 45 est 15.</p>', cc: '15 divise bien 60 et 45.' },
    { type: 'exo', rub: 'exo', titre: 'Exercice 1', ceinture: 'jaune',
      enonce: '<p>Décompose 72 et 108, puis détermine leur PGCD.</p>',
      champs: [{ lab: 'PGCD(72 ; 108) =', rep: ['36'], court: true }],
      indices: ['72 et 108 sont pairs.', 'Garde les facteurs communs avec le plus petit exposant.'],
      correction: [
        { h: '<p>Divisions successives de 72 :</p>' + divsucc(72) + '<p class="calc">72 = 2³ × 3²</p>', v: 'Soixante-douze égale deux au cube, fois trois au carré.' },
        { h: '<p>Divisions successives de 108 :</p>' + divsucc(108) + '<p class="calc">108 = 2² × 3³</p>', v: 'Cent huit égale deux au carré, fois trois au cube.' },
        { h: '<p class="calc">PGCD(72 ; 108) = 2² × 3² = 36</p>' }],
      cc: 'Le PGCD de 72 et 108 est 36.' },
    { type: 'exo', rub: 'exo', titre: 'Exercice 2', ceinture: 'blanche',
      enonce: '<p>Écris les diviseurs de 24 et de 40, puis déduis-en leur PGCD.</p>',
      champs: [{ q: 'a', lab: 'Les diviseurs communs :', rep: ['1;2;4;8'], touches: [';'] }, { q: 'b', lab: 'PGCD(24 ; 40) =', rep: ['8'], court: true }],
      indices: ['Écris les diviseurs avec des produits : 24 = 1 × 24 = 2 × 12…', 'Le PGCD est le plus grand diviseur commun.'],
      correction: [
        { q: 'a', h: '<p>Diviseurs de 24 : 1 ; 2 ; 3 ; 4 ; 6 ; 8 ; 12 ; 24</p><p>Diviseurs de 40 : 1 ; 2 ; 4 ; 5 ; 8 ; 10 ; 20 ; 40</p><p>Les diviseurs communs sont 1 ; 2 ; 4 ; 8.</p>' },
        { q: 'b', h: '<p>Le plus grand diviseur commun est 8, donc PGCD(24 ; 40) = 8.</p>' }],
      cc: 'a) Les diviseurs communs sont 1, 2, 4 et 8. b) Le PGCD de 24 et 40 est 8.' },
    { type: 'exo', rub: 'calc', titre: 'Le PGCD à la calculatrice',
      enonce: '<p>Sur le modèle 2023, vérifie le PGCD de 72 et 108.</p>' + touches('CATALOG', 'Calcul numérique', 'PGCD', '7', '2', ';', '1', '0', '8', ')', 'EXE'),
      champs: [{ lab: 'La calculatrice affiche :', rep: ['36'], court: true }],
      indices: ['CATALOG, puis Calcul numérique, puis PGCD.'],
      correction: [{ h: '<p>La calculatrice affiche 36.</p><p>Attention : la calculatrice sert à vérifier ; tu dois rédiger les décompositions.</p>' }],
      cc: 'PGCD(72 ; 108) = 36.' },
  ] };

  A[7] = { titre: 'PGCD : les applications', items: [
    { type: 'lecon', rub: 'lecon', parties: ['G1b'] },
    { type: 'methode', rub: 'methode', titre: 'Rendre une fraction irréductible avec le PGCD',
      resume: `<p>On divise le numérateur et le dénominateur par leur PGCD. <strong>Exemple :</strong> ${fr(84, 90)}, avec PGCD(84 ; 90) = 6.</p>`,
      etapes: [
        { h: '<p class="calc">84 ÷ 6 = 14</p>' },
        { h: '<p class="calc">90 ÷ 6 = 15</p>' },
        { h: `<p class="calc">${fr(84, 90)} = ${fr(14, 15)}</p>` }],
      cc: `La fraction ${fr(84, 90)} rendue irréductible est ${fr(14, 15)}.` },
    { type: 'flash', rub: 'flash', titre: 'Questions flash', consigne: 'Vrai ou faux ? Tu as 8 secondes par question.', duree: 8, questions: [
      { q: 'Pour faire le plus grand nombre de bouquets identiques, on cherche le PGCD.', rep: true, expl: 'Le nombre de bouquets est un diviseur commun, le plus grand possible : c’est le PGCD.' },
      { q: '15 et 28 sont premiers entre eux.', rep: true, expl: '15 = 3 × 5 et 28 = 2² × 7 n’ont aucun facteur commun, donc PGCD(15 ; 28) = 1.' },
      { q: 'Deux nombres pairs peuvent être premiers entre eux.', rep: false, expl: 'Deux nombres pairs ont toujours 2 comme diviseur commun, donc leur PGCD est au moins 2.' },
      { q: 'Avec 20 billes et 30 calots, on peut faire au maximum 10 sachets identiques.', rep: true, expl: 'PGCD(20 ; 30) = 10, donc on fait au maximum 10 sachets.' }] },
    { type: 'guide', rub: 'guide', titre: 'Les corbeilles', enonce: '<p>Une boulangère a 54 croissants et 72 pains au chocolat. Elle fait le plus grand nombre possible de corbeilles identiques, en utilisant tout.</p>',
      vis: ['<p class="calc">54 croissants · 72 pains</p>', '<p>Le nombre de corbeilles divise 54 et 72 : PGCD</p>', '<p class="calc">54 = 2 × 3³</p><p class="calc">72 = 2³ × 3²</p><p class="calc">PGCD = 2 × 3² = 18</p>', '<p class="calc">54 ÷ 18 = 3</p>', '<p class="calc">54 ÷ 18 = 3</p><p class="calc">72 ÷ 18 = 4</p>'],
      etapes: [
        { q: 'Le nombre de corbeilles doit diviser 54 et 72 : on cherche leur… (PGCD ou PPCM)', rep: ['pgcd'], k: 1, texte: true, aide: 'Un diviseur commun, le plus grand.' },
        { q: '54 = 2 × 3³ et 72 = 2³ × 3². PGCD(54 ; 72) = ?', rep: ['18'], k: 2, aide: 'On garde 2 et 3² : 2 × 9.' },
        { q: 'Combien de croissants par corbeille ? 54 ÷ 18 = ?', rep: ['3'], k: 3, aide: '18 × 3 = 54.' },
        { q: 'Combien de pains par corbeille ? 72 ÷ 18 = ?', rep: ['4'], k: 4, aide: '18 × 4 = 72.' }],
      fin: '<p class="cc">Elle fait 18 corbeilles, avec 3 croissants et 4 pains au chocolat dans chacune.</p>', cc: 'Le PGCD donne le nombre maximal de corbeilles.' },
    { type: 'exo', rub: 'exo', titre: 'Exercice 1', ceinture: 'jaune',
      enonce: '<p>Un mur mesure 120 cm sur 84 cm. On le recouvre de carreaux carrés identiques, les plus grands possible, sans découpe.</p><p><span class="q">a)</span> Quel est le côté d’un carreau ?</p><p><span class="q">b)</span> Combien faut-il de carreaux ?</p>',
      champs: [{ q: 'a', lab: 'Côté (en cm) :', rep: ['12'], court: true }, { q: 'b', lab: 'Nombre de carreaux :', rep: ['70'], court: true }],
      indices: ['Le côté doit diviser 120 et 84.', 'Le plus grand côté possible, c’est le PGCD.'],
      correction: [
        { q: 'a', h: '<p class="calc">120 = 2³ × 3 × 5</p><p class="calc">84 = 2² × 3 × 7</p><p class="calc">PGCD(120 ; 84) = 2² × 3 = 12</p><p>Le côté d’un carreau est donc 12 cm.</p>' },
        { q: 'b', h: '<p class="calc">120 ÷ 12 = 10</p><p class="calc">84 ÷ 12 = 7</p><p class="calc">10 × 7 = 70</p><p>Il faut donc 70 carreaux.</p>' }],
      cc: 'a) Le côté d’un carreau est 12 cm. b) Il faut 70 carreaux.' },
    { type: 'exo', rub: 'exo', titre: 'Exercice 2', ceinture: 'blanche',
      enonce: '<p>45 et 64 sont-ils premiers entre eux ? Justifie.</p>',
      champs: [{ lab: 'Ta réponse :', choix: ['Oui', 'Non'], rep: 'Oui' }],
      indices: ['Décompose 45 et 64.', 'Cherche un facteur premier commun.'],
      correction: [
        { h: '<p class="calc">45 = 3² × 5</p><p class="calc">64 = 2⁶</p>' },
        { h: '<p>Il n’y a aucun facteur premier commun, donc PGCD(45 ; 64) = 1.</p>' }],
      cc: 'Leur PGCD est 1, donc 45 et 64 sont premiers entre eux.' },
    { type: 'exo', rub: 'calc', titre: 'Vérifier le PGCD',
      enonce: '<p>Sur le modèle 2023, vérifie PGCD(120 ; 84).</p>' + touches('CATALOG', 'Calcul numérique', 'PGCD', '1', '2', '0', ';', '8', '4', ')', 'EXE'),
      champs: [{ lab: 'La calculatrice affiche :', rep: ['12'], court: true }],
      indices: ['CATALOG, puis Calcul numérique, puis PGCD.'],
      correction: [{ h: '<p>La calculatrice affiche 12, c’est bien le côté trouvé.</p>' }],
      cc: 'PGCD(120 ; 84) = 12.' },
  ] };

  A[8] = { titre: 'PPCM : définition et méthode', items: [
    { type: 'lecon', rub: 'lecon', parties: ['H1'] },
    { type: 'methode', rub: 'methode', titre: 'Calculer le PPCM de 60 et 72',
      resume: '<ol class="meth"><li>On décompose chaque nombre.</li><li>On garde tous les facteurs avec le plus grand exposant.</li><li>On les multiplie.</li></ol>',
      etapes: [
        { h: '<p>Divisions successives de 60 :</p>' + divsucc(60) + '<p class="calc">60 = 2² × 3 × 5</p>', v: 'Soixante égale deux au carré, fois trois, fois cinq.' },
        { h: '<p>Divisions successives de 72 :</p>' + divsucc(72) + '<p class="calc">72 = 2³ × 3²</p>', v: 'Soixante-douze égale deux au cube, fois trois au carré.' },
        { h: '<p>2 : on garde 2³. 3 : on garde 3². 5 : on le garde aussi.</p>' },
        { h: '<p class="calc">PPCM(60 ; 72) = 2³ × 3² × 5 = 360</p>' }],
      cc: 'Le PPCM de 60 et 72 est 360.' },
    { type: 'flash', rub: 'flash', titre: 'Questions flash', consigne: 'Vrai ou faux ? Tu as 8 secondes par question.', duree: 8, questions: [
      { q: 'Le PPCM de 4 et 10 est 20.', rep: true, expl: '20 est un multiple de 4 et de 10, et c’est le plus petit.' },
      { q: 'Le PPCM de 6 et 9 est 54.', rep: false, expl: '54 est un multiple commun, mais pas le plus petit : PPCM(6 ; 9) = 18.' },
      { q: 'Le PPCM de 5 et 7 est 35.', rep: true, expl: '5 et 7 n’ont pas de facteur commun, donc PPCM(5 ; 7) = 5 × 7 = 35.' },
      { q: 'Le PPCM de 3 et 12 est 3.', rep: false, expl: '3 est un diviseur, pas un multiple : PPCM(3 ; 12) = 12.' }] },
    { type: 'guide', rub: 'guide', titre: 'Le PPCM de 18 et 30', enonce: '<p>Calcule le PPCM de 18 et 30, étape par étape.</p>',
      vis: ['<p class="calc">PPCM(18 ; 30) = ?</p>', '<p class="calc">18 = 2 × 3²</p>', '<p class="calc">18 = 2 × 3²</p><p class="calc">30 = 2 × 3 × 5</p>', '<p class="calc">PPCM(18 ; 30) = 2 × 3² × 5 = 90</p>'],
      etapes: [
        { q: 'Décompose 18 : 18 = …', rep: ['2×3²', '2×3×3'], k: 1, touches: ['×', '²'], aide: '18 ÷ 2 = 9 ; 9 ÷ 3 = 3 ; 3 ÷ 3 = 1.' },
        { q: 'Décompose 30 : 30 = …', rep: ['2×3×5'], k: 2, touches: ['×'], aide: '30 ÷ 2 = 15 ; 15 ÷ 3 = 5 ; 5 ÷ 5 = 1.' },
        { q: 'Garde tous les facteurs, avec le plus grand exposant : PPCM = ?', rep: ['90'], k: 3, aide: '2 × 3² × 5 = 2 × 9 × 5.' }],
      fin: '<p class="cc">Le PPCM de 18 et 30 est 90.</p>', cc: '90 est bien un multiple de 18 et de 30.' },
    { type: 'exo', rub: 'exo', titre: 'Exercice 1', ceinture: 'jaune',
      enonce: '<p>Décompose 28 et 42, puis détermine leur PPCM.</p>',
      champs: [{ lab: 'PPCM(28 ; 42) =', rep: ['84'], court: true }],
      indices: ['28 et 42 sont pairs.', 'Garde tous les facteurs avec le plus grand exposant.'],
      correction: [
        { h: '<p class="calc">28 = 2² × 7</p><p class="calc">42 = 2 × 3 × 7</p>' },
        { h: '<p class="calc">PPCM(28 ; 42) = 2² × 3 × 7 = 84</p>' }],
      cc: 'Le PPCM de 28 et 42 est 84.' },
    { type: 'exo', rub: 'exo', titre: 'Exercice 2', ceinture: 'blanche',
      enonce: '<p>Écris les multiples de 6 et de 15 inférieurs à 50, puis déduis-en leur PPCM.</p>',
      champs: [{ lab: 'PPCM(6 ; 15) =', rep: ['30'], court: true }],
      indices: ['Récite la table de 6, puis celle de 15.'],
      correction: [
        { h: '<p>Multiples de 6 : 6 ; 12 ; 18 ; 24 ; 30 ; 36 ; 42 ; 48</p><p>Multiples de 15 : 15 ; 30 ; 45</p>' },
        { h: '<p>Le seul multiple commun inférieur à 50 est 30, donc c’est le plus petit.</p>' }],
      cc: 'Le PPCM de 6 et 15 est 30.' },
    { type: 'exo', rub: 'calc', titre: 'Vérifier un PPCM',
      enonce: '<p>Vérifie à la calculatrice que 84 est un multiple de 28 et de 42.</p>' + touches('8', '4', '÷', '2', '8', 'EXE') + touches('8', '4', '÷', '4', '2', 'EXE'),
      champs: [{ q: 'a', lab: '84 ÷ 28 =', rep: ['3'], court: true }, { q: 'b', lab: '84 ÷ 42 =', rep: ['2'], court: true }],
      indices: ['Les deux divisions doivent tomber juste.'],
      correction: [
        { q: 'a', h: '<p>84 ÷ 28 = 3 : la division tombe juste.</p>' },
        { q: 'b', h: '<p>84 ÷ 42 = 2 : la division tombe juste aussi, donc 84 est bien un multiple commun.</p>' }],
      cc: 'a) 84 ÷ 28 = 3. b) 84 ÷ 42 = 2.' },
  ] };

  A[9] = { titre: 'PPCM : les applications', items: [
    { type: 'lecon', rub: 'lecon', parties: ['H1b'] },
    { type: 'methode', rub: 'methode', titre: 'Les phares',
      resume: '<p><strong>Exemple :</strong> deux phares s’allument ensemble. L’un s’allume toutes les 6 secondes, l’autre toutes les 8 secondes. Quand s’allumeront-ils de nouveau ensemble ?</p>',
      etapes: [
        { h: '<p>Le temps cherché est un multiple commun de 6 et 8, le plus petit possible : c’est le PPCM.</p>' },
        { h: '<p class="calc">6 = 2 × 3</p><p class="calc">8 = 2³</p>' },
        { h: '<p class="calc">PPCM(6 ; 8) = 2³ × 3 = 24</p>' }],
      cc: 'Les deux phares s’allumeront de nouveau ensemble au bout de 24 secondes.' },
    { type: 'flash', rub: 'flash', titre: 'Questions flash', consigne: 'Vrai ou faux ? Tu as 8 secondes par question.', duree: 8, questions: [
      { q: 'Pour savoir quand deux bus repartiront ensemble, on cherche le PPCM.', rep: true, expl: 'On cherche le plus petit multiple commun des durées, donc le PPCM.' },
      { q: 'Deux évènements toutes les 4 et 6 minutes se reproduisent ensemble toutes les 24 minutes.', rep: false, expl: 'PPCM(4 ; 6) = 12, donc ils se reproduisent ensemble toutes les 12 minutes.' },
      { q: 'Le PPCM de 10 et 15 est 30.', rep: true, expl: '30 est un multiple de 10 et de 15, et c’est le plus petit.' },
      { q: 'Le PGCD et le PPCM de deux nombres sont toujours égaux.', rep: false, expl: 'Le PGCD est un diviseur, le PPCM un multiple : PGCD(4 ; 6) = 2 et PPCM(4 ; 6) = 12.' }] },
    { type: 'guide', rub: 'guide', titre: 'Les sirènes', enonce: '<p>Deux sirènes sonnent ensemble à 8 h. L’une sonne toutes les 12 minutes, l’autre toutes les 18 minutes. À quelle heure sonneront-elles de nouveau ensemble ?</p>',
      vis: ['<p class="calc">12 min · 18 min</p>', '<p>multiple commun, le plus petit : PPCM</p>', '<p class="calc">12 = 2² × 3</p><p class="calc">18 = 2 × 3²</p><p class="calc">PPCM = 2² × 3² = 36</p>', '<p class="calc">8 h + 36 min = 8 h 36</p>'],
      etapes: [
        { q: 'On cherche un multiple commun de 12 et 18, le plus petit : c’est le… (PGCD ou PPCM)', rep: ['ppcm'], k: 1, texte: true, aide: 'Se retrouver ensemble : un multiple.' },
        { q: '12 = 2² × 3 et 18 = 2 × 3². PPCM(12 ; 18) = ?', rep: ['36'], k: 2, aide: '2² × 3² = 4 × 9.' },
        { q: 'À quelle heure ? (écris par exemple 8h36)', rep: ['8h36'], k: 3, texte: true, aide: '8 h + 36 minutes.' }],
      fin: '<p class="cc">Les deux sirènes sonneront de nouveau ensemble à 8 h 36.</p>', cc: 'Le PPCM donne la durée avant de se retrouver.' },
    { type: 'exo', rub: 'exo', titre: 'Exercice 1', ceinture: 'jaune',
      enonce: '<p>Deux coureurs partent ensemble. L’un fait un tour de piste en 40 secondes, l’autre en 60 secondes.</p><p><span class="q">a)</span> Au bout de combien de secondes repassent-ils ensemble sur la ligne de départ ?</p><p><span class="q">b)</span> Combien de tours a fait le premier coureur ?</p><p><span class="q">c)</span> Et le second ?</p>',
      champs: [{ q: 'a', lab: 'Au bout de (en s) :', rep: ['120'], court: true }, { q: 'b', lab: 'Tours du premier :', rep: ['3'], court: true }, { q: 'c', lab: 'Tours du second :', rep: ['2'], court: true }],
      indices: ['Le temps cherché est un multiple de 40 et de 60.', 'Le plus petit, c’est le PPCM.'],
      correction: [
        { q: 'a', h: '<p class="calc">40 = 2³ × 5</p><p class="calc">60 = 2² × 3 × 5</p><p class="calc">PPCM(40 ; 60) = 2³ × 3 × 5 = 120</p><p>Ils repassent ensemble au bout de 120 secondes, soit 2 minutes.</p>' },
        { q: 'b', h: '<p class="calc">120 ÷ 40 = 3</p><p>Le premier coureur a donc fait 3 tours.</p>' },
        { q: 'c', h: '<p class="calc">120 ÷ 60 = 2</p><p>Le second coureur a donc fait 2 tours.</p>' }],
      cc: 'a) Au bout de 120 secondes. b) 3 tours. c) 2 tours.' },
    { type: 'exo', rub: 'exo', titre: 'Exercice 2', ceinture: 'orange',
      enonce: '<p>Un fleuriste a entre 150 et 200 roses. Il peut toutes les ranger en bouquets de 4, de 6 ou de 9, sans reste. Combien a-t-il de roses ?</p>',
      champs: [{ lab: 'Nombre de roses :', rep: ['180'], court: true }],
      indices: ['Le nombre de roses est un multiple commun de 4, 6 et 9.', 'Cherche leur PPCM, puis ses multiples.'],
      correction: [
        { h: '<p class="calc">4 = 2²</p><p class="calc">6 = 2 × 3</p><p class="calc">9 = 3²</p><p class="calc">PPCM(4 ; 6 ; 9) = 2² × 3² = 36</p>' },
        { h: '<p>Multiples de 36 : 36 ; 72 ; 108 ; 144 ; 180 ; 216</p><p>Seul 180 est compris entre 150 et 200.</p>' }],
      cc: 'Le fleuriste a 180 roses.' },
  ] };

  A[10] = { titre: 'Curiosités des nombres premiers', items: [
    { type: 'lecon', rub: 'lecon', parties: ['K'] },
  ] };

  A[11] = { titre: 'Nombres parfaits et nombres amicaux', items: [
    { type: 'lecon', rub: 'lecon', parties: ['P'] },
    { type: 'flash', rub: 'flash', titre: 'Questions flash', consigne: 'Vrai ou faux ? Tu as 8 secondes par question.', duree: 8, questions: [
      { q: '28 est un nombre parfait.', rep: true, expl: '1 + 2 + 4 + 7 + 14 = 28, donc 28 est parfait.' },
      { q: '10 est un nombre parfait.', rep: false, expl: '1 + 2 + 5 = 8, et 8 n’est pas égal à 10, donc 10 n’est pas parfait.' },
      { q: '3² × 5 a 6 diviseurs.', rep: true, expl: '(2 + 1) × (1 + 1) = 6, donc 3² × 5 a 6 diviseurs.' },
      { q: '2⁴ a 4 diviseurs.', rep: false, expl: '4 + 1 = 5, donc 2⁴ a 5 diviseurs : 1, 2, 4, 8 et 16.' }] },
    { type: 'guide', rub: 'guide', titre: 'Combien de diviseurs ?', enonce: '<p>Combien de diviseurs a le nombre N = 2² × 3 × 5 ?</p>',
      vis: ['<p class="calc">N = 2² × 3 × 5</p>', '<p class="calc">N = 2² × 3¹ × 5¹</p><p>exposants : 2 ; 1 ; 1</p>', '<p class="calc">(2 + 1) × (1 + 1) × (1 + 1)</p>', '<p class="calc">3 × 2 × 2 = 12</p>'],
      etapes: [
        { q: 'Quel est l’exposant de 2 ?', rep: ['2'], k: 1, aide: '2², c’est 2 puissance 2.' },
        { q: 'On ajoute 1 à chaque exposant : (2 + 1) × (1 + 1) × (1 + 1) = ?', rep: ['12'], k: 3, aide: '3 × 2 × 2.' }],
      fin: '<p class="cc">N = 2² × 3 × 5 = 60 a donc 12 diviseurs.</p>', cc: 'On ajoute 1 à chaque exposant, puis on multiplie.' },
    { type: 'exo', rub: 'exo', titre: 'Exercice 1', ceinture: 'jaune',
      enonce: '<p>Combien de diviseurs a le nombre 2³ × 5 ?</p>',
      champs: [{ lab: 'Nombre de diviseurs :', rep: ['8'], court: true }],
      indices: ['Les exposants sont 3 et 1.', 'Ajoute 1 à chaque exposant, puis multiplie.'],
      correction: [{ h: '<p class="calc">(3 + 1) × (1 + 1) = 4 × 2 = 8</p>' }],
      cc: '2³ × 5 = 40 a 8 diviseurs.' },
    { type: 'exo', rub: 'exo', titre: 'Exercice 2', ceinture: 'orange',
      enonce: '<p>496 est-il un nombre parfait ? On donne : 496 = 2⁴ × 31.</p>',
      champs: [{ q: 'a', lab: 'Somme des diviseurs de 496 autres que 496 :', rep: ['496'], court: true }, { q: 'b', lab: '496 est-il parfait ?', choix: ['Oui', 'Non'], rep: 'Oui' }],
      indices: ['Les diviseurs sont 1, 2, 4, 8, 16, puis 31, 62, 124, 248.', 'Additionne-les.'],
      correction: [
        { q: 'a', h: '<p class="calc">1 + 2 + 4 + 8 + 16 = 31</p><p class="calc">31 + 62 + 124 + 248 = 465</p><p class="calc">31 + 465 = 496</p>' },
        { q: 'b', h: '<p>La somme des diviseurs de 496 autres que lui-même est 496, donc 496 est un nombre parfait.</p>' }],
      cc: 'a) La somme vaut 496. b) 496 est donc un nombre parfait.' },
  ] };
})();
