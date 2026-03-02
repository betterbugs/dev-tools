import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'decimal-to-hex',
  category: 'Category128',
  route: PATHS.DECIMAL_TO_HEX,
  ...{
    hero_section: {
      title: 'Decimal to Hex Converter',
      description:
        'Convert decimal numbers into hexadecimal values instantly – perfect for students, programmers, and computer science learners.',
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
      about_title: 'What is the Decimal to Hex Converter?',
      about_description: [
        {
          description:
            'The Decimal to Hex Converter quickly transforms decimal (base-10) numbers into their hexadecimal (base-16) equivalents.',
        },
        {
          description:
            'It’s useful for students learning number systems, programmers working with memory addresses, and professionals dealing with low-level computing.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'How to Use the Decimal to Hex Converter',
      guide_description: 'Follow these simple steps:',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: 'Enter decimal number:',
          step_description:
            'Type or paste the decimal number (e.g., 255) into the input box.',
        },
        {
          step_key: 'Step 2:',
          step_title: 'Convert to hexadecimal:',
          step_description:
            'Click the convert button to instantly calculate the hexadecimal equivalent.',
        },
        {
          step_key: 'Step 3:',
          step_title: 'View results:',
          step_description:
            'The tool will display the hexadecimal representation of your decimal input.',
        },
        {
          step_key: 'Step 4:',
          step_title: 'Copy or use:',
          step_description:
            'Copy the hex result for use in coding, debugging, or digital electronics.',
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
            'Learn and practice conversions between decimal and hexadecimal number systems.',
        },
        {
          title: 'Programming',
          description:
            'Convert decimal numbers to hex for working with memory addresses, color codes, or encryption.',
        },
        {
          title: 'Digital systems',
          description:
            'Understand hexadecimal values in computer architecture, networking, and debugging.',
        },
      ],
    },
    meta_data: {
      meta_title: 'Decimal to Hex Converter – Convert Decimal Numbers Online',
      meta_description:
        'Easily convert decimal numbers into hexadecimal values online. Perfect for students, programmers, and computer science learners.',
      og_title: 'Decimal to Hex Converter – Free Online Tool',
      og_description:
        'Quickly transform decimal numbers into hexadecimal equivalents. Ideal for developers, students, and electronics learners.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
