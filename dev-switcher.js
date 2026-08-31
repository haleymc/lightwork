// DEV ONLY — palette switcher. Remove <script> tag before launch.
(function () {
  const OPTIONS = [
    { key: 'a', label: 'A — Pure' },
    { key: 'b', label: 'B — Ink' },
    { key: 'c', label: 'C — Parchment' },
  ];

  function applyPalette(key) {
    const html = document.documentElement;
    if (key === 'a') {
      delete html.dataset.palette;
    } else {
      html.dataset.palette = key;
    }
  }

  const saved = localStorage.getItem('lw-dev-palette') || 'a';
  applyPalette(saved);

  document.addEventListener('DOMContentLoaded', function () {
    const wrap = document.createElement('div');
    wrap.id = 'dev-switcher';
    wrap.style.cssText = [
      'position:fixed',
      'bottom:1.25rem',
      'right:1.25rem',
      'z-index:9999',
      'display:flex',
      'align-items:center',
      'gap:2px',
      'background:rgba(14,14,12,0.82)',
      'backdrop-filter:blur(10px)',
      '-webkit-backdrop-filter:blur(10px)',
      'padding:6px 10px',
      'border-radius:999px',
      'font-family:ui-monospace,monospace',
      'font-size:11px',
      'letter-spacing:0.04em',
      'user-select:none',
    ].join(';');

    OPTIONS.forEach(function (opt) {
      const btn = document.createElement('button');
      btn.textContent = opt.label;
      btn.dataset.palette = opt.key;

      const isActive = opt.key === saved;
      btn.style.cssText = [
        'background:none',
        'border:none',
        'cursor:pointer',
        'padding:3px 8px',
        'border-radius:999px',
        'font:inherit',
        'color:' + (isActive ? '#fff' : 'rgba(255,255,255,0.38)'),
        'background:' + (isActive ? 'rgba(255,255,255,0.12)' : 'none'),
        'transition:all 0.15s',
      ].join(';');

      btn.addEventListener('click', function () {
        const key = btn.dataset.palette;
        applyPalette(key);
        localStorage.setItem('lw-dev-palette', key);

        wrap.querySelectorAll('button').forEach(function (b) {
          const active = b.dataset.palette === key;
          b.style.color = active ? '#fff' : 'rgba(255,255,255,0.38)';
          b.style.background = active ? 'rgba(255,255,255,0.12)' : 'none';
        });
      });

      wrap.appendChild(btn);
    });

    document.body.appendChild(wrap);
  });
})();
