import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    while (row.firstElementChild) li.append(row.firstElementChild);

    // Remove empty divs (from the first empty cell in authored content)
    [...li.children].forEach((div) => {
      if (!div.textContent.trim() && !div.querySelector('picture, img')) {
        div.remove();
      }
    });

    // Process remaining divs
    [...li.children].forEach((div) => {
      div.className = 'cards-stats-card-body';
    });

    // Convert :icon_name: text into Material Symbols spans
    li.querySelectorAll('p').forEach((p) => {
      const match = p.textContent.trim().match(/^:([a-z0-9_]+):$/);
      if (match) {
        const span = document.createElement('span');
        span.className = 'material-symbols-outlined cards-stats-icon';
        [, span.textContent] = match;
        p.replaceWith(span);
      }
    });

    ul.append(li);
  });
  block.textContent = '';
  block.append(ul);
}
