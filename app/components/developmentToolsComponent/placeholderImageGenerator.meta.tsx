import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'placeholder-image-generator',
  category: 'Category64',
  route: PATHS.PLACEHOLDER_IMAGE_GENERATOR,
  ...{
    hero_section: {
      title: 'Placeholder Image Generator',
      description:
        'Create placeholder images by size with background, text color, and format options.',
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
      about_title: 'What is a Placeholder Image Generator?',
      about_description: [
        {
          description:
            'Generates on‑the‑fly images for mockups with custom dimensions and colors.',
        },
        {
          description:
            'Supports formats like PNG/JPEG and optional overlay text.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'Using the Placeholder Image Generator',
      guide_description: 'Create images in a few steps:',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: 'Set size:',
          step_description: 'Enter width and height.',
        },
        {
          step_key: 'Step 2:',
          step_title: 'Customize:',
          step_description:
            'Pick background/text colors, format, and overlay text.',
        },
        {
          step_key: 'Step 3:',
          step_title: 'Generate:',
          step_description: 'Download or copy the image URL.',
        },
      ],
    },
    development_tools_how_use: {
      how_use_title: 'How It’s Used',
      how_use_description: 'Common use cases:',
      point: [
        {
          title: 'Wireframing',
          description: 'Drop quick images into layouts without assets.',
        },
        {
          title: 'Testing',
          description: 'Validate responsive behavior and lazy loading.',
        },
        {
          title: 'Demos',
          description:
            'Showcase components with consistent placeholder visuals.',
        },
      ],
    },
    meta_data: {
      meta_title: 'Placeholder Image Generator – Create Mock Images',
      meta_description:
        'Generate placeholder images by size with colors, text, and formats for UI work.',
      og_title: 'Placeholder Image Generator – BetterBugs Tools',
      og_description: 'Create and download placeholder images instantly.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
