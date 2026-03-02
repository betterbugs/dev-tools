import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'random-text-from-regex',
  category: 'Category90',
  route: PATHS.RANDOM_TEXT_FROM_REGEX,
  ...{
    hero_section: {
      title: 'Random Text From Regex',
      description:
        'Generate random text that matches a regex pattern. Perfect for test data, fuzzing, and validating input handling.',
    },
    development_tools_list: [
      { tool: 'JavaScript Regex Tester', url: PATHS.JAVASCRIPT_REGEX_TESTER },
      { tool: 'Random String Generator', url: PATHS.RANDOM_STRING_GENERATOR },
      { tool: 'Credit Card Generator', url: PATHS.CREDIT_CARD_GENERATOR },
      { tool: 'JavaScript Minifier', url: PATHS.JAVASCRIPT_MINIFIER },
      { tool: 'Line Count Tool', url: PATHS.LINE_COUNTER_TOOL },
      { tool: 'JS Obfuscator', url: PATHS.JS_OBFUSCATOR },
    ],
    development_tools_about_details: {
      about_title: 'What is the Random Text From Regex Tool?',
      about_description: [
        {
          description:
            'This tool generates random strings that conform to a given regular expression. You enter a regex pattern and get sample strings that match it.',
        },
        {
          description:
            'Useful for creating test data that fits validation rules, fuzzing inputs, and checking how your app handles valid or edge-case strings.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'How to Use the Random Text From Regex Tool',
      guide_description: 'Generate matching text in a few steps:',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: 'Enter regex pattern:',
          step_description:
            'Type or paste your regular expression (e.g. ^[a-zA-Z0-9]{8,}$).',
        },
        {
          step_key: 'Step 2:',
          step_title: 'Set count and options:',
          step_description:
            'Choose how many strings to generate and any options (e.g. max length, separator).',
        },
        {
          step_key: 'Step 3:',
          step_title: 'Generate and copy:',
          step_description:
            'Click Generate to create matching strings. Copy or download the result.',
        },
      ],
    },
    development_tools_how_use: {
      how_use_title: 'How It’s Used',
      how_use_description: 'Common use cases:',
      point: [
        {
          title: 'Test data',
          description:
            'Generate inputs that match your validation regex for unit and integration tests.',
        },
        {
          title: 'Fuzzing and edge cases',
          description:
            'Produce varied strings that satisfy a pattern to stress-test parsing and validation.',
        },
        {
          title: 'Documentation and demos',
          description:
            'Create example values for docs or UI demos that match a specified format.',
        },
      ],
    },
    meta_data: {
      meta_title:
        'Random Text From Regex – Generate Strings Matching a Pattern',
      meta_description:
        'Generate random text that matches a regex pattern. Useful for test data, fuzzing, and validation testing.',
      og_title: 'Random Text From Regex – Developer Utility',
      og_description:
        'Create random strings that match your regex. Perfect for testing and demos.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
