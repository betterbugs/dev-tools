import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'sorting-list',
  category: 'Category99',
  route: PATHS.SORTING_LIST,
  ...{
    hero_section: {
      title: 'Sorting List',
      description:
        'Sort a list of items alphabetically, by length, or numerically. Free online tool for organizing lists.',
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
      about_title: 'What is the Sorting List tool?',
      about_description: [
        {
          description:
            'The Sorting List tool lets you sort a list of lines or items in ascending or descending order—by alphabet, length, or numeric value.',
        },
        {
          description:
            'Useful for organizing word lists, tags, IDs, or any line-based data quickly.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'Using the Sorting List tool',
      guide_description: 'Sort your list in a few steps:',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: 'Paste your list:',
          step_description:
            'Enter or paste one item per line in the input area.',
        },
        {
          step_key: 'Step 2:',
          step_title: 'Choose sort mode:',
          step_description:
            'Select alphabetical, by length, or numeric and ascending or descending.',
        },
        {
          step_key: 'Step 3:',
          step_title: 'Get sorted output:',
          step_description:
            'View the sorted list and copy or download as needed.',
        },
      ],
    },
    development_tools_how_use: {
      how_use_title: 'How It’s Used',
      how_use_description: 'Common use cases:',
      point: [
        {
          title: 'Data organization',
          description:
            'Order tags, keywords, or IDs for reports and dashboards.',
        },
        {
          title: 'Content and SEO',
          description:
            'Sort keyword or category lists for sitemaps and content planning.',
        },
        {
          title: 'Testing',
          description: 'Generate ordered test data for dropdowns and list UIs.',
        },
      ],
    },
    meta_data: {
      meta_title: 'Sorting List – Sort Items Online',
      meta_description:
        'Sort a list alphabetically, by length, or numerically. Free tool for organizing lists and line-based data.',
      og_title: 'Sorting List – Developer Utility',
      og_description: 'Sort lists instantly with configurable order and mode.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
