import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'px-to-rem-converter',
  category: 'Category62',
  route: PATHS.PX_TO_REM_CONVERTER,
  ...{
    hero_section: {
      title: 'PX to REM Converter',
      description:
        'Paste CSS or any text containing px values. We will replace values like 16px or 12.5px with rem equivalents using the base font size.',
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
      about_title: 'What is a PX to REM Converter?',
      about_description: [
        {
          description:
            'The PX to REM Converter helps you convert pixel values (px) into rem units based on a base font size. This supports responsive and accessible design across devices.',
        },
        {
          description:
            'Paste CSS or text with pixel values (e.g., 16px, 12.5px), choose a base size (default 16px), and instantly transform them to rem while preserving decimals.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'Using the PX to REM Converter',
      guide_description: 'Convert in a few steps:',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: 'Paste CSS/text:',
          step_description:
            'Paste content containing px values into the input.',
        },
        {
          step_key: 'Step 2:',
          step_title: 'Set base size:',
          step_description: 'Choose the base font size (e.g., 16px).',
        },
        {
          step_key: 'Step 3:',
          step_title: 'Convert:',
          step_description: 'Click Convert to replace px with rem.',
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
          title: 'Responsive design',
          description:
            'Scale UI with root font size changes for better accessibility.',
        },
        {
          title: 'Design system migration',
          description:
            'Convert legacy px-based CSS to rem for consistency across components.',
        },
        {
          title: 'Cross‑device consistency',
          description:
            'Ensure type and spacing adapt nicely on different screen sizes.',
        },
      ],
    },
    meta_data: {
      meta_title: 'PX to REM Converter – CSS Unit Converter',
      meta_description:
        'Convert px to rem using a base font size. Paste CSS and transform instantly for responsive design.',
      og_title: 'PX to REM – Free Online Converter',
      og_description:
        'Paste CSS with pixel values and convert to rem for accessible, scalable layouts.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
