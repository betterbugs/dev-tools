import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'octal-to-decimal-converter',
  category: 'Category126',
  route: PATHS.OCTAL_TO_DECIMAL_CONVERTER,
  ...{
    hero_section: {
      title: 'Octal to Decimal Converter',
      description:
        'Convert octal numbers into decimal values instantly – perfect for students, programmers, and computer science learners.',
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
      about_title: 'What is the Octal to Decimal Converter?',
      about_description: [
        {
          description:
            'The Octal to Decimal Converter quickly transforms octal (base-8) numbers into their decimal (base-10) equivalents.',
        },
        {
          description:
            'It’s useful for students studying number systems, programmers working with octal data, and professionals dealing with low-level computing.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'How to Use the Octal to Decimal Converter',
      guide_description: 'Follow these simple steps:',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: 'Enter octal number:',
          step_description:
            'Type or paste the octal number (e.g., 157) into the input box.',
        },
        {
          step_key: 'Step 2:',
          step_title: 'Convert to decimal:',
          step_description:
            'Click the convert button to instantly calculate the decimal equivalent.',
        },
        {
          step_key: 'Step 3:',
          step_title: 'View results:',
          step_description:
            'The tool will display the decimal value of your octal input.',
        },
        {
          step_key: 'Step 4:',
          step_title: 'Copy or use:',
          step_description:
            'Copy the result for use in coding, computer science exercises, or digital electronics.',
        },
      ],
    },
    development_tools_how_use: {
      how_use_title: 'Common Uses',
      how_use_description: 'Why you might use this tool:',
      point: [
        {
          title: 'Education',
          description:
            'Learn and practice conversions between octal and decimal number systems.',
        },
        {
          title: 'Programming',
          description:
            'Convert octal numbers when working with file permissions, memory addresses, or low-level systems.',
        },
        {
          title: 'Digital systems',
          description:
            'Understand octal representations in computer architecture, operating systems, and microcontrollers.',
        },
      ],
    },
    meta_data: {
      meta_title: 'Octal to Decimal Converter – Convert Octal Numbers Online',
      meta_description:
        'Easily convert octal numbers into decimal values online. Perfect for students, programmers, and computer science learners.',
      og_title: 'Octal to Decimal Converter – Free Online Tool',
      og_description:
        'Quickly transform octal numbers into decimal equivalents. Ideal for developers, students, and digital electronics learners.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
