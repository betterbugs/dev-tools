import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'html-minify',
  category: 'Category72',
  route: PATHS.HTML_MINIFY,
  ...{
    hero_section: {
      title: 'HTML Minify',
      description:
        'Format or minify HTML with one click; copy or download the result.',
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
      about_title: 'What is an HTML Minify tool?',
      about_description: [
        {
          description:
            'Minify removes whitespace and comments for smaller payloads.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'Using HTML Minify',
      guide_description: 'Clean up or compress HTML in two steps:',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: 'Paste or upload:',
          step_description: 'Provide your HTML snippet or file.',
        },
        {
          step_key: 'Step 2:',
          step_title: 'Choose action:',
          step_description: 'Minify, then copy/download output.',
        },
      ],
    },
    development_tools_how_use: {
      how_use_title: 'How It’s Used',
      how_use_description: 'Common use cases:',
      point: [
        {
          title: 'Code reviews',
          description: 'Normalize formatting before committing.',
        },
        {
          title: 'Performance',
          description: 'Minify HTML for faster load times.',
        },
        {
          title: 'Debugging',
          description: 'Pretty output to inspect nested markup.',
        },
      ],
    },
    meta_data: {
      meta_title: 'HTML Minify – Format or Compress HTML',
      meta_description: 'Minify HTML code online and export the result.',
      og_title: 'HTML Minify – BetterBugs Tools',
      og_description: 'Paste HTML, minify, then copy or download.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
