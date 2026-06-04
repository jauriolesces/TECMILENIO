/* eslint-disable */
/* global WebImporter */

/**
 * Parser: carousel-banner
 * Base block: carousel
 * Source: https://tecmilenio.mx/es
 * Selector: section#hero-banner-2024
 * Generated: 2026-06-02
 *
 * Source structure: Bootstrap carousel with multiple .carousel-item slides,
 * each containing a linked image (<a><img></a>).
 *
 * Target structure (from block library): 2 columns per row.
 *   - Column 1: image (field: media_image, collapsed: media_imageAlt)
 *   - Column 2: text/CTA content (field: content_text)
 *
 * UE Model: carousel-banner-item (container block)
 *   - media_image (reference) - the slide image
 *   - media_imageAlt (text, collapsed) - image alt text
 *   - content_text (richtext) - optional text/CTA content
 */
export default function parse(element, { document }) {
  // Select all carousel slide items (validated against section#hero-banner-2024 source DOM)
  const slides = element.querySelectorAll('.carousel-item');

  const cells = [];

  slides.forEach((slide) => {
    // Extract image from slide - may be direct child or inside a link
    const img = slide.querySelector('img');
    // Extract link wrapping the image (used as CTA)
    const link = slide.querySelector('a[href]');

    // Column 1: Image with field hint
    const imageCell = document.createDocumentFragment();
    const imageComment = document.createComment(' field:media_image ');
    imageCell.appendChild(imageComment);
    if (img) {
      imageCell.appendChild(img);
    }

    // Column 2: Text/CTA content with field hint
    const textCell = document.createDocumentFragment();
    const textComment = document.createComment(' field:content_text ');
    textCell.appendChild(textComment);
    if (link) {
      // Create a clean link element for the CTA (using alt text or href as label)
      const cta = document.createElement('a');
      cta.href = link.href;
      // Use image alt text as link text if available, otherwise use the URL
      const altText = img ? img.getAttribute('alt') : '';
      cta.textContent = altText || link.href;
      textCell.appendChild(cta);
    }

    cells.push([imageCell, textCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'carousel-banner', cells });
  element.replaceWith(block);
}
