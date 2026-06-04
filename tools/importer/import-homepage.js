/* eslint-disable */
/* global WebImporter */

// PARSER IMPORTS
import carouselBannerParser from './parsers/carousel-banner.js';
import cardsDatesParser from './parsers/cards-dates.js';
import cardsInfoParser from './parsers/cards-info.js';
import carouselProgramsParser from './parsers/carousel-programs.js';
import cardsFeaturesParser from './parsers/cards-features.js';
import carouselVideoParser from './parsers/carousel-video.js';
import cardsStatsParser from './parsers/cards-stats.js';
import carouselLogosParser from './parsers/carousel-logos.js';
import columnsGalleryParser from './parsers/columns-gallery.js';
import columnsPromoParser from './parsers/columns-promo.js';
import columnsBlogParser from './parsers/columns-blog.js';

// TRANSFORMER IMPORTS
import cleanupTransformer from './transformers/tecmilenio-cleanup.js';
import sectionsTransformer from './transformers/tecmilenio-sections.js';

// PARSER REGISTRY
const parsers = {
  'carousel-banner': carouselBannerParser,
  'cards-dates': cardsDatesParser,
  'cards-info': cardsInfoParser,
  'carousel-programs': carouselProgramsParser,
  'cards-features': cardsFeaturesParser,
  'carousel-video': carouselVideoParser,
  'cards-stats': cardsStatsParser,
  'carousel-logos': carouselLogosParser,
  'columns-gallery': columnsGalleryParser,
  'columns-promo': columnsPromoParser,
  'columns-blog': columnsBlogParser,
};

// TRANSFORMER REGISTRY
const transformers = [
  cleanupTransformer,
  sectionsTransformer,
];

// PAGE TEMPLATE CONFIGURATION
const PAGE_TEMPLATE = {
  name: 'homepage',
  description: 'Main homepage with hero, featured programs, stats, and CTAs',
  urls: ['https://tecmilenio.mx/es'],
  blocks: [
    {
      name: 'carousel-banner',
      instances: ['section#hero-banner-2024']
    },
    {
      name: 'cards-dates',
      instances: ['section.hero-periods-2024']
    },
    {
      name: 'cards-info',
      instances: ['section.info-cards-2024:first-of-type']
    },
    {
      name: 'carousel-programs',
      instances: ['section.swiper-carrusel-2024 .swiper-container']
    },
    {
      name: 'cards-features',
      instances: ['section.features-2024 .features-2024-container']
    },
    {
      name: 'carousel-video',
      instances: ['section.swiper-carrusel-video-2024 .swiper-video-container']
    },
    {
      name: 'cards-stats',
      instances: ['section.quick-facts-2024 .container']
    },
    {
      name: 'carousel-logos',
      instances: ['section.swiper-carrusel-2024-2 .swiper-container-2']
    },
    {
      name: 'columns-gallery',
      instances: ['section.tec24-campus-container .tec24-campus-grid-container']
    },
    {
      name: 'columns-promo',
      instances: ['section.info-cards-2024:nth-of-type(2) .tcard-2024']
    },
    {
      name: 'columns-blog',
      instances: ['section.blog-2024 .tec24-card-4']
    }
  ],
  sections: [
    {
      id: 'hero-banner-2024',
      name: 'Hero Banner',
      selector: 'section#hero-banner-2024',
      style: null,
      blocks: ['carousel-banner'],
      defaultContent: []
    },
    {
      id: 'hero-periods-2024',
      name: 'Enrollment Periods',
      selector: 'section.hero-periods-2024',
      style: 'teal',
      blocks: ['cards-dates'],
      defaultContent: []
    },
    {
      id: 'know-your-purpose',
      name: 'Purpose Discovery',
      selector: 'section.know-your-purpose',
      style: null,
      blocks: [],
      defaultContent: ['section.know-your-purpose h2.tec24-h2-1', 'section.know-your-purpose p.tec24-p-1', 'section.know-your-purpose a.btn-maps']
    },
    {
      id: 'info-cards-2024-first',
      name: 'Info Cards',
      selector: 'section.info-cards-2024:first-of-type',
      style: null,
      blocks: ['cards-info'],
      defaultContent: []
    },
    {
      id: 'swiper-carrusel-2024',
      name: 'Programs Carousel',
      selector: 'section.swiper-carrusel-2024',
      style: null,
      blocks: ['carousel-programs'],
      defaultContent: ['section.swiper-carrusel-2024 .swiper-header h2', 'section.swiper-carrusel-2024 .swiper-header p']
    },
    {
      id: 'features-2024',
      name: 'Features Grid',
      selector: 'section.features-2024',
      style: 'grey',
      blocks: ['cards-features'],
      defaultContent: []
    },
    {
      id: 'swiper-carrusel-video-2024',
      name: 'Video Carousel',
      selector: 'section.swiper-carrusel-video-2024',
      style: null,
      blocks: ['carousel-video'],
      defaultContent: []
    },
    {
      id: 'quick-facts-2024',
      name: 'Quick Facts',
      selector: 'section.quick-facts-2024',
      style: 'teal',
      blocks: ['cards-stats'],
      defaultContent: []
    },
    {
      id: 'swiper-carrusel-2024-2',
      name: 'Accreditations',
      selector: 'section.swiper-carrusel-2024-2',
      style: null,
      blocks: ['carousel-logos'],
      defaultContent: []
    },
    {
      id: 'tec24-campus-container',
      name: 'Campus Gallery',
      selector: 'section.tec24-campus-container',
      style: null,
      blocks: ['columns-gallery'],
      defaultContent: ['section.tec24-campus-container .tec24-h2-1', 'section.tec24-campus-container .tec24-p-1']
    },
    {
      id: 'hero-info-2024',
      name: 'Visit Campus CTA',
      selector: 'section.hero-info-2024',
      style: 'teal',
      blocks: [],
      defaultContent: ['section.hero-info-2024 .tec24-hero-info-heading', 'section.hero-info-2024 .tec24-hero-info-body', 'section.hero-info-2024 .tec24-hero-info-cta']
    },
    {
      id: 'info-cards-2024-second',
      name: 'Anniversary Book',
      selector: 'section.info-cards-2024:nth-of-type(2)',
      style: null,
      blocks: ['columns-promo'],
      defaultContent: []
    },
    {
      id: 'blog-2024',
      name: 'Blog Promo',
      selector: 'section.blog-2024',
      style: 'dark',
      blocks: ['columns-blog'],
      defaultContent: []
    }
  ]
};

