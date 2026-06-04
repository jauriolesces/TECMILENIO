import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

export default async function decorate(block) {
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';

  let resp = await fetch(`${footerPath}.plain.html`);
  if (!resp.ok) {
    resp = await fetch('/content/footer.plain.html');
  }

  if (!resp.ok) {
    const fragment = await loadFragment(footerPath);
    block.textContent = '';
    const footer = document.createElement('div');
    while (fragment.firstElementChild) footer.append(fragment.firstElementChild);
    block.append(footer);
    return;
  }

  const html = await resp.text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  block.textContent = '';
  const footer = document.createElement('div');
  footer.classList.add('footer-content');

  const sections = doc.body.querySelectorAll(':scope > div');
  sections.forEach((section, idx) => {
    const sectionEl = document.createElement('div');
    if (idx === 0) sectionEl.classList.add('footer-links');
    else if (idx === 1) sectionEl.classList.add('footer-social');
    else sectionEl.classList.add('footer-legal');
    sectionEl.innerHTML = section.innerHTML;
    footer.append(sectionEl);
  });

  block.append(footer);
}
