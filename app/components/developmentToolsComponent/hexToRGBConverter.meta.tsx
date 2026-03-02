import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'hex-to-rgb-converter',
  category: 'Category77',
  route: PATHS.HEX_TO_RGB_CONVERTER,
  ...{
    hero_section: {
      title: 'Hex to RGB Converter',
      description:
        'Convert HEX colors (#RGB, #RGBA, #RRGGBB, #RRGGBBAA) to RGB/RGBA instantly.',
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
      about_title: 'What is the Hex to RGB Converter?',
      about_description: [
        {
          description:
            'This tool converts HEX color values into RGB or RGBA. It supports short and long HEX formats, with or without alpha.',
        },
        {
          description:
            'Paste one or more HEX values and get readable CSS rgb()/rgba() output or raw numeric channels.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'Using the Hex to RGB Converter',
      guide_description: 'Convert in a few steps:',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: 'Paste HEX:',
          step_description:
            'Enter one or more HEX values (#FA0, #FFAA00, #FFAA00CC).',
        },
        {
          step_key: 'Step 2:',
          step_title: 'Choose output:',
          step_description: 'Toggle CSS rgb()/rgba() or raw numeric channels.',
        },
        {
          step_key: 'Step 3:',
          step_title: 'Convert:',
          step_description: 'Click Convert to generate RGB/RGBA values.',
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
          title: 'Design & theming',
          description:
            'Quickly translate style guide HEX colors into CSS rgb()/rgba() values.',
        },
        {
          title: 'Accessibility tweaks',
          description:
            'Adjust alpha and verify color channels for contrast testing.',
        },
        {
          title: 'Data migration',
          description:
            'Convert stored HEX to channel values for graphics or analytics.',
        },
      ],
    },
    meta_data: {
      meta_title: 'Hex to RGB Converter – Convert HEX to RGB/RGBA',
      meta_description:
        'Convert HEX colors (#RGB, #RGBA, #RRGGBB, #RRGGBBAA) to RGB/RGBA online. Copy-ready CSS output.',
      og_title: 'Hex to RGB – Free Online Color Converter',
      og_description:
        'Paste HEX values and get rgb()/rgba() or raw channels instantly. Supports alpha.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
