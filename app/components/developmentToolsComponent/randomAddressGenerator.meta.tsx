import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'random-address-generator',
  category: 'Category93',
  route: PATHS.RANDOM_ADDRESS_GENERATOR,
  ...{
    hero_section: {
      title: 'Random Address Generator',
      description:
        'Generate random street addresses for testing forms, databases, and demos. Customize format and locale.',
    },
    development_tools_list: [
      { tool: 'Credit Card Generator', url: PATHS.CREDIT_CARD_GENERATOR },
      {
        tool: 'Random Username Generator',
        url: PATHS.RANDOM_USERNAME_GENERATOR,
      },
      { tool: 'Markdown To HTML', url: PATHS.MARKDOWN_TO_HTML },
      { tool: 'Text Lower Case', url: PATHS.TEXT_LOWERCASE_CONVERTER },
      { tool: 'JavaScript Minifier', url: PATHS.JAVASCRIPT_MINIFIER },
      { tool: 'Line Count Tool', url: PATHS.LINE_COUNTER_TOOL },
    ],
    development_tools_about_details: {
      about_title: 'What is the Random Address Generator?',
      about_description: [
        {
          description:
            'The random address generator creates realistic-looking street addresses for use in testing and development. Addresses are synthetic and not tied to real locations.',
        },
        {
          description:
            'Useful for form testing, database seeding, and demos where you need placeholder address data without using real personal information.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'How to Use the Random Address Generator',
      guide_description: 'Generate addresses in a few steps:',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: 'Set options:',
          step_description:
            'Choose count, format (single line / multi-line), and locale if available.',
        },
        {
          step_key: 'Step 2:',
          step_title: 'Generate:',
          step_description:
            'Click Generate to create random addresses in the output area.',
        },
        {
          step_key: 'Step 3:',
          step_title: 'Copy or download:',
          step_description:
            'Copy the addresses or download as CSV/text for use in your project.',
        },
      ],
    },
    development_tools_how_use: {
      how_use_title: 'How It’s Used',
      how_use_description: 'Common use cases:',
      point: [
        {
          title: 'Form and UI testing',
          description:
            'Populate address fields in forms and checkout flows without real data.',
        },
        {
          title: 'Database seeding',
          description:
            'Fill dev or test databases with realistic address data for demos and tests.',
        },
        {
          title: 'Privacy-safe demos',
          description:
            'Use synthetic addresses in screenshots, videos, or live demos.',
        },
      ],
    },
    meta_data: {
      meta_title: 'Random Address Generator – Create Test Addresses Online',
      meta_description:
        'Generate random street addresses for testing forms, databases, and demos. Free online tool on BetterBugs.io.',
      og_title: 'Random Address Generator – Developer Utility',
      og_description:
        'Create synthetic addresses for testing and demos. No real personal data.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
