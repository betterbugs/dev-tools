import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'random-xml-generator',
  category: 'Category68',
  route: PATHS.RANDOM_XML_GENERATOR,
  ...{
    hero_section: {
      title: 'Random XML Generator',
      description:
        'Generate random XML with configurable elements, attributes, depth, and count.',
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
      about_title: 'What is a Random XML Generator?',
      about_description: [
        {
          description:
            'Creates XML documents with nested elements and attributes based on simple settings.',
        },
        {
          description:
            'Ideal for XML parser tests, XPath exercises, and integration mocks.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'Using the Random XML Generator',
      guide_description: 'Generate XML in a few steps:',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: 'Configure:',
          step_description:
            'Set element/attribute counts, depth, and text length.',
        },
        {
          step_key: 'Step 2:',
          step_title: 'Generate:',
          step_description: 'Click Generate to produce XML.',
        },
        {
          step_key: 'Step 3:',
          step_title: 'Export:',
          step_description: 'Copy or download the XML file.',
        },
      ],
    },
    development_tools_how_use: {
      how_use_title: 'How It’s Used',
      how_use_description: 'Common use cases:',
      point: [
        {
          title: 'Parser testing',
          description: 'Stress‑test XML parsers with varied structure.',
        },
        {
          title: 'XPath/XQuery',
          description: 'Practice queries on generated documents.',
        },
        {
          title: 'Integration mocks',
          description: 'Simulate XML payloads in pipelines.',
        },
      ],
    },
    meta_data: {
      meta_title: 'Random XML Generator – Create XML Documents',
      meta_description:
        'Generate sample XML with configurable structure for testing and demos.',
      og_title: 'Random XML Generator – BetterBugs Tools',
      og_description:
        'Produce XML with elements and attributes, then copy or download.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
