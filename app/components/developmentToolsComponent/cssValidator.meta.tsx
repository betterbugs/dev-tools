import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'css-validator',
  category: 'Category165',
  route: PATHS.CSS_VALIDATOR,
  ...{
    hero_section: {
      title: 'CSS Validator',
      description:
        'Validate CSS syntax in your browser and catch common issues like missing semicolons and unbalanced braces.',
    },
    development_tools_list: [
      { tool: 'HTML Validator', url: PATHS.HTML_VALIDATOR },
      {
        tool: 'JavaScript Validator & Linter',
        url: PATHS.JAVASCRIPT_VALIDATOR_LINTER,
      },
      { tool: 'CSS Prettify', url: PATHS.CSS_PRETTIFY },
      { tool: 'CSS Minify', url: PATHS.CSS_MINIFY },
    ],
    development_tools_about_details: {
      about_title: 'About CSS Validator',
      about_description: [
        {
          description:
            'This validator parses your CSS in the browser and reports likely syntax issues. For exhaustive validation against specs, use W3C validators.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'How to Use',
      guide_description: 'Paste CSS and review issues:',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: 'Paste CSS',
          step_description: 'Add your CSS to the editor.',
        },
        {
          step_key: 'Step 2:',
          step_title: 'Review Issues',
          step_description:
            'See errors and warnings detected by the validator.',
        },
        {
          step_key: 'Step 3:',
          step_title: 'Fix & Re-check',
          step_description: 'Resolve issues and validate again.',
        },
      ],
    },
    development_tools_how_use: {
      how_use_title: 'Use Cases',
      how_use_description: 'When this tool helps:',
      point: [
        {
          title: 'Quick QA',
          description: 'Catch simple syntax mistakes fast.',
        },
        {
          title: 'Learning',
          description: 'Understand CSS syntax and common pitfalls.',
        },
        {
          title: 'Pre-commit check',
          description: 'Spot obvious issues before pushing changes.',
        },
      ],
    },
    meta_data: {
      meta_title: 'CSS Validator - Online Tool',
      meta_description:
        'Validate CSS syntax and detect common mistakes directly in your browser.',
      og_title: 'CSS Validator - Developer Utility',
      og_description: 'Paste CSS and get instant feedback on syntax issues.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
