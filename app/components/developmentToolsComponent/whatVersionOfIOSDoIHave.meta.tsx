import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'what-version-of-ios-do-i-have',
  category: 'Category153',
  route: PATHS.WHAT_VERSION_OF_IOS,
  ...{
    hero_section: {
      title: 'What version of iOS do I have?',
      description:
        'Detect your iOS version from the browser user agent, with quick instructions to verify in Settings.',
    },
    development_tools_list: [
      {
        tool: 'What version of macOS do I have?',
        url: PATHS.WHAT_VERSION_OF_MACOS,
      },
      { tool: 'What is my User Agent', url: PATHS.WHAT_IS_MY_USER_AGENT },
      {
        tool: 'What Operating System do I have?',
        url: PATHS.WHAT_OPERATING_SYSTEM_DO_I_HAVE,
      },
    ],
    development_tools_about_details: {
      about_title: 'What is this tool?',
      about_description: [
        {
          description:
            'A quick iOS version checker based on your device’s user agent string.',
        },
        {
          description:
            'If detection fails due to masking, open Settings → General → About to see the exact version.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'Manual check',
      guide_description: 'Follow these steps:',
      steps: [
        {
          step_key: '1.',
          step_title: 'Open Settings:',
          step_description: 'Go to Settings → General.',
        },
        {
          step_key: '2.',
          step_title: 'Open About:',
          step_description: 'Find the iOS Version field.',
        },
      ],
    },
    development_tools_how_use: {
      how_use_title: 'Why it matters',
      how_use_description: 'Typical reasons:',
      point: [
        {
          title: 'Compatibility',
          description: 'Ensure apps and features support your iOS version.',
        },
        {
          title: 'Security',
          description: 'Stay updated to receive security patches.',
        },
      ],
    },
    meta_data: {
      meta_title: 'What version of iOS do I have? – Quick Check',
      meta_description:
        'Check your iOS version via the browser and confirm in Settings → General → About.',
      og_title: 'What version of iOS do I have?',
      og_description:
        'Detect your iOS version instantly with manual verification steps.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
