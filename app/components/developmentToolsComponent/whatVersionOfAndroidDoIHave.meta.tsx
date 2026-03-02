import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'what-version-of-android-do-i-have',
  category: 'Category156',
  route: PATHS.WHAT_VERSION_OF_ANDROID,
  ...{
    hero_section: {
      title: 'What version of Android do I have?',
      description:
        'Detect your Android version from the browser user agent with quick steps to confirm in Settings.',
    },
    development_tools_list: [
      {
        tool: 'What version of iOS do I have?',
        url: PATHS.WHAT_VERSION_OF_IOS,
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
            'A quick Android version checker based on your device’s user agent string.',
        },
        {
          description:
            'Use Settings → About phone to verify if detection is masked.',
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
          step_description: 'Open device Settings.',
        },
        {
          step_key: '2.',
          step_title: 'About phone:',
          step_description: 'Open About and read the Android version field.',
        },
      ],
    },
    development_tools_how_use: {
      how_use_title: 'Why it matters',
      how_use_description: 'Typical reasons:',
      point: [
        {
          title: 'Compatibility',
          description: 'Ensure apps and features support your Android version.',
        },
        {
          title: 'Security',
          description: 'Stay updated to receive monthly patches.',
        },
      ],
    },
    meta_data: {
      meta_title: 'What version of Android do I have? – Quick Check',
      meta_description:
        'Detect your Android version from the browser and confirm in Settings → About phone.',
      og_title: 'What version of Android do I have?',
      og_description:
        'Instant Android version detection with manual verification steps.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
