/* eslint-disable */
/* global WebImporter */

/**
 * Parser: cards-programs
 * Base block: cards
 * Source: https://tecmilenio.mx/es/maestrias
 * Selector: .allCareers
 * Generated: 2026-06-02T17:30:02Z
 *
 * Container block: each .b-half > a.eachCareer card becomes one row with 2 columns:
 *   Column 1: image (field: image) - program icon from .iconCareer img
 *   Column 2: richtext (field: text) - program title (h3) + description (p) + modality info
 *
 * UE Model fields (from _cards.json):
 *   - image (reference) -> program icon
 *   - text (richtext) -> title + description + modality
 *
 * Source structure per card:
 *   .b-half > a.eachCareer
 *     .headerCareer > .iconCareer > .icon > img (program icon)
 *     .headerCareer > .titleCareer > strong > h3 (program title)
 *     .bodyCareer > .contentBodyCareer > p (description)
 *     .footerCareer > .dataCareer li (modality info)
 */
export default function parse(element, { document }) {
  // Find all career card links within the .allCareers container
  const careerCards = element.querySelectorAll('.b-half > a.eachCareer, a.eachCareer');

  const cells = [];

  careerCards.forEach((card) => {
    // Column 1: Image - program icon from .iconCareer
    const iconImg = card.querySelector('.iconCareer img, .icon img');

    // Column 2: Text content - title + description + modality + link
    const titleEl = card.querySelector('.titleCareer h3, .titleCareer strong h3');
    const descriptionEl = card.querySelector('.contentBodyCareer p, .bodyCareer p');

    // Extract modality info from footer
    const modalityItems = card.querySelectorAll('.dataCareer li');
    let modalityText = '';
    modalityItems.forEach((li) => {
      const label = li.querySelector('strong');
      const value = li.querySelector('span p, span');
      if (label && value) {
        const labelText = label.textContent.trim();
        const valueText = value.textContent.trim();
        if (labelText && valueText) {
          modalityText = valueText;
        }
      }
    });

    // Get the link href from the card anchor
    const href = card.getAttribute('href') || '';

    // Build image cell with field hint
    const imageContainer = document.createElement('div');
    if (iconImg) {
      const imageHint = document.createComment(' field:image ');
      imageContainer.appendChild(imageHint);
      imageContainer.appendChild(iconImg);
    }

    // Build text cell with field hint (richtext: title + description + modality + link)
    const textContainer = document.createElement('div');
    const textHint = document.createComment(' field:text ');
    textContainer.appendChild(textHint);

    // Add title as heading
    if (titleEl) {
      const h3 = document.createElement('h3');
      h3.textContent = titleEl.textContent.trim();
      textContainer.appendChild(h3);
    }

    // Add description
    if (descriptionEl) {
      const p = document.createElement('p');
      p.textContent = descriptionEl.textContent.trim();
      textContainer.appendChild(p);
    }

    // Add modality as a paragraph if available
    if (modalityText) {
      const modalP = document.createElement('p');
      modalP.textContent = modalityText;
      textContainer.appendChild(modalP);
    }

    // Add program link as CTA
    if (href) {
      const linkP = document.createElement('p');
      const link = document.createElement('a');
      link.setAttribute('href', href);
      link.textContent = titleEl ? titleEl.textContent.trim() : 'Ver programa';
      linkP.appendChild(link);
      textContainer.appendChild(linkP);
    }

    // Each card row has 2 columns: [image, text]
    cells.push([imageContainer, textContainer]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-programs', cells });
  element.replaceWith(block);
}
