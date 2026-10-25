// Transforme le texte affiché en phrase à dire pour la voix (nombres en lettres, symboles en mots).
function enMots(n) {
  const U = ['zéro', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf', 'dix', 'onze', 'douze', 'treize', 'quatorze', 'quinze', 'seize'];
  const D = { 2: 'vingt', 3: 'trente', 4: 'quarante', 5: 'cinquante', 6: 'soixante' };
  const moinsDeCent = (x) => {
    if (x <= 16) return U[x];
    if (x < 20) return 'dix-' + U[x - 10];
    const d = Math.floor(x / 10), u = x % 10;
    if (d === 7) return x === 71 ? 'soixante et onze' : 'soixante-' + moinsDeCent(10 + u);
    if (d === 8) return u === 0 ? 'quatre-vingts' : 'quatre-vingt-' + U[u];
    if (d === 9) return 'quatre-vingt-' + moinsDeCent(10 + u);
    return u === 0 ? D[d] : (u === 1 ? D[d] + ' et un' : D[d] + '-' + U[u]);
  };
  const moinsDeMille = (x) => {
    const c = Math.floor(x / 100), r = x % 100;
    let s = c === 0 ? '' : (c === 1 ? 'cent' : U[c] + ' cent' + (r === 0 ? 's' : ''));
    if (r) s += (s ? ' ' : '') + moinsDeCent(r);
    return s || 'zéro';
  };
  if (n < 1000) return moinsDeMille(n);
  const m = Math.floor(n / 1000), r = n % 1000;
  let s = m === 1 ? 'mille' : moinsDeMille(m).replace(/cents$/, 'cent').replace(/vingts$/, 'vingt') + ' mille';
  if (r) s += ' ' + moinsDeMille(r);
  return s;
}
function dire(html) {
  let t = String(html);
  t = t.replace(/<span class="frac"><span>(.*?)<\/span><span>(.*?)<\/span><\/span>/g, ' $1 sur $2 ');
  t = t.replace(/<div class="divsucc">[\s\S]*?<\/div>/g, ' ');
  t = t.replace(/<svg[\s\S]*?<\/svg>/g, ' ').replace(/←/g, '. ').replace(/≠/g, ' n’est pas égal à ').replace(/\[([A-Z]+)\]/g, '$1').replace(/(\d) m\b/g, '$1 mètres').replace(/ℓ/g, 'la longueur');
  t = t.replace(/<\/p>|<br>|<\/li>/g, '. ').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
  t = t.replace(/(\d+)\/(\d+)/g, '$1 sur $2');
  t = t.replace(/(PGCD|PPCM)\s*\((\d+)\s*;\s*(\d+)(?:\s*;\s*(\d+))?\)/g, (m0, f, a, b, c) => 'le ' + f + ' de ' + a + (c ? ', de ' + b + ' et de ' + c : ' et de ' + b));
  t = t.replace(/PGCD/g, 'pé-gé-cé-dé').replace(/PPCM/g, 'pé-pé-cé-ème');
  t = t.replace(/²/g, ' au carré').replace(/³/g, ' au cube').replace(/⁴/g, ' puissance quatre').replace(/⁵/g, ' puissance cinq').replace(/⁶/g, ' puissance six').replace(/⁰/g, ' puissance zéro');
  t = t.replace(/√/g, ' racine carrée de ').replace(/≈/g, ' environ ').replace(/×/g, ' fois ').replace(/÷/g, ' divisé par ')
       .replace(/ = /g, ', égale ').replace(/=/g, ' égale ').replace(/\+/g, ' plusse ').replace(/−/g, ' moins ')
       .replace(/</g, ' plus petit que ').replace(/>/g, ' plus grand que ').replace(/\)\s*,?/g, ', ').replace(/\(/g, ' ').replace(/→/g, ', puis ').replace(/\bcm\b/g, 'centimètres').replace(/«|»/g, ' ');
  t = t.replace(/(\d+)ᵉ/g, (m0, a) => { const w = enMots(Number(a)); return ' ' + (a === '1' ? 'premier' : w.replace(/cinq$/, 'cinqu').replace(/neuf$/, 'neuv').replace(/e$/, '') + 'ième') + ' '; });
  t = t.replace(/(\d{1,3}(?: \d{3})+|\d+)(?:,(\d+))?/g, (m0, a, b) => {
    const s = enMots(Number(a.replace(/ /g, '')));
    return ' ' + (b ? s + ' virgule ' + (b.length > 1 && b[0] === '0' ? 'zéro ' + enMots(Number(b)) : enMots(Number(b))) : s) + ' ';
  });
  t = t.replace(/\s+([.,:;!?])/g, '$1').replace(/([!?])\./g, '$1').replace(/\.\s*\./g, '.').replace(/\s+/g, ' ').trim();
  return t;
}
// La phrase dite pour une étape : son texte « v » s'il existe, sinon le texte affiché.
const voixDe = (e) => e ? (e.v || (typeof e.h === 'string' ? dire(e.h) : (e.h && e.h.apres ? dire(e.h.apres) : ''))) : '';
