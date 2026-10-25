// Catalogue des packs à vendre (Création de contenu). Chaque notion = un pack.
// « dispo: true » = le pack est prêt ; sinon il s'affiche « bientôt ».
const PACK = [
  ['Fiche leçon prof', 'la leçon complète, avec les exemples rédigés'],
  ['Fiche leçon élève à trous', 'à compléter en classe pendant le point leçon'],
  ['Fiche d’exercices', 'classés par difficulté (ceintures)'],
  ['Diaporama clic par clic', 'à projeter : chaque étape apparaît au clic'],
  ['Fiche correction des exercices', 'avec les compétences travaillées par exercice'],
  ['Fiches tuteur', 'pour les élèves qui aident un camarade'],
  ['Correction des QCM et des Rapidos', ''],
  ['Interrogation', 'avec son barème et ses compétences'],
];
const CATALOGUE = {
  '3e': { arithmetique: { dispo: true, diapo: 'Les séances 1 à 10 de la séquence : Rapido de début de séance, point leçon (parties A à G : multiples et diviseurs, division euclidienne, critères de divisibilité, nombres premiers, décomposition, fraction irréductible, PGCD et PPCM) avec une application dans le cahier, exercices et corrections pas à pas, débranché (Scratch, tableur, problème) et défis.' } },
};
