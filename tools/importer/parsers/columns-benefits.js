/* eslint-disable */
/* global WebImporter */

/**
 * Parser: columns-benefits
 * Base block: columns
 * Source: https://tecmilenio.mx/es/maestrias
 * Selector: .ourMasters
 * Generated: 2026-06-02
 *
 * Structure:
 *   Row 1: [heading + badges list + subtitle + offer descriptions] | [image + badge icons]
 *   2 columns, 1 row layout
 *
 * Source HTML structure:
 *   .ourMasters > .container > .block
 *     .b-5of12 > .benefitsDescription
 *       h3 > i.llavesTitle (heading)
 *       ul.badges > li > .badgeMasters > .icon img + p strong (badge items)
 *       .subtitle > i.llavesTitle > p (subtitle)
 *       .eachOfferItem > .eachOffer > p strong + p (offer descriptions)
 *     .b-7of12
 *       .careerFlexibilityImage > .imageFlexibility > img (main image)
 *       ul.badgeBenefitsList > li > .flexibilityBagde > .icon img + p strong (badge items)
 *
 * xwalk: Columns blocks do NOT require field hint comments (per hinting rules).
 */
export default function parse(element, { document }) {
  // === Column 1: Benefits description content (.b-5of12) ===
  const benefitsDesc = element.querySelector('.b-5of12 .benefitsDescription, .b-5of12');

  // Heading
  const heading = element.querySelector('.benefitsDescription h3, .benefitsDescription h2, .b-5of12 h3');

  // Badges list (icon + label items)
  const badgesList = element.querySelector('.benefitsDescription ul.badges, .b-5of12 ul.badges');

  // Subtitle
  const subtitleEl = element.querySelector('.benefitsDescription .subtitle, .b-5of12 .subtitle');

  // Offer descriptions
  const offerItems = element.querySelector('.benefitsDescription .eachOfferItem, .b-5of12 .eachOfferItem');

  // Build column 1 content
  const col1 = [];
  if (heading) col1.push(heading);
  if (badgesList) col1.push(badgesList);
  if (subtitleEl) col1.push(subtitleEl);
  if (offerItems) col1.push(offerItems);

  // === Column 2: Image + badge icons (.b-7of12) ===
  const mainImage = element.querySelector('.b-7of12 .imageFlexibility img, .b-7of12 .careerFlexibilityImage img, .b-7of12 img');

  // Badge benefits list in right column
  const badgeBenefitsList = element.querySelector('.b-7of12 ul.badgeBenefitsList, .b-7of12 ul.badges');

  // Build column 2 content
  const col2 = [];
  if (mainImage) col2.push(mainImage);
  if (badgeBenefitsList) col2.push(badgeBenefitsList);

  // Cells: single row with 2 columns
  const cells = [
    [col1, col2],
  ];

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-benefits', cells });
  element.replaceWith(block);
}
