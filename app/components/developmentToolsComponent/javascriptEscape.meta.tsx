import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'javascript-escape',
  category: 'Category162',
  route: PATHS.JAVASCRIPT_ESCAPE,
  ...{
    hero_section: {
      title: 'JavaScript Escape',
      description:
        'Escape and unescape text for safe use inside JavaScript string literals. Handles quotes, backslashes, and control characters.',
    },
    development_tools_list: [
      { tool: 'JavaScript Validator & Linter', url: PATHS.JAVASCRIPT_TESTER },
      { tool: 'HTML Escape', url: PATHS.HTML_ESCAPE },
      { tool: 'HTML Unescape', url: PATHS.HTML_UNESCAPE },
      { tool: 'Text to One Line', url: PATHS.TEXT_TO_ONE_LINE },
    ],
    development_tools_about_details: {
      about_title: 'What is JavaScript Escape?',
      about_description: [
        {
          description:
            'JavaScript escaping converts special characters (quotes, newlines, tabs, backslashes) so text can be safely embedded in JS string literals without breaking syntax.',
        },
        {
          description:
            'This tool works locally in your browser and supports both Escape and Unescape modes.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'How to Use',
      guide_description: 'Convert text in two steps:',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: 'Select Mode',
          step_description: 'Choose Escape or Unescape based on your need.',
        },
        {
          step_key: 'Step 2:',
          step_title: 'Paste Text',
          step_description:
            'Paste your input on the left. Copy the output on the right.',
        },
      ],
    },
    development_tools_how_use: {
      how_use_title: 'Use Cases',
      how_use_description: 'Common scenarios:',
      point: [
        {
          title: 'Embed Server Text',
          description:
            'Safely embed server-side strings into client-side JavaScript.',
        },
        {
          title: 'Generate Code',
          description: 'Prepare strings for code generation templates.',
        },
        {
          title: 'Logging & Debugging',
          description: 'Make multi-line strings safe for inline logs.',
        },
      ],
    },
    meta_data: {
      meta_title: 'JavaScript Escape - String Escaper/Unescaper',
      meta_description:
        'Escape or unescape text for JavaScript string literals. Handles quotes, backslashes, and control characters in-browser.',
      og_title: 'JavaScript Escape - Developer Utility Tool',
      og_description:
        'Convert text to safe JavaScript strings with Escape/Unescape modes.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
