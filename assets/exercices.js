// Chaque partie : leçon, méthode, questions flash, exercice guidé, exercices, Scratch débranché, calculatrice, tableur débranché.
// rub = la rubrique où l'item s'affiche (voir RUBRIQUES).
const RUBRIQUES = [
  ['lecon', 'Leçon', '📖'], ['methode', 'Méthode', '🧭'], ['flash', 'Questions flash', '⚡'], ['guide', 'Exercice guidé', '🪜'],
  ['exo', 'Exercices', '✏️'], ['scratch', 'Scratch débranché', '🐱'], ['calc', 'Calculatrice', '🧮'], ['tableur', 'Tableur débranché', '📊']];
// champ : { lab, rep: [réponses acceptées], touches: [touches du clavier utiles] } ou { lab, choix: [..], rep: 'bonne option' }
const EXOS = {
  'arithmetique': {
    1: {
      titre: 'Multiples, diviseurs et division euclidienne',
      items: [
        { type: 'lecon', rub: 'lecon', parties: ['A', 'B'] },
        { type: 'methode', rub: 'methode', titre: 'Poser une division euclidienne',
          resume: '<ol class="meth"><li>Dans les premiers chiffres de a, on cherche <strong>combien de fois b</strong>.</li><li>On <strong>multiplie</strong> et on <strong>soustrait</strong>.</li><li>On <strong>abaisse</strong> le chiffre suivant et on recommence.</li><li>On vérifie que le reste est <strong>plus petit que b</strong>, puis on écrit <strong>a = b × q + r</strong>.</li></ol><p><strong>Exemple :</strong> la division euclidienne de 263 par 15.</p>',
          etapes: [
            { h: { pot: [263, 15, 0] }, v: 'Méthode. Pour poser une division euclidienne, prenons un exemple : deux cent soixante-trois divisé par quinze.' },
            { h: { pot: [263, 15, 1] }, v: 'Dans vingt-six, combien de fois quinze ? Une fois.' },
            { h: { pot: [263, 15, 2] }, v: 'Vingt-six moins quinze, égale onze. On abaisse le trois : cent treize.' },
            { h: { pot: [263, 15, 3] }, v: 'Dans cent treize, combien de fois quinze ? Sept fois, car sept fois quinze égale cent cinq.' },
            { h: { pot: [263, 15, 4] }, v: 'Cent treize moins cent cinq, égale huit. Le reste est huit, et huit est plus petit que quinze.' },
            { h: { pot: [263, 15, 4], apres: '<p class="formule grand">263 = 15 × 17 + 8 &nbsp; avec &nbsp; 8 &lt; 15</p>' }, v: 'On peut conclure : deux cent soixante-trois égale quinze fois dix-sept, plusse huit.' }],
          cc: 'Le quotient est 17 et le reste est 8.' },
        { type: 'flash', rub: 'flash', titre: 'Questions flash', consigne: 'Vrai ou faux ? Tu as 8 secondes par question.', duree: 8, questions: [
          { q: '42 est un multiple de 6.', rep: true, expl: '42 = 6 × 7, donc 42 est un multiple de 6.', v: 'Quarante-deux, c’est un multiple de six. Vrai, ou faux ?' },
          { q: '8 divise 28.', rep: false, expl: '28 ÷ 8 = 3,5 n’est pas un nombre entier, donc 8 ne divise pas 28.', v: 'Huit divise vingt-huit. Vrai, ou faux ?' },
          { q: '9 est un diviseur de 54.', rep: true, expl: '54 = 9 × 6, donc 9 est un diviseur de 54.', v: 'Neuf est un diviseur de cinquante-quatre. Vrai, ou faux ?' },
          { q: '35 est divisible par 4.', rep: false, expl: '35 ÷ 4 = 8,75 n’est pas un nombre entier, donc 35 n’est pas divisible par 4.', v: 'Trente-cinq est divisible par quatre. Vrai, ou faux ?' }] },
        { type: 'guide', rub: 'guide', titre: 'Division euclidienne de 347 par 16',
          enonce: '<p>Pose la division euclidienne de <strong>347</strong> par <strong>16</strong>, étape par étape.</p>',
          v: "Exercice guidé. Pose la division euclidienne de trois cent quarante-sept par seize, étape par étape.",
          pot: [347, 16],
          etapes: [
            { q: 'Dans 34, combien de fois 16 ?', rep: ['2'], k: 1, aide: '2 × 16 = 32 et 3 × 16 = 48 : 48 est trop grand.' },
            { q: 'On calcule 34 − 32, puis on abaisse le 7. Quel nombre obtient-on ?', rep: ['27'], k: 2, aide: '34 − 32 = 2. On écrit le 7 à droite du 2.' },
            { q: 'Dans 27, combien de fois 16 ?', rep: ['1'], k: 3, aide: '2 × 16 = 32, c’est trop grand.' },
            { q: 'Quel est le reste ?', rep: ['11'], k: 4, aide: 'Calcule 27 − 16.' }],
          fin: '<p class="formule grand">347 = 16 × 21 + 11 &nbsp; avec &nbsp; 11 &lt; 16</p>',
          cc: 'Le quotient est 21 et le reste est 11.' },
        { type: 'exo', rub: 'exo', titre: 'Exercice 1', ceinture: 'blanche',
          enonce: '<p>Pose la division euclidienne de <strong>509</strong> par <strong>23</strong>.</p><p>Détermine q et r dans l’égalité : <span class="formule">509 = 23 × q + r</span>.</p>',
          v: "Exercice un. Pose la division euclidienne de cinq cent neuf par vingt-trois. Détermine q et r dans l'égalité : cinq cent neuf égale vingt-trois fois q, plusse r.",
          champs: [
            { lab: 'q =', rep: ['22'], court: true },
            { lab: 'r =', rep: ['3'], court: true },
            { lab: 'Écris l’égalité complète :', rep: ['509=23×22+3'], touches: ['×', '+', '=', '<'], place: '509 = …' }],
          indices: [
            'Commence par chercher combien de fois il y a 23 dans 50.',
            '50 − 46 = 4. Abaisse le 9 : combien de fois 23 dans 49 ?',
            'À la fin, vérifie que le reste est plus petit que 23.'],
          correction: [
            { h: { pot: [509, 23, 1] }, v: 'Correction. Dans cinquante, combien de fois vingt-trois ? Deux fois, car deux fois vingt-trois égale quarante-six.' },
            { h: { pot: [509, 23, 2] }, v: 'Cinquante moins quarante-six, égale quatre. On abaisse le neuf : quarante-neuf.' },
            { h: { pot: [509, 23, 3] }, v: 'Dans quarante-neuf, combien de fois vingt-trois ? Deux fois.' },
            { h: { pot: [509, 23, 4] }, v: 'Quarante-neuf moins quarante-six, égale trois. Le reste est trois, et trois est plus petit que vingt-trois.' },
            { h: { pot: [509, 23, 4], apres: '<p class="formule grand">509 = 23 × 22 + 3 &nbsp; avec &nbsp; 3 &lt; 23</p>' }, v: 'On peut conclure : cinq cent neuf, égale vingt-trois fois vingt-deux, plusse trois. Donc q égale vingt-deux, et r égale trois.' }],
          cc: 'Le quotient est 22 et le reste est 3.' },
        { type: 'exo', rub: 'exo', titre: 'Exercice 2', ceinture: 'blanche',
          enonce: '<p><strong>196</strong> est-il un multiple de <strong>14</strong> ? Justifie.</p>',
          v: 'Exercice deux : cent quatre-vingt-seize est-il un multiple de quatorze ? Justifie.',
          champs: [
            { lab: '196 ÷ 14 =', rep: ['14'], court: true },
            { lab: 'Ta réponse :', choix: ['Oui', 'Non'], rep: 'Oui' }],
          indices: [
            'Divise 196 par 14.',
            'Le résultat est-il un nombre entier ?'],
          correction: [
            { h: '<p class="calc">196 ÷ 14 = 14</p><p>Le résultat 14 est un nombre entier,</p>', v: "Correction. Cent quatre-vingt-seize divisé par quatorze, égale quatorze : c'est un nombre entier." },
            { h: '<p>donc 196 = 14 × 14.</p>', v: 'Donc, cent quatre-vingt-seize, égale quatorze fois quatorze.' }],
          cc: 'Oui, 196 est un multiple de 14.' },
        { type: 'lien', rub: 'exo', titre: 'Exercice 3', texte: 'Les diviseurs d’un nombre avec un tableau', page: 'exercice-diviseurs.html' },
        { type: 'exo', rub: 'calc', titre: 'Est-ce un multiple ?',
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
            { h: '<p class="calc">1 334 ÷ 23 = 58</p>', v: 'Correction. La calculatrice affiche cinquante-huit.' },
            { h: '<p>Le résultat 58 est un nombre entier, donc 1 334 = 23 × 58.</p>', v: 'Le résultat, cinquante-huit, est un nombre entier, donc mille trois cent trente-quatre égale vingt-trois fois cinquante-huit.' }],
          cc: 'Oui, 1 334 est divisible par 23.' },
        { type: 'exo', rub: 'scratch', titre: 'Que dit le lutin ?',
          enonce: `<pre class="blocks">quand @greenFlag est cliqué
demander [Donne un nombre] et attendre
mettre [n v] à (réponse)
si <((n) modulo (7)) = (0)> alors
dire [multiple de 7]
sinon
dire [non]
fin</pre>
            <p><span class="q">a)</span> Que dit le lutin si on donne <strong>n = 91</strong> ?</p><p><span class="q">b)</span> Que dit le lutin si on donne <strong>n = 100</strong> ?</p>`,
          v: 'Débranché. Voici un programme Scratch. Question a : que dit le lutin si on donne n égale quatre-vingt-onze ? Question b : que dit le lutin si on donne n égale cent ?',
          champs: [
            { q: 'a', lab: 'Pour n = 91, le lutin dit :', choix: ['multiple de 7', 'non'], rep: 'multiple de 7' },
            { q: 'b', lab: 'Pour n = 100, le lutin dit :', choix: ['multiple de 7', 'non'], rep: 'non' }],
          indices: [
            '« n modulo 7 » est le reste de la division euclidienne de n par 7.',
            'Fais la division euclidienne de 91 par 7, puis de 100 par 7.'],
          correction: [
            { q: 'a', h: '<p class="calc">91 = 7 × 13 + 0</p><p>Le reste est 0, donc 91 modulo 7 = 0 : le lutin dit « multiple de 7 ».</p>', v: 'Correction. Quatre-vingt-onze, égale sept fois treize, plusse zéro. Le reste est zéro : le lutin dit « multiple de sept ».' },
            { q: 'b', h: '<p class="calc">100 = 7 × 14 + 2</p><p>Le reste est 2, donc 100 modulo 7 = 2 : le lutin dit « non ».</p>', v: 'Cent égale sept fois quatorze, plusse deux. Le reste est deux, pas zéro : le lutin dit « non ».' }],
          cc: 'a) Pour 91, le lutin dit « multiple de 7 ». b) Pour 100, il dit « non ».' },
        { type: 'exo', rub: 'tableur', titre: 'Les formules ENT et MOD',
          enonce: `<div class="tableur"><div class="fx"><span>fx</span>=ENT(389/15)</div>
            <table><tr><th></th><th>A</th><th>B</th></tr><tr><th>1</th><td class="sel">=ENT(389/15)</td><td>=MOD(389;15)</td></tr><tr><th>2</th><td></td><td></td></tr></table></div>
            <p>On tape ces deux formules dans les cases A1 et B1, puis Entrée.</p><p><span class="q">a)</span> Qu’affiche la case A1 ?</p><p><span class="q">b)</span> Qu’affiche la case B1 ?</p>`,
          v: "Tableur. On tape égale ENT de trois cent quatre-vingt-neuf sur quinze dans la case A1, et égale MOD de trois cent quatre-vingt-neuf point-virgule quinze dans la case B1. Qu'affiche chaque case ?",
          champs: [
            { q: 'a', lab: 'La case A1 affiche :', rep: ['25'], court: true },
            { q: 'b', lab: 'La case B1 affiche :', rep: ['14'], court: true }],
          indices: [
            'ENT garde la partie entière de la division : c’est le quotient.',
            'MOD donne le reste de la division euclidienne.',
            'Pose la division euclidienne de 389 par 15.'],
          correction: [
            { q: 'a', h: { pot: [389, 15, 4], apres: '<p class="formule grand">389 = 15 × 25 + 14 &nbsp; avec &nbsp; 14 &lt; 15</p>' }, v: 'Correction. On pose la division : trois cent quatre-vingt-neuf, égale quinze fois vingt-cinq, plusse quatorze.' },
            { q: 'a', h: '<p>=ENT(389/15) garde la partie entière de la division : c’est le quotient, donc la case A1 affiche <strong>25</strong>.</p>', v: 'ENT garde la partie entière de la division : c’est le quotient, donc la case A1 affiche vingt-cinq.' },
            { q: 'b', h: '<p>=MOD(389;15) donne le reste de la division euclidienne, donc la case B1 affiche <strong>14</strong>.</p>', v: 'MOD donne le reste de la division euclidienne, donc la case B1 affiche quatorze.' }],
          cc: 'a) La case A1 affiche 25, le quotient. b) La case B1 affiche 14, le reste.' },
      ],
    },
  },
};
