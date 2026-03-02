import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'css-to-less',
  category: 'Category167',
  route: PATHS.CSS_TO_LESS,
  ...{
    hero_section: {
      title: 'CSS to LESS Converter',
      description:
        'Convert your CSS to LESS syntax while preserving structure, nesting, and @media rules.',
    },
    development_tools_list: [
      { tool: 'CSS to SASS', url: PATHS.CSS_TO_SASS },
      { tool: 'SCSS to CSS', url: PATHS.SCSS_TO_CSS },
      { tool: 'CSS Prettify', url: PATHS.CSS_PRETTIFY },
      { tool: 'CSS Minify', url: PATHS.CSS_MINIFY },
    ],
    development_tools_about_details: {
      about_title: 'About CSS to LESS Converter',
      about_description: [
        {
          description:
            'LESS is a CSS preprocessor that extends CSS with variables and nesting. This tool converts plain CSS into LESS-friendly code to speed up migrations.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'How to Use',
      guide_description: 'Convert CSS to LESS in a few steps:',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: 'Paste CSS',
          step_description: 'Add your CSS into the input area.',
        },
        {
          step_key: 'Step 2:',
          step_title: 'Get LESS',
          step_description: 'Review the converted LESS output.',
        },
        {
          step_key: 'Step 3:',
          step_title: 'Copy & Use',
          step_description: 'Copy the LESS and integrate into your project.',
        },
      ],
    },
    development_tools_how_use: {
      how_use_title: 'Use Cases',
      how_use_description: 'When this tool helps:',
      point: [
        {
          title: 'Migrations',
          description: 'Move existing CSS projects to LESS.',
        },
        {
          title: 'Refactors',
          description: 'Introduce variables and nesting over time.',
        },
        { title: 'Learning', description: 'See how CSS maps to LESS idioms.' },
      ],
    },
    meta_data: {
      meta_title: 'CSS to LESS Converter - Online Tool',
      meta_description:
        'Convert CSS code to LESS syntax preserving structure, nesting, and rules.',
      og_title: 'CSS to LESS Converter - Developer Utility',
      og_description: 'Paste CSS and get LESS output instantly.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
