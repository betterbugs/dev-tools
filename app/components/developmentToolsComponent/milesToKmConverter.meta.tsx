import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'miles-to-kilometers',
  category: 'Category131',
  route: PATHS.MILES_TO_KILOMETERS,
  ...{
    hero_section: {
      title: 'Miles to Kilometers Converter',
      description:
        'Convert miles into kilometers instantly – perfect for travelers, athletes, and everyday distance calculations.',
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
      about_title: 'What is the Miles to Kilometers Converter?',
      about_description: [
        {
          description:
            'The Miles to Kilometers Converter quickly transforms distances measured in miles into their equivalent in kilometers.',
        },
        {
          description:
            'It’s useful for travelers, students, athletes, and professionals needing quick unit conversions for road trips, fitness, or academic work.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'How to Use the Miles to Kilometers Converter',
      guide_description: 'Follow these simple steps:',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: 'Enter miles:',
          step_description:
            'Type or paste the distance in miles (e.g., 10) into the input box.',
        },
        {
          step_key: 'Step 2:',
          step_title: 'Convert to kilometers:',
          step_description:
            'Click the convert button to instantly calculate the kilometer equivalent.',
        },
        {
          step_key: 'Step 3:',
          step_title: 'View results:',
          step_description: 'The tool will display the distance in kilometers.',
        },
        {
          step_key: 'Step 4:',
          step_title: 'Copy or use:',
          step_description:
            'Use the result for travel planning, fitness tracking, or educational purposes.',
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
            'Convert road trip distances from miles to kilometers for better planning in metric-using countries.',
        },
        {
          title: 'Fitness',
          description:
            'Track running, cycling, or walking distances by converting miles into kilometers.',
        },
        {
          title: 'Education',
          description:
            'Practice unit conversions for math, science, or geography studies.',
        },
      ],
    },
    meta_data: {
      meta_title: 'Miles to Kilometers Converter – Convert Miles to KM Online',
      meta_description:
        'Easily convert miles into kilometers online. Perfect for travelers, fitness enthusiasts, and students.',
      og_title: 'Miles to Kilometers Converter – Free Online Tool',
      og_description:
        'Quickly transform miles into kilometers. Ideal for travelers, athletes, and students.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
