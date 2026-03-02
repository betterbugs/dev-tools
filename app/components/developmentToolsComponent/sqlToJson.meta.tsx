import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'sql-to-json',
  category: 'Category174',
  route: PATHS.SQL_TO_JSON,
  ...{
    hero_section: {
      title: 'SQL to JSON Converter',
      description:
        'Convert SQL INSERT statements into JSON arrays. Handles strings, numbers, booleans, and NULLs.',
    },
    development_tools_list: [
      { tool: 'SQL to CSV', url: '/development-tools/sql-to-csv-converter' },
      { tool: 'JSON Prettifier', url: '/development-tools/json-prettifier' },
      { tool: 'JSON Minifier', url: '/development-tools/json-minifier' },
    ],
    development_tools_about_details: {
      about_title: 'What does SQL to JSON do?',
      about_description: [
        {
          description:
            'Parses INSERT INTO statements with a column list and multiple value tuples, converting rows into JSON objects.',
        },
        {
          description:
            "Supports quoted strings (with '' escape), numbers, booleans, and NULL values.",
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'How to Use the SQL to JSON Converter',
      guide_description: 'Paste an INSERT statement and get JSON:',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: 'Paste SQL:',
          step_description: 'INSERT INTO table (cols) VALUES (...), (...);',
        },
        {
          step_key: 'Step 2:',
          step_title: 'Options:',
          step_description:
            'Choose indent, lowercase keys, trim strings, and parsing of NULL/booleans.',
        },
        {
          step_key: 'Step 3:',
          step_title: 'Convert:',
          step_description: 'Click Convert or enable Auto-update.',
        },
        {
          step_key: 'Step 4:',
          step_title: 'Copy/Download:',
          step_description: 'Copy JSON or download a .json file.',
        },
      ],
    },
    development_tools_how_use: {
      how_use_title: 'Common Uses',
      how_use_description:
        'Useful for quickly extracting fixtures from SQL dumps and migrating data.',
      point: [
        {
          title: 'Data Migration',
          description: 'Turn SQL inserts into app-friendly JSON.',
        },
        {
          title: 'Testing',
          description: 'Generate JSON fixtures for unit/integration tests.',
        },
        {
          title: 'Analysis',
          description: 'Load converted JSON in scripts for exploration.',
        },
      ],
    },
    meta_data: {
      meta_title: 'SQL to JSON – Convert INSERT Statements to JSON',
      meta_description:
        'Convert SQL INSERT data into JSON arrays online. Supports strings, numbers, booleans, and NULLs.',
      og_title: 'SQL to JSON – Free Online Converter',
      og_description: 'Paste INSERT statements and get JSON instantly.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
