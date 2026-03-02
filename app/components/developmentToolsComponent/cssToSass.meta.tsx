import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'css-to-sass',
  category: 'Category166',
  route: PATHS.CSS_TO_SASS,
  ...{
    hero_section: {
      title: 'CSS to SASS Converter',
      description:
        'Convert your CSS code to SASS/SCSS format with proper nesting and indentation.',
    },
    development_tools_list: [
      { tool: 'CSS Validator', url: PATHS.CSS_VALIDATOR },
      { tool: 'CSS Prettify', url: PATHS.CSS_PRETTIFY },
      { tool: 'CSS Minify', url: PATHS.CSS_MINIFY },
      { tool: 'SCSS to CSS', url: PATHS.SCSS_TO_CSS },
    ],
    development_tools_about_details: {
      about_title: 'About CSS to SASS Converter',
      about_description: [
        {
          description:
            'Convert your existing CSS code to SASS/SCSS format with proper nesting structure and indentation. This tool helps you migrate from CSS to SASS for better maintainability and organization.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'How to Use',
      guide_description: 'Convert CSS to SASS in 3 simple steps:',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: 'Paste CSS',
          step_description: 'Add your CSS code to the input area.',
        },
        {
          step_key: 'Step 2:',
          step_title: 'Get SASS',
          step_description: 'View the converted SASS code in the output area.',
        },
        {
          step_key: 'Step 3:',
          step_title: 'Copy & Use',
          step_description: 'Copy the SASS code and use it in your project.',
        },
      ],
    },
    development_tools_how_use: {
      how_use_title: 'Use Cases',
      how_use_description: 'When this tool helps:',
      point: [
        {
          title: 'Migration',
          description: 'Convert existing CSS projects to SASS.',
        },
        {
          title: 'Learning',
          description: 'Understand SASS syntax and structure.',
        },
        {
          title: 'Quick conversion',
          description: 'Convert small CSS snippets to SASS format.',
        },
      ],
    },
    meta_data: {
      meta_title: 'CSS to SASS Converter - Online Tool',
      meta_description:
        'Convert CSS code to SASS/SCSS format with proper nesting and indentation.',
      og_title: 'CSS to SASS Converter - Developer Utility',
      og_description:
        'Transform your CSS into SASS format for better maintainability.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
