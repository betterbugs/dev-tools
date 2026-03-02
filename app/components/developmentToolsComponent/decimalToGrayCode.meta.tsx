import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'decimal-to-grey-code',
  category: 'Category80',
  route: PATHS.DECIMAL_TO_GREY_CODE,
  ...{
    hero_section: {
      title: 'Decimal to Grey Code',
      description:
        'Convert decimal integers to Gray code (binary reflected code). Supports optional bit-width padding.',
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
      about_title: 'What is the Decimal to Gray Code converter?',
      about_description: [
        {
          description:
            'This tool converts non-negative decimal numbers into Gray code. You can process multiple values and optionally pad the output to a fixed bit width.',
        },
        {
          description:
            'Gray code is widely used in digital systems to reduce errors between successive values. This converter generates the Gray-encoded bit string.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'Using the Decimal to Gray Code',
      guide_description: 'Convert in a few steps:',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: 'Enter decimals:',
          step_description:
            'Provide one or more non-negative integers (e.g., 3, 7, 10).',
        },
        {
          step_key: 'Step 2:',
          step_title: 'Set bit width (optional):',
          step_description: 'Pad the Gray output to a fixed length (e.g., 8).',
        },
        {
          step_key: 'Step 3:',
          step_title: 'Convert:',
          step_description: 'Click Convert to get Gray code outputs.',
        },
        {
          step_key: 'Step 4:',
          step_title: 'Copy/Clear:',
          step_description: 'Copy the result or clear to start again.',
        },
      ],
    },
    development_tools_how_use: {
      how_use_title: 'How It’s Used',
      how_use_description: 'Common use cases:',
      point: [
        {
          title: 'Hardware interfacing',
          description:
            'Generate Gray code sequences for testing encoders and sensors.',
        },
        {
          title: 'Digital design',
          description:
            'Produce Gray code for counters and state machines to limit bit flips.',
        },
        {
          title: 'Education & demos',
          description:
            'Show how decimal values translate to Gray code for learning.',
        },
      ],
    },
    meta_data: {
      meta_title: 'Decimal to Gray Code – Free Online Converter',
      meta_description:
        'Convert decimal integers to Gray code online. Optional bit-width padding and multi-value input supported.',
      og_title: 'Decimal to Gray Code – Online Converter',
      og_description:
        'Enter decimal numbers and get Gray code instantly. Great for electronics and CS learning.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
