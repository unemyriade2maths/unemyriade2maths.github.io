// Top Chrono : 5 questions (QA à QE), 6 minutes, sans calculatrice.
// Chaque Top Chrono s'affiche à partir de sa date (AAAA-MM-JJ) ; le plus récent est en tête, les anciens restent en archive.
const TOPCHRONO = {
  '6e': [
    { num: 1, date: '2026-10-24', theme: 'Fractions simples et décimales', questions: [
      { q: '25 × 4 = ?', rep: ['100'], sol: '25 × 4 = 100.' },
      { q: 'La moitié de 3,6 = ?', rep: ['1,8'], sol: 'La moitié de 3,6 est 1,8.' },
      { q: '3/4 de 12 = ?', rep: ['9'], sol: '12 ÷ 4 = 3 et 3 × 3 = 9 : les 3/4 de 12 valent 9.' },
      { q: 'Écris 7/10 en écriture décimale.', rep: ['0,7'], sol: '7/10 = 0,7 (7 dixièmes).' },
      { q: 'Combien y a-t-il de quarts dans 2 unités ?', rep: ['8'], sol: 'Il y a 4 quarts dans une unité, donc 8 quarts dans 2 unités.' }] }],
  '5e': [
    { num: 1, date: '2026-10-24', theme: 'Automatismes', questions: [
      { q: '12 − 4 × 2 = ?', rep: ['4'], sol: 'On calcule d’abord 4 × 2 = 8, puis 12 − 8 = 4.' },
      { q: '10 % de 40 = ?', rep: ['4'], sol: '10 % de 40, c’est 40 ÷ 10 = 4.' },
      { q: '−3 + 7 = ?', rep: ['4'], sol: '−3 + 7 = 4.' },
      { q: 'Aire d’un rectangle de 6 cm sur 2,5 cm (en cm²) ?', rep: ['15'], sol: '6 × 2,5 = 15 : l’aire est 15 cm².' },
      { q: 'Un triangle a deux angles de 50° et 60°. Le troisième mesure (en °) ?', rep: ['70'], sol: '180 − 50 − 60 = 70 : le troisième angle mesure 70°.' }] }],
  '4e': [
    { num: 1, date: '2026-10-24', theme: 'Automatismes', questions: [
      { q: '(−3) × (−4) = ?', rep: ['12'], sol: 'Moins par moins donne plus : (−3) × (−4) = 12.' },
      { q: '2³ = ?', rep: ['8'], sol: '2³ = 2 × 2 × 2 = 8.' },
      { q: '3/4 + 1/4 = ?', rep: ['1', '4/4'], sol: '3/4 + 1/4 = 4/4 = 1.' },
      { q: '10⁻² en écriture décimale = ?', rep: ['0,01'], sol: '10⁻² = 1/100 = 0,01.' },
      { q: 'Résous 2x = 14. x = ?', rep: ['7'], sol: 'x = 14 ÷ 2 = 7.' }] }],
  '3e': [
    { num: 1, date: '2026-10-24', theme: 'Arithmétique', questions: [
      { q: '91 = 7 × … ?', rep: ['13'], sol: '91 = 7 × 13.' },
      { q: 'Le reste de la division euclidienne de 47 par 5 = ?', rep: ['2'], sol: '47 = 5 × 9 + 2 : le reste est 2.' },
      { q: '2 × 3² × 5 = ?', rep: ['90'], sol: '2 × 9 × 5 = 90.' },
      { q: 'Écris 24/36 sous forme irréductible.', rep: ['2/3'], sol: '24/36 = (12 × 2)/(12 × 3) = 2/3.' },
      { q: 'Combien 12 a-t-il de diviseurs ?', rep: ['6'], sol: '1 ; 2 ; 3 ; 4 ; 6 ; 12 : 12 a 6 diviseurs.' }] }],
  '2de': [
    { num: 1, date: '2026-10-24', theme: 'Automatismes', questions: [
      { q: '15 % de 80 = ?', rep: ['12'], sol: '0,15 × 80 = 12.' },
      { q: '3/5 − 1/4 = ? (fraction)', rep: ['7/20'], sol: '3/5 − 1/4 = 12/20 − 5/20 = 7/20.' },
      { q: '(√5)² = ?', rep: ['5'], sol: '(√5)² = 5.' },
      { q: 'f(x) = 2x − 3. f(4) = ?', rep: ['5'], sol: 'f(4) = 2 × 4 − 3 = 5.' },
      { q: '10³ × 10⁻⁵ en écriture décimale = ?', rep: ['0,01'], sol: '10³ × 10⁻⁵ = 10⁻² = 0,01.' }] }],
  '1re': [
    { num: 1, date: '2026-10-24', theme: 'Automatismes', questions: [
      { q: 'f(x) = x². f′(3) = ?', rep: ['6'], sol: 'f′(x) = 2x, donc f′(3) = 6.' },
      { q: 'Le discriminant de x² − 4x + 4 = ?', rep: ['0'], sol: 'Δ = (−4)² − 4 × 1 × 4 = 16 − 16 = 0.' },
      { q: 'uₙ = 2n + 1. u₅ = ?', rep: ['11'], sol: 'u₅ = 2 × 5 + 1 = 11.' },
      { q: 'Une hausse de 20 % puis une baisse de 20 % : coefficient multiplicateur global ?', rep: ['0,96'], sol: '1,2 × 0,8 = 0,96 : c’est une baisse de 4 %.' },
      { q: 'cos(π/3) = ?', rep: ['0,5', '1/2'], sol: 'cos(π/3) = 1/2.' }] }],
  'Tle': [
    { num: 1, date: '2026-10-24', theme: 'Automatismes', questions: [
      { q: 'ln(1) = ?', rep: ['0'], sol: 'ln(1) = 0.' },
      { q: 'e⁰ = ?', rep: ['1'], sol: 'e⁰ = 1.' },
      { q: 'Limite de 1/x quand x tend vers +∞ ?', rep: ['0'], sol: '1/x tend vers 0 quand x tend vers +∞.' },
      { q: 'f(x) = e^(2x). f′(0) = ?', rep: ['2'], sol: 'f′(x) = 2e^(2x), donc f′(0) = 2.' },
      { q: 'P(A) = 0,3. P(Ā) = ?', rep: ['0,7'], sol: 'P(Ā) = 1 − 0,3 = 0,7.' }] }],
};
