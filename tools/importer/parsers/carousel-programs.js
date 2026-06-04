/* eslint-disable */
/* global WebImporter */

/**
 * Parser: carousel-programs
 * Base block: carousel
 * Source: https://tecmilenio.mx/es
 * Selector: section.swiper-carrusel-2024 .swiper-container
 * Generated: 2026-06-02
 *
 * UE Model (carousel-programs-item):
 *   - media_image (reference): Background Image
 *   - media_imageAlt (collapsed): Background Alt
 *   - content_text (richtext): Text (heading + paragraph + CTA)
 *
 * Container block: each slide becomes one row with 2 columns:
 *   Column 1: image (field: media_image, alt collapsed into imageAlt)
 *   Column 2: richtext content (field: content_text) — heading, description, CTA link
 */
export default function parse(element, { document }) {
  // Each slide is a .swiper-slide containing a .tec24-card-1
  const slides = element.querySelectorAll('.swiper-slide .tec24-card-1');

  const cells = [];

  slides.forEach((card) => {
    // Column 1: Image
    const image = card.querySelector('img.tec24-card-1-image, img[class*="card-1-image"]');

    // Column 2: Rich text content (heading + paragraph + CTA)
    const heading = card.querySelector('.tec24-card-1-description h2, .tec24-card-1-description h3');
    const description = card.querySelector('.tec24-card-1-description p, .tec24-card-1-description .tec24-p-1');
    const cta = card.querySelector('.tec24-card-1-description a.tec24-btn-2, .tec24-card-1-description a[class*="btn"]');

    // Build image cell with field hint
    const imageCell = document.createDocumentFragment();
    imageCell.appendChild(document.createComment(' field:media_image '));
    if (image) {
      imageCell.appendChild(image);
    }

    // Build content cell with field hint
    const contentCell = document.createDocumentFragment();
    contentCell.appendChild(document.createComment(' field:content_text '));
    if (heading) contentCell.appendChild(heading);
    if (description) contentCell.appendChild(description);
    if (cta) contentCell.appendChild(cta);

    // Each slide is a row with [image, content]
    cells.push([imageCell, contentCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'carousel-programs', cells });
  element.replaceWith(block);
}
