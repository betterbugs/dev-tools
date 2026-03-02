import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'whats-my-browser-size',
  category: 'Category154',
  route: PATHS.WHATS_MY_BROWSER_SIZE,
  ...{
    hero_section: {
      title: 'What’s My Browser Size?',
      description:
        'View your live viewport and window size with device pixel ratio. Copy details instantly.',
    },
    development_tools_list: [
      { tool: 'What is my User Agent', url: PATHS.WHAT_IS_MY_USER_AGENT },
      {
        tool: 'What Operating System do I have?',
        url: PATHS.WHAT_OPERATING_SYSTEM_DO_I_HAVE,
      },
      {
        tool: 'What version of macOS do I have?',
        url: PATHS.WHAT_VERSION_OF_MACOS,
      },
    ],
    development_tools_about_details: {
      about_title: 'What is this tool?',
      about_description: [
        {
          description:
            'Displays inner (viewport) and outer (window) sizes and the device pixel ratio in real time.',
        },
        {
          description:
            'Useful for responsive design, QA, and debugging layout issues.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'How to use',
      guide_description:
        'Resize or rotate your device and watch the values update.',
      steps: [
        {
          step_key: '1.',
          step_title: 'Resize window:',
          step_description: 'Adjust the window to test breakpoints.',
        },
        {
          step_key: '2.',
          step_title: 'Copy details:',
          step_description: 'Share the summary with your team.',
        },
      ],
    },
    development_tools_how_use: {
      how_use_title: 'Common uses',
      how_use_description: 'Where it helps:',
      point: [
        {
          title: 'Responsive QA',
          description: 'Verify viewport breakpoints quickly.',
        },
        {
          title: 'Bug reports',
          description: 'Attach accurate sizes and DPR to issues.',
        },
      ],
    },
    meta_data: {
      meta_title: 'What’s My Browser Size? – View Viewport/Window Size',
      meta_description:
        'See your browser’s viewport and window dimensions with device pixel ratio in real time.',
      og_title: 'What’s My Browser Size?',
      og_description:
        'Live browser size and DPR with one click copy for bug reports and QA.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
