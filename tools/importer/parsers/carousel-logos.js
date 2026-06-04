/* eslint-disable */
/* global WebImporter */

/**
 * Parser: carousel-logos
 * Base block: carousel
 * Source: https://tecmilenio.mx/es
 * Selector: section.swiper-carrusel-2024-2 .swiper-container-2
 * Generated: 2026-06-02
 *
 * Structure (container block):
 *   Each swiper-slide becomes one row with 2 cells:
 *     Cell 1 (media_): image with alt (media_image, media_imageAlt collapsed)
 *     Cell 2 (content_): richtext description wrapped in link (content_text)
 */
export default function parse(element, { document }) {
  // Select all carousel slides from the swiper-wrapper (excludes nav buttons)
  const slides = element.querySelectorAll(':scope .swiper-wrapper .swiper-slide, :scope .swiper-slide');

  const cells = [];

  slides.forEach((slide) => {
    // Extract the image from the slide card
    const img = slide.querySelector('.tec24-card-5-img img, .tec24-card-5 img, img');
    // Extract the text content from the slide card body
    const textEl = slide.querySelector('.tec24-card-5-body p, .tec24-card-5-body, p.tec24-p-4');
    // Extract the link wrapping the card content
    const link = slide.querySelector('a');

    // Cell 1: media_ group (image with field hint)
    const mediaCell = document.createDocumentFragment();
    mediaCell.appendChild(document.createComment(' field:media_image '));
    if (img) {
      const imgClone = img.cloneNode(true);
      mediaCell.appendChild(imgClone);
    }

    // Cell 2: content_ group (text wrapped in link, with field hint)
    const contentCell = document.createDocumentFragment();
    contentCell.appendChild(document.createComment(' field:content_text '));
    if (link && textEl) {
      // Wrap text in the link to preserve the href
      const a = document.createElement('a');
      a.href = link.href;
      a.textContent = textEl.textContent.trim();
      contentCell.appendChild(a);
    } else if (textEl) {
      const p = document.createElement('p');
      p.textContent = textEl.textContent.trim();
      contentCell.appendChild(p);
    }

    cells.push([mediaCell, contentCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'carousel-logos', cells });
  element.replaceWith(block);
}
