import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'css-to-scss',
  category: 'Category45',
  route: PATHS.CSS_TO_SCSS,
  ...{
    hero_section: {
      title: 'CSS to SCSS Converter',
      description:
        'Easily convert your plain CSS code into SCSS syntax for modular, maintainable, and nested styles.',
    },
    development_tools_list: [
      { tool: 'CSS Minifier', url: PATHS.COLOR_INVERTOR },
      { tool: 'SCSS Formatter', url: PATHS.COLOR_PICKER_TOOL },
      { tool: 'Sass to CSS', url: PATHS.CSS_PRETTIFY },
      { tool: 'JavaScript Minifier', url: PATHS.JAVASCRIPT_MINIFIER },
      { tool: 'Line Count Tool', url: PATHS.LINE_COUNTER_TOOL },
      { tool: 'JS Obfuscator', url: PATHS.JS_OBFUSCATOR },
    ],
    development_tools_about_details: {
      about_title: 'What is the CSS to SCSS Converter?',
      about_description: [
        {
          description:
            'This tool converts standard CSS code into SCSS syntax, allowing you to use variables, nesting, mixins, and modular structures easily.',
        },
        {
          description:
            'It preserves all CSS rules while formatting the output for maintainable SCSS that integrates with your projects or build tools.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'How to Use the CSS to SCSS Converter',
      guide_description: 'Follow these simple steps:',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: 'Paste your CSS code:',
          step_description: 'Enter your plain CSS code into the input area.',
        },
        {
          step_key: 'Step 2:',
          step_title: 'Convert to SCSS:',
          step_description:
            'Click the convert button to transform CSS into SCSS syntax with proper nesting and formatting.',
        },
        {
          step_key: 'Step 3:',
          step_title: 'View & copy output:',
          step_description:
            'Check the generated SCSS code and copy it for use in your project or IDE.',
        },
        {
          step_key: 'Step 4:',
          step_title: 'Clear or modify:',
          step_description:
            'Edit the CSS input or clear it to convert new code anytime.',
        },
      ],
    },
    development_tools_how_use: {
      how_use_title: 'Common Uses',
      how_use_description: 'Why you might use this tool:',
      point: [
        {
          title: 'CSS to SCSS migration',
          description:
            'Convert existing CSS code into SCSS for easier maintenance and modularity.',
        },
        {
          title: 'Project organization',
          description:
            'Use SCSS features like nesting, variables, and mixins to structure styles efficiently.',
        },
        {
          title: 'Frontend development',
          description:
            'Integrate SCSS into your build pipeline for modern web projects with Sass preprocessors.',
        },
      ],
    },
    meta_data: {
      meta_title: 'CSS to SCSS Converter – Convert CSS Code Online',
      meta_description:
        'Transform plain CSS into SCSS syntax instantly. Use variables, nesting, and modular styles for maintainable frontend code.',
      og_title: 'CSS to SCSS Converter – Online Tool',
      og_description:
        'Quickly convert CSS code into SCSS for modern web projects. Copy formatted SCSS code for use in your IDE or build tools.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
