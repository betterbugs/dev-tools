import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'scss-to-css',
  category: 'Category44',
  route: PATHS.SCSS_TO_CSS,
  ...{
    hero_section: {
      title: 'SCSS to CSS Converter',
      description:
        'Easily convert your SCSS (Sass) code into plain CSS for browsers and production use.',
    },
    development_tools_list: [
      { tool: 'CSS Minifier', url: PATHS.CSS_TO_SCSS },
      { tool: 'SCSS Formatter', url: PATHS.SCSS_TO_CSS },
      { tool: 'CSS Prettify', url: PATHS.CSS_TO_SCSS },
      { tool: 'JavaScript Minifier', url: PATHS.JAVASCRIPT_MINIFIER },
      { tool: 'Line Count Tool', url: PATHS.LINE_COUNTER_TOOL },
      { tool: 'JS Obfuscator', url: PATHS.JS_OBFUSCATOR },
    ],
    development_tools_about_details: {
      about_title: 'What is the SCSS to CSS Converter?',
      about_description: [
        {
          description:
            'This tool converts SCSS (Sassy CSS) code into browser-friendly plain CSS. SCSS is a preprocessor with features like variables, nesting, and mixins, but browsers only understand CSS.',
        },
        {
          description:
            'With this converter, you can quickly compile your SCSS into clean CSS, ready to be used in production or embedded in your projects.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'How to Use the SCSS to CSS Converter',
      guide_description: 'Follow these simple steps:',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: 'Paste your SCSS code:',
          step_description: 'Enter your SCSS code into the input area.',
        },
        {
          step_key: 'Step 2:',
          step_title: 'Convert to CSS:',
          step_description:
            'Click the convert button to compile SCSS into plain CSS.',
        },
        {
          step_key: 'Step 3:',
          step_title: 'View & copy output:',
          step_description:
            'Check the generated CSS and copy it for use in your website or project.',
        },
        {
          step_key: 'Step 4:',
          step_title: 'Clear or modify:',
          step_description:
            'Edit the SCSS input or clear it to convert new code anytime.',
        },
      ],
    },
    development_tools_how_use: {
      how_use_title: 'Common Uses',
      how_use_description: 'Why you might use this tool:',
      point: [
        {
          title: 'Browser-ready CSS',
          description:
            'Compile SCSS into plain CSS since browsers don’t natively understand SCSS.',
        },
        {
          title: 'Production deployment',
          description:
            'Prepare clean, compiled CSS for your production builds.',
        },
        {
          title: 'Testing & debugging',
          description: 'Quickly test how SCSS code looks once compiled to CSS.',
        },
      ],
    },
    meta_data: {
      meta_title: 'SCSS to CSS Converter – Convert SCSS Code Online',
      meta_description:
        'Convert SCSS (Sass) code into plain CSS instantly. Use this tool to compile SCSS into browser-ready CSS for your projects.',
      og_title: 'SCSS to CSS Converter – Online Tool',
      og_description:
        'Quickly transform SCSS into clean CSS. Copy or download the compiled CSS for use in your website or application.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
