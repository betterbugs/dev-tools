import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'random-color-generator',
  category: 'Category20',
  route: PATHS.RANDOM_COLOR_GENERATOR,
  ...{
    hero_section: {
      title: 'Random Color Generator Online',
      description:
        'The random color generator is a free online utility tool on BetterBugs.io that instantly generates random color values in HEX, RGB, and HSL formats.',
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
      about_title: 'What is the Random Color Generator?',
      about_description: [
        {
          description:
            'The random color generator is a free online tool on BetterBugs.io platform that enables you to generate random colors in HEX, RGB, and HSL format. You can generate one or multiple colors in a particular format or all three formats at once. You can also set the color types.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'How to use it',
      guide_description: 'Steps to use the tool:',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: 'Set the values for:',
        },
        {
          steps_points: [
            {
              steps_points_title: 'Color Count: ',
              steps_points_description:
                'The number of colors you want to generate',
            },
            {
              steps_points_title: 'Color Format: ',
              steps_points_description:
                'HEX, RGB, or HSL. You can also get all the three formats using the “All Formats” option.',
            },
            {
              steps_points_title: 'Color Type: ',
              steps_points_description:
                'Options: Any Color, Bright Colors, Pastel Colors, Dark Colors, Monochrome',
            },
            {
              steps_points_title: 'Separator: ',
              steps_points_description:
                'Add a separator for the generated colors: New line, Comma, Space, Tab',
            },
          ],
        },
        {
          step_description:
            'You can also enable the check boxes to “Allow duplicates” and “Include color names (for common colors)”',
        },
        {
          step_key: 'Step 2:',
          step_title:
            'Hit “Generate Colors” to get your random colors in the output box.',
        },
        {
          step_description:
            'You can use output with the “Copy” icon from the top right of the output box.',
        },
      ],
    },
    development_tools_how_use: {
      how_use_title:
        'What are the use cases for the random color generator tool',
      how_use_description: 'You can use the tool for:',
      point: [
        {
          title: 'Placeholder styling in development',
          description:
            'Apply random colors to placeholder elements like buttons, cards, or backgrounds to visualize layout structure before final assets are ready.',
        },
        {
          title: 'Design brainstorming and ideation',
          description:
            'Use bright or pastel color sets to inspire mood boards, style tiles, or collaborative design sprints.',
        },
        {
          title: 'Contrast and accessibility testing',
          description:
            'Create dark and bright color combinations to test WCAG compliance for text readability and UI contrast.',
        },
        {
          title: 'Automated test data for color inputs',
          description:
            'Instantly populate form fields, APIs, or config files with randomized HEX/RGB/HSL values to test input validation and rendering logic.',
        },
        {
          title: 'Prototyping',
          description:
            'Generate diverse color palettes to explore layout aesthetics, contrast, and accessibility during early design stages.',
        },
        {
          title: 'Frontend testing for color handling',
          description:
            'Demonstrate color formats and conversions.Validate how your app handles dynamic or unexpected color inputs across components, especially in theming engines or CSS variables.',
        },
      ],
    },
    meta_data: {
      meta_title: 'Random Color Generator - Developer Utility Tools',
      meta_description:
        'Use the random color generator free online tool on BetterBugs to instantly get random colors in HEX, RGB, and HSL formats, perfect for quick design experiments.',
      og_title: 'Random Color Generator - Developer Utility Tools',
      og_description:
        'This post describes usage steps and the use cases of the random color generator free online tool on BetterBugs.io site.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
