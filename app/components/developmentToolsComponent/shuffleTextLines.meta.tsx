import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'shuffle-text-lines',
  category: 'Category101',
  route: PATHS.SHUFFLE_TEXT_LINES,
  ...{
    hero_section: {
      title: 'Shuffle Text Lines',
      description:
        'Randomly shuffle the order of lines in your text. Free online tool for randomizing lists and line-based data.',
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
      about_title: 'What is the Shuffle Text Lines tool?',
      about_description: [
        {
          description:
            'The Shuffle Text Lines tool randomly reorders the lines in your input, one line per item.',
        },
        {
          description:
            'Useful for randomizing lists, quiz order, test data, or any line-based content.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'Using the Shuffle Text Lines tool',
      guide_description: 'Shuffle lines in a few steps:',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: 'Paste your list:',
          step_description:
            'Enter or paste one item per line in the input area.',
        },
        {
          step_key: 'Step 2:',
          step_title: 'Shuffle:',
          step_description: 'Click Shuffle to randomize the line order.',
        },
        {
          step_key: 'Step 3:',
          step_title: 'Copy result:',
          step_description: 'Copy the shuffled list or download as needed.',
        },
      ],
    },
    development_tools_how_use: {
      how_use_title: 'How It’s Used',
      how_use_description: 'Common use cases:',
      point: [
        {
          title: 'Quizzes and surveys',
          description: 'Randomize question or option order to avoid bias.',
        },
        {
          title: 'Test data',
          description: 'Shuffle list data for load testing and sampling.',
        },
        {
          title: 'Content and lists',
          description: 'Randomize playlist, checklist, or tag order.',
        },
      ],
    },
    meta_data: {
      meta_title: 'Shuffle Text Lines – Randomize Line Order Online',
      meta_description:
        'Randomly shuffle the order of lines in your text. Free tool for lists and line-based data.',
      og_title: 'Shuffle Text Lines – Developer Utility',
      og_description:
        'Shuffle lines instantly for quizzes, test data, and lists.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
