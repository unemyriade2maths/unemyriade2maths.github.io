// Contact : l'adresse n'est jamais écrite en clair dans les pages (anti-spam).
// Elle est assemblée seulement quand on touche un bouton « contact ».
document.addEventListener('click', e => {
  const a = e.target.closest('a.contact[data-sujet]');
  if (!a) return;
  e.preventDefault();
  const adr = ['prof', 'varrin'].join('.') + '@' + ['gmail', 'com'].join('.');
  location.href = 'mailto:' + adr + '?subject=' + encodeURIComponent(a.dataset.sujet);
});
