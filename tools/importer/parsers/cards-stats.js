/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-stats variant.
 * Base block: cards
 * Source: https://tecmilenio.mx/es
 * Selector: section.quick-facts-2024 .container
 * Generated: 2026-06-02
 *
 * Source structure: div.tec24-card-3 items each containing:
 *   - span.material-symbols-outlined (icon name)
 *   - p.tec24-p-3 (stat text)
 *
 * UE Model (container block):
 *   Each card row has columns: image (reference), text (richtext)
 *   Since source has no images (icon font only), image cell is left empty.
 *   Icon name + stat text go into the text cell.
 */
export default function parse(element, { document }) {
  // Find all stat card items
  const cards = element.querySelectorAll('.tec24-card-3');

  const cells = [];

  cards.forEach((card) => {
    // Extract icon name from material-symbols-outlined span
    const iconSpan = card.querySelector('span.material-symbols-outlined, span[class*="material-symbols"]');
    // Extract stat text paragraph
    const statText = card.querySelector('p.tec24-p-3, p');

    // Build the text cell content with field hint
    // Container block: each child = one row, columns = [image, text]
    // Image cell is empty (no images in source), text cell has icon + stat
    const imageCell = document.createDocumentFragment();
    // Empty cell - no field hint needed per hinting rules

    const textCell = document.createDocumentFragment();
    textCell.appendChild(document.createComment(' field:text '));

    if (iconSpan) {
      const iconEl = document.createElement('p');
      iconEl.textContent = ':' + iconSpan.textContent.trim() + ':';
      textCell.appendChild(iconEl);
    }

    if (statText) {
      textCell.appendChild(statText.cloneNode(true));
    }

    cells.push([imageCell, textCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-stats', cells });
  element.replaceWith(block);
}
