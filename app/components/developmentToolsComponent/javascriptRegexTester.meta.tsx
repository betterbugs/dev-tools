import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'javascript-regex-tester',
  category: 'Category146',
  route: PATHS.JAVASCRIPT_REGEX_TESTER,
  ...{
    hero_section: {
      title: 'JavaScript Regex Tester',
      description:
        'Test and debug JavaScript regular expressions instantly – perfect for developers, testers, and learners.',
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
      about_title: 'What is the JavaScript Regex Tester?',
      about_description: [
        {
          description:
            'The JavaScript Regex Tester allows you to build, test, and validate regular expressions in real time.',
        },
        {
          description:
            'It’s useful for developers debugging regex patterns, QA engineers writing test cases, and learners practicing regex syntax.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'How to Use the Regex Tester',
      guide_description: 'Follow these simple steps:',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: 'Enter your regex pattern:',
          step_description:
            'Type or paste your regular expression (e.g., `/^[a-z0-9]+$/i`).',
        },
        {
          step_key: 'Step 2:',
          step_title: 'Add sample text:',
          step_description:
            'Enter the text you want to test against your regex pattern.',
        },
        {
          step_key: 'Step 3:',
          step_title: 'Test & match:',
          step_description:
            'The tool will instantly highlight matches and show captured groups.',
        },
        {
          step_key: 'Step 4:',
          step_title: 'Copy or refine:',
          step_description:
            'Copy the working regex for use in your JavaScript code or adjust it as needed.',
        },
      ],
    },
    development_tools_how_use: {
      how_use_title: 'Common Uses',
      how_use_description: 'Why you might use this tool:',
      point: [
        {
          title: 'Form Validation',
          description:
            'Test regex for validating emails, phone numbers, or custom input fields.',
        },
        {
          title: 'Search & Replace',
          description:
            'Build regex to find and replace text patterns efficiently.',
        },
        {
          title: 'Learning Regex',
          description:
            'Practice and understand regex syntax with instant visual feedback.',
        },
      ],
    },
    meta_data: {
      meta_title: 'JavaScript Regex Tester – Test Regex Patterns Online',
      meta_description:
        'Easily test and debug JavaScript regex patterns online. Perfect for developers, testers, and learners practicing regular expressions.',
      og_title: 'JavaScript Regex Tester – Free Online Tool',
      og_description:
        'Build, test, and debug regex instantly with live match highlighting. Great for developers and QA engineers.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
