/* eslint-disable */
/* global WebImporter */

// PARSER IMPORTS
import tabsFilterParser from './parsers/tabs-filter.js';
import cardsProgramsParser from './parsers/cards-programs.js';
import columnsBenefitsParser from './parsers/columns-benefits.js';
import columnsGalleryParser from './parsers/columns-gallery.js';
import columnsPromoParser from './parsers/columns-promo.js';
import cardsLinksParser from './parsers/cards-links.js';

// TRANSFORMER IMPORTS
import cleanupTransformer from './transformers/tecmilenio-cleanup.js';
import sectionsTransformer from './transformers/tecmilenio-sections.js';

// PARSER REGISTRY
const parsers = {
  'tabs-filter': tabsFilterParser,
  'cards-programs': cardsProgramsParser,
  'columns-benefits': columnsBenefitsParser,
  'columns-gallery': columnsGalleryParser,
  'columns-promo': columnsPromoParser,
  'cards-links': cardsLinksParser,
};

// TRANSFORMER REGISTRY
const transformers = [
  cleanupTransformer,
  sectionsTransformer,
];

// PAGE TEMPLATE CONFIGURATION
const PAGE_TEMPLATE = {
  name: 'program-listing',
  description: 'Program catalog listing page for master\'s degree programs',
  urls: ['https://tecmilenio.mx/es/maestrias'],
  blocks: [
    {
      name: 'tabs-filter',
      instances: ['.categoriesModule']
    },
    {
      name: 'cards-programs',
      instances: ['.allCareers']
    },
    {
      name: 'columns-benefits',
      instances: ['.ourMasters']
    },
    {
      name: 'columns-gallery',
      instances: ['.modeloAprendizaje', '.metodoAprendizaje']
    },
    {
      name: 'columns-promo',
      instances: ['.bienestarModelo', '.ecosistemaBienestar']
    },
    {
      name: 'cards-links',
      instances: ['.semiBlueBg ~ .bodySection']
    }
  ],
  sections: [
    {
      id: 'banner-header',
      name: 'Page Header',
      selector: '.bannerFaSection',
      style: 'green-banner',
      blocks: [],
      defaultContent: ['.bannerFaSection h1']
    },
    {
      id: 'program-catalog',
      name: 'Program Catalog',
      selector: '.modeloCarrerasProfesionales',
      style: null,
      blocks: ['tabs-filter', 'cards-programs'],
      defaultContent: ['.superTitleB h2']
    },
    {
      id: 'rvoe-link',
      name: 'RVOE Link',
      selector: '.enlace-rvoes',
      style: null,
      blocks: [],
      defaultContent: ['.enlace-rvoes p']
    },
    {
      id: 'benefits',
      name: 'Benefits',
      selector: '.ourMasters',
      style: null,
      blocks: ['columns-benefits'],
      defaultContent: []
    },
    {
      id: 'methodology',
      name: 'Methodology',
      selector: '.modeloAprendizaje',
      style: null,
      blocks: ['columns-gallery'],
      defaultContent: []
    },
    {
      id: 'wellbeing',
      name: 'Wellbeing Ecosystem',
      selector: '.bienestarModelo',
      style: null,
      blocks: ['columns-promo'],
      defaultContent: []
    },
    {
      id: 'links-interest',
      name: 'Links of Interest',
      selector: '.semiBlueBg',
      style: 'accent-teal',
      blocks: ['cards-links'],
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
