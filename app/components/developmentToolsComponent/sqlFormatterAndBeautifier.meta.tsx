import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'sql-formatter-and-beautifier',
  category: 'Category82',
  route: PATHS.SQL_FORMATTER_AND_BEAUTIFIER,
  ...{
    hero_section: {
      title: 'SQL Formatter and Beautifier',
      description:
        'Format and beautify SQL queries. Uppercase keywords, control indentation, and break lines around clauses.',
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
      about_title: 'What is the SQL Formatter and Beautifier?',
      about_description: [
        {
          description:
            'This tool cleans and formats SQL: tokenize queries, keep strings/comments intact, and arrange common SQL clauses for readability.',
        },
        {
          description:
            'Options let you uppercase keywords, collapse multiple spaces, and break lines before major clauses like SELECT, FROM, WHERE, GROUP BY, and ORDER BY.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'Using the SQL Formatter and Beautifier',
      guide_description: 'Format in a few steps:',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: 'Paste SQL:',
          step_description: 'Paste your SQL query or script to format.',
        },
        {
          step_key: 'Step 2:',
          step_title: 'Choose options:',
          step_description:
            'Indent size, uppercase keywords, collapse spaces, and line breaks before keywords.',
        },
        {
          step_key: 'Step 3:',
          step_title: 'Format:',
          step_description: 'Click Format to beautify the SQL.',
        },
        {
          step_key: 'Step 4:',
          step_title: 'Copy/Clear:',
          step_description: 'Copy the result or clear to start again.',
        },
      ],
    },
    development_tools_how_use: {
      how_use_title: 'How It’s Used',
      how_use_description: 'Common use cases:',
      point: [
        {
          title: 'Code reviews',
          description:
            'Make SQL diffs clearer by consistently formatted queries.',
        },
        {
          title: 'Docs & tutorials',
          description:
            'Produce clean SQL snippets for documentation and blog posts.',
        },
        {
          title: 'Quick cleanup',
          description: 'Reformat messy SQL before sharing or executing.',
        },
      ],
    },
    meta_data: {
      meta_title: 'SQL Formatter & Beautifier – Format SQL Online',
      meta_description:
        'Format SQL queries online with options for indentation, uppercase keywords, and cleaner spacing.',
      og_title: 'SQL Formatter & Beautifier – Online',
      og_description:
        'Paste SQL and format it instantly. Great for readability and sharing.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
