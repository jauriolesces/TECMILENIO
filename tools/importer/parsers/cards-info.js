/* eslint-disable */
/* global WebImporter */

/**
 * Parser: cards-info
 * Base block: cards
 * Source: https://tecmilenio.mx/es
 * Selector: section.info-cards-2024:first-of-type
 * Generated: 2026-06-02T16:50:00Z
 *
 * Container block: each .tcard-2024 card becomes one row with 2 columns:
 *   Column 1: image (field: image)
 *   Column 2: richtext with heading + description + CTA links (field: text)
 *
 * UE Model fields (from _cards.json):
 *   - image (reference) -> card image
 *   - text (richtext) -> heading + description + links
 */
export default function parse(element, { document }) {
  // Find all card items within the section
  const cards = element.querySelectorAll('.tcard-2024');

  const cells = [];

  cards.forEach((card) => {
    // Column 1: Image
    const image = card.querySelector('img.tcard-2024-image, img[class*="tcard-2024-image"]');

    // Column 2: Text content (heading + description + CTAs)
    const heading = card.querySelector('.tcard-2024-title h2, h2.tec24-h2-1');
    const description = card.querySelector('.tcard-2024-info p, .tcard-2024-info .tec24-p-1');
    const ctaLinks = Array.from(card.querySelectorAll('.tcard-2024-btn a, .tcard-2024-btn .tec24-btn-1'));

    // Build image cell with field hint
    const imageContainer = document.createElement('div');
    if (image) {
      const imageHint = document.createComment(' field:image ');
      imageContainer.appendChild(imageHint);
      imageContainer.appendChild(image);
    }

    // Build text cell with field hint (richtext: heading + description + links)
    const textContainer = document.createElement('div');
    const textHint = document.createComment(' field:text ');
    textContainer.appendChild(textHint);

    if (heading) {
      textContainer.appendChild(heading);
    }
    if (description) {
      textContainer.appendChild(description);
    }
    if (ctaLinks.length > 0) {
      const p = document.createElement('p');
      ctaLinks.forEach((link, index) => {
        if (index > 0) {
          p.appendChild(document.createTextNode(' '));
        }
        p.appendChild(link);
      });
      textContainer.appendChild(p);
    }

    // Each card row has 2 columns: [image, text]
    cells.push([imageContainer, textContainer]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-info', cells });
  element.replaceWith(block);
}
