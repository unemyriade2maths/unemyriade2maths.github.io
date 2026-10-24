// Contenu du site : c'est le seul fichier à modifier pour changer les chapitres, les vidéos et les exercices.
// Vidéo : mettre l'identifiant YouTube dans "id" (la partie après watch?v= dans le lien de la vidéo).
const CHAINE = 'https://www.youtube.com/@une.myriademaths';

const NIVEAUX = {
  '6e': { nom: '6e', espace: 'college', enCours: 'fractions-6e', precedent: null },
  '5e': { nom: '5e', espace: 'college', enCours: null, precedent: null },
  '4e': { nom: '4e', espace: 'college', enCours: null, precedent: null },
  '3e': { nom: '3e', espace: 'college', enCours: 'arithmetique', precedent: 'fonctions' },
  '2de': { nom: '2de', espace: 'lycee', enCours: null, precedent: null },
  '1re': { nom: '1re', espace: 'lycee', enCours: null, precedent: null },
  'Tle': { nom: 'Tle', espace: 'lycee', enCours: null, precedent: null },
};
const ESPACES = { college: 'Espace collège', lycee: 'Espace lycée' };

const CHAPITRES = {
  'fractions-6e': {
    niveau: '6e', titre: 'Les fractions', resume: 'Représenter, comparer et utiliser des fractions',
    lecon: [], videos: [], exercices: [],
  },
  'fonctions': {
    niveau: '3e', titre: 'Fonctions affines et linéaires', resume: 'Images, antécédents, représentations graphiques',
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
      { titre: 'Curiosités des nombres premiers', id: '' },
      { titre: 'Nombres parfaits et nombres amicaux', id: '' }],
    exercices: [{ titre: 'Exercice 3 · Diviseurs avec un tableau', page: 'exercice-diviseurs.html' }],
  },
};
