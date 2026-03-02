import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'color-inverter',
  category: 'Category96',
  route: PATHS.COLOR_INVERTOR,
  ...{
    hero_section: {
      title: 'Color Inverter',
      description:
        'Invert HEX colors and images; copy inverted HEX and download processed images.',
    },
    development_tools_list: [
      { tool: 'Random Color Generator', url: PATHS.RANDOM_COLOR_GENERATOR },
      { tool: 'Hex to RGB', url: PATHS.HEX_TO_RGB_CONVERTER },
      { tool: 'RGB to Hex', url: PATHS.RGB_TO_HEX_CONVERTER },
      { tool: 'Color Picker', url: PATHS.COLOR_PICKER_TOOL },
      { tool: 'Word Count Tool', url: PATHS.WORD_COUNT_TOOL },
      { tool: 'Character Count Tool', url: PATHS.CHARACTER_COUNT_TOOL },
    ],
    development_tools_about_details: {
      about_title: 'What is the Color Inverter?',
      about_description: [
        {
          description:
            'The Color Inverter converts HEX colors to their inverted (complement) values and can process images to produce inverted versions.',
        },
        {
          description:
            'Use it for design contrast checks, accessibility testing, or creating negative/alternate color variants. Copy inverted HEX or download processed images.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'How to Use the Color Inverter',
      guide_description: 'Invert colors in a few steps:',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: 'Enter HEX or upload image:',
          step_description:
            'Paste a HEX color (e.g. #FF5733) or upload an image to invert.',
        },
        {
          step_key: 'Step 2:',
          step_title: 'Get inverted result:',
          step_description:
            'View the inverted HEX or image in the output area.',
        },
        {
          step_key: 'Step 3:',
          step_title: 'Copy or download:',
          step_description:
            'Copy inverted HEX to clipboard or download the processed image.',
        },
      ],
    },
    development_tools_how_use: {
      how_use_title: "How It's Used",
      how_use_description: 'Common use cases:',
      point: [
        {
          title: 'Design & contrast',
          description:
            'Quickly see complementary colors and check contrast for accessibility.',
        },
        {
          title: 'Image processing',
          description:
            'Create negative or inverted image variants for assets or demos.',
        },
        {
          title: 'Accessibility testing',
          description:
            'Verify how inverted or high-contrast variants look for UI elements.',
        },
      ],
    },
    meta_data: {
      meta_title: 'Color Inverter – Invert HEX & Images Online',
      meta_description:
        'Invert HEX colors and images; copy inverted HEX and download processed images. Free online tool on BetterBugs.io.',
      og_title: 'Color Inverter – Developer Utility Tools',
      og_description:
        'Invert HEX colors and images instantly. Copy inverted HEX or download processed images.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
