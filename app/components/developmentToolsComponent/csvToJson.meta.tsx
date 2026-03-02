import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'csv-to-json',
  category: 'Category109',
  route: PATHS.CSV_TO_JSON,
  ...{
    hero_section: {
      title: 'CSV to JSON Converter',
      description:
        'Easily convert CSV files or text into JSON format for web applications, APIs, or data processing.',
    },
    development_tools_list: [
      { tool: 'Markdown To HTML', url: PATHS.MARKDOWN_TO_HTML },
      { tool: 'Text Lower Case', url: PATHS.TEXT_LOWERCASE_CONVERTER },
      { tool: 'JSON to CSV', url: PATHS.CHARACTER_COUNT_TOOL },
      { tool: 'JavaScript Minifier', url: PATHS.JAVASCRIPT_MINIFIER },
      { tool: 'Line Count Tool', url: PATHS.LINE_COUNTER_TOOL },
      { tool: 'JS Obfuscator', url: PATHS.JS_OBFUSCATOR },
    ],
    development_tools_about_details: {
      about_title: 'What is the CSV to JSON Converter?',
      about_description: [
        {
          description:
            'This tool converts CSV (Comma-Separated Values) data into JSON format, making it easier to work with in web applications, APIs, or databases.',
        },
        {
          description:
            'It handles headers, commas, and line breaks correctly to produce a structured JSON object or array from your CSV input.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'How to Use the CSV to JSON Converter',
      guide_description: 'Follow these simple steps:',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: 'Paste or upload CSV:',
          step_description:
            'Enter your CSV text or upload a CSV file into the input area.',
        },
        {
          step_key: 'Step 2:',
          step_title: 'Convert to JSON:',
          step_description:
            'Click the convert button to transform your CSV into a properly formatted JSON object or array.',
        },
        {
          step_key: 'Step 3:',
          step_title: 'View & copy output:',
          step_description:
            'Check the generated JSON and copy it for use in your project or application.',
        },
        {
          step_key: 'Step 4:',
          step_title: 'Clear or modify:',
          step_description:
            'Edit the CSV input or clear it to convert a new dataset anytime.',
        },
      ],
    },
    development_tools_how_use: {
      how_use_title: 'Common Uses',
      how_use_description: 'Why you might use this tool:',
      point: [
        {
          title: 'Web & API development',
          description:
            'Convert CSV datasets into JSON for frontend or backend applications.',
        },
        {
          title: 'Data migration',
          description:
            'Transform CSV exports from spreadsheets or databases into JSON for processing or storage.',
        },
        {
          title: 'Testing & debugging',
          description:
            'Quickly convert CSV test data into JSON format for testing scripts, APIs, or software.',
        },
      ],
    },
    meta_data: {
      meta_title: 'CSV to JSON Converter – Convert CSV Files Online',
      meta_description:
        'Convert CSV text or files into JSON format instantly for web applications, APIs, or data processing.',
      og_title: 'CSV to JSON Converter – Online Tool',
      og_description:
        'Quickly transform CSV data into structured JSON objects or arrays. Copy or download the output for use in your projects.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
