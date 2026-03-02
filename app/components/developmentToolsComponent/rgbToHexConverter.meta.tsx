import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'rgb-to-hex-converter',
  category: 'Category78',
  route: PATHS.RGB_TO_HEX_CONVERTER,
  ...{
    hero_section: {
      title: 'RGB to Hex Converter',
      description: 'Convert RGB/RGBA color values to HEX format instantly.',
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
      about_title: 'What is the RGB to Hex Converter?',
      about_description: [
        {
          description:
            'This tool converts RGB or RGBA color values into HEX format. It supports integer channels (0–255) and optional alpha.',
        },
        {
          description:
            'Paste rgb(R,G,B) or rgba(R,G,B,A) values and get #RRGGBB or #RRGGBBAA output.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'Using the RGB to Hex Converter',
      guide_description: 'Convert in a few steps:',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: 'Enter RGB/RGBA:',
          step_description:
            'Enter RGB values (e.g., 255, 0, 128) or rgb(255,0,128) / rgba(255,0,128,0.5).',
        },
        {
          step_key: 'Step 2:',
          step_title: 'Convert:',
          step_description: 'Click Convert to generate HEX values.',
        },
        {
          step_key: 'Step 3:',
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
            'Turn RGB values from design tools into HEX for CSS and code.',
        },
        {
          title: 'Accessibility tweaks',
          description:
            'Convert RGB to HEX for contrast checks and theme variables.',
        },
        {
          title: 'Data migration',
          description:
            'Convert stored RGB channel values to HEX for APIs or configs.',
        },
      ],
    },
    meta_data: {
      meta_title: 'RGB to Hex Converter – Convert RGB to HEX Online',
      meta_description:
        'Convert RGB/RGBA color values to HEX format online. Copy-ready HEX output.',
      og_title: 'RGB to Hex – Free Online Color Converter',
      og_description: 'Paste RGB or rgba() values and get HEX instantly.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
