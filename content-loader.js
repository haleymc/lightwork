// Light Work Studios — Content Loader
// Reads body[data-page] to detect the current page, fetches content.json,
// and injects content into elements with data-field or data-paragraphs attributes.
// Fails silently — HTML defaults remain if fetch fails.

(async function () {
  const page = document.body.dataset.page;
  if (!page) return;

  let data;
  try {
    const res = await fetch('/content.json');
    if (!res.ok) return;
    data = await res.json();
  } catch (e) {
    return;
  }

  const pageData = data[page];
  if (!pageData) return;

  // data-field: set textContent from a string value
  document.querySelectorAll('[data-field]').forEach(el => {
    const key = el.dataset.field;
    const val = pageData[key];
    if (typeof val === 'string') {
      el.textContent = val;
    }
  });

  // data-paragraphs: replace element contents with <p> tags from an array
  // Handles both flat string arrays ["p1","p2"] and Decap CMS object arrays [{"item":"p1"}]
  document.querySelectorAll('[data-paragraphs]').forEach(el => {
    const key = el.dataset.paragraphs;
    const val = pageData[key];
    if (!Array.isArray(val) || val.length === 0) return;

    const paragraphs = val.map(v => {
      if (typeof v === 'string') return v;
      // Handle Decap CMS list widget output: {item: "..."}
      if (typeof v === 'object' && v !== null) {
        return v.item || v.paragraph || Object.values(v)[0] || '';
      }
      return '';
    }).filter(Boolean);

    el.innerHTML = paragraphs.map(p => `<p>${p}</p>`).join('');
  });
})();
