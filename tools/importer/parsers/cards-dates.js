/* eslint-disable */
/* global WebImporter */

/**
 * Parser: cards-dates
 * Base block: cards
 * Source: https://tecmilenio.mx/es
 * Selector: section.hero-periods-2024
 * Generated: 2026-06-02T16:52:00Z
 *
 * Extracts enrollment period cards from the hero-periods section.
 * Each period (Bimestral, Tetramestral, Semestral) becomes a card row.
 * UE Model: container block with "card" children, each having [image, text] columns.
 */
export default function parse(element, { document }) {
  // Extract all period items from the periods container
  const periodItems = element.querySelectorAll('.item-period');

  const cells = [];

  periodItems.forEach((item) => {
    // Extract period title (e.g., "Bimestral", "Tetramestral", "Semestral")
    const titleEl = item.querySelector('.iperiod-title');
    // Extract period date (e.g., "Junio 2026")
    const dateEl = item.querySelector('.iperiod-date');

    // Image column: empty for this variant (no images in source)
    const imageCell = '';

    // Text column: combine title and date as richtext with field hint
    const textFrag = document.createDocumentFragment();
    textFrag.appendChild(document.createComment(' field:text '));
    if (titleEl) {
      const heading = document.createElement('h3');
      heading.textContent = titleEl.textContent.trim();
      textFrag.appendChild(heading);
    }
    if (dateEl) {
      const para = document.createElement('p');
      para.textContent = dateEl.textContent.trim();
      textFrag.appendChild(para);
    }

    cells.push([imageCell, textFrag]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-dates', cells });
  element.replaceWith(block);
}
