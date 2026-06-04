/* eslint-disable */
/* global WebImporter */

/**
 * Parser: tabs-filter
 * Base block: tabs
 * Source: https://tecmilenio.mx/es/maestrias
 * Selector: .categoriesModule
 * Generated: 2026-06-02
 *
 * Source structure: .categoriesModule > .container > .bodyModule >
 *   .categoriesCarousel > .owl-stage-outer > .owl-stage > .owl-item elements,
 *   each containing .eachFilter > a > span with category label text.
 *
 * Target structure (container block - tabs-filter-item):
 *   Each row = one tab item with 2 columns:
 *   - Column 1: title (field: title) - the tab label text
 *   - Column 2: content (fields: content_heading, content_image, content_richtext) - panel content
 *
 * UE Model: tabs-filter-item (container block)
 *   - title (text) - tab title/label
 *   - content_heading (text) - heading in panel (collapsed: content_headingType)
 *   - content_image (reference) - image in panel
 *   - content_richtext (richtext) - rich text content in panel
 *
 * Note: For this filter variant, tabs are category labels only.
 * Panel content (column 2) contains just an h3 heading matching the tab title,
 * as the decoration logic uses the first cell as the tab button label.
 */
export default function parse(element, { document }) {
  // Select all filter items from the owl carousel
  // Validated selectors against .categoriesModule source DOM
  const filterItems = element.querySelectorAll('.owl-item .eachFilter');

  // Fallback: try direct .eachFilter if owl-item wrapper is absent
  const items = filterItems.length > 0
    ? filterItems
    : element.querySelectorAll('.eachFilter');

  const cells = [];

  items.forEach((item) => {
    // Extract tab label text from the anchor > span structure
    const labelSpan = item.querySelector('a span');
    const labelText = labelSpan ? labelSpan.textContent.trim() : '';

    if (!labelText) return;

    // Column 1: title field - the tab button label
    const titleCell = document.createDocumentFragment();
    titleCell.appendChild(document.createComment(' field:title '));
    const titleEl = document.createElement('p');
    titleEl.textContent = labelText;
    titleCell.appendChild(titleEl);

    // Column 2: content fields - panel content
    // For tabs-filter, each panel gets an h3 heading matching the tab title
    // This satisfies the content_heading field in the UE model
    const contentCell = document.createDocumentFragment();
    contentCell.appendChild(document.createComment(' field:content_heading '));
    const heading = document.createElement('h3');
    heading.textContent = labelText;
    contentCell.appendChild(heading);

    cells.push([titleCell, contentCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'tabs-filter', cells });
  element.replaceWith(block);
}
