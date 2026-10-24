// Fin de chapitre : QCM et simulation du DS.
const BILANS = {
  'arithmetique': {
    qcm: [
      { q: 'Le reste de la division euclidienne de 85 par 7 est :', o: ['1', '5', '12'], r: 0, e: '85 = 7 × 12 + 1 avec 1 < 7.', cc: 'Le reste est 1.' },
      { q: 'Lequel de ces nombres est un multiple de 9 ?', o: ['1 234', '2 343', '4 518'], r: 2, e: '4 + 5 + 1 + 8 = 18, et 18 est un multiple de 9.', cc: '4 518 est un multiple de 9.' },
      { q: '2 est le seul nombre premier pair.', o: ['Vrai', 'Faux'], r: 0, e: 'Tous les autres nombres pairs sont divisibles par 2 : ils ont au moins trois diviseurs.', cc: 'C’est vrai.' },
      { q: 'Lequel de ces nombres est premier ?', o: ['51', '57', '59'], r: 2, e: '51 = 3 × 17 et 57 = 3 × 19 ; 59 n’est divisible ni par 2, ni par 3, ni par 5, ni par 7 (et 7 × 7 = 49, 11 × 11 = 121 > 59).', cc: '59 est premier.' },
      { q: 'La décomposition de 60 en produit de facteurs premiers est :', o: ['2 × 30', '2² × 3 × 5', '4 × 15'], r: 1, e: '60 ÷ 2 = 30 ; 30 ÷ 2 = 15 ; 15 ÷ 3 = 5 ; 5 ÷ 5 = 1. Dans 2 × 30 et 4 × 15, 30, 4 et 15 ne sont pas premiers.', cc: '60 = 2² × 3 × 5.' },
      { q: 'La fraction irréductible égale à 84/126 est :', o: ['12/18', '4/6', '2/3'], r: 2, e: '84 = 2² × 3 × 7 et 126 = 2 × 3² × 7 : on simplifie par 2 × 3 × 7 = 42.', cc: '84/126 = 2/3.' },
      { q: 'Combien 18 a-t-il de diviseurs ?', o: ['3', '6', '9'], r: 1, e: '18 = 1 × 18 = 2 × 9 = 3 × 6 : les diviseurs sont 1 ; 2 ; 3 ; 6 ; 9 ; 18.', cc: '18 a 6 diviseurs.' },
      { q: 'Le PGCD de 24 et 36 est :', o: ['6', '12', '72'], r: 1, e: '24 = 2³ × 3 et 36 = 2² × 3² : PGCD = 2² × 3 = 12.', cc: 'Le PGCD de 24 et 36 est 12.' },
      { q: 'Le PPCM de 6 et 8 est :', o: ['2', '24', '48'], r: 1, e: 'Multiples de 8 : 8, 16, 24… et 24 = 6 × 4 est le premier multiple commun.', cc: 'Le PPCM de 6 et 8 est 24.' },
      { q: 'Avec 30 bonbons et 45 sucettes, on fait le plus grand nombre de sachets identiques. Combien de sachets ?', o: ['5', '15', '90'], r: 1, e: '30 = 2 × 3 × 5 et 45 = 3² × 5 : PGCD = 3 × 5 = 15.', cc: 'On peut faire 15 sachets.' }],
    ds: {
      duree: 45, titre: 'DS · Arithmétique (3e)', consigne: 'Sans calculatrice pour l’exercice 1. Toutes les réponses doivent être justifiées.',
      exos: [
        { titre: 'Exercice 1', pts: 6, enonce: '<p><span class="q">a.</span> 2 340 est-il divisible par 9 ? Justifie.</p><p><span class="q">b.</span> Décompose 504 en produit de facteurs premiers.</p><p><span class="q">c.</span> Rends la fraction 126/180 irréductible.</p><p><span class="q">d.</span> 221 est-il un nombre premier ? Justifie.</p>',
          corr: [
            { pts: 1, h: '<p><span class="q">a.</span> 2 + 3 + 4 + 0 = 9 : la somme des chiffres est un multiple de 9.</p><p class="cc">2 340 est divisible par 9.</p>' },
            { pts: 2, h: '<p><span class="q">b.</span> 504 ÷ 2 = 252 ; 252 ÷ 2 = 126 ; 126 ÷ 2 = 63 ; 63 ÷ 3 = 21 ; 21 ÷ 3 = 7 ; 7 ÷ 7 = 1.</p><p class="cc">504 = 2³ × 3² × 7.</p>' },
            { pts: 2, h: '<p><span class="q">c.</span> 126 = 2 × 3² × 7 et 180 = 2² × 3² × 5.</p><p>126/180 = (2 × 3² × 7) / (2² × 3² × 5) = 7 / (2 × 5).</p><p class="cc">La fraction irréductible est 7/10.</p>' },
            { pts: 1, h: '<p><span class="q">d.</span> 221 = 13 × 17 : 221 a d’autres diviseurs que 1 et lui-même.</p><p class="cc">221 n’est pas un nombre premier.</p>' }] },
        { titre: 'Exercice 2', pts: 5, enonce: '<p>Un fleuriste a 252 roses et 196 tulipes. Il veut faire des bouquets <strong>identiques</strong> en utilisant <strong>toutes</strong> ses fleurs.</p><p><span class="q">a.</span> Peut-il faire 14 bouquets ? Justifie.</p><p><span class="q">b.</span> Quel est le nombre maximal de bouquets ?</p><p><span class="q">c.</span> Quelle est alors la composition de chaque bouquet ?</p>',
          corr: [
            { pts: 1, h: '<p><span class="q">a.</span> 252 = 14 × 18 et 196 = 14 × 14 : 14 divise 252 et 196.</p><p class="cc">Oui, il peut faire 14 bouquets.</p>' },
            { pts: 3, h: '<p><span class="q">b.</span> 252 = 2² × 3² × 7 et 196 = 2² × 7².</p><p>PGCD(252 ; 196) = 2² × 7 = 28.</p><p class="cc">Il peut faire au maximum 28 bouquets.</p>' },
            { pts: 1, h: '<p><span class="q">c.</span> 252 ÷ 28 = 9 et 196 ÷ 28 = 7.</p><p class="cc">Chaque bouquet contient 9 roses et 7 tulipes.</p>' }] },
        { titre: 'Exercice 3', pts: 5, enonce: '<p>Deux navettes partent de la gare en même temps, à 7 h. La première revient à la gare toutes les 18 minutes, la seconde toutes les 24 minutes.</p><p><span class="q">a.</span> Écris les multiples de 18 et de 24 inférieurs à 100.</p><p><span class="q">b.</span> À quelle heure les deux navettes repartiront-elles ensemble pour la première fois ?</p>',
          corr: [
            { pts: 2, h: '<p><span class="q">a.</span> Multiples de 18 : 18 ; 36 ; 54 ; 72 ; 90.</p><p>Multiples de 24 : 24 ; 48 ; 72 ; 96.</p>' },
            { pts: 3, h: '<p><span class="q">b.</span> 18 = 2 × 3² et 24 = 2³ × 3, donc PPCM(18 ; 24) = 2³ × 3² = 72.</p><p>72 min = 1 h 12 min, et 7 h + 1 h 12 min = 8 h 12 min.</p><p class="cc">Les navettes repartiront ensemble à 8 h 12.</p>' }] },
        { titre: 'Exercice 4', pts: 4, enonce: '<p>Vrai ou faux ? Justifie.</p><p><span class="q">a.</span> La somme de deux nombres premiers est toujours paire.</p><p><span class="q">b.</span> Le produit de deux multiples de 3 est un multiple de 9.</p>',
          corr: [
            { pts: 2, h: '<p><span class="q">a.</span> Contre-exemple : 2 et 3 sont premiers, et 2 + 3 = 5 est impair.</p><p class="cc">C’est faux.</p>' },
            { pts: 2, h: '<p><span class="q">b.</span> Deux multiples de 3 s’écrivent 3a et 3b, et 3a × 3b = 9 × ab.</p><p class="cc">C’est vrai : le produit est un multiple de 9.</p>' }] }],
    },
  },
};
