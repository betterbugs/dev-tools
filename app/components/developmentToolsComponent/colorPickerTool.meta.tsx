import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'color-picker-tool',
  category: 'Category65',
  route: PATHS.COLOR_PICKER_TOOL,
  ...{
    hero_section: {
      title: 'Color Picker Tool',
      description:
        'Pick colors from a palette or enter HEX/RGB/HSL; copy codes and preview.',
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
      about_title: 'What is a Color Picker Tool?',
      about_description: [
        {
          description:
            'Interactive tool to select colors and convert between HEX, RGB, and HSL.',
        },
        {
          description:
            'Includes previews and contrast‑friendly display for quick decisions.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'Using the Color Picker Tool',
      guide_description: 'Pick and convert colors in a few steps:',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: 'Select or input:',
          step_description: 'Use the picker or enter HEX/RGB/HSL.',
        },
        {
          step_key: 'Step 2:',
          step_title: 'Review:',
          step_description: 'Check previews and copy desired format.',
        },
        {
          step_key: 'Step 3:',
          step_title: 'Use:',
          step_description: 'Paste codes into your CSS or design tool.',
        },
      ],
    },
    development_tools_how_use: {
      how_use_title: 'How It’s Used',
      how_use_description: 'Common use cases:',
      point: [
        {
          title: 'Design systems',
          description: 'Curate palettes and verify conversions.',
        },
        {
          title: 'Accessibility',
          description: 'Check contrast readability with color choices.',
        },
        {
          title: 'Development',
          description: 'Copy color codes directly into codebases.',
        },
      ],
    },
    meta_data: {
      meta_title: 'Color Picker – Convert HEX/RGB/HSL',
      meta_description:
        'Pick colors, convert formats, and copy codes with previews and contrast help.',
      og_title: 'Color Picker – BetterBugs Tools',
      og_description:
        'Select, preview, and copy colors for design and development.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
