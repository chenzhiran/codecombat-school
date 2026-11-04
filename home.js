/* 扣哒世界 · 未来学校｜首页交互 */
(function () {
  var nav = document.querySelector('.nav');
  var menuBtn = document.querySelector('[data-menu]');
  var mobileNav = document.getElementById('mobile-nav');
  var modal = document.getElementById('service-modal');

  /* 滚动：导航变浅色实底 */
  var onScroll = function () {
    if (!nav) return;
    nav.classList.toggle('is-scrolled', window.scrollY > 24);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* 移动端菜单 */
  var closeMenu = function () {
    if (!mobileNav || !menuBtn) return;
    mobileNav.classList.remove('is-open');
    nav.classList.remove('is-open');
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.textContent = '☰';
    document.body.classList.remove('is-locked');
  };

  if (menuBtn && mobileNav) {
    menuBtn.addEventListener('click', function () {
      var open = mobileNav.classList.toggle('is-open');
      nav.classList.toggle('is-open', open);
      menuBtn.setAttribute('aria-expanded', String(open));
      menuBtn.textContent = open ? '×' : '☰';
      document.body.classList.toggle('is-locked', open);
    });
    mobileNav.addEventListener('click', function (e) {
      if (e.target.closest('a')) closeMenu();
    });
    window.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });
  }

  /* 咨询弹窗 */
  if (modal && typeof modal.showModal === 'function') {
    document.querySelectorAll('[data-service]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        closeMenu();
        modal.showModal();
        document.body.classList.add('is-locked');
      });
    });
    modal.addEventListener('click', function (e) {
      if (e.target === modal || e.target.closest('[data-close]')) {
        modal.close();
      }
    });
    modal.addEventListener('close', function () {
      document.body.classList.remove('is-locked');
    });
  } else if (modal) {
    /* 极旧浏览器：直接跳转到官方页面 */
    document.querySelectorAll('[data-service]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        window.location.href = 'https://codecombat.cn/';
      });
    });
  }

  /* 滚动渐显 */
  var items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) || !items.length) {
    items.forEach(function (el) { el.classList.add('is-in'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  items.forEach(function (el) { io.observe(el); });
})();
