import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'what-version-of-firefox-do-i-have',
  category: 'Category152',
  route: PATHS.WHAT_VERSION_OF_FIREFOX,
  ...{
    hero_section: {
      title: 'What version of Firefox do I have?',
      description:
        'Detect your Firefox version from the browser user agent with quick manual steps to confirm.',
    },
    development_tools_list: [
      { tool: 'What is my User Agent', url: PATHS.WHAT_IS_MY_USER_AGENT },
      {
        tool: 'What version of macOS do I have?',
        url: PATHS.WHAT_VERSION_OF_MACOS,
      },
      {
        tool: 'What version of Windows do I have?',
        url: PATHS.WHAT_VERSION_OF_WINDOWS_DO_I_HAVE,
      },
    ],
    development_tools_about_details: {
      about_title: 'What is this tool?',
      about_description: [
        {
          description:
            'A simple Firefox version checker based on your user agent string.',
        },
        {
          description:
            'If UA masking prevents detection, use Help → About Firefox to see the exact version.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'Manual check',
      guide_description: 'Follow these steps:',
      steps: [
        {
          step_key: '1.',
          step_title: 'Open menu:',
          step_description: 'Click ≡ (hamburger) → Help.',
        },
        {
          step_key: '2.',
          step_title: 'About Firefox:',
          step_description: 'The version number appears in the dialog.',
        },
      ],
    },
    development_tools_how_use: {
      how_use_title: 'Why it matters',
      how_use_description: 'Typical reasons:',
      point: [
        {
          title: 'Compatibility',
          description: 'Ensure websites and extensions support your version.',
        },
        {
          title: 'Security',
          description: 'Stay current to receive Firefox security updates.',
        },
      ],
    },
    meta_data: {
      meta_title: 'What version of Firefox do I have? – Quick Check',
      meta_description:
        'Instantly detect your Firefox version via the browser user agent with manual verification steps.',
      og_title: 'What version of Firefox do I have?',
      og_description:
        'Find your Firefox version quickly and learn how to confirm it from the app.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
