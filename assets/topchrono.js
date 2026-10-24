// Top Chrono : 5 questions (Q1 à Q5), 6 minutes, sans calculatrice. Il fonctionne comme mes Rapidos (questions numérotées Q1 à Q5).
// Chaque Top Chrono s'affiche à partir de sa date (AAAA-MM-JJ). Une série = plusieurs Top Chrono sur les mêmes compétences.
// Le n°1 d'une série a une correction détaillée (det) et sa vidéo ; les suivants ont une correction rapide (sol).
const f = (a, b) => frac(a, b);
const TOPCHRONO = {
  '6e': [
    { serie: 1, num: 1, date: '2026-10-24', theme: 'Fractions simples et décimales', video: '', questions: [
      { q: '25 × 4 = ?', rep: ['100'], det: ['25 × 4 = 100', 'Astuce : 4 pièces de 25 centimes font 1 euro, soit 100 centimes.'], sol: '25 × 4 = 100.' },
      { q: 'La moitié de 3,6 = ?', rep: ['1,8'], det: ['La moitié de 3 est 1,5.', 'La moitié de 0,6 est 0,3.', '1,5 + 0,3 = 1,8'], sol: 'La moitié de 3,6 est 1,8.' },
      { q: `Les ${f(3, 4)} de 12 = ?`, rep: ['9'], det: ['12 ÷ 4 = 3', '3 × 3 = 9'], sol: `Les ${f(3, 4)} de 12 valent 9.` },
      { q: `Écris ${f(7, 10)} en écriture décimale.`, rep: ['0,7'], det: [`${f(7, 10)} se lit « 7 dixièmes ».`, '7 dixièmes = 0,7'], sol: `${f(7, 10)} = 0,7.` },
      { q: 'Combien y a-t-il de quarts dans 2 unités ?', rep: ['8'], det: ['Dans 1 unité, il y a 4 quarts.', '2 × 4 = 8'], sol: 'Il y a 8 quarts dans 2 unités.' }] },
    { serie: 1, num: 2, date: '2026-10-31', theme: 'Fractions simples et décimales', questions: [
      { q: '50 × 4 = ?', rep: ['200'], sol: '50 × 4 = 200.' },
      { q: 'La moitié de 5,4 = ?', rep: ['2,7'], sol: 'La moitié de 5,4 est 2,7.' },
      { q: `Les ${f(2, 3)} de 15 = ?`, rep: ['10'], sol: `15 ÷ 3 = 5 et 2 × 5 = 10 : les ${f(2, 3)} de 15 valent 10.` },
      { q: `Écris ${f(3, 10)} en écriture décimale.`, rep: ['0,3'], sol: `${f(3, 10)} = 0,3.` },
      { q: 'Combien y a-t-il de tiers dans 3 unités ?', rep: ['9'], sol: 'Il y a 9 tiers dans 3 unités.' }] }],
  '5e': [
    { serie: 1, num: 1, date: '2026-10-24', theme: 'Automatismes', video: '', questions: [
      { q: '12 − 4 × 2 = ?', rep: ['4'], det: ['On commence par la multiplication : 4 × 2 = 8', '12 − 8 = 4'], sol: '12 − 4 × 2 = 4.' },
      { q: '10 % de 40 = ?', rep: ['4'], det: ['Prendre 10 %, c’est diviser par 10.', '40 ÷ 10 = 4'], sol: '10 % de 40 valent 4.' },
      { q: '−3 + 7 = ?', rep: ['4'], det: ['On part de −3 et on avance de 7 sur la droite graduée.', '−3 + 7 = 4'], sol: '−3 + 7 = 4.' },
      { q: 'Aire d’un rectangle de 6 cm sur 2,5 cm (en cm²) ?', rep: ['15'], det: ['Aire = longueur × largeur', '6 × 2,5 = 15'], sol: 'L’aire du rectangle est 15 cm².' },
      { q: 'Un triangle a deux angles de 50° et 60°. Le troisième mesure (en °) ?', rep: ['70'], det: ['La somme des angles d’un triangle est 180°.', '50 + 60 = 110', '180 − 110 = 70'], sol: 'Le troisième angle mesure 70°.' }] }],
  '4e': [
    { serie: 1, num: 1, date: '2026-10-24', theme: 'Automatismes', video: '', questions: [
      { q: '(−3) × (−4) = ?', rep: ['12'], det: ['Le produit de deux nombres négatifs est positif.', '3 × 4 = 12'], sol: '(−3) × (−4) = 12.' },
      { q: '2³ = ?', rep: ['8'], det: ['2³ = 2 × 2 × 2', '2³ = 8'], sol: '2³ = 8.' },
      { q: `${f(3, 4)} + ${f(1, 4)} = ?`, rep: ['1', '4/4'], det: ['Même dénominateur : on ajoute les numérateurs.', `${f(3, 4)} + ${f(1, 4)} = ${f(4, 4)}`, `${f(4, 4)} = 1`], sol: `${f(3, 4)} + ${f(1, 4)} = 1.` },
      { q: '10⁻² en écriture décimale = ?', rep: ['0,01'], det: [`10⁻² = ${f(1, '10²')}`, `10⁻² = ${f(1, 100)} = 0,01`], sol: '10⁻² = 0,01.' },
      { q: 'Résous 2x = 14. x = ?', rep: ['7'], det: ['2x = 14', 'x = 14 ÷ 2', 'x = 7'], sol: 'La solution est 7.' }] }],
  '3e': [
    { serie: 1, num: 1, date: '2026-10-24', theme: 'Arithmétique', video: '', questions: [
      { q: '91 = 7 × … ?', rep: ['13'], det: ['7 × 10 = 70', '7 × 3 = 21', '70 + 21 = 91, donc 7 × 13 = 91'], sol: '91 = 7 × 13.' },
      { q: 'Le reste de la division euclidienne de 47 par 5 = ?', rep: ['2'], det: ['47 = 5 × 9 + 2', '2 < 5'], sol: 'Le reste est 2.' },
      { q: '2 × 3² × 5 = ?', rep: ['90'], det: ['3² = 9', '2 × 9 = 18', '18 × 5 = 90'], sol: '2 × 3² × 5 = 90.' },
      { q: `Écris ${f(24, 36)} sous forme irréductible.`, rep: ['2/3'], det: ['24 = 2³ × 3', '36 = 2² × 3²', 'On simplifie par 2² × 3 = 12.', `${f(24, 36)} = ${f(2, 3)}`], sol: `La fraction irréductible est ${f(2, 3)}.` },
      { q: 'Combien 12 a-t-il de diviseurs ?', rep: ['6'], det: ['12 = 1 × 12', '12 = 2 × 6', '12 = 3 × 4', 'Diviseurs : 1 ; 2 ; 3 ; 4 ; 6 ; 12'], sol: '12 a 6 diviseurs.' }] },
    { serie: 1, num: 2, date: '2026-10-31', theme: 'Arithmétique', questions: [
      { q: '119 = 7 × … ?', rep: ['17'], sol: '119 = 7 × 17.' },
      { q: 'Le reste de la division euclidienne de 58 par 6 = ?', rep: ['4'], sol: '58 = 6 × 9 + 4 : le reste est 4.' },
      { q: '2² × 3 × 7 = ?', rep: ['84'], sol: '4 × 3 × 7 = 84.' },
      { q: `Écris ${f(18, 30)} sous forme irréductible.`, rep: ['3/5'], sol: `On simplifie par 6 : la fraction irréductible est ${f(3, 5)}.` },
      { q: 'Combien 18 a-t-il de diviseurs ?', rep: ['6'], sol: '1 ; 2 ; 3 ; 6 ; 9 ; 18 : 18 a 6 diviseurs.' }] }],
  '2de': [
    { serie: 1, num: 1, date: '2026-10-24', theme: 'Automatismes', video: '', questions: [
      { q: '15 % de 80 = ?', rep: ['12'], det: ['15 % = 0,15', '0,15 × 80 = 12'], sol: '15 % de 80 valent 12.' },
      { q: `${f(3, 5)} − ${f(1, 4)} = ?`, rep: ['7/20'], det: [`${f(3, 5)} = ${f(12, 20)}`, `${f(1, 4)} = ${f(5, 20)}`, `${f(12, 20)} − ${f(5, 20)} = ${f(7, 20)}`], sol: `${f(3, 5)} − ${f(1, 4)} = ${f(7, 20)}.` },
      { q: '(√5)² = ?', rep: ['5'], det: ['(√a)² = a pour a positif.', '(√5)² = 5'], sol: '(√5)² = 5.' },
      { q: 'f(x) = 2x − 3. f(4) = ?', rep: ['5'], det: ['f(4) = 2 × 4 − 3', 'f(4) = 8 − 3', 'f(4) = 5'], sol: 'L’image de 4 est 5.' },
      { q: '10³ × 10⁻⁵ en écriture décimale = ?', rep: ['0,01'], det: ['10³ × 10⁻⁵ = 10³⁻⁵', '10³ × 10⁻⁵ = 10⁻²', '10⁻² = 0,01'], sol: '10³ × 10⁻⁵ = 0,01.' }] }],
  '1re': [
    { serie: 1, num: 1, date: '2026-10-24', theme: 'Automatismes', video: '', questions: [
      { q: 'f(x) = x². f′(3) = ?', rep: ['6'], det: ['f′(x) = 2x', 'f′(3) = 2 × 3', 'f′(3) = 6'], sol: 'f′(3) = 6.' },
      { q: 'Le discriminant de x² − 4x + 4 = ?', rep: ['0'], det: ['Δ = b² − 4ac', 'Δ = (−4)² − 4 × 1 × 4', 'Δ = 16 − 16 = 0'], sol: 'Le discriminant est 0.' },
      { q: 'uₙ = 2n + 1. u₅ = ?', rep: ['11'], det: ['u₅ = 2 × 5 + 1', 'u₅ = 11'], sol: 'u₅ = 11.' },
      { q: 'Une hausse de 20 % puis une baisse de 20 % : coefficient multiplicateur global ?', rep: ['0,96'], det: ['Hausse de 20 % : on multiplie par 1,2.', 'Baisse de 20 % : on multiplie par 0,8.', '1,2 × 0,8 = 0,96'], sol: 'Le coefficient global est 0,96 : c’est une baisse de 4 %.' },
      { q: 'cos(π/3) = ?', rep: ['0,5', '1/2'], det: ['C’est une valeur à connaître par cœur.', `cos(π/3) = ${f(1, 2)}`], sol: `cos(π/3) = ${f(1, 2)}.` }] }],
  'Tle': [
    { serie: 1, num: 1, date: '2026-10-24', theme: 'Automatismes', video: '', questions: [
      { q: 'ln(1) = ?', rep: ['0'], det: ['e⁰ = 1', 'donc ln(1) = 0'], sol: 'ln(1) = 0.' },
      { q: 'e⁰ = ?', rep: ['1'], det: ['Tout nombre non nul à la puissance 0 vaut 1.', 'e⁰ = 1'], sol: 'e⁰ = 1.' },
      { q: 'Limite de 1/x quand x tend vers +∞ ?', rep: ['0'], det: ['Quand x devient très grand, 1/x devient très petit.', 'La limite est 0.'], sol: 'La limite de 1/x en +∞ est 0.' },
      { q: 'f(x) = e^(2x). f′(0) = ?', rep: ['2'], det: ['f′(x) = 2e^(2x)', 'f′(0) = 2 × e⁰', 'f′(0) = 2'], sol: 'f′(0) = 2.' },
      { q: 'P(A) = 0,3. P(Ā) = ?', rep: ['0,7'], det: ['P(Ā) = 1 − P(A)', 'P(Ā) = 1 − 0,3', 'P(Ā) = 0,7'], sol: 'P(Ā) = 0,7.' }] }],
};
const TC_CONSIGNES = "Top Chrono. Tu as six minutes pour cinq questions, sans calculatrice. Lis la question, écris ta réponse, puis clique sur Valider. Si tu bloques, clique sur Suivante : la question reviendra à la fin, s'il te reste du temps. Une réponse validée ne se change plus. À la fin, tu vois ton score et la correction.";
const TC_BREVET = "En 3e, le Top Chrono t'entraîne aux automatismes du brevet.";
