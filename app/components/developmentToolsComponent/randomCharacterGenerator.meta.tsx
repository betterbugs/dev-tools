import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'random-character-generator',
  category: 'Category43',
  route: PATHS.RANDOM_CHARACTER_GENERATOR,
  ...{
    hero_section: {
      title: 'Random Character Generator',
      description:
        'Generate random characters from selected sets (A‑Z, a‑z, 0‑9, symbols).',
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
      about_title: 'What is a Random Character Generator?',
      about_description: [
        {
          description:
            'Creates sequences of characters using chosen character sets and length.',
        },
        {
          description:
            'Useful for test data, tokens, short IDs, and obfuscation examples.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'Using the Random Character Generator',
      guide_description: 'Create characters in a few steps:',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: 'Choose sets:',
          step_description: 'Toggle uppercase, lowercase, digits, and symbols.',
        },
        {
          step_key: 'Step 2:',
          step_title: 'Length:',
          step_description: 'Enter the number of characters to generate.',
        },
        {
          step_key: 'Step 3:',
          step_title: 'Generate:',
          step_description: 'Click Generate; copy or download results.',
        },
      ],
    },
    development_tools_how_use: {
      how_use_title: 'How It’s Used',
      how_use_description: 'Common use cases:',
      point: [
        {
          title: 'Test data',
          description: 'Generate random strings for fixtures and fuzzing.',
        },
        {
          title: 'Tokens',
          description: 'Create lightweight non‑secure tokens for demos.',
        },
        {
          title: 'Education',
          description: 'Show character set combinations and entropy ideas.',
        },
      ],
    },
    meta_data: {
      meta_title: 'Random Character Generator – Build Custom Strings',
      meta_description:
        'Generate random characters from selected sets and lengths for testing and demos.',
      og_title: 'Random Character Generator – BetterBugs Tools',
      og_description:
        'Create character sequences instantly and copy or download them.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
