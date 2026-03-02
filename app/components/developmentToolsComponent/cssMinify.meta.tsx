import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'css-minify',
  category: 'Category73',
  route: PATHS.CSS_MINIFY,
  ...{
    hero_section: {
      title: 'CSS Minify',
      description:
        'Beautify or minify CSS with options for indentation and comment handling.',
    },
    development_tools_list: [
      { tool: 'Markdown To HTML', url: PATHS.MARKDOWN_TO_HTML },
      { tool: 'Text Lower Case', url: PATHS.TEXT_LOWERCASE_CONVERTER },
      { tool: 'Credit Card Generator', url: PATHS.CREDIT_CARD_GENERATOR },
      { tool: 'JavaScript Minifier', url: PATHS.JAVASCRIPT_MINIFIER },
      { tool: 'Line Count Tool', url: PATHS.LINE_COUNTER_TOOL },
      { tool: 'JS Obfuscator', url: PATHS.JS_OBFUSCATOR },
    ],
    development_tools_about_details: {
      about_title: 'What is a CSS Minify tool?',
      about_description: [
        {
          description:
            'Minify removes whitespace/comments for smaller bundle sizes.',
        },
        {
          description:
            'Minify removes whitespace/comments for smaller bundle sizes.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'Using CSS Minify',
      guide_description: 'Quick two‑step workflow:',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: 'Paste or upload:',
          step_description: 'Provide your CSS file or snippet.',
        },
        {
          step_key: 'Step 2:',
          step_title: 'Choose action:',
          step_description: 'Minify and export.',
        },
      ],
    },
    development_tools_how_use: {
      how_use_title: 'How It’s Used',
      how_use_description: 'Common use cases:',
      point: [
        {
          title: 'Optimization',
          description: 'Keep code readable and consistent across teams.',
        },
        {
          title: 'Optimization',
          description: 'Minify CSS for faster load times.',
        },
        {
          title: 'Diff clarity',
          description: 'Minified CSS leads to cleaner diffs.',
        },
      ],
    },
    meta_data: {
      meta_title: 'CSS Minify – Clean or Compress CSS',
      meta_description:
        'Beautify or minify CSS online; copy or download the output.',
      og_title: 'CSS Minify – BetterBugs Tools',
      og_description: 'Paste CSS, minify, then export.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
