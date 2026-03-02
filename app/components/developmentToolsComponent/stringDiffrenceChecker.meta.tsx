import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'string-difference-checker',
  category: 'Category97',
  route: PATHS.STRING_DIFFERENCE_CHECKER,
  ...{
    hero_section: {
      title: 'String Difference Checker',
      description:
        'Compare two strings side-by-side and highlight character- or word-level differences instantly.',
    },
    development_tools_list: [
      { tool: 'Text Compare', url: PATHS.TEXT_COMPARE },
      { tool: 'Code Compare', url: PATHS.CODE_COMPARE_TOOL },
      { tool: 'JSON Compare', url: PATHS.JSON_COMPARE },
      { tool: 'Markdown To HTML', url: PATHS.MARKDOWN_TO_HTML },
      { tool: 'Word Count', url: PATHS.WORD_COUNT_TOOL },
      { tool: 'Line Count Tool', url: PATHS.LINE_COUNTER_TOOL },
    ],
    development_tools_about_details: {
      about_title: 'What is the String Difference Checker?',
      about_description: [
        {
          description:
            'The String Difference Checker compares two strings and highlights added, removed, and unchanged characters or words.',
        },
        {
          description:
            'It runs entirely in your browser—no data is uploaded. Useful for code review, config diffs, and text validation.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'Using the String Difference Checker',
      guide_description: 'Compare two strings in a few steps:',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: 'Paste or type string 1:',
          step_description: 'Enter the first string in the left input.',
        },
        {
          step_key: 'Step 2:',
          step_title: 'Paste or type string 2:',
          step_description: 'Enter the second string in the right input.',
        },
        {
          step_key: 'Step 3:',
          step_title: 'Review diff:',
          step_description:
            'See character- or word-level differences highlighted.',
        },
        {
          step_key: 'Step 4:',
          step_title: 'Copy or clear:',
          step_description: 'Copy results or clear inputs to compare again.',
        },
      ],
    },
    development_tools_how_use: {
      how_use_title: 'How It’s Used',
      how_use_description: 'Common use cases:',
      point: [
        {
          title: 'Code and config review',
          description:
            'Compare two versions of a file or config to spot changes quickly.',
        },
        {
          title: 'Text validation',
          description:
            'Check that user input or API output matches expected strings.',
        },
        {
          title: 'QA and debugging',
          description:
            'Verify copy, error messages, or serialized data against a baseline.',
        },
      ],
    },
    meta_data: {
      meta_title: 'String Difference Checker – Compare Two Strings Online',
      meta_description:
        'Compare two strings side-by-side and highlight character- or word-level differences. No data uploaded.',
      og_title: 'String Difference Checker – Developer Utility',
      og_description:
        'Compare two strings instantly with highlighted diffs. Perfect for code review and text validation.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
