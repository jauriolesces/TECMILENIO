/* eslint-disable */
/* global WebImporter */

/**
 * Parser: columns-promo
 * Base block: columns
 * Source: https://tecmilenio.mx/es
 * Selector: section.info-cards-2024:nth-of-type(2) .tcard-2024
 * Generated: 2026-06-02
 *
 * Structure (from block library):
 *   Row 1: [image] | [title + description + CTA]
 *   2 columns, 1 row layout
 *
 * Source HTML structure:
 *   .tcard-2024.tcard-2024-leftimg
 *     .tcard-2024-title > h2.tec24-h2-1
 *     img.tcard-2024-image
 *     .tcard-2024-info > p.tec24-p-1
 *     .tcard-2024-btn > a.tec24-btn-3
 *
 * xwalk: Columns blocks do NOT require field hint comments (per hinting rules).
 */
export default function parse(element, { document }) {
  // Column 1: Image
  const image = element.querySelector('img.tcard-2024-image, img[class*="tcard-2024-image"]');

  // Column 2: Title + Description + CTA
  const heading = element.querySelector('.tcard-2024-title h2, h2.tec24-h2-1, h2');
  const description = element.querySelector('.tcard-2024-info p, p.tec24-p-1');
  const ctaLink = element.querySelector('.tcard-2024-btn a, a.tec24-btn-3');

  // Build column 1 content (image)
  const col1 = [];
  if (image) {
    col1.push(image);
  }

  // Build column 2 content (text + CTA)
  const col2 = [];
  if (heading) col2.push(heading);
  if (description) col2.push(description);
  if (ctaLink) col2.push(ctaLink);

  // Cells: single row with 2 columns
  const cells = [
    [col1, col2],
  ];

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-promo', cells });
  element.replaceWith(block);
}
