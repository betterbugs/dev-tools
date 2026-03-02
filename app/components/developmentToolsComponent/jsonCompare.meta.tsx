import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'json-compare',
  category: 'Category103',
  route: PATHS.JSON_COMPARE,
  ...{
    hero_section: {
      title: 'JSON Compare',
      description:
        'Compare two JSON objects side by side. Highlight differences, missing keys, and value changes instantly.',
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
      about_title: 'What is the JSON Compare tool?',
      about_description: [
        {
          description:
            'The JSON Compare tool lets you diff two JSON objects side by side. It highlights added, removed, and changed keys so you can quickly understand what has changed between versions.',
        },
        {
          description:
            'It is ideal for comparing API responses, config files, or any structured JSON data when debugging issues or reviewing changes.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'How to use the JSON Compare tool',
      guide_description: 'Compare two JSON payloads in a few steps:',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: 'Paste left JSON:',
          step_description:
            'Add the original or baseline JSON to the left input.',
        },
        {
          step_key: 'Step 2:',
          step_title: 'Paste right JSON:',
          step_description: 'Add the new or modified JSON to the right input.',
        },
        {
          step_key: 'Step 3:',
          step_title: 'Run comparison:',
          step_description:
            'Click the compare button to highlight differences between the two JSON objects.',
        },
        {
          step_key: 'Step 4:',
          step_title: 'Review and copy:',
          step_description:
            'Inspect added, removed, and changed fields, then copy results or JSON as needed.',
        },
      ],
    },
    development_tools_how_use: {
      how_use_title: 'How It’s Used',
      how_use_description: 'Common use cases:',
      point: [
        {
          title: 'API response diffing',
          description:
            'Compare API responses between environments or versions to spot breaking changes.',
        },
        {
          title: 'Config & schema changes',
          description:
            'See exactly what changed between two JSON config files or schema definitions.',
        },
        {
          title: 'Debugging & regression checks',
          description:
            'Quickly identify unexpected JSON differences that may cause bugs in production.',
        },
      ],
    },
    meta_data: {
      meta_title: 'JSON Compare – Diff JSON Online',
      meta_description:
        'Compare two JSON objects side by side. Highlight differences, missing keys, and value changes for APIs and config files.',
      og_title: 'JSON Compare – Online JSON Diff Tool',
      og_description:
        'Diff two JSON payloads instantly. Visualize added, removed, and changed keys for faster debugging.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
