import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'binary-to-decimal-converter',
  category: 'Category124',
  route: PATHS.BINARY_TO_DECIMAL_CONVERTER,
  ...{
    hero_section: {
      title: 'Binary to Decimal Converter',
      description:
        'Convert binary numbers into decimal values instantly – perfect for students, programmers, and data analysts.',
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
      about_title: 'What is the Binary to Decimal Converter?',
      about_description: [
        {
          description:
            'The Binary to Decimal Converter quickly transforms binary numbers into their decimal equivalents.',
        },
        {
          description:
            'It’s useful for students learning number systems, developers working with binary data, and professionals analyzing digital information.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'How to Use the Binary to Decimal Converter',
      guide_description: 'Follow these simple steps:',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: 'Enter binary number:',
          step_description:
            'Type or paste the binary number (e.g., 10101) into the input box.',
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
            'The tool will display the decimal value of your binary input.',
        },
        {
          step_key: 'Step 4:',
          step_title: 'Copy or use:',
          step_description:
            'Copy the result for use in coding, mathematics, or learning exercises.',
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
            'Learn and practice conversions between binary and decimal number systems.',
        },
        {
          title: 'Programming',
          description:
            'Quickly convert binary data when coding or debugging low-level systems.',
        },
        {
          title: 'Digital electronics',
          description:
            'Understand binary values in circuits, logic gates, and microprocessors.',
        },
      ],
    },
    meta_data: {
      meta_title: 'Binary to Decimal Converter – Convert Binary Numbers Online',
      meta_description:
        'Easily convert binary numbers into decimal values online. Perfect for students, programmers, and electronics enthusiasts.',
      og_title: 'Binary to Decimal Converter – Free Online Tool',
      og_description:
        'Quickly transform binary numbers into decimal equivalents. Ideal for developers, students, and digital electronics learners.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
