import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'text-repeater',
  category: 'Category98',
  route: PATHS.TEXT_REPEATER,
  ...{
    hero_section: {
      title: 'Text Repeater',
      description:
        'Repeat any text a set number of times with optional separators. Free online tool for bulk text generation.',
    },
    development_tools_list: [
      { tool: 'Markdown To HTML', url: PATHS.MARKDOWN_TO_HTML },
      { tool: 'Text Lower Case', url: PATHS.TEXT_LOWERCASE_CONVERTER },
      { tool: 'Credit Card Generator', url: PATHS.CREDIT_CARD_GENERATOR },
      { tool: 'JavaScript Minifier', url: PATHS.JAVASCRIPT_MINIFIER },
      { tool: 'Line Count Tool', url: PATHS.LINE_COUNTER_TOOL },
      { tool: 'JS Obfuscator', url: PATHS.JS_OBFUSCATOR },
    ],
    development_tools_about_details: {
      about_title: 'What is the Text Repeater?',
      about_description: [
        {
          description:
            'The Text Repeater repeats your input text a specified number of times. You can add a separator between repetitions (e.g. newline, comma, space).',
        },
        {
          description:
            'Useful for generating bulk placeholder content, test data, or repeated strings for development and testing.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'Using the Text Repeater',
      guide_description: 'Repeat text in a few steps:',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: 'Enter text:',
          step_description: 'Type or paste the text you want to repeat.',
        },
        {
          step_key: 'Step 2:',
          step_title: 'Set count and separator:',
          step_description:
            'Choose how many times to repeat and the separator (newline, comma, space, or none).',
        },
        {
          step_key: 'Step 3:',
          step_title: 'Get output:',
          step_description:
            'View the repeated text and copy or download as needed.',
        },
      ],
    },
    development_tools_how_use: {
      how_use_title: 'How It’s Used',
      how_use_description: 'Common use cases:',
      point: [
        {
          title: 'Placeholder content',
          description:
            'Generate repeated lines or blocks for UI mockups and demos.',
        },
        {
          title: 'Test data',
          description:
            'Create bulk strings for load testing or input validation tests.',
        },
        {
          title: 'Formatting',
          description:
            'Quickly build comma- or newline-separated lists from a single value.',
        },
      ],
    },
    meta_data: {
      meta_title: 'Text Repeater – Repeat Text Online',
      meta_description:
        'Repeat any text a set number of times with optional separators. Free tool for bulk text and test data.',
      og_title: 'Text Repeater – Developer Utility',
      og_description:
        'Repeat text instantly with configurable count and separators.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
