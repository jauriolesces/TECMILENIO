/* eslint-disable */
/* global WebImporter */

/**
 * Parser: cards-links
 * Base block: cards
 * Source: https://tecmilenio.mx/es/maestrias
 * Selector: .semiBlueBg ~ .bodySection
 * Generated: 2026-06-02T17:30:00Z
 *
 * Container block: each a.eachLinkSquare card becomes one row with 2 columns:
 *   Column 1: icon image (field: image)
 *   Column 2: richtext with description text + CTA link (field: text)
 *
 * UE Model fields (from _cards-links.json):
 *   - image (reference) -> card icon image
 *   - text (richtext) -> description paragraph + link text
 *
 * Source structure:
 *   .bodySection > .container > .interestLinksSlider > div > a.eachLinkSquare
 *     > .headerlearnSquare > span.icon > img (icon)
 *     > .headerlearnSquare > p (description)
 *     > .bodylearnSquare > span (CTA text)
 */
export default function parse(element, { document }) {
  // Find all link card items
  const cardLinks = element.querySelectorAll('a.eachLinkSquare');

  const cells = [];

  cardLinks.forEach((card) => {
    // Column 1: Icon image from .headerlearnSquare span.icon img
    const iconImg = card.querySelector('.headerlearnSquare span.icon img, .headerlearnSquare img');

    // Column 2: Text content - description + the card acts as a link itself
    const descriptionEl = card.querySelector('.headerlearnSquare p');
    const ctaTextEl = card.querySelector('.bodylearnSquare span:not(.icon)');

    // Build image cell with field hint
    const imageContainer = document.createElement('div');
    if (iconImg) {
      const imageHint = document.createComment(' field:image ');
      imageContainer.appendChild(imageHint);
      imageContainer.appendChild(iconImg);
    }

    // Build text cell with field hint (richtext: description + CTA link)
    const textContainer = document.createElement('div');
    const textHint = document.createComment(' field:text ');
    textContainer.appendChild(textHint);

    if (descriptionEl) {
      textContainer.appendChild(descriptionEl);
    }

    // Create a proper link element from the card's href and CTA text
    const cardHref = card.getAttribute('href');
    if (cardHref && ctaTextEl) {
      const link = document.createElement('a');
      link.setAttribute('href', cardHref);
      link.textContent = ctaTextEl.textContent.trim();
      const p = document.createElement('p');
      p.appendChild(link);
      textContainer.appendChild(p);
    } else if (cardHref) {
      // Fallback: use description text as link text
      const link = document.createElement('a');
      link.setAttribute('href', cardHref);
      link.textContent = descriptionEl ? descriptionEl.textContent.trim() : cardHref;
      const p = document.createElement('p');
      p.appendChild(link);
      textContainer.appendChild(p);
    }

    // Each card row has 2 columns: [image, text]
    cells.push([imageContainer, textContainer]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-links', cells });
  element.replaceWith(block);
}
