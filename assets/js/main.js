/* Maryam Alkholi — portfolio behaviour */
(function () {
  var root = document.documentElement;

  /* ---------- theme ---------- */
  function stored(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function store(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }

  var saved = stored('ma-theme');
  if (saved === 'dark' || saved === 'light') root.setAttribute('data-theme', saved);

  function currentTheme() {
    var t = root.getAttribute('data-theme');
    if (t) return t;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  document.addEventListener('click', function (e) {
    var t = e.target.closest ? e.target.closest('[data-theme-toggle]') : null;
    if (!t) return;
    var next = currentTheme() === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    store('ma-theme', next);
  });

  /* ---------- mobile nav ---------- */
  var burger = document.querySelector('[data-nav-toggle]');
  var links = document.querySelector('.nav-links');
  if (burger && links) {
    burger.addEventListener('click', function () { links.classList.toggle('open'); });
    links.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') links.classList.remove('open');
    });
  }

  /* ---------- image placeholders ---------- */
  Array.prototype.forEach.call(document.querySelectorAll('.imgslot img, .avatar img'), function (img) {
    var retried = false;
    var swaps = { '.jpg': '.png', '.jpeg': '.png', '.png': '.jpg' };
    function fail() {
      // be forgiving about the file extension: try the obvious alternative once
      var src = img.getAttribute('src') || '';
      var dot = src.lastIndexOf('.');
      var ext = dot > -1 ? src.slice(dot).toLowerCase() : '';
      if (!retried && swaps[ext]) {
        retried = true;
        img.setAttribute('src', src.slice(0, dot) + swaps[ext]);
        return;
      }
      img.style.display = 'none';
      if (img.parentNode) img.parentNode.classList.add('empty');
    }
    img.addEventListener('error', fail);
    if (img.complete && img.naturalWidth === 0) fail();
  });

  /* ---------- reveal on scroll + skill bars ---------- */
  var targets = document.querySelectorAll('.reveal, .skill-card');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -60px 0px', threshold: 0.12 });
    Array.prototype.forEach.call(targets, function (t) { io.observe(t); });
  } else {
    Array.prototype.forEach.call(targets, function (t) { t.classList.add('in'); });
  }

  /* ---------- testimonials carousel ---------- */
  var track = document.querySelector('.tst-track');
  if (track) {
    function step(dir) {
      var card = track.querySelector('.tst');
      var w = card ? card.offsetWidth + 20 : track.clientWidth;
      var max = track.scrollWidth - track.clientWidth;
      var next = track.scrollLeft + dir * w;
      if (next > max - 4) next = dir > 0 ? 0 : max;
      if (next < 0) next = max;
      track.scrollTo({ left: next, behavior: 'smooth' });
    }
    var prev = document.querySelector('[data-tst-prev]');
    var nxt = document.querySelector('[data-tst-next]');
    if (prev) prev.addEventListener('click', function () { step(-1); });
    if (nxt) nxt.addEventListener('click', function () { step(1); });

    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var paused = false;
    track.addEventListener('mouseenter', function () { paused = true; });
    track.addEventListener('mouseleave', function () { paused = false; });
    track.addEventListener('focusin', function () { paused = true; });
    track.addEventListener('touchstart', function () { paused = true; }, { passive: true });
    if (!reduce) setInterval(function () { if (!paused) step(1); }, 6500);
  }

  /* ---------- contact form -> mailto ---------- */
  var form = document.querySelector('[data-contact-form]');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var to = form.getAttribute('data-to');
      var name = (form.elements.name.value || '').trim();
      var from = (form.elements.email.value || '').trim();
      var subject = (form.elements.subject.value || '').trim() || 'Portfolio enquiry';
      var msg = (form.elements.message.value || '').trim();
      var body = msg + '\n\n—\n' + name + (from ? '\n' + from : '');
      window.location.href = 'mailto:' + to +
        '?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(body);
      var note = form.querySelector('.form-note');
      if (note) note.textContent = 'Opening your email app… if nothing happens, email ' + to + ' directly.';
    });
  }

  /* ---------- active nav link on scroll (home only) ---------- */
  var navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  if (navLinks.length && 'IntersectionObserver' in window) {
    var map = {};
    Array.prototype.forEach.call(navLinks, function (a) { map[a.getAttribute('href').slice(1)] = a; });
    var so = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        var a = map[en.target.id];
        if (!a) return;
        if (en.isIntersecting) {
          Array.prototype.forEach.call(navLinks, function (l) { l.style.color = ''; });
          a.style.color = 'var(--text)';
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Object.keys(map).forEach(function (id) {
      var el = document.getElementById(id);
      if (el) so.observe(el);
    });
  }
})();
