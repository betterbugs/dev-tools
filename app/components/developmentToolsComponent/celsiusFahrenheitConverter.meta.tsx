import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'celcius-to-fahrenheit',
  category: 'Category140',
  route: PATHS.CELCIUS_TO_FAHRENHEIT,
  ...{
    hero_section: {
      title: 'Celsius to Fahrenheit Converter',
      description:
        'Easily convert Celsius (°C) to Fahrenheit (°F) instantly – perfect for students, travelers, scientists, and everyday use.',
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
      about_title: 'What is the Celsius to Fahrenheit Converter?',
      about_description: [
        {
          description:
            'The Celsius to Fahrenheit Converter quickly converts temperature values from °C to °F using the formula (°C × 9/5) + 32.',
        },
        {
          description:
            'It’s useful for science students, weather enthusiasts, travelers, and professionals needing accurate temperature conversions.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'How to Use the Celsius to Fahrenheit Converter',
      guide_description: 'Follow these simple steps:',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: 'Enter Celsius value:',
          step_description:
            'Type the temperature in Celsius (°C) that you want to convert.',
        },
        {
          step_key: 'Step 2:',
          step_title: 'Click convert:',
          step_description:
            'Press the convert button to calculate the Fahrenheit equivalent.',
        },
        {
          step_key: 'Step 3:',
          step_title: 'View results:',
          step_description:
            'Instantly see the converted value in Fahrenheit (°F).',
        },
        {
          step_key: 'Step 4:',
          step_title: 'Copy or reuse:',
          step_description:
            'Use the result for weather reports, science projects, cooking, or travel planning.',
        },
      ],
    },
    development_tools_how_use: {
      how_use_title: 'Common Uses',
      how_use_description: 'Why you might use this tool:',
      point: [
        {
          title: 'Weather Reports',
          description:
            'Convert temperatures between Celsius and Fahrenheit for global weather updates.',
        },
        {
          title: 'Education',
          description:
            'Learn and practice temperature conversion formulas in science classes.',
        },
        {
          title: 'Travel',
          description:
            'Easily convert temperatures when traveling between countries that use different scales.',
        },
      ],
    },
    meta_data: {
      meta_title: 'Celsius to Fahrenheit Converter – Convert °C to °F Online',
      meta_description:
        'Convert Celsius (°C) to Fahrenheit (°F) instantly with this free online tool. Useful for weather, travel, cooking, and science.',
      og_title: 'Celsius to Fahrenheit Converter – Free Online Tool',
      og_description:
        'Quickly convert Celsius to Fahrenheit online. Perfect for students, scientists, travelers, and daily use.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
