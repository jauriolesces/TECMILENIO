/* eslint-disable */
/* global WebImporter */

/**
 * Parser: columns-gallery
 * Base block: columns
 * Source selector: section.tec24-campus-container .tec24-campus-grid-container
 * Description: Campus gallery grid with 5 images arranged in a visual grid layout.
 *   Row 1: image1 (1x1) | image2 (2x1)
 *   Row 2: image3 (1x2) | image4 (2x1)
 *   Row 3: (image3 spans) | image5 (1x1)
 * Columns blocks are exempt from field hinting per xwalk rules.
 * Generated: 2026-06-02
 */
export default function parse(element, { document }) {
  // Extract all grid items from the campus gallery grid container
  const gridItems = Array.from(element.querySelectorAll(':scope > .tec24-campus-grid-item'));

  // Extract images from each grid item
  // Grid layout based on source classes:
  //   s1 (1x1), s2 span-2x1, s3 span-1x2, s4 span-2x1, s5 (1x1)
  // Visual arrangement:
  //   Row 1: s1 | s2 (spans 2 cols)
  //   Row 2: s3 (spans 2 rows) | s4 (spans 2 cols)
  //   Row 3: s3 (continued) | s5

  const img1 = element.querySelector('.tec24-campus-grid-item.s1 img');
  const img2 = element.querySelector('.tec24-campus-grid-item.s2 img');
  const img3 = element.querySelector('.tec24-campus-grid-item.s3 img');
  const img4 = element.querySelector('.tec24-campus-grid-item.s4 img');
  const img5 = element.querySelector('.tec24-campus-grid-item.s5 img');

  // Build cells array to represent the gallery as a columns block
  // Using 3 rows x 2 columns to represent the grid layout
  // Columns blocks: no field hints required (xwalk exception)
  const cells = [];

  // Row 1: image1 | image2
  const row1 = [];
  row1.push(img1 || '');
  row1.push(img2 || '');
  cells.push(row1);

  // Row 2: image3 | image4
  const row2 = [];
  row2.push(img3 || '');
  row2.push(img4 || '');
  cells.push(row2);

  // Row 3: image5 (single image in last position)
  const row3 = [];
  row3.push(img5 || '');
  row3.push('');
  cells.push(row3);

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-gallery', cells });
  element.replaceWith(block);
}
