import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'css-to-stylus',
  category: 'Category53',
  route: PATHS.CSS_TO_STYLUS,
  ...{
    hero_section: {
      title: 'CSS to Stylus Converter',
      description:
        'Convert standard CSS into Stylus syntax with indentation and no braces/semicolons for a concise style.',
    },
    development_tools_list: [
      { tool: 'SCSS to CSS', url: '/development-tools/scss-to-css' },
      { tool: 'CSS to SASS', url: '/development-tools/css-to-sass' },
      { tool: 'CSS to LESS', url: '/development-tools/css-to-less' },
    ],
    development_tools_about_details: {
      about_title: 'What is the CSS to Stylus Converter?',
      about_description: [
        {
          description:
            'This tool converts CSS rules into Stylus format by replacing braces with indentation and dropping semicolons.',
        },
        {
          description:
            'It’s useful when migrating projects to Stylus or learning the Stylus syntax from existing CSS snippets.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'How to Use the CSS to Stylus Converter',
      guide_description: 'Convert CSS to compact Stylus in a few steps:',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: 'Paste CSS:',
          step_description: 'Paste or upload your .css file or snippet.',
        },
        {
          step_key: 'Step 2:',
          step_title: 'Options:',
          step_description:
            'Choose indent size and whether to keep comments/braces/semicolons.',
        },
        {
          step_key: 'Step 3:',
          step_title: 'Convert:',
          step_description: 'Click Convert or enable Auto‑update.',
        },
        {
          step_key: 'Step 4:',
          step_title: 'Copy/Download:',
          step_description: 'Copy the Stylus output or download a .styl file.',
        },
      ],
    },
    development_tools_how_use: {
      how_use_title: 'Common Uses',
      how_use_description:
        'Ideal for codebase migrations, style refactors, and learning exercises.',
      point: [
        {
          title: 'Migration',
          description:
            'Refactor CSS codebases to Stylus without manual retyping.',
        },
        {
          title: 'Snippets',
          description:
            'Quickly transform CSS examples into Stylus for prototypes.',
        },
        {
          title: 'Education',
          description: 'See how CSS maps to Stylus syntax and indentation.',
        },
      ],
    },
    meta_data: {
      meta_title: 'CSS to Stylus – Convert CSS to Stylus Online',
      meta_description:
        'Convert CSS into Stylus syntax online. Indentation-based output without braces and semicolons. Copy or download instantly.',
      og_title: 'CSS to Stylus – Free Online Converter',
      og_description: 'Paste CSS and get Stylus output instantly.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
