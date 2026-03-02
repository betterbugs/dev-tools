import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'hex-to-pantone',
  category: 'Category50',
  route: PATHS.HEX_TO_PANTONE,
  ...{
    hero_section: {
      title: 'Hex to Pantone',
      description: 'Convert HEX color codes to Pantone values.',
    },
    development_tools_list: [
      { tool: 'Random Time Generator', url: PATHS.RANDOM_CLOCK_TIME_GENERATOR },
      { tool: 'Random Date Generator', url: PATHS.RANDOM_DATE_GENERATOR },
      { tool: 'Credit Card Generator', url: PATHS.CREDIT_CARD_GENERATOR },
      {
        tool: 'Random Decimal Number Generator',
        url: PATHS.RANDOM_DECIMAL_NUMBER_GENERATOR,
      },
      {
        tool: 'Random JSON Data Generator',
        url: PATHS.RANDOM_JSON_DATA_GENERATOR,
      },
      { tool: 'Credit Card Validator', url: PATHS.CREDIT_CARD_VALIDATOR },
    ],
    development_tools_about_details: {
      about_title: 'What is Hex to Pantone?',
      about_description: [
        {
          description:
            'Hex to Pantone is a tool that converts HEX color codes to Pantone values.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'How to Use Hex to Pantone',
      guide_description: 'Steps to use Hex to Pantone:',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: 'Enter HEX color code:',
          step_description: 'Enter the HEX color code you want to convert.',
        },
        {
          step_key: 'Step 2:',
          step_title: 'Click Convert:',
          step_description:
            'Click the Convert button to convert the HEX color code to Pantone values.',
        },
        {
          step_key: 'Step 3:',
          step_title: 'Copy the Pantone values:',
          step_description: 'Copy the Pantone values to your clipboard.',
        },
      ],
    },
    development_tools_how_use: {
      how_use_title: 'What are the use cases for the Hex to Pantone tool',
      how_use_description: 'You can use the tool for:',
      point: [
        {
          title: 'Design',
          description:
            'Convert HEX color codes to Pantone values for design purposes.',
        },
        {
          title: 'Printing',
          description:
            'Convert HEX color codes to Pantone values for printing purposes.',
        },
        {
          title: 'Branding',
          description:
            'Convert HEX color codes to Pantone values for branding purposes.',
        },
      ],
    },
    meta_data: {
      meta_title: 'Hex to Pantone - Developer Utility Tools',
      meta_description:
        'Convert HEX color codes to Pantone values. Perfect for design and printing purposes.',
      og_title: 'Hex to Pantone - Developer Utility Tools',
      og_description:
        'Convert HEX color codes to Pantone values. Perfect for design and printing purposes.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
