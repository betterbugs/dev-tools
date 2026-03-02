import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'rotate-image-tool',
  category: 'Category66',
  route: PATHS.ROTATE_IMAGE_TOOL,
  ...{
    hero_section: {
      title: 'Rotate Image Tool',
      description:
        'Rotate images by 90°/180°/270° or a custom angle; supports flip and download.',
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
      about_title: 'What is a Rotate Image Tool?',
      about_description: [
        {
          description:
            'Changes image orientation by fixed or custom degrees in the browser.',
        },
        {
          description:
            'Offers optional horizontal/vertical flips and preserves image quality.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'Using the Rotate Image Tool',
      guide_description: 'Rotate an image in a few steps:',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: 'Upload:',
          step_description: 'Choose an image (PNG/JPG).',
        },
        {
          step_key: 'Step 2:',
          step_title: 'Adjust:',
          step_description:
            'Pick a preset or enter a custom angle; apply flip if needed.',
        },
        {
          step_key: 'Step 3:',
          step_title: 'Export:',
          step_description: 'Download the rotated image.',
        },
      ],
    },
    development_tools_how_use: {
      how_use_title: 'How It’s Used',
      how_use_description: 'Common use cases:',
      point: [
        {
          title: 'Correct orientation',
          description: 'Fix sideways photos from EXIF orientation issues.',
        },
        {
          title: 'Design workflows',
          description: 'Adjust assets without opening heavy editors.',
        },
        {
          title: 'Batch prep',
          description: 'Quickly rotate screenshots for documentation.',
        },
      ],
    },
    meta_data: {
      meta_title: 'Rotate Image Online – Rotate/Flip Pictures',
      meta_description:
        'Rotate images by fixed or custom angles and export instantly.',
      og_title: 'Rotate Image Tool – BetterBugs Tools',
      og_description:
        'Upload, rotate/flip, and download images in your browser.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
