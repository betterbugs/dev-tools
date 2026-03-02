import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'php-formatter',
  category: 'Category114',
  route: PATHS.PHP_FORMATTER,
  ...{
    hero_section: {
      title: 'PHP Formatter',
      description:
        'Format PHP code with clean indentation, spacing, and alignment – perfect for writing professional, readable, and maintainable PHP scripts.',
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
      about_title: 'What is the PHP Formatter Tool?',
      about_description: [
        {
          description:
            'The PHP Formatter tool automatically organizes PHP code by fixing indentation, spacing, and line breaks for better readability.',
        },
        {
          description:
            'It’s especially useful for developers who want consistent and professional-looking PHP code without manual formatting.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'How to Use the PHP Formatter Tool',
      guide_description: 'Follow these simple steps:',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: 'Paste PHP code:',
          step_description:
            'Copy your PHP script and paste it into the input editor.',
        },
        {
          step_key: 'Step 2:',
          step_title: 'Select formatting options:',
          step_description:
            'Choose options like indentation style, spacing, or bracket alignment.',
        },
        {
          step_key: 'Step 3:',
          step_title: 'Format code:',
          step_description:
            'Click the format button to instantly beautify your PHP code.',
        },
        {
          step_key: 'Step 4:',
          step_title: 'Copy or download:',
          step_description:
            'Copy the formatted PHP code or download it for your project.',
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
            'Ensure PHP scripts are easy to read, understand, and maintain.',
        },
        {
          title: 'Collaboration',
          description:
            'Maintain consistent coding style across teams and projects.',
        },
        {
          title: 'Debugging',
          description:
            'Formatted code makes it easier to identify errors and optimize scripts.',
        },
      ],
    },
    meta_data: {
      meta_title: 'PHP Formatter – Beautify & Format PHP Code Online',
      meta_description:
        'Format and beautify PHP code online. Fix indentation, spacing, and structure for clean, professional PHP output.',
      og_title: 'PHP Formatter – Free Online Tool',
      og_description:
        'Easily format and beautify PHP code. Perfect for developers who want clean, readable, and production-ready PHP scripts.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
