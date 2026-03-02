import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'api-key-generator',
  category: 'Category143',
  route: PATHS.API_KEY_GENERATOR,
  ...{
    hero_section: {
      title: 'API Key Generator',
      description:
        'Generate secure, random API keys instantly – perfect for developers, authentication systems, and secure integrations.',
    },
    development_tools_list: [
      { tool: 'Character Count Tool', url: PATHS.CHARACTER_COUNT_TOOL },
      { tool: 'Text Repeater', url: PATHS.TEXT_REPEATER },
      { tool: 'Text Cleaner', url: PATHS.TEXT_COMPARE },
      { tool: 'Word Counter', url: PATHS.WORD_COUNT_TOOL },
      { tool: 'Sort Words', url: PATHS.SORT_WORD },
      { tool: 'JavaScript Minifier', url: PATHS.JAVASCRIPT_MINIFIER },
      { tool: 'Line Count Tool', url: PATHS.LINE_COUNTER_TOOL },
    ],
    development_tools_about_details: {
      about_title: 'What is the API Key Generator?',
      about_description: [
        {
          description:
            'The API Key Generator creates unique, random, and secure API keys for developers and applications.',
        },
        {
          description:
            'It’s useful for authentication, securing APIs, and controlling access to applications or services.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'How to Use the API Key Generator',
      guide_description: 'Follow these simple steps:',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: 'Set preferences:',
          step_description:
            'Choose the length and character set (letters, numbers, symbols) for your API key.',
        },
        {
          step_key: 'Step 2:',
          step_title: 'Generate key:',
          step_description:
            'Click the generate button to instantly create a secure API key.',
        },
        {
          step_key: 'Step 3:',
          step_title: 'Copy or save:',
          step_description:
            'Copy the generated key to your clipboard or save it for later use.',
        },
        {
          step_key: 'Step 4:',
          step_title: 'Use in applications:',
          step_description:
            'Integrate the API key into your software, authentication, or API service.',
        },
      ],
    },
    development_tools_how_use: {
      how_use_title: 'Common Uses',
      how_use_description: 'Why you might use this tool:',
      point: [
        {
          title: 'Authentication',
          description:
            'Generate keys to authenticate and authorize users or applications.',
        },
        {
          title: 'API Security',
          description:
            'Protect APIs with unique keys to prevent unauthorized access.',
        },
        {
          title: 'Development & Testing',
          description:
            'Quickly generate dummy API keys for testing integrations and environments.',
        },
      ],
    },
    meta_data: {
      meta_title: 'API Key Generator – Create Secure API Keys Online',
      meta_description:
        'Generate random and secure API keys instantly. Free online API key generator for developers, authentication, and secure integrations.',
      og_title: 'API Key Generator – Free Online Tool',
      og_description:
        'Easily create secure, random API keys for authentication, APIs, and software integrations.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
