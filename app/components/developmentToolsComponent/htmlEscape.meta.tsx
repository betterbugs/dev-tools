import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'html-escape',
  category: 'Category144',
  route: PATHS.HTML_ESCAPE,
  ...{
    hero_section: {
      title: 'HTML Escape',
      description:
        'Convert special characters into HTML entities instantly – perfect for developers, content editors, and preventing XSS vulnerabilities.',
    },
    development_tools_list: [
      { tool: 'Character Count Tool', url: PATHS.CHARACTER_COUNT_TOOL },
      { tool: 'Text Repeater', url: PATHS.TEXT_REPEATER },
      { tool: 'Text Cleaner', url: PATHS.TEXT_COMPARE },
      { tool: 'Word Counter', url: PATHS.WORD_COUNT_TOOL },
      { tool: 'Sort Words', url: PATHS.SORT_WORD },
      { tool: 'JavaScript Minifier', url: PATHS.JAVASCRIPT_MINIFIER },
      { tool: 'Line Count Tool', url: PATHS.LINE_COUNTER_TOOL },
    ],
    development_tools_about_details: {
      about_title: 'What is the HTML Escape Tool?',
      about_description: [
        {
          description:
            'The HTML Escape tool converts characters like <, >, &, and quotes into safe HTML entities.',
        },
        {
          description:
            'It’s useful for preventing HTML injection, ensuring valid code display, and protecting against XSS attacks.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'How to Use the HTML Escape Tool',
      guide_description: 'Follow these simple steps:',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: 'Enter text:',
          step_description:
            'Paste or type the content you want to escape into the input field.',
        },
        {
          step_key: 'Step 2:',
          step_title: 'Escape text:',
          step_description:
            'Click the escape button to convert all special characters into HTML entities.',
        },
        {
          step_key: 'Step 3:',
          step_title: 'Copy result:',
          step_description:
            'Copy the escaped HTML text for safe use in your code, CMS, or web page.',
        },
        {
          step_key: 'Step 4:',
          step_title: 'Unescape (optional):',
          step_description:
            'If needed, you can also decode HTML entities back into plain text.',
        },
      ],
    },
    development_tools_how_use: {
      how_use_title: 'Common Uses',
      how_use_description: 'Why you might use this tool:',
      point: [
        {
          title: 'Web Development',
          description:
            'Escape characters when embedding text inside HTML to prevent breaking markup.',
        },
        {
          title: 'Security',
          description:
            'Protect applications from XSS and injection by encoding unsafe characters.',
        },
        {
          title: 'Content Display',
          description:
            'Display raw code snippets (like <div>) in blogs, forums, or CMS without rendering them.',
        },
      ],
    },
    meta_data: {
      meta_title: 'HTML Escape Tool – Convert Characters to HTML Entities',
      meta_description:
        'Escape HTML special characters instantly. Free online HTML escape tool for web developers, editors, and preventing XSS vulnerabilities.',
      og_title: 'HTML Escape – Free Online Tool',
      og_description:
        'Convert text into safe HTML entities. Perfect for developers and content editors to prevent XSS and display code safely.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
