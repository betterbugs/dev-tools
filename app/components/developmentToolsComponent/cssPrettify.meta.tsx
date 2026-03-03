import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'css-prettify',
  category: 'Category71',
  route: PATHS.CSS_PRETTIFY,
  ...{
    hero_section: {
      title: 'CSS Prettify',
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
      about_title: 'What is a CSS Prettify tool?',
      about_description: [
        {
          description:
            'Prettify formats CSS for readability and consistent diffs.',
        },
        {
          description:
            'Minify removes whitespace/comments for smaller bundle sizes.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'Using CSS Prettify',
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
          step_description: 'Prettify or Minify and export.',
        },
      ],
    },
    development_tools_how_use: {
      how_use_title: 'How It’s Used',
      how_use_description: 'Common use cases:',
      point: [
        {
          title: 'Style hygiene',
          description: 'Keep code readable and consistent across teams.',
        },
        {
          title: 'Optimization',
          description: 'Ship smaller CSS for production.',
        },
        {
          title: 'Diff clarity',
          description: 'Formatted CSS leads to cleaner diffs.',
        },
      ],
    },
    meta_data: {
      meta_title: 'CSS Prettify & Minify – Clean or Compress CSS',
      meta_description:
        'Beautify or minify CSS online; copy or download the output.',
      og_title: 'CSS Prettify – BetterBugs Tools',
      og_description: 'Paste CSS, prettify or minify, then export.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
