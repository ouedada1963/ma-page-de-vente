// Mouvement de la page : ajouté par-dessus une page déjà complète.
// Sans ce script, tout reste visible.
(function () {
  var racine = document.documentElement;
  racine.classList.add('js');

  var calme = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!calme && 'IntersectionObserver' in window) {
    racine.classList.add('anime');

    // Arrivée du haut de page, éléments décalés de 80 ms
    document.querySelectorAll('.arrive').forEach(function (el, i) {
      el.style.animationDelay = (i * 80) + 'ms';
    });

    // Apparitions au défilement, une seule fois
    var vus = new IntersectionObserver(function (entrees) {
      entrees.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('vu'); vus.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    document.querySelectorAll('.apparait').forEach(function (el) { vus.observe(el); });
  }

  // Barre d'achat : visible quand le bouton du haut et le dernier appel sont hors de l'écran
  var barre = document.querySelector('.barre-achat');
  var cibles = document.querySelectorAll('.achat, .appel');
  if (barre && cibles.length && 'IntersectionObserver' in window) {
    var visibles = new Set();
    var guet = new IntersectionObserver(function (entrees) {
      entrees.forEach(function (e) {
        if (e.isIntersecting) visibles.add(e.target); else visibles.delete(e.target);
      });
      var apresHaut = document.querySelector('.achat').getBoundingClientRect().bottom < 0;
      barre.classList.toggle('visible', apresHaut && visibles.size === 0);
    });
    cibles.forEach(function (c) { guet.observe(c); });
    window.addEventListener('scroll', function () {
      var apresHaut = document.querySelector('.achat').getBoundingClientRect().bottom < 0;
      barre.classList.toggle('visible', apresHaut && visibles.size === 0);
    }, { passive: true });
  }
})();
