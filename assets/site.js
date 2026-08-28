// Nav background on scroll
(function(){
  var nav = document.getElementById('siteNav');
  if (!nav) return;
  window.addEventListener('scroll', function(){
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive:true });
})();

// Hero parallax on scroll (subtle depth effect, skipped for reduced-motion users)
(function(){
  var layer = document.querySelector('.hero-parallax');
  if (!layer) return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  function onScroll(){
    var shift = Math.max(-35, Math.min(35, window.scrollY * 0.18));
    layer.style.transform = 'translateY(' + shift + 'px)';
  }
  window.addEventListener('scroll', onScroll, { passive:true });
  onScroll();
})();

// Mobile nav menu toggle
(function(){
  var toggle = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');
  if (!toggle || !links) return;
  function closeMenu(){
    links.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }
  toggle.addEventListener('click', function(){
    var isOpen = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
  links.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', closeMenu);
  });
  document.addEventListener('click', function(e){
    if (!links.classList.contains('open')) return;
    if (links.contains(e.target) || toggle.contains(e.target)) return;
    closeMenu();
  });
  window.addEventListener('resize', function(){
    if (window.innerWidth > 980) closeMenu();
  });
})();

// Category pill nav active state on marketplace page (scroll spy, lightweight)
(function(){
  var pills = document.querySelectorAll('.cat-pill');
  if (!pills.length) return;
  var sections = [];
  pills.forEach(function(p){
    var id = p.getAttribute('href').replace('#','');
    var sec = document.getElementById(id);
    if (sec) sections.push({ pill:p, sec:sec });
  });
  window.addEventListener('scroll', function(){
    var y = window.scrollY + 140;
    var current = sections[0];
    for (var i=0;i<sections.length;i++){
      if (sections[i].sec.offsetTop <= y) current = sections[i];
    }
    sections.forEach(function(s){ s.pill.classList.toggle('active', s === current); });
  }, { passive:true });
})();
