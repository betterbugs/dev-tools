import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'grey-code-to-decimal',
  category: 'Category79',
  route: PATHS.GREY_CODE_TO_DECIMAL,
  ...{
    hero_section: {
      title: 'Grey Code to Decimal',
      description:
        'Convert Gray code (binary reflected code) strings into decimal integers accurately.',
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
      about_title: 'What is the Grey Code to Decimal converter?',
      about_description: [
        {
          description:
            'This tool converts Gray code (e.g., 1011, 0101) to its decimal representation. It supports multiple inputs separated by spaces, commas, or newlines and validates that inputs contain only 0 and 1.',
        },
        {
          description:
            'Gray code is used in encoders and digital systems to minimize bit transition errors. This converter helps decode Gray code values back to standard integers.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'Using the Grey Code to Decimal',
      guide_description: 'Convert in a few steps:',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: 'Paste Gray code:',
          step_description:
            'Enter one or more Gray code values (e.g., 101, 1111, 0101).',
        },
        {
          step_key: 'Step 2:',
          step_title: 'Toggle mapping:',
          step_description: "Enable mapping to see 'input → decimal' pairs.",
        },
        {
          step_key: 'Step 3:',
          step_title: 'Convert:',
          step_description: 'Click Convert to generate decimal values.',
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
          title: 'Rotary encoders & sensors',
          description:
            'Decode Gray code signals from hardware into readable integers.',
        },
        {
          title: 'Digital electronics',
          description:
            'Verify Gray code sequences and quickly convert to binary/decimal values.',
        },
        {
          title: 'Education & learning',
          description:
            'Understand how Gray code maps to decimal for assignments or tutorials.',
        },
      ],
    },
    meta_data: {
      meta_title: 'Gray Code to Decimal – Free Online Converter',
      meta_description:
        'Convert Gray code strings (e.g., 1011, 0101) to decimal numbers online. Validates input and supports multiple entries.',
      og_title: 'Gray Code to Decimal – Online Converter',
      og_description:
        'Paste Gray code values and get decimal outputs instantly. Great for electronics and education.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
