import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'python-formatter',
  category: 'Category115',
  route: PATHS.PYTHON_FORMATTER,
  ...{
    hero_section: {
      title: 'Python Formatter',
      description:
        'Format Python code with proper indentation, spacing, and alignment – ensuring clean, consistent, and PEP 8–compliant scripts.',
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
      about_title: 'What is the Python Formatter Tool?',
      about_description: [
        {
          description:
            'The Python Formatter tool formats Python code by fixing indentation, spacing, and alignment while following PEP 8 guidelines.',
        },
        {
          description:
            'It’s ideal for developers who want clean, professional-looking Python scripts that are easy to maintain and debug.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'How to Use the Python Formatter Tool',
      guide_description: 'Follow these simple steps:',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: 'Paste Python code:',
          step_description:
            'Copy your Python script and paste it into the input editor.',
        },
        {
          step_key: 'Step 2:',
          step_title: 'Choose formatting style:',
          step_description:
            'Select options for indentation size, spacing, or line wrapping.',
        },
        {
          step_key: 'Step 3:',
          step_title: 'Format code:',
          step_description:
            'Click the format button to automatically organize your Python code.',
        },
        {
          step_key: 'Step 4:',
          step_title: 'Copy or download:',
          step_description:
            'Copy the beautified Python code or download it for your projects.',
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
            'Make Python scripts easier to read, share, and maintain.',
        },
        {
          title: 'Collaboration',
          description:
            'Keep a consistent style across teams working on Python projects.',
        },
        {
          title: 'PEP 8 compliance',
          description:
            'Ensure your Python code follows industry-standard formatting rules.',
        },
      ],
    },
    meta_data: {
      meta_title: 'Python Formatter – Beautify & Format Python Code Online',
      meta_description:
        'Format and beautify Python code online. Fix indentation, spacing, and structure to create clean, PEP 8–compliant Python scripts.',
      og_title: 'Python Formatter – Free Online Tool',
      og_description:
        'Easily format and beautify Python code. Perfect for developers who want clean, readable, and production-ready scripts.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
