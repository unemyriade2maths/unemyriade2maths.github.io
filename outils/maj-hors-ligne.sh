#!/bin/sh
# Met à jour la liste des fichiers gardés hors ligne (sw.js) et sa version.
# À lancer à la racine du site après chaque ajout de page ou de fichier.
cd "$(dirname "$0")/.." || exit 1
LISTE=$( { echo ./; git ls-files '*.html' 'assets/*' manifest.json; } | grep -v -e '^assets/scratch/LICENSE$' | sed 's/.*/  "&",/')
VOIX=$(git ls-files 'audio/*.mp3' | sed 's/.*/"&",/' | tr -d '\n')
VERSION=$(date +%Y%m%d%H%M)
awk -v liste="$LISTE" -v v="$VERSION" -v voix="$VOIX" '
  /^const VERSION/ { print "const VERSION = \"" v "\";"; next }
  /^\/\/ DEBUT LISTE/ { print; print liste; skip=1; next }
  /^\/\/ DEBUT VOIX/ { print; print voix; skip=1; next }
  /^\/\/ FIN (LISTE|VOIX)/ { skip=0 }
  !skip { print }' sw.js > sw.tmp && mv sw.tmp sw.js
echo "sw.js mis à jour (version $VERSION)"
