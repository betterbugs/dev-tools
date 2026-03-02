import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'shuffle-letters',
  category: 'Category100',
  route: PATHS.SHUFFLE_LETTERS,
  ...{
    hero_section: {
      title: 'Shuffle Letters',
      description:
        'Randomly shuffle the letters in any word or text. Free online tool for games, puzzles, and creative writing.',
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
      about_title: 'What is the Shuffle Letters tool?',
      about_description: [
        {
          description:
            'The Shuffle Letters tool randomly rearranges the characters in your text—per word or for the whole input.',
        },
        {
          description:
            'Useful for word games, anagrams, obfuscation, or generating randomized strings.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'Using the Shuffle Letters tool',
      guide_description: 'Shuffle letters in a few steps:',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: 'Enter text:',
          step_description:
            'Type or paste the word or text you want to shuffle.',
        },
        {
          step_key: 'Step 2:',
          step_title: 'Choose mode:',
          step_description: 'Shuffle per word or shuffle the entire string.',
        },
        {
          step_key: 'Step 3:',
          step_title: 'Get result:',
          step_description: 'View the shuffled output and copy as needed.',
        },
      ],
    },
    development_tools_how_use: {
      how_use_title: 'How It’s Used',
      how_use_description: 'Common use cases:',
      point: [
        {
          title: 'Word games',
          description:
            'Create anagrams or scrambled words for puzzles and quizzes.',
        },
        {
          title: 'Testing',
          description:
            'Generate randomized strings for input validation and fuzzing.',
        },
        {
          title: 'Creative writing',
          description: 'Shuffle letters for brainstorming or obfuscating text.',
        },
      ],
    },
    meta_data: {
      meta_title: 'Shuffle Letters – Randomize Text Online',
      meta_description:
        'Randomly shuffle letters in words or text. Free tool for games, anagrams, and testing.',
      og_title: 'Shuffle Letters – Developer Utility',
      og_description:
        'Shuffle letters in text instantly with per-word or full-string mode.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
