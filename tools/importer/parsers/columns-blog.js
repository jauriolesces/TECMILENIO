/* eslint-disable */
/* global WebImporter */

/**
 * Parser: columns-blog
 * Base block: columns
 * Source: https://tecmilenio.mx/es
 * Selector: section.blog-2024 .tec24-card-4
 * Generated: 2026-06-02T16:50:00Z
 *
 * Structure (from block model):
 *   Row 1: [image] | [description + CTA]
 *   2 columns, 1 row layout
 *
 * Source HTML structure:
 *   .tec24-card-4
 *     img.tec24-card-4-img
 *     .tec24-card-4-body
 *       p.tec24-p-1 (description text)
 *       .tec24-card-4-cta > a.tec24-btn-4 (CTA link)
 *
 * xwalk: Columns blocks do NOT require field hint comments (per hinting rules).
 */
export default function parse(element, { document }) {
  // Column 1: Image
  const image = element.querySelector('img.tec24-card-4-img, img[class*="card-4-img"]');

  // Column 2: Description + CTA
  const description = element.querySelector('.tec24-card-4-body p, p.tec24-p-1');
  const ctaLink = element.querySelector('.tec24-card-4-cta a, a.tec24-btn-4');

  // Build column 1 content (image)
  const col1 = [];
  if (image) {
    col1.push(image);
  }

  // Build column 2 content (description + CTA)
  const col2 = [];
  if (description) col2.push(description);
  if (ctaLink) col2.push(ctaLink);

  // Cells: single row with 2 columns
  const cells = [
    [col1, col2],
  ];

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-blog', cells });
  element.replaceWith(block);
}
