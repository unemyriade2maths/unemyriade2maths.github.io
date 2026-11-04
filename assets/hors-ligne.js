// Mode hors ligne : enregistre le site dans le téléphone.
(function () {
  if (!("serviceWorker" in navigator)) return;
  navigator.serviceWorker.register("sw.js");
  // Petit encadré sur la page d'accueil seulement
  const zone = document.getElementById("hors-ligne");
  if (!zone) return;
  const etat = zone.querySelector(".etat"), bouton = zone.querySelector("button");
  let fini = false;
  try { fini = localStorage.getItem("voix-hors-ligne") === "oui"; } catch (_) {}
  if (fini) { bouton.hidden = true; etat.textContent = "Les pages, les exercices et les voix fonctionnent sans connexion."; }
  bouton.addEventListener("click", async () => {
    const sw = (await navigator.serviceWorker.ready).active;
    bouton.disabled = true;
    etat.textContent = "Téléchargement des voix…";
    sw.postMessage({ type: "voix" });
  });
  navigator.serviceWorker.addEventListener("message", e => {
    if (!e.data || e.data.type !== "voix") return;
    const pct = Math.round(100 * e.data.fait / e.data.total);
    etat.textContent = "Téléchargement des voix : " + pct + " %";
    if (e.data.fait >= e.data.total) {
      bouton.hidden = true;
      etat.textContent = "C'est prêt : les voix fonctionnent aussi sans connexion.";
      try { localStorage.setItem("voix-hors-ligne", "oui"); } catch (_) {}
    }
  });
})();
