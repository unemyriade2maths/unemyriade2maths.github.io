// Exercices de chaque partie (mêmes compétences que les vidéos, avec d'autres nombres).
// champ : { lab, rep: [réponses acceptées], touches: [touches du clavier utiles] } ou { lab, choix: [..], rep: 'bonne option' }
const EXOS = {
  'arithmetique': {
    1: {
      titre: 'Multiples, diviseurs et division euclidienne',
      items: [
        { type: 'flash', titre: 'Questions flash', consigne: 'Vrai ou faux ? Tu as 8 secondes par question.', duree: 8, questions: [
          { q: '42 est un multiple de 6.', rep: true, expl: '42 = 6 × 7.', v: 'Quarante-deux, c’est un multiple de six. Vrai, ou faux ?' },
          { q: '8 divise 28.', rep: false, expl: '28 ÷ 8 = 3,5 : ce n’est pas un nombre entier.', v: 'Huit divise vingt-huit. Vrai, ou faux ?' },
          { q: '9 est un diviseur de 54.', rep: true, expl: '54 = 9 × 6.', v: 'Neuf est un diviseur de cinquante-quatre. Vrai, ou faux ?' },
          { q: '35 est divisible par 4.', rep: false, expl: '35 ÷ 4 = 8,75 : ce n’est pas un nombre entier.', v: 'Trente-cinq est divisible par quatre. Vrai, ou faux ?' }] },
        { type: 'exo', titre: 'Exercice 1', ceinture: 'blanche',
          enonce: '<p>Pose la division euclidienne de <strong>347</strong> par <strong>16</strong>.</p><p>Détermine q et r dans l’égalité : <span class="formule">347 = 16 × q + r</span>.</p>',
          v: "Pose la division euclidienne de trois cent quarante-sept par seize. Détermine q et r dans l'égalité : trois cent quarante-sept égale seize fois q, plusse r.",
          champs: [
            { lab: 'q =', rep: ['21'], court: true },
            { lab: 'r =', rep: ['11'], court: true },
            { lab: 'Écris l’égalité complète :', rep: ['347=16×21+11'], touches: ['×', '+', '=', '<'], place: '347 = …' }],
          indices: [
            'Commence par chercher combien de fois il y a 16 dans 34.',
            '34 − 32 = 2. Abaisse le 7 : combien de fois 16 dans 27 ?',
            'À la fin, vérifie que le reste est plus petit que 16.'],
          correction: [
            { h: { pot: [347, 16, 1] }, v: 'Correction. Dans trente-quatre, combien de fois seize ? Deux fois, car deux fois seize égale trente-deux.' },
            { h: { pot: [347, 16, 2] }, v: 'Trente-quatre moins trente-deux, égale deux. On abaisse le sept : vingt-sept.' },
            { h: { pot: [347, 16, 3] }, v: 'Dans vingt-sept, combien de fois seize ? Une fois.' },
            { h: { pot: [347, 16, 4] }, v: 'Vingt-sept moins seize, égale onze. Le reste est onze, et onze est plus petit que seize.' },
            { h: { pot: [347, 16, 4], apres: '<p class="formule grand">347 = 16 × 21 + 11 &nbsp; avec &nbsp; 11 &lt; 16</p>' }, v: 'On peut conclure : trois cent quarante-sept, égale seize fois vingt et un, plusse onze. Donc q égale vingt et un, et r égale onze.' }],
          cc: 'Le quotient est 21 et le reste est 11.' },
        { type: 'exo', titre: 'Exercice 2', ceinture: 'blanche',
          enonce: '<p><strong>196</strong> est-il un multiple de <strong>14</strong> ? Justifie.</p>',
          v: 'Exercice deux : cent quatre-vingt-seize est-il un multiple de quatorze ? Justifie.',
          champs: [
            { lab: '196 ÷ 14 =', rep: ['14'], court: true },
            { lab: 'Ta réponse :', choix: ['Oui', 'Non'], rep: 'Oui' }],
          indices: [
            'Divise 196 par 14.',
            'Le résultat est-il un nombre entier ?'],
          correction: [
            { h: '<p class="calc">196 ÷ 14 = 14</p><p>14 est un nombre entier.</p>', v: "Correction. Cent quatre-vingt-seize divisé par quatorze, égale quatorze : c'est un nombre entier." },
            { h: '<p class="calc">196 = 14 × 14</p>', v: 'Donc, cent quatre-vingt-seize, égale quatorze fois quatorze.' }],
          cc: 'Oui, 196 est un multiple de 14.' },
        { type: 'lien', titre: 'Exercice 3', texte: 'Les diviseurs d’un nombre avec un tableau', page: 'exercice-diviseurs.html' },
        { type: 'exo', titre: 'À la calculatrice', icone: 'calc',
          enonce: '<p>Avec ta calculatrice : <strong>1 334</strong> est-il divisible par <strong>23</strong> ?</p>',
          v: 'Avec ta calculatrice : mille trois cent trente-quatre est-il divisible par vingt-trois ?',
          champs: [
            { lab: '1 334 ÷ 23 =', rep: ['58'], court: true },
            { lab: 'Ta réponse :', choix: ['Oui', 'Non'], rep: 'Oui' }],
          indices: [
            'Tape 1 334, puis la touche ÷, puis 23, puis EXE.',
            'Le résultat affiché est-il un nombre entier ?'],
          aide: { bouton: 'Voir les touches', html: `<div class="calcs">
            <figure><img src="assets/img/calc-sc.png" alt="Calculatrice collège : l'écran affiche 1334÷23 puis 58" width="190"><figcaption>fx-92+ Spéciale Collège</figcaption></figure>
            <figure><img src="assets/img/calc-cw.png" alt="Calculatrice collège 2023 : l'écran affiche 1334÷23 puis 58" width="190"><figcaption>Modèle 2023</figcaption></figure></div>
            <p class="touches"><kbd>1</kbd><kbd>3</kbd><kbd>3</kbd><kbd>4</kbd><kbd>÷</kbd><kbd>2</kbd><kbd>3</kbd><kbd>EXE</kbd></p>` },
          correction: [
            { h: '<p class="calc">1 334 ÷ 23 = 58</p><p>58 est un nombre entier.</p>', v: "Correction. La calculatrice affiche cinquante-huit : c'est un nombre entier." },
            { h: '<p class="calc">1 334 = 23 × 58</p>', v: 'Donc mille trois cent trente-quatre égale vingt-trois fois cinquante-huit.' }],
          cc: 'Oui, 1 334 est divisible par 23.' },
        { type: 'exo', titre: 'Débranché : que dit le lutin ?', icone: 'scratch',
          enonce: `<div class="scratch">
            <div class="bloc-s ev">quand <span class="drapeau">⚑</span> est cliqué</div>
            <div class="bloc-s cap">demander <span class="ovale">Donne un nombre</span> et attendre</div>
            <div class="bloc-s var">mettre <span class="ovale">n</span> à <span class="ovale cap">réponse</span></div>
            <div class="bloc-s ctl"><span class="ls">si <span class="hexa"><span class="ovale op"><span class="ovale var">n</span> modulo <span class="ovale">7</span></span> = <span class="ovale">0</span></span> alors</span>
              <div class="dedans"><div class="bloc-s app">dire <span class="ovale">multiple de 7</span></div></div>
              sinon
              <div class="dedans"><div class="bloc-s app">dire <span class="ovale">non</span></div></div>
              <div class="fin-ctl"></div></div></div>
            <p>Que dit le lutin si on donne <strong>n = 91</strong>, puis <strong>n = 100</strong> ?</p>`,
          v: 'Débranché. Voici un programme Scratch. Que dit le lutin si on donne n égale quatre-vingt-onze, puis n égale cent ?',
          champs: [
            { lab: 'Pour n = 91, le lutin dit :', choix: ['multiple de 7', 'non'], rep: 'multiple de 7' },
            { lab: 'Pour n = 100, le lutin dit :', choix: ['multiple de 7', 'non'], rep: 'non' }],
          indices: [
            '« n modulo 7 » est le reste de la division euclidienne de n par 7.',
            'Fais la division euclidienne de 91 par 7, puis de 100 par 7.'],
          correction: [
            { h: '<p class="calc">91 = 7 × 13 + 0</p><p>91 modulo 7 = 0 : le lutin dit « multiple de 7 ».</p>', v: 'Correction. Quatre-vingt-onze, égale sept fois treize, plusse zéro. Le reste est zéro : le lutin dit « multiple de sept ».' },
            { h: '<p class="calc">100 = 7 × 14 + 2</p><p>100 modulo 7 = 2 : le lutin dit « non ».</p>', v: 'Cent égale sept fois quatorze, plusse deux. Le reste est deux, pas zéro : le lutin dit « non ».' }],
          cc: 'Pour 91, le lutin dit « multiple de 7 » ; pour 100, il dit « non ».' },
      ],
    },
  },
};
