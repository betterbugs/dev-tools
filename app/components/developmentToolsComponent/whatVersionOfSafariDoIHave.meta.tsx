import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'what-version-of-safari-do-i-have',
  category: 'Category155',
  route: PATHS.WHAT_VERSION_OF_SAFARI,
  ...{
    hero_section: {
      title: 'What version of Safari do I have?',
      description:
        'Detect your Safari version from the browser user agent with simple manual steps to confirm.',
    },
    development_tools_list: [
      {
        tool: 'What version of macOS do I have?',
        url: PATHS.WHAT_VERSION_OF_MACOS,
      },
      { tool: 'What is my User Agent', url: PATHS.WHAT_IS_MY_USER_AGENT },
      {
        tool: 'What version of iOS do I have?',
        url: PATHS.WHAT_VERSION_OF_IOS,
      },
    ],
    development_tools_about_details: {
      about_title: 'What is this tool?',
      about_description: [
        {
          description:
            'Reads Safari’s version from the user agent string when available.',
        },
        {
          description:
            'On macOS/iOS you can verify via Safari → About Safari or Settings.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'Manual check',
      guide_description: 'Follow these steps:',
      steps: [
        {
          step_key: '1.',
          step_title: 'macOS:',
          step_description: 'Open Safari → Safari menu → About Safari.',
        },
        {
          step_key: '2.',
          step_title: 'iOS:',
          step_description: 'Settings → General → About → Safari version.',
        },
      ],
    },
    development_tools_how_use: {
      how_use_title: 'Why it matters',
      how_use_description: 'Typical reasons:',
      point: [
        {
          title: 'Compatibility',
          description:
            'Ensure site features and extensions support your version.',
        },
        {
          title: 'Support',
          description: 'Share exact version when reporting issues.',
        },
      ],
    },
    meta_data: {
      meta_title: 'What version of Safari do I have? – Quick Check',
      meta_description:
        'Instantly detect your Safari version and learn how to confirm it on macOS and iOS.',
      og_title: 'What version of Safari do I have?',
      og_description:
        'Check Safari version via UA with manual verification steps.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
