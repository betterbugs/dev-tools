import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'strip-html',
  category: 'Category147',
  route: PATHS.STRIP_HTML,
  ...{
    hero_section: {
      title: 'Strip HTML',
      description:
        'Remove HTML tags, scripts, and styles to extract clean plain text.',
    },
    development_tools_list: [
      { tool: 'HTML Escape', url: PATHS.HTML_ESCAPE },
      { tool: 'HTML Unescape', url: PATHS.HTML_UNESCAPE },
      { tool: 'Text Cleaner', url: PATHS.TEXT_COMPARE },
      { tool: 'Character Count', url: PATHS.CHARACTER_COUNT_TOOL },
    ],
    development_tools_about_details: {
      about_title: 'What is the Strip HTML Tool?',
      about_description: [
        {
          description:
            'Strip HTML removes markup (tags, scripts, and styles) and converts entities to readable characters, returning plain text.',
        },
        {
          description:
            'Useful for sanitizing content, preparing text for analysis, or extracting readable content from HTML sources.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'How to Use',
      guide_description: 'Follow these steps:',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: 'Paste HTML:',
          step_description: 'Paste or type HTML into the input area.',
        },
        {
          step_key: 'Step 2:',
          step_title: 'Choose options:',
          step_description:
            'Toggle preserve line breaks and collapse whitespace.',
        },
        {
          step_key: 'Step 3:',
          step_title: 'Copy output:',
          step_description: 'Copy the clean text for use in your app or docs.',
        },
      ],
    },
    development_tools_how_use: {
      how_use_title: 'Common Uses',
      how_use_description: 'Why you might use this tool:',
      point: [
        {
          title: 'Content Extraction',
          description: 'Extract readable text from web pages or HTML snippets.',
        },
        {
          title: 'Data Cleaning',
          description: 'Normalize input by removing markup before processing.',
        },
        {
          title: 'Security',
          description:
            'Reduce risk by stripping scripts and styles from untrusted HTML.',
        },
      ],
    },
    meta_data: {
      meta_title: 'Strip HTML – Convert HTML to Plain Text',
      meta_description:
        'Remove HTML tags, scripts, and styles. Convert entities and output clean plain text instantly.',
      og_title: 'Strip HTML – Free Online Tool',
      og_description:
        'Paste HTML and get plain text with options for line breaks and whitespace.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
