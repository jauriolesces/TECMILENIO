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

  // tools/importer/import-homepage.js
  var import_homepage_exports = {};
  __export(import_homepage_exports, {
    default: () => import_homepage_default
  });

  // tools/importer/parsers/carousel-banner.js
  function parse(element, { document }) {
    const slides = element.querySelectorAll(".carousel-item");
    const cells = [];
    slides.forEach((slide) => {
      const img = slide.querySelector("img");
      const link = slide.querySelector("a[href]");
      const imageCell = document.createDocumentFragment();
      const imageComment = document.createComment(" field:media_image ");
      imageCell.appendChild(imageComment);
      if (img) {
        imageCell.appendChild(img);
      }
      const textCell = document.createDocumentFragment();
      const textComment = document.createComment(" field:content_text ");
      textCell.appendChild(textComment);
      if (link) {
        const cta = document.createElement("a");
        cta.href = link.href;
        const altText = img ? img.getAttribute("alt") : "";
        cta.textContent = altText || link.href;
        textCell.appendChild(cta);
      }
      cells.push([imageCell, textCell]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "carousel-banner", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-dates.js
  function parse2(element, { document }) {
    const periodItems = element.querySelectorAll(".item-period");
    const cells = [];
    periodItems.forEach((item) => {
      const titleEl = item.querySelector(".iperiod-title");
      const dateEl = item.querySelector(".iperiod-date");
      const imageCell = "";
      const textFrag = document.createDocumentFragment();
      textFrag.appendChild(document.createComment(" field:text "));
      if (titleEl) {
        const heading = document.createElement("h3");
        heading.textContent = titleEl.textContent.trim();
        textFrag.appendChild(heading);
      }
      if (dateEl) {
        const para = document.createElement("p");
        para.textContent = dateEl.textContent.trim();
        textFrag.appendChild(para);
      }
      cells.push([imageCell, textFrag]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-dates", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-info.js
  function parse3(element, { document }) {
    const cards = element.querySelectorAll(".tcard-2024");
    const cells = [];
    cards.forEach((card) => {
      const image = card.querySelector('img.tcard-2024-image, img[class*="tcard-2024-image"]');
      const heading = card.querySelector(".tcard-2024-title h2, h2.tec24-h2-1");
      const description = card.querySelector(".tcard-2024-info p, .tcard-2024-info .tec24-p-1");
      const ctaLinks = Array.from(card.querySelectorAll(".tcard-2024-btn a, .tcard-2024-btn .tec24-btn-1"));
      const imageContainer = document.createElement("div");
      if (image) {
        const imageHint = document.createComment(" field:image ");
        imageContainer.appendChild(imageHint);
        imageContainer.appendChild(image);
      }
      const textContainer = document.createElement("div");
      const textHint = document.createComment(" field:text ");
      textContainer.appendChild(textHint);
      if (heading) {
        textContainer.appendChild(heading);
      }
      if (description) {
        textContainer.appendChild(description);
      }
      if (ctaLinks.length > 0) {
        const p = document.createElement("p");
        ctaLinks.forEach((link, index) => {
          if (index > 0) {
            p.appendChild(document.createTextNode(" "));
          }
          p.appendChild(link);
        });
        textContainer.appendChild(p);
      }
      cells.push([imageContainer, textContainer]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-info", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/carousel-programs.js
  function parse4(element, { document }) {
    const slides = element.querySelectorAll(".swiper-slide .tec24-card-1");
    const cells = [];
    slides.forEach((card) => {
      const image = card.querySelector('img.tec24-card-1-image, img[class*="card-1-image"]');
      const heading = card.querySelector(".tec24-card-1-description h2, .tec24-card-1-description h3");
      const description = card.querySelector(".tec24-card-1-description p, .tec24-card-1-description .tec24-p-1");
      const cta = card.querySelector('.tec24-card-1-description a.tec24-btn-2, .tec24-card-1-description a[class*="btn"]');
      const imageCell = document.createDocumentFragment();
      imageCell.appendChild(document.createComment(" field:media_image "));
      if (image) {
        imageCell.appendChild(image);
      }
      const contentCell = document.createDocumentFragment();
      contentCell.appendChild(document.createComment(" field:content_text "));
      if (heading) contentCell.appendChild(heading);
      if (description) contentCell.appendChild(description);
      if (cta) contentCell.appendChild(cta);
      cells.push([imageCell, contentCell]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "carousel-programs", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-features.js
  function parse5(element, { document }) {
    const cards = element.querySelectorAll(".tec24-card-2");
    const cells = [];
    cards.forEach((card) => {
      const heading = card.querySelector(".tec24-card-2-body h2, .tec24-card-2-body .tec24-h2-1");
      const description = card.querySelector(".tec24-card-2-body .tec24-p-1, .tec24-card-2-body p");
      const cta = card.querySelector(".tec24-card-2-body a");
      const textCell = [];
      const textHint = document.createComment(" field:text ");
      textCell.push(textHint);
      if (heading) {
        textCell.push(heading);
      }
      if (description) {
        textCell.push(description);
      }
      if (cta) {
        textCell.push(cta);
      }
      cells.push([[], textCell]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-features", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/carousel-video.js
  function parse6(element, { document }) {
    const slides = element.querySelectorAll(".swiper-slide .tec24-cv24-item");
    const cells = [];
    slides.forEach((item) => {
      const heading = item.querySelector(".tec24-cv24i-heading h2, .tec24-cv24i-heading h3, h2.tec24-h2-1");
      const iframe = item.querySelector(".tec24-cv24i-video iframe, .embed-responsive iframe");
      const mediaCell = document.createDocumentFragment();
      mediaCell.appendChild(document.createComment(" field:media_image "));
      if (iframe) {
        const videoSrc = iframe.getAttribute("src") || "";
        const videoUrl = videoSrc.replace("/embed/", "/watch?v=").split("?si=")[0].split("&")[0];
        const videoTitle = iframe.getAttribute("title") || "Video";
        const link = document.createElement("a");
        link.href = videoUrl.includes("/watch?v=") ? videoUrl : videoSrc;
        link.textContent = videoTitle;
        mediaCell.appendChild(link);
      }
      const contentCell = document.createDocumentFragment();
      contentCell.appendChild(document.createComment(" field:content_text "));
      if (heading) {
        contentCell.appendChild(heading);
      }
      cells.push([mediaCell, contentCell]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "carousel-video", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-stats.js
  function parse7(element, { document }) {
    const cards = element.querySelectorAll(".tec24-card-3");
    const cells = [];
    cards.forEach((card) => {
      const iconSpan = card.querySelector('span.material-symbols-outlined, span[class*="material-symbols"]');
      const statText = card.querySelector("p.tec24-p-3, p");
      const imageCell = document.createDocumentFragment();
      const textCell = document.createDocumentFragment();
      textCell.appendChild(document.createComment(" field:text "));
      if (iconSpan) {
        const iconEl = document.createElement("p");
        iconEl.textContent = ":" + iconSpan.textContent.trim() + ":";
        textCell.appendChild(iconEl);
      }
      if (statText) {
        textCell.appendChild(statText.cloneNode(true));
      }
      cells.push([imageCell, textCell]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-stats", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/carousel-logos.js
  function parse8(element, { document }) {
    const slides = element.querySelectorAll(":scope .swiper-wrapper .swiper-slide, :scope .swiper-slide");
    const cells = [];
    slides.forEach((slide) => {
      const img = slide.querySelector(".tec24-card-5-img img, .tec24-card-5 img, img");
      const textEl = slide.querySelector(".tec24-card-5-body p, .tec24-card-5-body, p.tec24-p-4");
      const link = slide.querySelector("a");
      const mediaCell = document.createDocumentFragment();
      mediaCell.appendChild(document.createComment(" field:media_image "));
      if (img) {
        const imgClone = img.cloneNode(true);
        mediaCell.appendChild(imgClone);
      }
      const contentCell = document.createDocumentFragment();
      contentCell.appendChild(document.createComment(" field:content_text "));
      if (link && textEl) {
        const a = document.createElement("a");
        a.href = link.href;
        a.textContent = textEl.textContent.trim();
        contentCell.appendChild(a);
      } else if (textEl) {
        const p = document.createElement("p");
        p.textContent = textEl.textContent.trim();
        contentCell.appendChild(p);
      }
      cells.push([mediaCell, contentCell]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "carousel-logos", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-gallery.js
  function parse9(element, { document }) {
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
  function parse10(element, { document }) {
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

  // tools/importer/parsers/columns-blog.js
  function parse11(element, { document }) {
    const image = element.querySelector('img.tec24-card-4-img, img[class*="card-4-img"]');
    const description = element.querySelector(".tec24-card-4-body p, p.tec24-p-1");
    const ctaLink = element.querySelector(".tec24-card-4-cta a, a.tec24-btn-4");
    const col1 = [];
    if (image) {
      col1.push(image);
    }
    const col2 = [];
    if (description) col2.push(description);
    if (ctaLink) col2.push(ctaLink);
    const cells = [
      [col1, col2]
    ];
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-blog", cells });
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

  // tools/importer/import-homepage.js
  var parsers = {
    "carousel-banner": parse,
    "cards-dates": parse2,
    "cards-info": parse3,
    "carousel-programs": parse4,
    "cards-features": parse5,
    "carousel-video": parse6,
    "cards-stats": parse7,
    "carousel-logos": parse8,
    "columns-gallery": parse9,
    "columns-promo": parse10,
    "columns-blog": parse11
  };
  var transformers = [
    transform,
    transform2
  ];
  var PAGE_TEMPLATE = {
    name: "homepage",
    description: "Main homepage with hero, featured programs, stats, and CTAs",
    urls: ["https://tecmilenio.mx/es"],
    blocks: [
      {
        name: "carousel-banner",
        instances: ["section#hero-banner-2024"]
      },
      {
        name: "cards-dates",
        instances: ["section.hero-periods-2024"]
      },
      {
        name: "cards-info",
        instances: ["section.info-cards-2024:first-of-type"]
      },
      {
        name: "carousel-programs",
        instances: ["section.swiper-carrusel-2024 .swiper-container"]
      },
      {
        name: "cards-features",
        instances: ["section.features-2024 .features-2024-container"]
      },
      {
        name: "carousel-video",
        instances: ["section.swiper-carrusel-video-2024 .swiper-video-container"]
      },
      {
        name: "cards-stats",
        instances: ["section.quick-facts-2024 .container"]
      },
      {
        name: "carousel-logos",
        instances: ["section.swiper-carrusel-2024-2 .swiper-container-2"]
      },
      {
        name: "columns-gallery",
        instances: ["section.tec24-campus-container .tec24-campus-grid-container"]
      },
      {
        name: "columns-promo",
        instances: ["section.info-cards-2024:nth-of-type(2) .tcard-2024"]
      },
      {
        name: "columns-blog",
        instances: ["section.blog-2024 .tec24-card-4"]
      }
    ],
    sections: [
      {
        id: "hero-banner-2024",
        name: "Hero Banner",
        selector: "section#hero-banner-2024",
        style: null,
        blocks: ["carousel-banner"],
        defaultContent: []
      },
      {
        id: "hero-periods-2024",
        name: "Enrollment Periods",
        selector: "section.hero-periods-2024",
        style: "teal",
        blocks: ["cards-dates"],
        defaultContent: []
      },
      {
        id: "know-your-purpose",
        name: "Purpose Discovery",
        selector: "section.know-your-purpose",
        style: null,
        blocks: [],
        defaultContent: ["section.know-your-purpose h2.tec24-h2-1", "section.know-your-purpose p.tec24-p-1", "section.know-your-purpose a.btn-maps"]
      },
      {
        id: "info-cards-2024-first",
        name: "Info Cards",
        selector: "section.info-cards-2024:first-of-type",
        style: null,
        blocks: ["cards-info"],
        defaultContent: []
      },
      {
        id: "swiper-carrusel-2024",
        name: "Programs Carousel",
        selector: "section.swiper-carrusel-2024",
        style: null,
        blocks: ["carousel-programs"],
        defaultContent: ["section.swiper-carrusel-2024 .swiper-header h2", "section.swiper-carrusel-2024 .swiper-header p"]
      },
      {
        id: "features-2024",
        name: "Features Grid",
        selector: "section.features-2024",
        style: "grey",
        blocks: ["cards-features"],
        defaultContent: []
      },
      {
        id: "swiper-carrusel-video-2024",
        name: "Video Carousel",
        selector: "section.swiper-carrusel-video-2024",
        style: null,
        blocks: ["carousel-video"],
        defaultContent: []
      },
      {
        id: "quick-facts-2024",
        name: "Quick Facts",
        selector: "section.quick-facts-2024",
        style: "teal",
        blocks: ["cards-stats"],
        defaultContent: []
      },
      {
        id: "swiper-carrusel-2024-2",
        name: "Accreditations",
        selector: "section.swiper-carrusel-2024-2",
        style: null,
        blocks: ["carousel-logos"],
        defaultContent: []
      },
      {
        id: "tec24-campus-container",
        name: "Campus Gallery",
        selector: "section.tec24-campus-container",
        style: null,
        blocks: ["columns-gallery"],
        defaultContent: ["section.tec24-campus-container .tec24-h2-1", "section.tec24-campus-container .tec24-p-1"]
      },
      {
        id: "hero-info-2024",
        name: "Visit Campus CTA",
        selector: "section.hero-info-2024",
        style: "teal",
        blocks: [],
        defaultContent: ["section.hero-info-2024 .tec24-hero-info-heading", "section.hero-info-2024 .tec24-hero-info-body", "section.hero-info-2024 .tec24-hero-info-cta"]
      },
      {
        id: "info-cards-2024-second",
        name: "Anniversary Book",
        selector: "section.info-cards-2024:nth-of-type(2)",
        style: null,
        blocks: ["columns-promo"],
        defaultContent: []
      },
      {
        id: "blog-2024",
        name: "Blog Promo",
        selector: "section.blog-2024",
        style: "dark",
        blocks: ["columns-blog"],
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
  var import_homepage_default = {
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
  return __toCommonJS(import_homepage_exports);
})();
