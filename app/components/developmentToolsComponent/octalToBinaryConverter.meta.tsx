import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'octal-to-binary',
  category: 'Category130',
  route: PATHS.OCTAL_TO_BINARY,
  ...{
    hero_section: {
      title: 'Octal to Binary Converter',
      description:
        'Convert octal numbers into binary values instantly – perfect for students, programmers, and computer science learners.',
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
      about_title: 'What is the Octal to Binary Converter?',
      about_description: [
        {
          description:
            'The Octal to Binary Converter quickly transforms octal (base-8) numbers into their binary (base-2) equivalents.',
        },
        {
          description:
            'It’s useful for students learning number systems, programmers working with low-level data, and professionals analyzing digital information.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'How to Use the Octal to Binary Converter',
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
          step_title: 'Convert to binary:',
          step_description:
            'Click the convert button to instantly calculate the binary equivalent.',
        },
        {
          step_key: 'Step 3:',
          step_title: 'View results:',
          step_description:
            'The tool will display the binary representation of your octal input.',
        },
        {
          step_key: 'Step 4:',
          step_title: 'Copy or use:',
          step_description:
            'Copy the binary result for use in coding, digital systems, or computer science exercises.',
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
            'Learn and practice conversions between octal and binary number systems.',
        },
        {
          title: 'Programming',
          description:
            'Convert octal values to binary while debugging, working with file permissions, or handling low-level systems.',
        },
        {
          title: 'Digital systems',
          description:
            'Understand binary equivalents of octal values in computer architecture, operating systems, and embedded systems.',
        },
      ],
    },
    meta_data: {
      meta_title: 'Octal to Binary Converter – Convert Octal Numbers Online',
      meta_description:
        'Easily convert octal numbers into binary values online. Perfect for students, programmers, and computer science learners.',
      og_title: 'Octal to Binary Converter – Free Online Tool',
      og_description:
        'Quickly transform octal numbers into binary equivalents. Ideal for developers, students, and electronics learners.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
