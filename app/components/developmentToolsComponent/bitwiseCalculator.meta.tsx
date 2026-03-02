import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'bitwise-calculator',
  category: 'Category138',
  route: PATHS.BITWISE_CALCULATOR,
  ...{
    hero_section: {
      title: 'Bitwise Calculator',
      description:
        'Perform bitwise operations (AND, OR, XOR, NOT, shifts) instantly – perfect for programmers, engineers, and computer science learners.',
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
      about_title: 'What is the Bitwise Calculator?',
      about_description: [
        {
          description:
            'The Bitwise Calculator allows you to perform bitwise operations like AND, OR, XOR, NOT, left shift, and right shift on binary or decimal numbers.',
        },
        {
          description:
            'It’s useful for programmers working with low-level logic, digital electronics students, and security researchers analyzing binary data.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'How to Use the Bitwise Calculator',
      guide_description: 'Follow these simple steps:',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: 'Enter numbers:',
          step_description:
            'Type or paste the decimal or binary values you want to calculate with.',
        },
        {
          step_key: 'Step 2:',
          step_title: 'Choose operation:',
          step_description:
            'Select a bitwise operation such as AND, OR, XOR, NOT, Left Shift, or Right Shift.',
        },
        {
          step_key: 'Step 3:',
          step_title: 'Calculate:',
          step_description:
            'Click the calculate button to instantly perform the operation.',
        },
        {
          step_key: 'Step 4:',
          step_title: 'View or copy results:',
          step_description:
            'See the result in binary and decimal formats. Copy for programming, debugging, or documentation.',
        },
      ],
    },
    development_tools_how_use: {
      how_use_title: 'Common Uses',
      how_use_description: 'Why you might use this tool:',
      point: [
        {
          title: 'Programming',
          description:
            'Quickly test bitwise logic for algorithms, encryption, or system-level operations.',
        },
        {
          title: 'Digital Electronics',
          description:
            'Understand how processors use bitwise operations for computations and logic gates.',
        },
        {
          title: 'Learning',
          description:
            'Practice and visualize bitwise operations to strengthen computer science fundamentals.',
        },
      ],
    },
    meta_data: {
      meta_title:
        'Bitwise Calculator – Perform AND, OR, XOR, NOT, Shifts Online',
      meta_description:
        'Easily perform bitwise operations like AND, OR, XOR, NOT, and bit shifts online. Perfect for programmers, engineers, and students.',
      og_title: 'Bitwise Calculator – Free Online Tool',
      og_description:
        'Instantly calculate bitwise operations and view results in decimal and binary. Useful for coding, debugging, and learning.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
