import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'javascript-validator-linter',
  category: 'Category163',
  route: PATHS.JAVASCRIPT_VALIDATOR_LINTER,
  ...{
    hero_section: {
      title: 'JavaScript Validator & Linter',
      description:
        'Validate JavaScript syntax and catch common issues instantly in your browser.',
    },
    development_tools_list: [
      { tool: 'JavaScript Escape', url: PATHS.JAVASCRIPT_ESCAPE },
      { tool: 'HTML Validator', url: PATHS.HTML_VALIDATOR },
      { tool: 'JSON Validator', url: PATHS.JSON_VALIDATOR },
      { tool: 'JavaScript Tester', url: PATHS.JAVASCRIPT_TESTER },
    ],
    development_tools_about_details: {
      about_title: 'About JS Validator & Linter',
      about_description: [
        {
          description:
            'This tool checks JavaScript syntax safely and highlights common pitfalls like == usage, console.log, and var declarations.',
        },
        {
          description:
            'It runs entirely in the browser—no code is uploaded. For full ESLint rulesets, integrate ESLint in your project.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'How to Use',
      guide_description: 'Paste code and review issues:',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: 'Paste Code',
          step_description: 'Add your JavaScript code in the editor.',
        },
        {
          step_key: 'Step 2:',
          step_title: 'Review Results',
          step_description:
            'See syntax errors and lint warnings update instantly.',
        },
        {
          step_key: 'Step 3:',
          step_title: 'Fix & Validate',
          step_description: 'Resolve the reported issues and revalidate.',
        },
      ],
    },
    development_tools_how_use: {
      how_use_title: 'Use Cases',
      how_use_description: 'Helpful for:',
      point: [
        {
          title: 'Quick Checks',
          description: 'Validate snippets without setting up tooling.',
        },
        {
          title: 'Learning',
          description: 'Understand common pitfalls and best practices.',
        },
        {
          title: 'Reviews',
          description: 'Pre-check before committing or sharing snippets.',
        },
      ],
    },
    meta_data: {
      meta_title: 'JavaScript Validator & Linter - Online Tool',
      meta_description:
        'Validate JavaScript syntax and catch common issues in-browser. No uploads required.',
      og_title: 'JavaScript Validator & Linter',
      og_description: 'Instantly validate JS code and see lint hints.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
