import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'numbers-to-words',
  category: 'Category136',
  route: PATHS.NUMBERS_TO_WORDS,
  ...{
    hero_section: {
      title: 'Numbers to Words Converter',
      description:
        'Convert numerical digits into written words instantly – perfect for students, accountants, and anyone preparing documents or data in word format.',
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
      about_title: 'What is the Numbers to Words Converter?',
      about_description: [
        {
          description:
            'The Numbers to Words Converter transforms numeric values (like 123) into their written equivalents (one hundred twenty-three).',
        },
        {
          description:
            'It’s useful for writing checks, preparing formal documents, and helping students learn number names.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'How to Use the Numbers to Words Converter',
      guide_description: 'Follow these simple steps:',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: 'Enter number:',
          step_description:
            'Type or paste the numeric value (e.g., 2056) into the input box.',
        },
        {
          step_key: 'Step 2:',
          step_title: 'Convert to words:',
          step_description:
            'Click the convert button to instantly transform the digits into written words.',
        },
        {
          step_key: 'Step 3:',
          step_title: 'View results:',
          step_description:
            'The tool will display the number written out in words (e.g., two thousand fifty-six).',
        },
        {
          step_key: 'Step 4:',
          step_title: 'Copy or use:',
          step_description:
            'Copy the converted words for checks, documents, or educational purposes.',
        },
      ],
    },
    development_tools_how_use: {
      how_use_title: 'Common Uses',
      how_use_description: 'Why you might use this tool:',
      point: [
        {
          title: 'Banking & Finance',
          description:
            'Convert numbers into words for writing checks and official financial documents.',
        },
        {
          title: 'Education',
          description:
            'Assist students in learning number names and understanding numeric values.',
        },
        {
          title: 'Documentation',
          description:
            'Generate word-form numbers for contracts, legal papers, or data entry tasks.',
        },
      ],
    },
    meta_data: {
      meta_title:
        'Numbers to Words Converter – Convert Digits into Words Online',
      meta_description:
        'Easily convert numbers into written words. Useful for writing checks, legal documents, and educational purposes.',
      og_title: 'Numbers to Words Converter – Free Online Tool',
      og_description:
        "Instantly change digits like 500 into 'five hundred'. Perfect for finance, education, and professional documents.",
      og_image: '/images/og-images/Cover.png',
    },
  }
};
