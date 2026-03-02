import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'utf8-decode',
  category: 'Category121',
  route: PATHS.UTF8_DECODE,
  ...{
    hero_section: {
      title: 'UTF8 Decode',
      description:
        'Decode UTF-8 encoded text back into readable characters – perfect for web data, encoded strings, or debugging text encoding issues.',
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
      about_title: 'What is the UTF8 Decode Tool?',
      about_description: [
        {
          description:
            'The UTF8 Decode tool converts UTF-8 encoded text into readable characters.',
        },
        {
          description:
            'It’s useful for developers, content creators, and analysts who encounter encoded data in web pages, APIs, or databases.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'How to Use the UTF8 Decode Tool',
      guide_description: 'Follow these simple steps:',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: 'Paste UTF-8 text:',
          step_description:
            'Enter or paste the UTF-8 encoded text into the input box.',
        },
        {
          step_key: 'Step 2:',
          step_title: 'Decode text:',
          step_description:
            'Click the decode button to convert the text into readable characters.',
        },
        {
          step_key: 'Step 3:',
          step_title: 'View results:',
          step_description:
            'The tool will display the decoded text in a human-readable format.',
        },
        {
          step_key: 'Step 4:',
          step_title: 'Copy or use:',
          step_description:
            'Copy the decoded text for use in documents, debugging, or web projects.',
        },
      ],
    },
    development_tools_how_use: {
      how_use_title: 'Common Uses',
      how_use_description: 'Why you might use this tool:',
      point: [
        {
          title: 'Web content decoding',
          description:
            'Decode UTF-8 content from websites or APIs to read characters correctly.',
        },
        {
          title: 'Debugging',
          description:
            'Troubleshoot encoding issues in software, scripts, or data files.',
        },
        {
          title: 'Data cleaning',
          description:
            'Convert encoded text into readable form for analysis, reports, or documentation.',
        },
      ],
    },
    meta_data: {
      meta_title:
        'UTF8 Decode – Convert UTF-8 Encoded Text to Readable Text Online',
      meta_description:
        'Decode UTF-8 encoded text into readable characters online. Perfect for web data, APIs, and debugging encoding issues.',
      og_title: 'UTF8 Decode – Free Online Tool',
      og_description:
        'Easily convert UTF-8 encoded text into readable characters. Ideal for developers, analysts, and content creators.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
