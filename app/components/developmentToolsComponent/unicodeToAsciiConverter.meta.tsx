import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'unicode-to-ascii-converter',
  category: 'Category55',
  route: PATHS.UNICODE_TO_ASCII_CONVERTER,
  ...{
    hero_section: {
      title: 'Unicode to ASCII Converter',
      description:
        'Convert Unicode text to ASCII-safe text using \\uXXXX escape sequences. Useful for serialization, debugging, and systems that require ASCII-only content.',
    },
    development_tools_list: [
      { tool: 'ASCII to Unicode', url: PATHS.ASCII_TO_UNICODE_CONVERTER },
      { tool: 'Text Lower Case', url: PATHS.TEXT_LOWERCASE_CONVERTER },
      { tool: 'Word Count', url: PATHS.WORD_COUNT_TOOL },
      { tool: 'Character Count Tool', url: PATHS.CHARACTER_COUNT_TOOL },
      { tool: 'Line Count Tool', url: PATHS.LINE_COUNTER_TOOL },
      { tool: 'JS Minify Tool', url: PATHS.JAVASCRIPT_MINIFIER },
    ],
    development_tools_about_details: {
      about_title: 'What is the Unicode to ASCII Converter?',
      about_description: [
        {
          description:
            'This tool encodes non-ASCII characters into Unicode escape sequences (e.g., \\u00E9) while preserving ASCII characters as-is.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'Step-by-Step Guide',
      guide_description:
        'Enter any Unicode text (including emojis and non-Latin scripts), then click Convert to encode as ASCII-safe escapes.',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: 'Enter Text:',
          step_description: 'Paste or type your Unicode text.',
        },
        {
          step_key: 'Step 2:',
          step_title: 'Convert:',
          step_description:
            'Click Convert to encode non-ASCII characters as \\uXXXX.',
        },
        {
          step_key: 'Step 3:',
          step_title: 'Copy:',
          step_description:
            'Copy the ASCII-safe output for use in code or config.',
        },
      ],
    },
    development_tools_how_use: {
      how_use_title: 'Here’s How it’s Used:',
      how_use_description:
        'Ideal for escaping strings in source code, JSON, logs, and systems that expect ASCII.',
      point: [
        {
          title: 'Source Code Escaping',
          description:
            'Represent non-ASCII characters in string literals safely.',
        },
        {
          title: 'Serialization',
          description:
            'Ensure text remains ASCII-safe in configs, env files, or transports.',
        },
        {
          title: 'Debugging',
          description:
            'Visualize exact code points when tracking encoding issues.',
        },
      ],
    },
    meta_data: {
      meta_title: 'Unicode to ASCII Converter - Developer Utility Tools',
      meta_description:
        'Convert Unicode to ASCII-safe \\uXXXX escapes. Useful for serialization, debugging, and ASCII-only systems.',
      og_title: 'Unicode to ASCII Converter - Developer Utility Tools',
      og_description:
        'Guide to encoding Unicode text into ASCII-safe Unicode escape sequences.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
