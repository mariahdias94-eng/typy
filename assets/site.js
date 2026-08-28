// Nav background on scroll
(function(){
  var nav = document.getElementById('siteNav');
  if (!nav) return;
  window.addEventListener('scroll', function(){
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive:true });
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
