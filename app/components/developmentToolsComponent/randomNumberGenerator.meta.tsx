import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'random-number-generator',
  category: 'Category25',
  route: PATHS.RANDOM_NUMBER_GENERATOR,
  ...{
    hero_section: {
      title: 'Random Number Generator Online',
      description:
        'The random number generator is a free online tool on BetterBugs.io to instantly generate random and unique numbers within a specified range.',
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
      about_title: 'What is the Random Number Generator?',
      about_description: [
        {
          description:
            'The random number generator is a simple utility tool that instantly generates random numbers within a specified range. The outputs can be of integers, decimal, percentage, or currency (dollar) types.',
        },
        {
          description:
            'This tool is absolutely free to use on the BetterBugs.io site. You can use the random numbers for educational, software testing, data seeding, and sampling purposes.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'How to use the tool',
      guide_description: 'Here’s how to use it:',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: 'Enter values for the following fields:',
        },
        {
          steps_points: [
            {
              steps_points_title: 'Minimum Value',
            },
            {
              steps_points_title: 'Maximum Value',
            },
            {
              steps_points_title: 'Number Count: ',
              steps_points_description:
                'Required quantity of random numbers as outputs.',
            },
            {
              steps_points_title: 'Number Type: ',
              steps_points_description:
                'Output type; Options —> Integer, Decimal (you can also add decimal places), Percentage, Currency (USD format)',
            },
            {
              steps_points_title: 'Separator: ',
              steps_points_description:
                'Add a separator between outputs; Options —> New line, Comma, Space, Tab',
            },
          ],
        },
        {
          step_key: 'Step 2:',
          step_title: 'You can enable/disable the following options:',
        },
        {
          steps_points: [
            {
              steps_points_description: 'Allow duplicates',
            },
            {
              steps_points_description: 'Sort numbers',
            },
          ],
        },
        {
          step_key: 'Step 3:',
          step_title: 'Hit “Generate Number” for the outputs.',
        },
        {
          step_description:
            'Hit the “Copy” icon from the output box to copy/use the generated numbers. You also have the “Clear” option to clear everything and start again.',
        },
      ],
    },
    development_tools_how_use: {
      how_use_title:
        'What are the use cases for the random number generator tool',
      how_use_description:
        'You can use the tool for several purposes, such as:',
      point: [
        {
          title: 'Educational purposes',
          description:
            'Teachers and students can use it to demonstrate principles of probability and statistics, create practice problems, or simulate random experiments for math and computer science classes.',
        },
        {
          title: 'Software testing and QA',
          description:
            'Developers and testers can generate random numerical inputs to test application fields, validate forms, and check how the software handles a wide range of data values, including edge cases.',
        },
        {
          title: 'Database seeding',
          description:
            'Use the tool to populate databases with random data (like user IDs, product quantities, or prices) during the development and testing phases.',
        },
        {
          title: 'Cryptography education',
          description:
            'While not secure enough for actual cryptographic keys, it can be used as a teaching aid to explain the role of randomness in generating keys and salts in a simplified context.',
        },
        {
          title: 'Games',
          description:
            'The tool can be used as a digital dice roller for board games and role-playing games.',
        },
        {
          title: 'Data sampling',
          description:
            'Researchers and analysts can select a random sample from a larger dataset by generating a list of random row numbers or IDs to include in their study.',
        },
      ],
    },
    meta_data: {
      meta_title: 'Random Number Generator - Developer Utility Tools',
      meta_description:
        'Use the random number generator free online tool on BetterBugs to instantly generate random numbers in integers, decimal, percentage, and USD currency types.',
      og_title: 'Random Number Generator - Developer Utility Tools',
      og_description:
        'This post describes usage steps and the use cases of the random number generator free online tool on BetterBugs.io.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
