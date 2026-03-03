import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'typescript-formatter',
  category: 'Category111',
  route: PATHS.TYPE_SCRIPT_FORMATTER,
  ...{
    hero_section: {
      title: 'TypeScript Formatter',
      description:
        'Format and beautify TypeScript code instantly – clean indentation, spacing, and structure for professional, readable TypeScript output.',
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
      about_title: 'What is the TypeScript Formatter Tool?',
      about_description: [
        {
          description:
            'The TypeScript Formatter tool automatically formats TypeScript code, fixing indentation, spacing, and alignment for a clean and consistent structure.',
        },
        {
          description:
            'It’s especially useful for developers who want readable, professional-looking code without manual adjustments.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'How to Use the TypeScript Formatter Tool',
      guide_description: 'Follow these simple steps:',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: 'Paste TypeScript code:',
          step_description:
            'Enter or paste your TypeScript code into the input editor.',
        },
        {
          step_key: 'Step 2:',
          step_title: 'Choose formatting preferences:',
          step_description:
            'Select options like indentation style, spacing, or semicolon usage.',
        },
        {
          step_key: 'Step 3:',
          step_title: 'Format code:',
          step_description:
            'Click the format button to instantly beautify your TypeScript code.',
        },
        {
          step_key: 'Step 4:',
          step_title: 'Copy or download:',
          step_description:
            'Copy the formatted code or download it for use in your projects.',
        },
      ],
    },
    development_tools_how_use: {
      how_use_title: 'Common Uses',
      how_use_description: 'Why you might use this tool:',
      point: [
        {
          title: 'Code readability',
          description:
            'Ensure TypeScript code is easy to read and maintain with consistent formatting.',
        },
        {
          title: 'Collaboration',
          description:
            'Maintain consistent coding standards across teams and projects.',
        },
        {
          title: 'Production-ready code',
          description:
            'Clean, formatted code reduces errors and improves workflow efficiency.',
        },
      ],
    },
    meta_data: {
      meta_title: 'TypeScript Formatter – Beautify & Format TS Code Online',
      meta_description:
        'Format and beautify TypeScript code online. Fix indentation, spacing, and structure for clean, consistent, and professional TypeScript output.',
      og_title: 'TypeScript Formatter – Free Online Tool',
      og_description:
        'Easily format and beautify TypeScript code. Perfect for developers who want clean, readable, and production-ready TypeScript.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
