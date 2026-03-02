import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'kilometers-to-miles',
  category: 'Category132',
  route: PATHS.KILOMETERS_TO_MILES,
  ...{
    hero_section: {
      title: 'Kilometers to Miles Converter',
      description:
        'Convert kilometers into miles instantly – perfect for travelers, athletes, and students needing quick distance conversions.',
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
      about_title: 'What is the Kilometers to Miles Converter?',
      about_description: [
        {
          description:
            'The Kilometers to Miles Converter quickly transforms distances measured in kilometers into their equivalent in miles.',
        },
        {
          description:
            'It’s useful for travelers, athletes, and students who need quick conversions for trips, sports, or academics.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'How to Use the Kilometers to Miles Converter',
      guide_description: 'Follow these simple steps:',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: 'Enter kilometers:',
          step_description:
            'Type or paste the distance in kilometers (e.g., 16) into the input box.',
        },
        {
          step_key: 'Step 2:',
          step_title: 'Convert to miles:',
          step_description:
            'Click the convert button to instantly calculate the miles equivalent.',
        },
        {
          step_key: 'Step 3:',
          step_title: 'View results:',
          step_description: 'The tool will display the distance in miles.',
        },
        {
          step_key: 'Step 4:',
          step_title: 'Copy or use:',
          step_description:
            'Use the result for travel, sports tracking, or academic exercises.',
        },
      ],
    },
    development_tools_how_use: {
      how_use_title: 'Common Uses',
      how_use_description: 'Why you might use this tool:',
      point: [
        {
          title: 'Travel',
          description:
            'Convert trip distances from kilometers to miles when visiting countries using the imperial system.',
        },
        {
          title: 'Fitness',
          description:
            'Easily track running or cycling distances in miles when logged in kilometers.',
        },
        {
          title: 'Education',
          description:
            'Understand and practice unit conversions for science, math, or geography lessons.',
        },
      ],
    },
    meta_data: {
      meta_title: 'Kilometers to Miles Converter – Convert KM to Miles Online',
      meta_description:
        'Easily convert kilometers into miles online. Perfect for travelers, athletes, and students.',
      og_title: 'Kilometers to Miles Converter – Free Online Tool',
      og_description:
        'Quickly transform kilometers into miles. Ideal for travelers, athletes, and learners.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
