// Contenu du site : c'est le seul fichier à modifier pour changer les chapitres, les vidéos et les exercices.
// Vidéo : mettre l'identifiant YouTube dans "id" (la partie après watch?v= dans le lien de la vidéo).
const CHAINE = 'https://www.youtube.com/@une.myriademaths';

// Progression : la liste des chapitres de chaque classe, dans l'ordre de l'année.
// « enCours » = l'identifiant du chapitre en cours (le précédent et le suivant se déduisent tout seuls).
const PROGRESSION = {
  '6e': [
    { id: '6e-1', titre: 'Gestion de données et grands nombres entiers', periode: 1 },
    { id: '6e-2', titre: 'Des solides aux figures planes · Volume', periode: 1 },
    { id: 'fractions-6e', titre: 'Fractions simples et décimales', periode: 1 },
    { id: '6e-4', titre: 'Cercles, distances et triangles', periode: 2 },
    { id: '6e-5', titre: 'Des fractions décimales aux nombres décimaux', periode: 2 },
    { id: '6e-6', titre: 'Pré-algèbre : modèle en barres, motifs', periode: 2 },
    { id: '6e-7', titre: 'Addition et soustraction de décimaux · Périmètres', periode: 2 },
    { id: '6e-8', titre: 'Relations entre des droites · Patron d’un cube', periode: 2 },
    { id: '6e-9', titre: 'Aires et multiplication des décimaux', periode: 3 },
    { id: '6e-10', titre: 'Division euclidienne et mesure du temps', periode: 3 },
    { id: '6e-11', titre: 'Déplacements et programmation', periode: 3 },
    { id: '6e-12', titre: 'Symétrie axiale et médiatrice', periode: 4 },
    { id: '6e-13', titre: 'Multiplication et division décimales', periode: 4 },
    { id: '6e-14', titre: 'Fractions', periode: 4 },
    { id: '6e-15', titre: 'Aires et périmètres : le disque, figures composées', periode: 5 },
    { id: '6e-16', titre: 'Angles et bissectrice', periode: 5 },
    { id: '6e-17', titre: 'Proportionnalité', periode: 5 },
    { id: '6e-18', titre: 'Pourcentages', periode: 5 },
    { id: '6e-19', titre: 'Probabilités', periode: 5 },
    { id: '6e-20', titre: 'Triangles et angles des triangles particuliers', periode: 5 },
    { id: '6e-21', titre: 'Organisation et gestion de données : enquête', periode: 5 }],
  '5e': [
    { id: '5e-1', titre: 'Calcul numérique : priorités et programmes de calcul', periode: 1 },
    { id: '5e-2', titre: 'Triangles (1) : construction, inégalité triangulaire, droites remarquables', periode: 1 },
    { id: '5e-3', titre: 'Fractions (1) : notion, égalités, simplification', periode: 1 },
    { id: '5e-4', titre: 'Triangles (2) : angles et triangles particuliers', periode: 1 },
    { id: '5e-5', titre: 'Proportionnalité (1) : reconnaître une situation de proportionnalité', periode: 2 },
    { id: '5e-6', titre: 'Fractions (2) : comparer, additionner, soustraire', periode: 2 },
    { id: '5e-7', titre: 'Nombres relatifs : repérage et comparaison', periode: 2 },
    { id: '5e-8', titre: 'Durées et horaires', periode: 2 },
    { id: '5e-9', titre: 'Proportionnalité (2) : pourcentages et échelles', periode: 2 },
    { id: '5e-10', titre: 'Arithmétique : multiples, diviseurs, critères, division euclidienne', periode: 3 },
    { id: '5e-11', titre: 'Parallélogrammes', periode: 3 },
    { id: '5e-12', titre: 'Proportionnalité (3) : partager selon un ratio', periode: 3 },
    { id: '5e-13', titre: 'Angles et parallélisme (1)', periode: 3 },
    { id: '5e-14', titre: 'Angles et parallélisme (2)', periode: 4 },
    { id: '5e-15', titre: 'Calcul littéral (1) : introduction', periode: 4 },
    { id: '5e-16', titre: 'Statistiques : effectifs, fréquences, moyenne', periode: 4 },
    { id: '5e-17', titre: 'Symétrie centrale', periode: 5 },
    { id: '5e-18', titre: 'Périmètres et aires', periode: 5 },
    { id: '5e-19', titre: 'Volumes : pavé, prisme, cylindre', periode: 5 },
    { id: '5e-20', titre: 'Calcul littéral (2) : développer et factoriser', periode: 5 },
    { id: '5e-21', titre: 'Solides : patrons et perspective cavalière', periode: 5 },
    { id: '5e-22', titre: 'Probabilités', periode: 5 }],
  '4e': [
    { id: '4e-1', titre: 'Multiplication et division des nombres relatifs', periode: 1 },
    { id: '4e-2', titre: 'Statistiques', periode: 1 },
    { id: '4e-3', titre: 'Nombres premiers', periode: 1 },
    { id: '4e-4', titre: 'Théorème de Pythagore et racine carrée', periode: 1 },
    { id: '4e-5', titre: 'Puissances', periode: 2 },
    { id: '4e-6', titre: 'Probabilités', periode: 2 },
    { id: '4e-7', titre: 'Calcul littéral', periode: 2 },
    { id: '4e-8', titre: 'Grandeurs mesurables : volumes et conversions', periode: 2 },
    { id: '4e-9', titre: 'Équations', periode: 3 },
    { id: '4e-10', titre: 'Proportionnalité (1) : reconnaître et calculer', periode: 3 },
    { id: '4e-11', titre: 'Cosinus d’un angle aigu', periode: 3 },
    { id: '4e-12', titre: 'Nombres rationnels : comparer, additionner, soustraire', periode: 4 },
    { id: '4e-13', titre: 'Réciproque du théorème de Pythagore', periode: 4 },
    { id: '4e-14', titre: 'Proportionnalité (2) : agrandissement et réduction', periode: 4 },
    { id: '4e-15', titre: 'Théorème de Thalès', periode: 5 },
    { id: '4e-16', titre: 'Nombres rationnels : multiplier et diviser', periode: 5 },
    { id: '4e-17', titre: 'Réciproque du théorème de Thalès', periode: 5 },
    { id: '4e-18', titre: 'Grandeurs produits et quotients', periode: 5 },
    { id: '4e-19', titre: 'Translations', periode: 5 },
    { id: '4e-20', titre: 'Dépendance de deux grandeurs et graphiques', periode: 5 },
    { id: '4e-21', titre: 'Représenter l’espace', periode: 5 },
    { id: '4e-22', titre: 'Cas d’égalité des triangles', periode: 5 }],
  '3e': [
    { id: '3e-1', titre: 'Nombres rationnels et problèmes', periode: 1 },
    { id: '3e-2', titre: 'Statistiques', periode: 1 },
    { id: '3e-3', titre: 'Pythagore et racine carrée (rappels)', periode: 1 },
    { id: 'arithmetique', titre: 'Arithmétique · Fraction irréductible', periode: 1 },
    { id: '3e-5', titre: 'Probabilités', periode: 2 },
    { id: '3e-6', titre: 'Puissances et notation scientifique', periode: 2 },
    { id: '3e-7', titre: 'Transformations : rotation et homothétie', periode: 2 },
    { id: '3e-8', titre: 'Calcul littéral : développer et factoriser', periode: 2 },
    { id: '3e-9', titre: 'Calcul littéral : les équations', periode: 3 },
    { id: '3e-10', titre: 'Notion de fonction', periode: 3 },
    { id: '3e-11', titre: 'Théorème de Thalès', periode: 3 },
    { id: '3e-12', titre: 'Grandeurs et mesures', periode: 4 },
    { id: '3e-13', titre: 'Trigonométrie', periode: 4 },
    { id: '3e-14', titre: 'Fonctions linéaires et proportionnalité', periode: 4 },
    { id: '3e-15', titre: 'Triangles semblables', periode: 5 },
    { id: '3e-16', titre: 'Fonctions affines', periode: 5 },
    { id: '3e-17', titre: 'Représenter l’espace : sphère, boule, sections', periode: 5 },
    { id: '3e-18', titre: 'Repérage sur la Terre', periode: 5 }],
};

