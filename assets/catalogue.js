// Catalogue des packs à vendre (Création de contenu). Chaque notion = un pack.
// « dispo: true » = le pack est prêt ; sinon il s'affiche « bientôt ».
const PACK = [
  ['Fiche leçon prof', 'la leçon complète, avec les exemples rédigés'],
  ['Fiche leçon élève à trous', 'à compléter en classe pendant le point leçon'],
  ['Fiche d’exercices', 'classés par difficulté (ceintures)'],
  ['Diaporama clic par clic', 'à projeter, modifiable pour y ajouter vos propres éléments'],
  ['Fiche correction des exercices', 'avec les compétences travaillées par exercice'],
  ['Fiches tuteur', 'pour les élèves qui aident un camarade'],
  ['Correction des QCM et des Rapidos', ''],
  ['Interrogation', 'avec son barème et ses compétences'],
];
// Organisation d'une séance dans le diaporama (on décrit l'organisation, pas le contenu).
const SEANCE = ['Top Chrono', 'QCM des prérequis', 'Activité', 'Prise de notes de la leçon', 'Exercice d’application de la méthode', 'Exercices'];
// Aperçu du contenu du cours : seulement les grandes parties.
const CATALOGUE = {
  '3e': { arithmetique: { dispo: true, seances: 10, parties: ['Multiples et diviseurs', 'Division euclidienne', 'Critères de divisibilité', 'Nombres premiers', 'Décomposition en produit de facteurs premiers', 'Fraction irréductible', 'PGCD et PPCM'] } },
};
