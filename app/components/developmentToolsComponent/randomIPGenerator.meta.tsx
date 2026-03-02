import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'random-ip-generator',
  category: 'Category102',
  route: PATHS.RANDOM_IP_GENERATOR,
  ...{
    hero_section: {
      title: 'Random IP Generator',
      description:
        'Generate random IPv4 addresses instantly. Free online tool for testing, development, and networking.',
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
      about_title: 'What is the Random IP Generator?',
      about_description: [
        {
          description:
            'The Random IP Generator creates random IPv4 addresses for testing, development, and simulation.',
        },
        {
          description:
            'Useful for load testing, firewall rules, mock data, and networking demos—not for real traffic.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'Using the Random IP Generator',
      guide_description: 'Generate IPs in a few steps:',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: 'Set count:',
          step_description: 'Choose how many random IPs you need.',
        },
        {
          step_key: 'Step 2:',
          step_title: 'Generate:',
          step_description: 'Click Generate to create random IPv4 addresses.',
        },
        {
          step_key: 'Step 3:',
          step_title: 'Copy or download:',
          step_description: 'Copy the list or download as a file.',
        },
      ],
    },
    development_tools_how_use: {
      how_use_title: 'How It’s Used',
      how_use_description: 'Common use cases:',
      point: [
        {
          title: 'Testing',
          description:
            'Generate test IPs for firewall, geo, or rate-limit logic.',
        },
        {
          title: 'Mock data',
          description: 'Populate logs or dashboards with random IP addresses.',
        },
        {
          title: 'Development',
          description:
            'Simulate multiple clients or IP-based features without real traffic.',
        },
      ],
    },
    meta_data: {
      meta_title: 'Random IP Generator – Generate IPv4 Addresses Online',
      meta_description:
        'Generate random IPv4 addresses for testing and development. Free online tool.',
      og_title: 'Random IP Generator – Developer Utility',
      og_description: 'Create random IPs instantly for testing and mock data.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
