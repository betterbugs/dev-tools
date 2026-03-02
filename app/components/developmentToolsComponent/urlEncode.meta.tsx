import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'url-encode',
  category: 'Category106',
  route: PATHS.URL_ENCODE,
  ...{
    hero_section: {
      title: 'URL Encode',
      description:
        'Encode text for safe use in URLs. Convert spaces and special characters into percent‑encoded values.',
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
      about_title: 'What is the URL Encode tool?',
      about_description: [
        {
          description:
            'The URL Encode tool converts text into a URL‑safe format by replacing spaces and special characters with percent‑encoded sequences.',
        },
        {
          description:
            'Use it when building query strings, callback URLs, or any link where parameters must be safely transmitted over HTTP.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'How to use the URL Encode tool',
      guide_description: 'Encode text for URLs in a few steps:',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: 'Enter text to encode:',
          step_description:
            'Paste or type the text, query string, or parameter value you want to encode.',
        },
        {
          step_key: 'Step 2:',
          step_title: 'Run encoding:',
          step_description:
            'Click the encode button to convert unsafe characters into percent‑encoded values.',
        },
        {
          step_key: 'Step 3:',
          step_title: 'Review encoded output:',
          step_description:
            'Confirm the encoded string is ready to be used in URLs or API calls.',
        },
        {
          step_key: 'Step 4:',
          step_title: 'Copy and integrate:',
          step_description:
            'Copy the encoded text into your application code, configuration, or tooling.',
        },
      ],
    },
    development_tools_how_use: {
      how_use_title: 'How It’s Used',
      how_use_description: 'Common use cases:',
      point: [
        {
          title: 'Building query strings',
          description:
            'Encode parameter values to safely include them in URLs without breaking syntax.',
        },
        {
          title: 'Generating callback URLs',
          description:
            'Prepare redirect and callback URLs for OAuth, SSO, and third‑party integrations.',
        },
        {
          title: 'Encoding data for APIs',
          description:
            'Ensure text data is URL‑safe before sending it in API requests or webhooks.',
        },
      ],
    },
    meta_data: {
      meta_title: 'URL Encode – Encode Text for URLs Online',
      meta_description:
        'Encode text into URL‑safe format. Convert spaces and special characters into percent‑encoded sequences for query strings and redirects.',
      og_title: 'URL Encode – Online Encoder Tool',
      og_description:
        'Convert text to URL‑encoded form instantly. Safely build query strings, callback URLs, and API parameters.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
