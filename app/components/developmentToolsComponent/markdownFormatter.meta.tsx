import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'markdown-formatter',
  category: 'Category110',
  route: PATHS.MARKDOWN_FORMATTER,
  ...{
    hero_section: {
      title: 'Markdown Formatter',
      description:
        'Format markdown text with options for trimming, normalization, and consistent styling – perfect for clean, professional markdown output.',
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
      about_title: 'What is the Markdown Formatter Tool?',
      about_description: [
        {
          description:
            'The Markdown Formatter tool helps you clean, standardize, and beautify markdown text for consistent structure and readability.',
        },
        {
          description:
            'It’s useful for developers, writers, and publishers who work with markdown files, ensuring neat formatting for documentation, blogs, or code repositories.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'How to Use the Markdown Formatter Tool',
      guide_description: 'Follow these simple steps:',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: 'Paste markdown:',
          step_description:
            'Enter or paste your markdown text into the input box.',
        },
        {
          step_key: 'Step 2:',
          step_title: 'Select formatting options:',
          step_description:
            'Choose whether to normalize headings, trim spaces, align lists, or adjust indentation.',
        },
        {
          step_key: 'Step 3:',
          step_title: 'Format markdown:',
          step_description:
            'Click the format button to automatically clean and organize your markdown.',
        },
        {
          step_key: 'Step 4:',
          step_title: 'Copy or download:',
          step_description:
            'Copy the formatted markdown or download it for use in your projects.',
        },
      ],
    },
    development_tools_how_use: {
      how_use_title: 'Common Uses',
      how_use_description: 'Why you might use this tool:',
      point: [
        {
          title: 'Documentation',
          description:
            'Keep project documentation, READMEs, and wikis clean and consistent.',
        },
        {
          title: 'Content publishing',
          description:
            'Format markdown for blogs, articles, or static site generators like Hugo or Jekyll.',
        },
        {
          title: 'Collaboration',
          description:
            'Ensure markdown files look professional and easy to read when sharing with teams.',
        },
      ],
    },
    meta_data: {
      meta_title: 'Markdown Formatter – Clean & Beautify Markdown Online',
      meta_description:
        'Format and beautify markdown text online. Clean, normalize, and style your markdown for consistent documentation, blogs, and code repositories.',
      og_title: 'Markdown Formatter – Free Online Tool',
      og_description:
        'Easily format markdown text for clean, consistent, and professional output. Perfect for developers, writers, and publishers.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