const NIVEAUX = {
  '6e': { nom: '6e', espace: 'college', enCours: 'fractions-6e' },
  '5e': { nom: '5e', espace: 'college', enCours: '5e-4' },
  '4e': { nom: '4e', espace: 'college', enCours: '4e-4' },
  '3e': { nom: '3e', espace: 'college', enCours: 'arithmetique' },
  '2de': { nom: '2de', espace: 'lycee', enCours: null },
  '1re': { nom: '1re', espace: 'lycee', enCours: null },
  'Tle': { nom: 'Tle', espace: 'lycee', enCours: null },
};
const ESPACES = { college: 'Espace collège', lycee: 'Espace lycée' };

const CHAPITRES = {
  'fractions-6e': {
    niveau: '6e', titre: 'Fractions simples et décimales', resume: 'Partager, mesurer, repérer et comparer avec des fractions',
    lecon: [], videos: [], exercices: [],
  },
  'arithmetique': {
    niveau: '3e', titre: 'Arithmétique', resume: 'Multiples, diviseurs, nombres premiers, PGCD et PPCM',
    lecon: [
      ['A', 'Multiples et diviseurs'], ['B', 'Division euclidienne'], ['C', 'Critères de divisibilité'], ['D', 'Nombres premiers'],
      ['E', 'Décomposition en produit de facteurs premiers'], ['F', 'Fraction irréductible'], ['G', 'PGCD et PPCM']],
    videos: [
      { titre: 'Multiples, diviseurs et division euclidienne', id: '' },
      { titre: 'Les critères de divisibilité', id: '' },
      { titre: 'Applications de la division euclidienne', id: '' },
      { titre: 'Nombres premiers et fraction irréductible', id: '' },
      { titre: 'Décomposer en produit de facteurs premiers', id: '' },
      { titre: 'PGCD : définition et méthode', id: '' },
      { titre: 'PGCD : les applications', id: '' },
      { titre: 'PPCM : définition et méthode', id: '' },
      { titre: 'PPCM : les applications', id: '' },
      { titre: 'Curiosités des nombres premiers', id: '', sansExo: true },
      { titre: 'Nombres parfaits et nombres amicaux', id: '' }],
    exercices: [],
  },
};

// Chapitre sans contenu encore : on le construit à partir de la progression.
function chapitre(id) {
  if (CHAPITRES[id]) return CHAPITRES[id];
  for (const [niv, liste] of Object.entries(PROGRESSION)) {
    const ch = liste.find(x => x.id === id);
    if (ch) return { niveau: niv, titre: ch.titre, resume: 'Période ' + ch.periode, lecon: [], videos: [], exercices: [] };
  }
  return null;
}
