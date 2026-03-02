import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'random-csv-generator',
  category: 'Category88',
  route: PATHS.RANDOM_CSV_GENERATOR,
  ...{
    hero_section: {
      title: 'Random CSV Generator',
      description:
        'Generate random CSV data with configurable columns, rows, and formats. Perfect for testing, demos, and seeding data.',
    },
    development_tools_list: [
      { tool: 'JSON Generator', url: PATHS.RANDOM_JSON_DATA_GENERATOR },
      { tool: 'CSV to TXT', url: PATHS.CSV_TO_TEXT_CONVERTER },
      { tool: 'TXT to CSV', url: PATHS.TXT_TO_CSV_CONVERTER },
      { tool: 'JavaScript Minifier', url: PATHS.JAVASCRIPT_MINIFIER },
      { tool: 'Line Count Tool', url: PATHS.LINE_COUNTER_TOOL },
      { tool: 'JS Obfuscator', url: PATHS.JS_OBFUSCATOR },
    ],
    development_tools_about_details: {
      about_title: 'What is the Random CSV Generator?',
      about_description: [
        {
          description:
            'The random CSV generator creates sample CSV data with configurable columns, row count, and delimiter. You can define column types (string, number, date, etc.) and get realistic-looking CSV for tests and demos.',
        },
        {
          description:
            'It’s useful for testing import/export flows, populating spreadsheets, and generating fixture data without manual editing.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'How to Use the Random CSV Generator',
      guide_description: 'Generate CSV in a few steps:',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: 'Set columns and types:',
          step_description:
            'Add column names and choose types (e.g. string, number, date, email).',
        },
        {
          step_key: 'Step 2:',
          step_title: 'Set row count and delimiter:',
          step_description:
            'Choose how many rows to generate and the delimiter (comma, semicolon, tab).',
        },
        {
          step_key: 'Step 3:',
          step_title: 'Generate CSV:',
          step_description:
            'Click Generate to create the CSV. Copy or download the result.',
        },
        {
          step_key: 'Step 4:',
          step_title: 'Copy or download:',
          step_description:
            'Copy the CSV to clipboard or download as a .csv file for use in tests or spreadsheets.',
        },
      ],
    },
    development_tools_how_use: {
      how_use_title: 'How It’s Used',
      how_use_description: 'Common use cases:',
      point: [
        {
          title: 'Testing imports',
          description:
            'Generate sample CSV to test file upload and parsing in your app.',
        },
        {
          title: 'Demos and prototypes',
          description:
            'Populate tables and spreadsheets with realistic data for demos.',
        },
        {
          title: 'Fixture data',
          description:
            'Create CSV fixtures for automated tests and staging environments.',
        },
      ],
    },
    meta_data: {
      meta_title: 'Random CSV Generator – Create Sample CSV Data',
      meta_description:
        'Generate random CSV data with configurable columns and formats. Perfect for testing, demos, and fixture data.',
      og_title: 'Random CSV Generator – Developer Utility',
      og_description:
        'Create sample CSV data instantly. Useful for testing and demos.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
