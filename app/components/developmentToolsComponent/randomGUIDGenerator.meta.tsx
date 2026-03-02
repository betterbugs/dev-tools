import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'random-guid-generator',
  category: 'Category89',
  route: PATHS.RANDOM_GUID_GENERATOR,
  ...{
    hero_section: {
      title: 'Random GUID Generator',
      description:
        'Generate random GUIDs (UUIDs) instantly. Create one or many UUID v4 values for identifiers, testing, and database keys.',
    },
    development_tools_list: [
      { tool: 'Random String Generator', url: PATHS.RANDOM_STRING_GENERATOR },
      { tool: 'JSON Generator', url: PATHS.RANDOM_JSON_DATA_GENERATOR },
      { tool: 'Credit Card Generator', url: PATHS.CREDIT_CARD_GENERATOR },
      { tool: 'JavaScript Minifier', url: PATHS.JAVASCRIPT_MINIFIER },
      { tool: 'Line Count Tool', url: PATHS.LINE_COUNTER_TOOL },
      { tool: 'JS Obfuscator', url: PATHS.JS_OBFUSCATOR },
    ],
    development_tools_about_details: {
      about_title: 'What is the Random GUID Generator?',
      about_description: [
        {
          description:
            'The random GUID generator creates UUID v4 (globally unique identifiers) that are suitable for primary keys, trace IDs, and any context that needs unique values.',
        },
        {
          description:
            'You can generate one or multiple GUIDs and copy them with a chosen separator. It’s useful for development, testing, and database seeding.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'How to Use the Random GUID Generator',
      guide_description: 'Generate GUIDs in a few steps:',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: 'Set count and separator:',
          step_description:
            'Choose how many GUIDs to generate and the separator (newline, comma, etc.) when copying.',
        },
        {
          step_key: 'Step 2:',
          step_title: 'Generate GUIDs:',
          step_description:
            'Click Generate to create UUID v4 values. Copy or download the list.',
        },
        {
          step_key: 'Step 3:',
          step_title: 'Copy or use:',
          step_description:
            'Copy the GUIDs to clipboard or download as a file for use in your app or database.',
        },
      ],
    },
    development_tools_how_use: {
      how_use_title: 'How It’s Used',
      how_use_description: 'Common use cases:',
      point: [
        {
          title: 'Database keys',
          description:
            'Generate unique IDs for primary keys, foreign keys, and entity identifiers.',
        },
        {
          title: 'Testing and fixtures',
          description:
            'Create stable or random GUIDs for test data and mock APIs.',
        },
        {
          title: 'Trace IDs and logging',
          description:
            'Generate request or correlation IDs for distributed tracing and logs.',
        },
      ],
    },
    meta_data: {
      meta_title: 'Random GUID Generator – Generate UUIDs Online',
      meta_description:
        'Generate random GUIDs (UUID v4) instantly. Create one or many unique identifiers for databases, testing, and APIs.',
      og_title: 'Random GUID Generator – Developer Utility',
      og_description:
        'Create UUID v4 values instantly. Perfect for keys, testing, and trace IDs.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
