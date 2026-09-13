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

  /* ---------- lightbox (certificates + project screenshots) ---------- */
  var groups = {};
  Array.prototype.forEach.call(document.querySelectorAll('[data-lightbox]'), function (el) {
    var g = el.getAttribute('data-lightbox');
    (groups[g] = groups[g] || []).push(el);
  });
  if (Object.keys(groups).length) {
    var ico = function (d) { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="' + d + '"/></svg>'; };
    var lb = document.createElement('div');
    lb.className = 'lightbox';
    lb.setAttribute('role', 'dialog');
    lb.setAttribute('aria-modal', 'true');
    lb.setAttribute('aria-label', 'Image viewer');
    lb.innerHTML =
      '<button class="lb-btn lb-close" aria-label="Close">' + ico('M6 6l12 12M18 6L6 18') + '</button>' +
      '<button class="lb-btn lb-prev" aria-label="Previous image">' + ico('M15 6l-6 6 6 6') + '</button>' +
      '<button class="lb-btn lb-next" aria-label="Next image">' + ico('M9 6l6 6-6 6') + '</button>' +
      '<figure><img alt=""><figcaption></figcaption></figure>';
    document.body.appendChild(lb);
    var lbImg = lb.querySelector('img');
    var lbCap = lb.querySelector('figcaption');
    var cur = null, idx = 0, opener = null;

    function show(i) {
      var list = groups[cur];
      idx = (i + list.length) % list.length;
      var el = list[idx];
      lbImg.src = el.getAttribute('data-src');
      lbImg.alt = el.getAttribute('data-caption') || '';
      lbCap.innerHTML = '';
      lbCap.appendChild(document.createTextNode(el.getAttribute('data-caption') || ''));
      if (list.length > 1) {
        var n = document.createElement('span');
        n.textContent = (idx + 1) + ' / ' + list.length;
        lbCap.appendChild(n);
      }
    }
    function open(g, i, from) {
      cur = g; opener = from;
      lb.classList.toggle('solo', groups[g].length < 2);
      show(i);
      lb.classList.add('open');
      document.body.classList.add('no-scroll');
      lb.querySelector('.lb-close').focus();
    }
    function close() {
      lb.classList.remove('open');
      document.body.classList.remove('no-scroll');
      if (opener) opener.focus();
    }
    Object.keys(groups).forEach(function (g) {
      groups[g].forEach(function (el, i) {
        el.addEventListener('click', function () { open(g, i, el); });
      });
    });
    lb.querySelector('.lb-close').addEventListener('click', close);
    lb.querySelector('.lb-prev').addEventListener('click', function () { show(idx - 1); });
    lb.querySelector('.lb-next').addEventListener('click', function () { show(idx + 1); });
    lb.addEventListener('click', function (e) { if (e.target === lb || e.target.tagName === 'FIGURE') close(); });
    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') show(idx - 1);
      else if (e.key === 'ArrowRight') show(idx + 1);
      else if (e.key === 'Tab') {
        var f = Array.prototype.filter.call(lb.querySelectorAll('button'), function (b) { return b.offsetParent !== null; });
        var at = f.indexOf(document.activeElement);
        e.preventDefault();
        f[(at + (e.shiftKey ? -1 : 1) + f.length) % f.length].focus();
      }
    });
  }
})();
