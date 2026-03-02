import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'sql-to-csv-converter',
  category: 'Category69',
  route: PATHS.SQL_TO_CSV_CONVERTER,
  ...{
    hero_section: {
      title: 'SQL to CSV Converter',
      description:
        'Run a SELECT query on pasted/uploaded data and export results to CSV.',
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
      about_title: 'What is a SQL to CSV Converter?',
      about_description: [
        {
          description:
            'Executes simple SQL (SELECT/WHERE/ORDER BY/LIMIT) against tabular data in-browser.',
        },
        {
          description:
            'Exports the query result set as a CSV file with your chosen delimiter and header options.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'Using the SQL to CSV Converter',
      guide_description: 'Convert query results to CSV in three steps:',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: 'Provide data:',
          step_description:
            'Paste table data or upload CSV/TSV and map columns.',
        },
        {
          step_key: 'Step 2:',
          step_title: 'Write query:',
          step_description:
            'Enter a SELECT ... WHERE ... ORDER BY ... LIMIT query.',
        },
        {
          step_key: 'Step 3:',
          step_title: 'Export:',
          step_description: 'Preview and download the result as CSV.',
        },
      ],
    },
    development_tools_how_use: {
      how_use_title: 'How It’s Used',
      how_use_description: 'Common use cases:',
      point: [
        {
          title: 'Ad‑hoc reporting',
          description: 'Filter and export subsets for stakeholders.',
        },
        {
          title: 'QA & debugging',
          description: 'Verify dataset assumptions with quick queries.',
        },
        {
          title: 'Data migration',
          description: 'Transform small datasets without a DB server.',
        },
      ],
    },
    meta_data: {
      meta_title: 'SQL to CSV Converter – Query and Export',
      meta_description:
        'Run simple SQL on your data and export results to CSV online.',
      og_title: 'SQL to CSV – BetterBugs Tools',
      og_description:
        'Paste data, query with SQL, and download CSV in seconds.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
