import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'fabonacci-calculator',
  category: 'Category137',
  route: PATHS.FABONACCI_CALCULATOR,
  ...{
    hero_section: {
      title: 'Fibonacci Calculator',
      description:
        'Generate Fibonacci sequences or find the nth Fibonacci number instantly – perfect for students, mathematicians, and programmers.',
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
      about_title: 'What is the Fibonacci Calculator?',
      about_description: [
        {
          description:
            'The Fibonacci Calculator generates numbers in the Fibonacci sequence or finds a specific nth Fibonacci number.',
        },
        {
          description:
            'It’s useful for mathematics students, algorithm learners, and developers working with recursive or iterative problems.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'How to Use the Fibonacci Calculator',
      guide_description: 'Follow these simple steps:',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: 'Enter a number:',
          step_description:
            'Type or paste the position (e.g., 10) to calculate the 10th Fibonacci number or generate the sequence.',
        },
        {
          step_key: 'Step 2:',
          step_title: 'Select mode:',
          step_description:
            'Choose whether you want the nth Fibonacci number or the full sequence up to that number.',
        },
        {
          step_key: 'Step 3:',
          step_title: 'Calculate:',
          step_description:
            'Click the calculate button to instantly generate results.',
        },
        {
          step_key: 'Step 4:',
          step_title: 'View or copy:',
          step_description:
            'Copy the results for assignments, coding projects, or learning purposes.',
        },
      ],
    },
    development_tools_how_use: {
      how_use_title: 'Common Uses',
      how_use_description: 'Why you might use this tool:',
      point: [
        {
          title: 'Mathematics',
          description:
            'Study Fibonacci sequences and their applications in number theory.',
        },
        {
          title: 'Programming',
          description:
            'Test recursive and iterative algorithms that generate Fibonacci numbers.',
        },
        {
          title: 'Education',
          description:
            'Help students learn about mathematical patterns and sequences.',
        },
      ],
    },
    meta_data: {
      meta_title: 'Fibonacci Calculator – Generate Sequence or Find nth Term',
      meta_description:
        'Easily generate Fibonacci sequences or find the nth Fibonacci number online. Perfect for math students, coders, and educators.',
      og_title: 'Fibonacci Calculator – Free Online Tool',
      og_description:
        'Quickly calculate Fibonacci numbers or generate sequences. Useful for learning, coding, and mathematics.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
