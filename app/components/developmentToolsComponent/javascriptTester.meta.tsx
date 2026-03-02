import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'javascript-tester',
  category: 'Category149',
  route: PATHS.JAVASCRIPT_TESTER,
  ...{
    hero_section: {
      title: 'JavaScript Tester',
      description:
        'Write and run JavaScript directly in your browser. View console logs, warnings, and errors in real time.',
    },
    development_tools_list: [
      { tool: 'JavaScript Minifier', url: PATHS.JAVASCRIPT_MINIFIER },
      { tool: 'JavaScript Regex Tester', url: PATHS.JAVASCRIPT_REGEX_TESTER },
      { tool: 'JSON Validator', url: PATHS.JSON_VALIDATOR },
    ],
    development_tools_about_details: {
      about_title: 'What is the JavaScript Tester?',
      about_description: [
        {
          description:
            'A quick playground to try snippets, debug ideas, or demonstrate issues without leaving your browser.',
        },
        {
          description:
            'Code runs inside a sandboxed iframe; console output is captured and displayed.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'How to use',
      guide_description: 'Simple steps:',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: 'Write code:',
          step_description: 'Enter or paste JavaScript into the editor.',
        },
        {
          step_key: 'Step 2:',
          step_title: 'Run:',
          step_description: 'Click Run to execute in the sandbox.',
        },
        {
          step_key: 'Step 3:',
          step_title: 'Review logs:',
          step_description: 'See console.log/warn/error output on the right.',
        },
      ],
    },
    development_tools_how_use: {
      how_use_title: 'Common Uses',
      how_use_description: 'Great for:',
      point: [
        {
          title: 'Experimentation',
          description: 'Try small snippets or APIs quickly.',
        },
        {
          title: 'Education',
          description: 'Teach basics by showing immediate results.',
        },
        {
          title: 'Debugging',
          description: 'Reproduce and isolate issues with minimal setup.',
        },
      ],
    },
    meta_data: {
      meta_title: 'JavaScript Tester – Run JS with Console Output',
      meta_description:
        'Write and execute JavaScript in the browser with a sandboxed runner and live console logs.',
      og_title: 'JavaScript Tester – Free Online Tool',
      og_description:
        'A simple JS playground with Run, Clear, and Copy console output.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
