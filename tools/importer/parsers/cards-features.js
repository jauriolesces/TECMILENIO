/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-features
 * Base block: cards
 * Source: https://tecmilenio.mx/es
 * Selector: section.features-2024 .features-2024-container
 * Generated: 2026-06-02
 *
 * Source structure: .features-2024-container contains multiple .tec24-card-2 items.
 * Each card has an icon (.tec24-card-2-icon > span.material-symbols-outlined),
 * a heading (h2.tec24-h2-1), a description (.tec24-p-1), and optionally a CTA link.
 *
 * Target structure (cards block): Each card is one row with two cells:
 *   Cell 1: image (empty since source uses icon fonts, not images)
 *   Cell 2: richtext (heading + description + optional CTA)
 *
 * xwalk model fields per card item:
 *   - image (reference): card image
 *   - text (richtext): card body content
 */
export default function parse(element, { document }) {
  // Extract all card items from the features container
  const cards = element.querySelectorAll('.tec24-card-2');

  const cells = [];

  cards.forEach((card) => {
    // Extract heading from card body
    const heading = card.querySelector('.tec24-card-2-body h2, .tec24-card-2-body .tec24-h2-1');

    // Extract description from card body
    const description = card.querySelector('.tec24-card-2-body .tec24-p-1, .tec24-card-2-body p');

    // Extract optional CTA link
    const cta = card.querySelector('.tec24-card-2-body a');

    // Build the text cell content (richtext field)
    const textCell = [];

    // Add field hint for text field
    const textHint = document.createComment(' field:text ');
    textCell.push(textHint);

    if (heading) {
      textCell.push(heading);
    }
    if (description) {
      textCell.push(description);
    }
    if (cta) {
      textCell.push(cta);
    }

    // Row: [image cell (empty), text cell]
    // Image cell is empty since source uses Material Symbols icon fonts, not images
    cells.push([[], textCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-features', cells });
  element.replaceWith(block);
}
