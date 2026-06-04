/* eslint-disable */
var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-program-listing.js
  var import_program_listing_exports = {};
  __export(import_program_listing_exports, {
    default: () => import_program_listing_default
  });

  // tools/importer/parsers/tabs-filter.js
  function parse(element, { document }) {
    const filterItems = element.querySelectorAll(".owl-item .eachFilter");
    const items = filterItems.length > 0 ? filterItems : element.querySelectorAll(".eachFilter");
    const cells = [];
    items.forEach((item) => {
      const labelSpan = item.querySelector("a span");
      const labelText = labelSpan ? labelSpan.textContent.trim() : "";
      if (!labelText) return;
      const titleCell = document.createDocumentFragment();
      titleCell.appendChild(document.createComment(" field:title "));
      const titleEl = document.createElement("p");
      titleEl.textContent = labelText;
      titleCell.appendChild(titleEl);
      const contentCell = document.createDocumentFragment();
      contentCell.appendChild(document.createComment(" field:content_heading "));
      const heading = document.createElement("h3");
      heading.textContent = labelText;
      contentCell.appendChild(heading);
      cells.push([titleCell, contentCell]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "tabs-filter", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-programs.js
  function parse2(element, { document }) {
    const careerCards = element.querySelectorAll(".b-half > a.eachCareer, a.eachCareer");
    const cells = [];
    careerCards.forEach((card) => {
      const iconImg = card.querySelector(".iconCareer img, .icon img");
      const titleEl = card.querySelector(".titleCareer h3, .titleCareer strong h3");
      const descriptionEl = card.querySelector(".contentBodyCareer p, .bodyCareer p");
      const modalityItems = card.querySelectorAll(".dataCareer li");
      let modalityText = "";
      modalityItems.forEach((li) => {
        const label = li.querySelector("strong");
        const value = li.querySelector("span p, span");
        if (label && value) {
          const labelText = label.textContent.trim();
          const valueText = value.textContent.trim();
          if (labelText && valueText) {
            modalityText = valueText;
          }
        }
      });
      const href = card.getAttribute("href") || "";
      const imageContainer = document.createElement("div");
      if (iconImg) {
        const imageHint = document.createComment(" field:image ");
        imageContainer.appendChild(imageHint);
        imageContainer.appendChild(iconImg);
      }
      const textContainer = document.createElement("div");
      const textHint = document.createComment(" field:text ");
      textContainer.appendChild(textHint);
      if (titleEl) {
        const h3 = document.createElement("h3");
        h3.textContent = titleEl.textContent.trim();
        textContainer.appendChild(h3);
      }
      if (descriptionEl) {
        const p = document.createElement("p");
        p.textContent = descriptionEl.textContent.trim();
        textContainer.appendChild(p);
      }
      if (modalityText) {
        const modalP = document.createElement("p");
        modalP.textContent = modalityText;
        textContainer.appendChild(modalP);
      }
      if (href) {
        const linkP = document.createElement("p");
        const link = document.createElement("a");
        link.setAttribute("href", href);
        link.textContent = titleEl ? titleEl.textContent.trim() : "Ver programa";
        linkP.appendChild(link);
        textContainer.appendChild(linkP);
      }
      cells.push([imageContainer, textContainer]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-programs", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-benefits.js
  function parse3(element, { document }) {
    const benefitsDesc = element.querySelector(".b-5of12 .benefitsDescription, .b-5of12");
    const heading = element.querySelector(".benefitsDescription h3, .benefitsDescription h2, .b-5of12 h3");
    const badgesList = element.querySelector(".benefitsDescription ul.badges, .b-5of12 ul.badges");
    const subtitleEl = element.querySelector(".benefitsDescription .subtitle, .b-5of12 .subtitle");
    const offerItems = element.querySelector(".benefitsDescription .eachOfferItem, .b-5of12 .eachOfferItem");
    const col1 = [];
    if (heading) col1.push(heading);
    if (badgesList) col1.push(badgesList);
    if (subtitleEl) col1.push(subtitleEl);
    if (offerItems) col1.push(offerItems);
    const mainImage = element.querySelector(".b-7of12 .imageFlexibility img, .b-7of12 .careerFlexibilityImage img, .b-7of12 img");
    const badgeBenefitsList = element.querySelector(".b-7of12 ul.badgeBenefitsList, .b-7of12 ul.badges");
    const col2 = [];
    if (mainImage) col2.push(mainImage);
    if (badgeBenefitsList) col2.push(badgeBenefitsList);
    const cells = [
      [col1, col2]
    ];
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-benefits", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-gallery.js
  function parse4(element, { document }) {
    const gridItems = Array.from(element.querySelectorAll(":scope > .tec24-campus-grid-item"));
    const img1 = element.querySelector(".tec24-campus-grid-item.s1 img");
    const img2 = element.querySelector(".tec24-campus-grid-item.s2 img");
    const img3 = element.querySelector(".tec24-campus-grid-item.s3 img");
    const img4 = element.querySelector(".tec24-campus-grid-item.s4 img");
    const img5 = element.querySelector(".tec24-campus-grid-item.s5 img");
    const cells = [];
    const row1 = [];
    row1.push(img1 || "");
    row1.push(img2 || "");
    cells.push(row1);
    const row2 = [];
    row2.push(img3 || "");
    row2.push(img4 || "");
    cells.push(row2);
    const row3 = [];
    row3.push(img5 || "");
    row3.push("");
    cells.push(row3);
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-gallery", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-promo.js
  function parse5(element, { document }) {
    const image = element.querySelector('img.tcard-2024-image, img[class*="tcard-2024-image"]');
    const heading = element.querySelector(".tcard-2024-title h2, h2.tec24-h2-1, h2");
    const description = element.querySelector(".tcard-2024-info p, p.tec24-p-1");
    const ctaLink = element.querySelector(".tcard-2024-btn a, a.tec24-btn-3");
    const col1 = [];
    if (image) {
      col1.push(image);
    }
    const col2 = [];
    if (heading) col2.push(heading);
    if (description) col2.push(description);
    if (ctaLink) col2.push(ctaLink);
    const cells = [
      [col1, col2]
    ];
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-promo", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-links.js
  function parse6(element, { document }) {
    const cardLinks = element.querySelectorAll("a.eachLinkSquare");
    const cells = [];
    cardLinks.forEach((card) => {
      const iconImg = card.querySelector(".headerlearnSquare span.icon img, .headerlearnSquare img");
      const descriptionEl = card.querySelector(".headerlearnSquare p");
      const ctaTextEl = card.querySelector(".bodylearnSquare span:not(.icon)");
      const imageContainer = document.createElement("div");
      if (iconImg) {
        const imageHint = document.createComment(" field:image ");
        imageContainer.appendChild(imageHint);
        imageContainer.appendChild(iconImg);
      }
      const textContainer = document.createElement("div");
      const textHint = document.createComment(" field:text ");
      textContainer.appendChild(textHint);
      if (descriptionEl) {
        textContainer.appendChild(descriptionEl);
      }
      const cardHref = card.getAttribute("href");
      if (cardHref && ctaTextEl) {
        const link = document.createElement("a");
        link.setAttribute("href", cardHref);
        link.textContent = ctaTextEl.textContent.trim();
        const p = document.createElement("p");
        p.appendChild(link);
        textContainer.appendChild(p);
      } else if (cardHref) {
        const link = document.createElement("a");
        link.setAttribute("href", cardHref);
        link.textContent = descriptionEl ? descriptionEl.textContent.trim() : cardHref;
        const p = document.createElement("p");
        p.appendChild(link);
        textContainer.appendChild(p);
      }
      cells.push([imageContainer, textContainer]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-links", cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/tecmilenio-cleanup.js
  var TransformHook = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform(hookName, element, payload) {
    if (hookName === TransformHook.beforeTransform) {
      WebImporter.DOMUtils.remove(element, [
        "#hs-web-interactives-top-push-anchor",
        "#hubspot-messages-iframe-container",
        "#hs-web-interactives-top-anchor",
        "#hs-web-interactives-bottom-anchor",
        "#hs-web-interactives-floating-container"
      ]);
      WebImporter.DOMUtils.remove(element, [".wrapper-hubspot"]);
      WebImporter.DOMUtils.remove(element, ["#block-videogeneral-2"]);
    }
    if (hookName === TransformHook.afterTransform) {
      WebImporter.DOMUtils.remove(element, ["a.visually-hidden.focusable"]);
      WebImporter.DOMUtils.remove(element, [".region.region-header"]);
      WebImporter.DOMUtils.remove(element, [".tecmilenio__navbar__region"]);
      WebImporter.DOMUtils.remove(element, ["#block-footersegundaversion"]);
      WebImporter.DOMUtils.remove(element, [".region-bottom-script"]);
      WebImporter.DOMUtils.remove(element, [
        '[id^="batBeacon"]',
        '[id^="rely-iframe"]',
        ".animatorTrigger"
      ]);
      WebImporter.DOMUtils.remove(element, [
        "article.node > header"
      ]);
      WebImporter.DOMUtils.remove(element, ["meta", "link", "noscript"]);
      const hiddenDivs = element.querySelectorAll(":scope .hidden");
      hiddenDivs.forEach((div) => {
        if (div.textContent.trim() === "") {
          div.remove();
        }
      });
    }
  }

  // tools/importer/transformers/tecmilenio-sections.js
  var TransformHook2 = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform2(hookName, element, payload) {
    if (hookName === TransformHook2.afterTransform) {
      const sections = payload && payload.template && payload.template.sections;
      if (!sections || sections.length < 2) return;
      const { document } = element.ownerDocument ? { document: element.ownerDocument } : { document };
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const selectorList = Array.isArray(section.selector) ? section.selector : [section.selector];
        let sectionEl = null;
        for (const sel of selectorList) {
          sectionEl = element.querySelector(sel);
          if (sectionEl) break;
        }
        if (!sectionEl) continue;
        if (section.style) {
          const sectionMetadata = WebImporter.Blocks.createBlock(document, {
            name: "Section Metadata",
            cells: { style: section.style }
          });
          sectionEl.append(sectionMetadata);
        }
        if (i > 0) {
          const hr = document.createElement("hr");
          sectionEl.before(hr);
        }
      }
    }
  }

  // tools/importer/import-program-listing.js
  var parsers = {
    "tabs-filter": parse,
    "cards-programs": parse2,
    "columns-benefits": parse3,
    "columns-gallery": parse4,
    "columns-promo": parse5,
    "cards-links": parse6
  };
  var transformers = [
    transform,
    transform2
  ];
  var PAGE_TEMPLATE = {
    name: "program-listing",
    description: "Program catalog listing page for master's degree programs",
    urls: ["https://tecmilenio.mx/es/maestrias"],
    blocks: [
      {
        name: "tabs-filter",
        instances: [".categoriesModule"]
      },
      {
        name: "cards-programs",
        instances: [".allCareers"]
      },
      {
        name: "columns-benefits",
        instances: [".ourMasters"]
      },
      {
        name: "columns-gallery",
        instances: [".modeloAprendizaje", ".metodoAprendizaje"]
      },
      {
        name: "columns-promo",
        instances: [".bienestarModelo", ".ecosistemaBienestar"]
      },
      {
        name: "cards-links",
        instances: [".semiBlueBg ~ .bodySection"]
      }
    ],
    sections: [
      {
        id: "banner-header",
        name: "Page Header",
        selector: ".bannerFaSection",
        style: "green-banner",
        blocks: [],
        defaultContent: [".bannerFaSection h1"]
      },
      {
        id: "program-catalog",
        name: "Program Catalog",
        selector: ".modeloCarrerasProfesionales",
        style: null,
        blocks: ["tabs-filter", "cards-programs"],
        defaultContent: [".superTitleB h2"]
      },
      {
        id: "rvoe-link",
        name: "RVOE Link",
        selector: ".enlace-rvoes",
        style: null,
        blocks: [],
        defaultContent: [".enlace-rvoes p"]
      },
      {
        id: "benefits",
        name: "Benefits",
        selector: ".ourMasters",
        style: null,
        blocks: ["columns-benefits"],
        defaultContent: []
      },
      {
        id: "methodology",
        name: "Methodology",
        selector: ".modeloAprendizaje",
        style: null,
        blocks: ["columns-gallery"],
        defaultContent: []
      },
      {
        id: "wellbeing",
        name: "Wellbeing Ecosystem",
        selector: ".bienestarModelo",
        style: null,
        blocks: ["columns-promo"],
        defaultContent: []
      },
      {
        id: "links-interest",
        name: "Links of Interest",
        selector: ".semiBlueBg",
        style: "accent-teal",
        blocks: ["cards-links"],
        defaultContent: []
      }
    ]
  };
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), {
      template: PAGE_TEMPLATE
    });
    transformers.forEach((transformerFn) => {
      try {
        transformerFn.call(null, hookName, element, enhancedPayload);
      } catch (e) {
        console.error(`Transformer failed at ${hookName}:`, e);
      }
    });
  }
  function findBlocksOnPage(document, template) {
    const pageBlocks = [];
    template.blocks.forEach((blockDef) => {
      blockDef.instances.forEach((selector) => {
        const elements = document.querySelectorAll(selector);
        if (elements.length === 0) {
          console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
        }
        elements.forEach((element) => {
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
  var import_program_listing_default = {
    transform: (payload) => {
      const { document, url, html, params } = payload;
      const main = document.body;
      executeTransformers("beforeTransform", main, payload);
      const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);
      pageBlocks.forEach((block) => {
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
      executeTransformers("afterTransform", main, payload);
      const hr = document.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document);
      WebImporter.rules.transformBackgroundImages(main, document);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const path = WebImporter.FileUtils.sanitizePath(
        new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html$/, "")
      );
      return [{
        element: main,
        path,
        report: {
          title: document.title,
          template: PAGE_TEMPLATE.name,
          blocks: pageBlocks.map((b) => b.name)
        }
      }];
    }
  };
  return __toCommonJS(import_program_listing_exports);
})();
