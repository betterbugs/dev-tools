import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'words-to-numbers',
  category: 'Category135',
  route: PATHS.WORDS_TO_NUMBERS,
  ...{
    hero_section: {
      title: 'Words to Numbers Converter',
      description:
        'Convert written words into numerical digits instantly – perfect for students, accountants, and anyone working with data entry or text-based numbers.',
    },
    development_tools_list: [
      { tool: 'Character Count Tool', url: PATHS.CHARACTER_COUNT_TOOL },
      { tool: 'Text Repeater', url: PATHS.RANDOM_CHARACTER_GENERATOR },
      { tool: 'Text Cleaner', url: PATHS.RANDOM_CHARACTER_GENERATOR },
      { tool: 'Word Counter', url: PATHS.WORD_COUNT_TOOL },
      { tool: 'Sort Words', url: PATHS.SORT_WORD },
      { tool: 'JavaScript Minifier', url: PATHS.JAVASCRIPT_MINIFIER },
      { tool: 'Line Count Tool', url: PATHS.LINE_COUNTER_TOOL },
    ],
    development_tools_about_details: {
      about_title: 'What is the Words to Numbers Converter?',
      about_description: [
        {
          description:
            "The Words to Numbers Converter transforms written numbers (like 'one hundred twenty-three') into digits (123).",
        },
        {
          description:
            'It’s useful for data entry, accounting, education, and text analysis where numbers are written in words.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'How to Use the Words to Numbers Converter',
      guide_description: 'Follow these simple steps:',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: 'Enter words:',
          step_description:
            "Type or paste the written number (e.g., 'two thousand and fifty-six') into the input box.",
        },
        {
          step_key: 'Step 2:',
          step_title: 'Convert to digits:',
          step_description:
            'Click the convert button to transform the words into numerical format.',
        },
        {
          step_key: 'Step 3:',
          step_title: 'View results:',
          step_description:
            'The tool will display the digit-based number (e.g., 2056).',
        },
        {
          step_key: 'Step 4:',
          step_title: 'Copy or use:',
          step_description:
            'Copy the converted number for documents, spreadsheets, or further calculations.',
        },
      ],
    },
    development_tools_how_use: {
      how_use_title: 'Common Uses',
      how_use_description: 'Why you might use this tool:',
      point: [
        {
          title: 'Accounting & Finance',
          description:
            'Quickly convert check amounts or financial statements written in words into digits.',
        },
        {
          title: 'Education',
          description:
            'Help students understand the relationship between written and numerical forms of numbers.',
        },
        {
          title: 'Data Processing',
          description:
            'Easily parse written numbers from text documents into digit format for analysis.',
        },
      ],
    },
    meta_data: {
      meta_title:
        'Words to Numbers Converter – Convert Words into Digits Online',
      meta_description:
        'Easily convert written numbers into numerical digits. Useful for accounting, education, and data entry tasks.',
      og_title: 'Words to Numbers Converter – Free Online Tool',
      og_description:
        "Instantly change written numbers like 'five hundred' into 500. Perfect for students, professionals, and data processing.",
      og_image: '/images/og-images/Cover.png',
    },
  }
};
