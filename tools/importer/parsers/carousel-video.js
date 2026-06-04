/* eslint-disable */
/* global WebImporter */

/**
 * Parser: carousel-video
 * Base block: carousel
 * Source: https://tecmilenio.mx/es
 * Selector: section.swiper-carrusel-video-2024 .swiper-video-container
 * Generated: 2026-06-02
 *
 * UE Model (carousel-video-item):
 *   - media_image (reference): Background Image
 *   - media_imageAlt (collapsed): Background Alt
 *   - content_text (richtext): Text (heading)
 *
 * Container block: each slide becomes one row with 2 columns:
 *   Column 1: video link as image placeholder (field: media_image)
 *   Column 2: richtext content (field: content_text) — heading text
 *
 * Source structure per slide:
 *   .swiper-slide > .tec24-cv24-item
 *     .tec24-cv24i-heading > h2.tec24-h2-1 (title)
 *     .tec24-cv24i-video > .embed-responsive > iframe[src=youtube] (video embed)
 */
export default function parse(element, { document }) {
  // Each slide is a .swiper-slide containing a .tec24-cv24-item
  const slides = element.querySelectorAll('.swiper-slide .tec24-cv24-item');

  const cells = [];

  slides.forEach((item) => {
    // Extract heading from the slide
    const heading = item.querySelector('.tec24-cv24i-heading h2, .tec24-cv24i-heading h3, h2.tec24-h2-1');

    // Extract video iframe and convert to a link (standard EDS embed approach)
    const iframe = item.querySelector('.tec24-cv24i-video iframe, .embed-responsive iframe');

    // Column 1: Video link (stored in media_image slot)
    // For video embeds, create an anchor element pointing to the YouTube URL
    const mediaCell = document.createDocumentFragment();
    mediaCell.appendChild(document.createComment(' field:media_image '));
    if (iframe) {
      const videoSrc = iframe.getAttribute('src') || '';
      // Clean YouTube embed URL to standard watch URL
      const videoUrl = videoSrc.replace('/embed/', '/watch?v=').split('?si=')[0].split('&')[0];
      const videoTitle = iframe.getAttribute('title') || 'Video';
      const link = document.createElement('a');
      link.href = videoUrl.includes('/watch?v=') ? videoUrl : videoSrc;
      link.textContent = videoTitle;
      mediaCell.appendChild(link);
    }

    // Column 2: Rich text content (heading)
    const contentCell = document.createDocumentFragment();
    contentCell.appendChild(document.createComment(' field:content_text '));
    if (heading) {
      contentCell.appendChild(heading);
    }

    // Each slide is a row with [media, content]
    cells.push([mediaCell, contentCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'carousel-video', cells });
  element.replaceWith(block);
}
