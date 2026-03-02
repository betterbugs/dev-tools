import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'xml-minify',
  category: 'Category74',
  route: PATHS.XML_MINIFY,
  ...{
    hero_section: {
      title: 'XML Minify',
      description:
        'Paste XML and get a compact, production‑ready version. Remove comments and unnecessary whitespace.',
    },
    development_tools_list: [
      { tool: 'Markdown To HTML', url: PATHS.MARKDOWN_TO_HTML },
      { tool: 'Text Lower Case', url: PATHS.TEXT_LOWERCASE_CONVERTER },
      { tool: 'Credit Card Generator', url: PATHS.CREDIT_CARD_GENERATOR },
      { tool: 'JavaScript Minifier', url: PATHS.JAVASCRIPT_MINIFIER },
      { tool: 'Line Count Tool', url: PATHS.LINE_COUNTER_TOOL },
      { tool: 'JS Obfuscator', url: PATHS.JS_OBFUSCATOR },
    ],
    development_tools_about_details: {
      about_title: 'What is the XML Minifier?',
      about_description: [
        {
          description:
            'The XML Minifier removes unnecessary characters—such as line breaks, extra spaces, and comments—without changing the data. The output is smaller and ideal for production or transport.',
        },
        {
          description:
            'Use options to strip comments, collapse whitespace between tags, and normalize text nodes, ensuring predictable compact XML.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'Using the XML Minifier',
      guide_description: 'To minify your XML:',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: 'Paste XML:',
          step_description: 'Paste your XML into the input area.',
        },
        {
          step_key: 'Step 2:',
          step_title: 'Choose Options:',
          step_description:
            '(Optional) Enable Remove comments, Collapse between tags, and Normalize text nodes.',
        },
        {
          step_key: 'Step 3:',
          step_title: 'Minify:',
          step_description: 'Click the Minify button to generate compact XML.',
        },
        {
          step_key: 'Step 4:',
          step_title: 'Copy or Clear:',
          step_description:
            'Copy the result to the clipboard or clear inputs to start over.',
        },
      ],
    },
    development_tools_how_use: {
      how_use_title: 'How It’s Used',
      how_use_description: 'Common use cases:',
      point: [
        {
          title: 'Optimize payloads',
          description:
            'Shrink XML for APIs, mobile apps, and client‑side storage to reduce bandwidth and improve load times.',
        },
        {
          title: 'Prepare for production',
          description:
            'Ship compact configuration and sitemap files without readability overhead.',
        },
        {
          title: 'Clean diffs',
          description:
            'Normalize whitespace to reduce noisy changes before committing to version control.',
        },
        {
          title: 'Embed as strings',
          description:
            'Minified XML is easier to embed in attributes, data URIs, and code strings.',
        },
      ],
    },
    meta_data: {
      meta_title: 'XML Minify – Minify XML Online | Developer Utility Tools',
      meta_description:
        'Minify XML online: remove comments and whitespace, collapse tags, and normalize text nodes for compact, production‑ready XML.',
      og_title: 'XML Minify – Free Online XML Minifier',
      og_description:
        'Paste XML and get a compact result. Options to remove comments, collapse whitespace, and normalize text nodes.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
