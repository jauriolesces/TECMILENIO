/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: Tecmilenio site-wide cleanup.
 * Removes non-authorable content (navigation, footer, widgets, tracking).
 * All selectors validated against captured DOM from tecmilenio.mx/es.
 */
const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.beforeTransform) {
    // HubSpot interactives push anchor (line 2 of captured DOM)
    WebImporter.DOMUtils.remove(element, [
      '#hs-web-interactives-top-push-anchor',
      '#hubspot-messages-iframe-container',
      '#hs-web-interactives-top-anchor',
      '#hs-web-interactives-bottom-anchor',
      '#hs-web-interactives-floating-container',
    ]);

    // HubSpot forms embedded in header nav (wrapper-hubspot d-none)
    WebImporter.DOMUtils.remove(element, ['.wrapper-hubspot']);

    // Video overlay modal (showVideo port) - blocks content interaction
    WebImporter.DOMUtils.remove(element, ['#block-videogeneral-2']);
  }

  if (hookName === TransformHook.afterTransform) {
    // Skip-to-content link (non-authorable accessibility shell element)
    WebImporter.DOMUtils.remove(element, ['a.visually-hidden.focusable']);

    // Site header region (tracking scripts block)
    WebImporter.DOMUtils.remove(element, ['.region.region-header']);

    // Navigation region (top nav, main nav, burger menu, logo)
    WebImporter.DOMUtils.remove(element, ['.tecmilenio__navbar__region']);

    // Footer block
    WebImporter.DOMUtils.remove(element, ['#block-footersegundaversion']);

    // Bottom scripts region (contact widget, WhatsApp chat)
    WebImporter.DOMUtils.remove(element, ['.region-bottom-script']);

    // Tracking pixels and third-party iframes
    WebImporter.DOMUtils.remove(element, [
      '[id^="batBeacon"]',
      '[id^="rely-iframe"]',
      '.animatorTrigger',
    ]);

    // Empty hidden div and article header with only rdf-meta
    WebImporter.DOMUtils.remove(element, [
      'article.node > header',
    ]);

    // Remove stray meta tags, iframes, link elements, noscript
    WebImporter.DOMUtils.remove(element, ['meta', 'link', 'noscript']);

    // Remove empty .hidden divs (non-authorable shell elements)
    const hiddenDivs = element.querySelectorAll(':scope .hidden');
    hiddenDivs.forEach((div) => {
      if (div.textContent.trim() === '') {
        div.remove();
      }
    });
  }
}
