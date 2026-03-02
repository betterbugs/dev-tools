import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'decimal-to-octal-converter',
  category: 'Category127',
  route: PATHS.DECIMAL_TO_OCTAL_CONVERTER,
  ...{
    hero_section: {
      title: 'Decimal to Octal Converter',
      description:
        'Convert decimal numbers into octal values instantly – perfect for students, programmers, and computer science learners.',
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
      about_title: 'What is the Decimal to Octal Converter?',
      about_description: [
        {
          description:
            'The Decimal to Octal Converter quickly transforms decimal (base-10) numbers into their octal (base-8) equivalents.',
        },
        {
          description:
            'It’s useful for students studying number systems, programmers working with octal values, and professionals dealing with low-level computing.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'How to Use the Decimal to Octal Converter',
      guide_description: 'Follow these simple steps:',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: 'Enter decimal number:',
          step_description:
            'Type or paste the decimal number (e.g., 125) into the input box.',
        },
        {
          step_key: 'Step 2:',
          step_title: 'Convert to octal:',
          step_description:
            'Click the convert button to instantly calculate the octal equivalent.',
        },
        {
          step_key: 'Step 3:',
          step_title: 'View results:',
          step_description:
            'The tool will display the octal representation of your decimal input.',
        },
        {
          step_key: 'Step 4:',
          step_title: 'Copy or use:',
          step_description:
            'Copy the octal result for use in coding, computer science exercises, or digital electronics.',
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
            'Learn and practice conversions between decimal and octal number systems.',
        },
        {
          title: 'Programming',
          description:
            'Convert decimal numbers to octal when working with file permissions, memory addresses, or low-level systems.',
        },
        {
          title: 'Digital systems',
          description:
            'Understand octal representations in computer architecture, operating systems, and microcontrollers.',
        },
      ],
    },
    meta_data: {
      meta_title: 'Decimal to Octal Converter – Convert Decimal Numbers Online',
      meta_description:
        'Easily convert decimal numbers into octal values online. Perfect for students, programmers, and computer science learners.',
      og_title: 'Decimal to Octal Converter – Free Online Tool',
      og_description:
        'Quickly transform decimal numbers into octal equivalents. Ideal for developers, students, and digital electronics learners.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
