import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'find-and-replace-string',
  category: 'Category142',
  route: PATHS.FIND_AND_REPLACE_STRING,
  ...{
    hero_section: {
      title: 'Find and Replace String',
      description:
        'Quickly find and replace text in your content – perfect for developers, writers, editors, and data cleanup tasks.',
    },
    development_tools_list: [
      { tool: 'Character Count Tool', url: PATHS.CHARACTER_COUNT_TOOL },
      { tool: 'Text Repeater', url: PATHS.TEXT_REPEATER },
      { tool: 'Text Cleaner', url: PATHS.TEXT_COMPARE },
      { tool: 'Word Counter', url: PATHS.WORD_COUNT_TOOL },
      { tool: 'Sort Words', url: PATHS.SORT_WORD },
      { tool: 'JavaScript Minifier', url: PATHS.JAVASCRIPT_MINIFIER },
      { tool: 'Line Count Tool', url: PATHS.LINE_COUNTER_TOOL },
    ],
    development_tools_about_details: {
      about_title: 'What is the Find and Replace String Tool?',
      about_description: [
        {
          description:
            'The Find and Replace String tool allows you to search for specific text or patterns and replace them with new values instantly.',
        },
        {
          description:
            'It’s useful for editing documents, cleaning datasets, coding tasks, and bulk text replacements.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'How to Use the Find and Replace Tool',
      guide_description: 'Follow these simple steps:',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: 'Enter your text:',
          step_description:
            'Paste or type the text where you want to perform replacements.',
        },
        {
          step_key: 'Step 2:',
          step_title: 'Set find & replace:',
          step_description:
            'Enter the word or phrase you want to find and the replacement value.',
        },
        {
          step_key: 'Step 3:',
          step_title: 'Choose options:',
          step_description:
            'Select options like case sensitivity or global (replace all) mode if available.',
        },
        {
          step_key: 'Step 4:',
          step_title: 'Apply & copy:',
          step_description:
            'Click replace to update the text and copy the modified result.',
        },
      ],
    },
    development_tools_how_use: {
      how_use_title: 'Common Uses',
      how_use_description: 'Why you might use this tool:',
      point: [
        {
          title: 'Content Editing',
          description:
            'Quickly update recurring words or phrases across long documents.',
        },
        {
          title: 'Programming',
          description:
            'Refactor variable names, code snippets, or bulk update strings.',
        },
        {
          title: 'Data Cleaning',
          description:
            'Replace unwanted text patterns in datasets, logs, or spreadsheets.',
        },
      ],
    },
    meta_data: {
      meta_title: 'Find and Replace String Tool – Online Text Replacer',
      meta_description:
        'Easily find and replace text online. Perfect for writers, coders, and data cleanup tasks. Supports global replacements and case sensitivity.',
      og_title: 'Find and Replace String – Free Online Tool',
      og_description:
        'Instantly search and replace text in your content. Useful for editing, programming, and cleaning large text files.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
