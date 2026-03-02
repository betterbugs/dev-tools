import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'url-decode',
  category: 'Category105',
  route: PATHS.URL_DECODE,
  ...{
    hero_section: {
      title: 'URL Decode',
      description:
        'Decode percent‑encoded URLs into readable text. Turn encoded query strings, paths, and parameters back into their original form.',
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
      about_title: 'What is the URL Decode tool?',
      about_description: [
        {
          description:
            'The URL Decode tool converts percent‑encoded strings (like %20, %3A, %2F) back into human‑readable text. It is useful when inspecting encoded URLs, query parameters, or callback data.',
        },
        {
          description:
            'It helps developers debug redirects, webhooks, and integrations where URL‑encoded data is passed between systems.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'How to use the URL Decode tool',
      guide_description: 'Decode URL‑encoded text in a few steps:',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: 'Paste encoded text:',
          step_description:
            'Add the URL‑encoded string (full URL or part of it) into the input area.',
        },
        {
          step_key: 'Step 2:',
          step_title: 'Decode the value:',
          step_description:
            'Click the decode button to convert all percent‑encoded sequences to plain text.',
        },
        {
          step_key: 'Step 3:',
          step_title: 'Review result:',
          step_description:
            'Check the decoded output for readable paths, parameters, or payloads.',
        },
        {
          step_key: 'Step 4:',
          step_title: 'Copy or reuse:',
          step_description:
            'Copy the decoded text or use it in logs, documentation, or debugging tools.',
        },
      ],
    },
    development_tools_how_use: {
      how_use_title: 'How It’s Used',
      how_use_description: 'Common use cases:',
      point: [
        {
          title: 'Debugging callbacks & webhooks',
          description:
            'Decode URL‑encoded payloads sent by third‑party APIs or webhooks.',
        },
        {
          title: 'Analyzing query strings',
          description:
            'Turn encoded query parameters into readable key‑value pairs for troubleshooting.',
        },
        {
          title: 'Inspecting redirect URLs',
          description:
            'Decode long redirect URLs to understand where they lead and what data they include.',
        },
      ],
    },
    meta_data: {
      meta_title: 'URL Decode – Decode URL‑Encoded Text Online',
      meta_description:
        'Decode percent‑encoded URLs and query strings into readable text. Useful for debugging redirects, webhooks, and query parameters.',
      og_title: 'URL Decode – Online Decoder Tool',
      og_description:
        'Convert URL‑encoded strings back to plain text. Quickly inspect encoded paths, parameters, and payloads.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
