import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'html-unescape',
  category: 'Category145',
  route: PATHS.HTML_UNESCAPE,
  ...{
    hero_section: {
      title: 'HTML Unescape',
      description:
        'Convert HTML entities back into normal characters instantly – perfect for developers, editors, and decoding escaped content.',
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
      about_title: 'What is the HTML Unescape Tool?',
      about_description: [
        {
          description:
            'The HTML Unescape tool converts encoded HTML entities like `&lt;`, `&gt;`, and `&amp;` back into their original characters.',
        },
        {
          description:
            'It’s useful for decoding escaped HTML content, restoring readable text, or preparing code snippets for execution.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'How to Use the HTML Unescape Tool',
      guide_description: 'Follow these simple steps:',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: 'Enter escaped text:',
          step_description:
            'Paste or type HTML-escaped content (like `&lt;div&gt;Hello&lt;/div&gt;`) into the input field.',
        },
        {
          step_key: 'Step 2:',
          step_title: 'Unescape text:',
          step_description:
            'Click the unescape button to convert HTML entities into normal characters.',
        },
        {
          step_key: 'Step 3:',
          step_title: 'Copy result:',
          step_description:
            'Copy the decoded plain text or code for reuse in your project, CMS, or editor.',
        },
        {
          step_key: 'Step 4:',
          step_title: 'Re-escape (optional):',
          step_description:
            'If needed, you can re-encode the text back into safe HTML entities.',
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
            'Decode HTML-escaped strings to restore valid markup and readable content.',
        },
        {
          title: 'Content Management',
          description:
            'Unescape entities when working with CMS exports or database-stored HTML.',
        },
        {
          title: 'Debugging & Testing',
          description:
            'Quickly decode encoded snippets when testing user input or API responses.',
        },
      ],
    },
    meta_data: {
      meta_title: 'HTML Unescape Tool – Decode HTML Entities',
      meta_description:
        'Unescape HTML entities like &lt;, &gt;, and &amp; back into characters instantly. Free online HTML unescape tool for developers and editors.',
      og_title: 'HTML Unescape – Free Online Tool',
      og_description:
        'Convert HTML entities into normal text quickly. Useful for decoding escaped content in code, CMS, or APIs.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