/**
 * Execute all page transformers for a specific hook
 */
function executeTransformers(hookName, element, payload) {
  const enhancedPayload = {
    ...payload,
    template: PAGE_TEMPLATE
  };

  transformers.forEach((transformerFn) => {
    try {
      transformerFn.call(null, hookName, element, enhancedPayload);
    } catch (e) {
      console.error(`Transformer failed at ${hookName}:`, e);
    }
  });
}

/**
 * Find all blocks on the page based on the embedded template configuration
 */
function findBlocksOnPage(document, template) {
  const pageBlocks = [];

  template.blocks.forEach(blockDef => {
    blockDef.instances.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      if (elements.length === 0) {
        console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
      }
      elements.forEach(element => {
        pageBlocks.push({
          name: blockDef.name,
          selector,
          element,
          section: blockDef.section || null
        });
      });
    });
  });

  console.log(`Found ${pageBlocks.length} block instances on page`);
  return pageBlocks;
}

export default {
  transform: (payload) => {
    const { document, url, html, params } = payload;

    const main = document.body;

    // 1. Execute beforeTransform transformers (initial cleanup)
    executeTransformers('beforeTransform', main, payload);

    // 2. Find blocks on page using embedded template
    const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);

    // 3. Parse each block using registered parsers
    pageBlocks.forEach(block => {
      const parser = parsers[block.name];
      if (parser) {
        try {
          parser(block.element, { document, url, params });
        } catch (e) {
          console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
        }
      } else {
        console.warn(`No parser found for block: ${block.name}`);
      }
    });

    // 4. Execute afterTransform transformers (final cleanup + section breaks)
    executeTransformers('afterTransform', main, payload);

    // 5. Apply WebImporter built-in rules
    const hr = document.createElement('hr');
    main.appendChild(hr);
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    // 6. Generate sanitized path
    const path = WebImporter.FileUtils.sanitizePath(
      new URL(params.originalURL).pathname.replace(/\/$/, '').replace(/\.html$/, '')
    );

    return [{
      element: main,
      path,
      report: {
        title: document.title,
        template: PAGE_TEMPLATE.name,
        blocks: pageBlocks.map(b => b.name),
      }
    }];
  }
};
