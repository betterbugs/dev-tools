import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'json-to-typescript',
  category: 'Category87',
  route: PATHS.JSON_TO_TYPESCRIPT,
  ...{
    hero_section: {
      title: 'JSON to TypeScript Converter',
      description:
        'Convert JSON data into TypeScript interfaces and types instantly. Perfect for generating type definitions from API responses or config files.',
    },
    development_tools_list: [
      { tool: 'JSON Prettifier', url: PATHS.JSON_PRETTIFIER },
      { tool: 'JSON Minifier', url: PATHS.JSON_MINIFIER },
      { tool: 'JSON Validator', url: PATHS.JSON_VALIDATOR },
      { tool: 'Markdown To HTML', url: PATHS.MARKDOWN_TO_HTML },
      { tool: 'JavaScript Minifier', url: PATHS.JAVASCRIPT_MINIFIER },
      { tool: 'Line Count Tool', url: PATHS.LINE_COUNTER_TOOL },
    ],
    development_tools_about_details: {
      about_title: 'What is the JSON to TypeScript Converter?',
      about_description: [
        {
          description:
            'The JSON to TypeScript converter generates TypeScript interfaces and type definitions from your JSON data. It infers types from sample values so you get ready-to-use types for your codebase.',
        },
        {
          description:
            'It’s useful for API integration, config typing, and keeping TypeScript in sync with JSON structures without manual typing.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'How to Use the JSON to TypeScript Converter',
      guide_description: 'Convert JSON to TypeScript in a few steps:',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: 'Paste or upload JSON:',
          step_description:
            'Enter your JSON object in the input area or upload a JSON file.',
        },
        {
          step_key: 'Step 2:',
          step_title: 'Configure options:',
          step_description:
            'Choose root type name, optional nullability, and array vs tuple preference if available.',
        },
        {
          step_key: 'Step 3:',
          step_title: 'Generate TypeScript:',
          step_description:
            'Click Generate to get TypeScript interfaces. Copy the output into your project.',
        },
        {
          step_key: 'Step 4:',
          step_title: 'Copy or download:',
          step_description:
            'Copy the generated types or download as a .ts file for use in your codebase.',
        },
      ],
    },
    development_tools_how_use: {
      how_use_title: 'How It’s Used',
      how_use_description: 'Common use cases:',
      point: [
        {
          title: 'API integration',
          description:
            'Generate types from API response samples for type-safe fetch or axios calls.',
        },
        {
          title: 'Config typing',
          description:
            'Create TypeScript types from config JSON for environment or app settings.',
        },
        {
          title: 'Documentation',
          description:
            'Document data structures by turning JSON examples into type definitions.',
        },
      ],
    },
    meta_data: {
      meta_title: 'JSON to TypeScript Converter – Generate Types from JSON',
      meta_description:
        'Convert JSON to TypeScript interfaces and types online. Generate type definitions from JSON for API integration and config typing.',
      og_title: 'JSON to TypeScript Converter – Developer Utility',
      og_description:
        'Generate TypeScript types from JSON instantly. Perfect for APIs and config files.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
