import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'utf8-encode',
  category: 'Category122',
  route: PATHS.UTF8_ENCODE,
  ...{
    hero_section: {
      title: 'UTF8 Encode',
      description:
        'Encode plain text into UTF-8 format – perfect for web content, APIs, or safely storing non-ASCII characters.',
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
      about_title: 'What is the UTF8 Encode Tool?',
      about_description: [
        {
          description:
            'The UTF8 Encode tool converts plain text into UTF-8 encoded format, ensuring proper representation of special and non-ASCII characters.',
        },
        {
          description:
            'It’s useful for developers, content creators, and analysts working with web applications, APIs, or multilingual text.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'How to Use the UTF8 Encode Tool',
      guide_description: 'Follow these simple steps:',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: 'Enter plain text:',
          step_description:
            'Type or paste the text you want to encode into UTF-8 into the input box.',
        },
        {
          step_key: 'Step 2:',
          step_title: 'Encode text:',
          step_description:
            'Click the encode button to convert the plain text into UTF-8 format.',
        },
        {
          step_key: 'Step 3:',
          step_title: 'View results:',
          step_description:
            'The tool will display the UTF-8 encoded version of your text.',
        },
        {
          step_key: 'Step 4:',
          step_title: 'Copy or use:',
          step_description:
            'Copy the encoded text for use in web pages, APIs, or data storage.',
        },
      ],
    },
    development_tools_how_use: {
      how_use_title: 'Common Uses',
      how_use_description: 'Why you might use this tool:',
      point: [
        {
          title: 'Web content encoding',
          description:
            'Ensure special characters display correctly in websites, blogs, or apps.',
        },
        {
          title: 'API data handling',
          description:
            'Encode text for safe transmission in JSON, XML, or other API payloads.',
        },
        {
          title: 'Multilingual support',
          description:
            'Store and process text with non-English characters without corruption.',
        },
      ],
    },
    meta_data: {
      meta_title: 'UTF8 Encode – Convert Text to UTF-8 Online',
      meta_description:
        'Encode plain text into UTF-8 format online. Perfect for web content, APIs, and multilingual text handling.',
      og_title: 'UTF8 Encode – Free Online Tool',
      og_description:
        'Easily convert text into UTF-8 encoded format. Ideal for developers, content creators, and analysts.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
