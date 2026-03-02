import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'ascii-to-unicode-converter',
  category: 'Category54',
  route: PATHS.ASCII_TO_UNICODE_CONVERTER,
  ...{
    hero_section: {
      title: 'ASCII to Unicode Converter',
      description:
        'Decode ASCII-safe \\uXXXX escape sequences back to readable Unicode text.',
    },
    development_tools_list: [
      { tool: 'Unicode to ASCII', url: PATHS.UNICODE_TO_ASCII_CONVERTER },
      { tool: 'Text Lower Case', url: PATHS.TEXT_LOWERCASE_CONVERTER },
      { tool: 'Word Count', url: PATHS.WORD_COUNT_TOOL },
      { tool: 'Character Count Tool', url: PATHS.CHARACTER_COUNT_TOOL },
      { tool: 'Line Count Tool', url: PATHS.LINE_COUNTER_TOOL },
      { tool: 'JS Minify Tool', url: PATHS.JAVASCRIPT_MINIFIER },
    ],
    development_tools_about_details: {
      about_title: 'What is the ASCII to Unicode Converter?',
      about_description: [
        {
          description:
            'This tool decodes Unicode escape sequences (e.g., \\u00E9) into actual Unicode characters.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'Step-by-Step Guide',
      guide_description:
        'Paste ASCII-safe text containing \\uXXXX sequences and convert to Unicode.',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: 'Enter Escaped Text:',
          step_description: 'Paste ASCII text with \\uXXXX sequences.',
        },
        {
          step_key: 'Step 2:',
          step_title: 'Convert:',
          step_description: 'Click Convert to decode to Unicode characters.',
        },
        {
          step_key: 'Step 3:',
          step_title: 'Copy:',
          step_description: 'Copy the decoded Unicode output.',
        },
      ],
    },
    development_tools_how_use: {
      how_use_title: 'Here’s How it’s Used:',
      how_use_description:
        'Useful for reading encoded logs, config files, or strings from code generators.',
      point: [
        {
          title: 'Logs & Diagnostics',
          description: 'Decode escaped payloads for readability.',
        },
        {
          title: 'Config Files',
          description: 'Turn escaped sequences back into readable text.',
        },
        {
          title: 'APIs & Data',
          description: 'Decode data coming from systems that escape Unicode.',
        },
      ],
    },
    meta_data: {
      meta_title: 'ASCII to Unicode Converter - Developer Utility Tools',
      meta_description:
        'Decode ASCII-safe \\uXXXX sequences into readable Unicode text.',
      og_title: 'ASCII to Unicode Converter - Developer Utility Tools',
      og_description:
        'Guide to decoding Unicode escape sequences to human-readable text.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
