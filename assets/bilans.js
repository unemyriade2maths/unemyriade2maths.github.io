// Fin de chapitre : QCM et simulation du DS.
const BILANS = {
  'arithmetique': {
    qcm: [
      { q: 'Le reste de la division euclidienne de 85 par 7 est :', o: ['1', '5', '12'], r: 0, e: '85 = 7 × 12 + 1 avec 1 < 7.', cc: 'Le reste est 1.' },
      { q: 'Lequel de ces nombres est un multiple de 9 ?', o: ['1 234', '2 343', '4 518'], r: 2, e: '4 + 5 + 1 + 8 = 18, et 18 est un multiple de 9.', cc: '4 518 est un multiple de 9.' },
      { q: '2 est le seul nombre premier pair.', o: ['Vrai', 'Faux'], r: 0, e: 'Tous les autres nombres pairs sont divisibles par 2 : ils ont au moins trois diviseurs.', cc: 'C’est vrai.' },
      { q: 'Lequel de ces nombres est premier ?', o: ['51', '57', '59'], r: 2, e: '<p>51 = 3 × 17</p><p>57 = 3 × 19</p><p>59 n’est divisible ni par 2, ni par 3, ni par 5, ni par 7, et 11 × 11 = 121 > 59.</p>', cc: '59 est premier.' },
      { q: 'La décomposition de 60 en produit de facteurs premiers est :', o: ['2 × 30', '2² × 3 × 5', '4 × 15'], r: 1, e: '<p>Divisions successives :</p>' + divsucc(60) + '<p>Dans 2 × 30 et 4 × 15, les nombres 30, 4 et 15 ne sont pas premiers.</p>', cc: '60 = 2² × 3 × 5.' },
      { q: 'La fraction irréductible égale à ' + frac(84, 126) + ' est :', o: [frac(12, 18), frac(4, 6), frac(2, 3)], r: 2, e: '<p>84 = 2² × 3 × 7</p><p>126 = 2 × 3² × 7</p><p>On simplifie par 2 × 3 × 7 = 42.</p>', cc: '84/126 = 2/3.' },
      { q: 'Combien 18 a-t-il de diviseurs ?', o: ['3', '6', '9'], r: 1, e: '<p>18 = 1 × 18</p><p>18 = 2 × 9</p><p>18 = 3 × 6</p>', cc: '18 a 6 diviseurs.' },
      { q: 'Le PGCD de 24 et 36 est :', o: ['6', '12', '72'], r: 1, e: '<p>24 = 2³ × 3</p><p>36 = 2² × 3²</p><p>PGCD = 2² × 3 = 12</p>', cc: 'Le PGCD de 24 et 36 est 12.' },
      { q: 'Le PPCM de 6 et 8 est :', o: ['2', '24', '48'], r: 1, e: '<p>Multiples de 8 : 8 ; 16 ; 24</p><p>24 = 6 × 4 : c’est le premier multiple commun.</p>', cc: 'Le PPCM de 6 et 8 est 24.' },
      { q: 'Avec 30 bonbons et 45 sucettes, on fait le plus grand nombre de sachets identiques. Combien de sachets ?', o: ['5', '15', '90'], r: 1, e: '<p>30 = 2 × 3 × 5</p><p>45 = 3² × 5</p><p>PGCD = 3 × 5 = 15</p>', cc: 'On peut faire 15 sachets.' }],
    ds: {
      duree: 45, titre: 'DS · Arithmétique (3e)',
      consigne: 'Sans calculatrice pour l’exercice 1. <strong>Justifie chaque calcul.</strong> Chaque question est notée sur 3 points : 1 point pour le calcul, 1 point pour la réponse, 1 point pour la phrase réponse.',
      exos: [
        { titre: 'Exercice 1', enonce: '<p><span class="q">a.</span> 2 340 est-il divisible par 9 ? Justifie.</p><p><span class="q">b.</span> Décompose 504 en produit de facteurs premiers.</p><p><span class="q">c.</span> Rends la fraction ' + frac(126, 180) + ' irréductible.</p><p><span class="q">d.</span> 221 est-il un nombre premier ? Justifie.</p>',
          corr: [
            { q: 'a', calc: '<p>2 + 3 + 4 + 0 = 9</p>', rep: '<p>La somme des chiffres, 9, est un multiple de 9.</p>', phrase: '2 340 est divisible par 9.' },
            { q: 'b', calc: '<p>Divisions successives :</p>' + divsucc(504), rep: '<p>504 = 2 × 2 × 2 × 3 × 3 × 7</p>', phrase: 'La décomposition de 504 est 2³ × 3² × 7.' },
            { q: 'c', calc: '<p>Divisions successives de 126 :</p>' + divsucc(126) + '<p>126 = 2 × 3² × 7</p><p>Divisions successives de 180 :</p>' + divsucc(180) + '<p>180 = 2² × 3² × 5</p>',
              rep: '<p>' + frac(126, 180) + ' = ' + frac('2 × 3² × 7', '2 × 2 × 3² × 5') + '</p><p>' + frac(126, 180) + ' = ' + frac(7, '2 × 5') + ' = ' + frac(7, 10) + '</p>', phrase: 'La fraction irréductible est 7/10.' },
            { q: 'd', calc: '<p>221 ÷ 13 = 17</p>', rep: '<p>221 = 13 × 17 : 221 a d’autres diviseurs que 1 et 221.</p>', phrase: '221 n’est pas un nombre premier.' }] },
        { titre: 'Exercice 2', enonce: '<p>Un fleuriste a 252 roses et 196 tulipes. Il veut faire des bouquets <strong>identiques</strong> en utilisant <strong>toutes</strong> ses fleurs.</p><p><span class="q">a.</span> Peut-il faire 14 bouquets ? Justifie.</p><p><span class="q">b.</span> Quel est le nombre maximal de bouquets ?</p><p><span class="q">c.</span> Quelle est alors la composition de chaque bouquet ?</p>',
          corr: [
            { q: 'a', calc: '<p>252 ÷ 14 = 18</p><p>196 ÷ 14 = 14</p>', rep: '<p>14 divise 252 et 196.</p>', phrase: 'Oui, il peut faire 14 bouquets.' },
            { q: 'b', calc: '<p>Divisions successives de 252 :</p>' + divsucc(252) + '<p>252 = 2² × 3² × 7</p><p>Divisions successives de 196 :</p>' + divsucc(196) + '<p>196 = 2² × 7²</p>',
              rep: '<p>PGCD(252 ; 196) = 2² × 7 = 28</p>', phrase: 'Il peut faire au maximum 28 bouquets.' },
            { q: 'c', calc: '<p>252 ÷ 28 = 9</p><p>196 ÷ 28 = 7</p>', rep: '<p>9 roses et 7 tulipes</p>', phrase: 'Chaque bouquet contient 9 roses et 7 tulipes.' }] },
        { titre: 'Exercice 3', enonce: '<p>Deux navettes partent de la gare en même temps, à 7 h. La première revient à la gare toutes les 18 minutes, la seconde toutes les 24 minutes.</p><p><span class="q">a.</span> Écris les multiples de 18 et de 24 inférieurs à 100.</p><p><span class="q">b.</span> À quelle heure les deux navettes repartiront-elles ensemble pour la première fois ?</p>',
          corr: [
            { q: 'a', calc: '<p>Multiples de 18 : 18 ; 36 ; 54 ; 72 ; 90</p><p>Multiples de 24 : 24 ; 48 ; 72 ; 96</p>', rep: '<p>72 est dans les deux listes.</p>', phrase: 'Le plus petit multiple commun de 18 et 24 est 72.' },
            { q: 'b', calc: '<p>Divisions successives de 18 :</p>' + divsucc(18) + '<p>18 = 2 × 3²</p><p>Divisions successives de 24 :</p>' + divsucc(24) + '<p>24 = 2³ × 3</p><p>PPCM(18 ; 24) = 2³ × 3² = 72</p>',
              rep: '<p>72 min = 1 h 12 min</p><p>7 h + 1 h 12 min = 8 h 12 min</p>', phrase: 'Les navettes repartiront ensemble à 8 h 12.' }] },
        { titre: 'Exercice 4', enonce: '<p>Vrai ou faux ? Justifie.</p><p><span class="q">a.</span> La somme de deux nombres premiers est toujours paire.</p><p><span class="q">b.</span> Le produit de deux multiples de 3 est un multiple de 9.</p>',
          corr: [
            { q: 'a', calc: '<p>2 et 3 sont premiers.</p><p>2 + 3 = 5</p>', rep: '<p>5 est impair : c’est un contre-exemple.</p>', phrase: 'C’est faux.' },
            { q: 'b', calc: '<p>Deux multiples de 3 s’écrivent 3 × a et 3 × b.</p><p>3 × a × 3 × b = 9 × a × b</p>', rep: '<p>Le produit est un multiple de 9.</p>', phrase: 'C’est vrai.' }] }],
    },
  },
};
