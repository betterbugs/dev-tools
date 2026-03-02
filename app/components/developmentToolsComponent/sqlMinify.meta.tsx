import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'sql-minify',
  category: 'Category76',
  route: PATHS.SQL_MINIFY,
  ...{
    hero_section: {
      title: 'SQL Minify',
      description:
        'Minify SQL by removing comments and extra whitespace to reduce size.',
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
      about_title: 'What is SQL Minify?',
      about_description: [
        {
          description:
            'SQL Minify compresses SQL scripts by stripping comments, collapsing whitespace, and removing unnecessary line breaks without changing execution behavior.',
        },
        {
          description:
            'Ideal for embedding SQL in applications, reducing payload size, and sharing compact snippets.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'Using SQL Minify',
      guide_description: 'Minify SQL in a few steps:',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: 'Paste SQL:',
          step_description: 'Paste your SQL script into the input area.',
        },
        {
          step_key: 'Step 2:',
          step_title: 'Choose options:',
          step_description:
            'Toggle removal of line/block comments and extra whitespace.',
        },
        {
          step_key: 'Step 3:',
          step_title: 'Minify:',
          step_description: 'Click Minify to compress the SQL.',
        },
        {
          step_key: 'Step 4:',
          step_title: 'Copy or Clear:',
          step_description: 'Copy the result or clear inputs to start again.',
        },
      ],
    },
    development_tools_how_use: {
      how_use_title: 'How It’s Used',
      how_use_description: 'Common use cases:',
      point: [
        {
          title: 'Embed in apps',
          description:
            'Ship compact SQL strings in application bundles or migrations.',
        },
        {
          title: 'Reduce payloads',
          description:
            'Minify SQL sent over the wire in API calls or CI artifacts.',
        },
        {
          title: 'Share snippets',
          description: 'Post concise examples in docs, tickets, and PRs.',
        },
      ],
    },
    meta_data: {
      meta_title: 'SQL Minify – Compress SQL Online | Developer Tools',
      meta_description:
        'Minify SQL by removing comments and extra whitespace. Create compact SQL for apps and sharing.',
      og_title: 'SQL Minify – Free Online SQL Compressor',
      og_description:
        'Paste SQL and minify instantly. Strip comments and whitespace without changing behavior.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
