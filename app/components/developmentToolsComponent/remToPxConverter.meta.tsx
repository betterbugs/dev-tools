import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'rem-to-px-converter',
  category: 'Category63',
  route: PATHS.REM_TO_PX_CONVERTER,
  ...{
    hero_section: {
      title: 'REM to PX Converter',
      description:
        'Paste CSS or any text containing rem values. We will replace values like 1rem or 1.25rem with pixel equivalents using the base font size.',
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
      about_title: 'What is a REM to PX Converter?',
      about_description: [
        {
          description:
            'The REM to PX Converter translates rem units back to pixels using a selected base font size. Useful when you need exact pixel values for exports or specs.',
        },
        {
          description:
            'Paste CSS with rem values (e.g., 1rem, 1.25rem) and choose the base size (default 16px) to calculate precise px equivalents.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'Using the REM to PX Converter',
      guide_description: 'Convert in a few steps:',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: 'Paste CSS/text:',
          step_description:
            'Paste content containing rem values into the input.',
        },
        {
          step_key: 'Step 2:',
          step_title: 'Set base size:',
          step_description: 'Choose the base font size (e.g., 16px).',
        },
        {
          step_key: 'Step 3:',
          step_title: 'Convert:',
          step_description: 'Click Convert to replace rem with px.',
        },
        {
          step_key: 'Step 4:',
          step_title: 'Copy/Clear:',
          step_description: 'Copy result or clear to start over.',
        },
      ],
    },
    development_tools_how_use: {
      how_use_title: 'How It’s Used',
      how_use_description: 'Common use cases:',
      point: [
        {
          title: 'Pixel-perfect specs',
          description:
            'Translate rem-based design tokens into px for exports and QA.',
        },
        {
          title: 'Legacy CSS interop',
          description:
            'Work with libraries or environments that require explicit pixel values.',
        },
        {
          title: 'Hand-off to design tools',
          description: 'Provide exact px values for Figma/Sketch when needed.',
        },
      ],
    },
    meta_data: {
      meta_title: 'REM to PX Converter – CSS Unit Converter',
      meta_description:
        'Convert rem to px using a base font size. Paste CSS and transform instantly for exact pixel values.',
      og_title: 'REM to PX – Free Online Converter',
      og_description:
        'Paste CSS with rem values and convert to px for precise layouts and QA.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
