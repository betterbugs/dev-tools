import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'what-version-of-macos-do-i-have',
  category: 'Category151',
  route: PATHS.WHAT_VERSION_OF_MACOS,
  ...{
    hero_section: {
      title: 'What version of macOS do I have?',
      description:
        'Detect your macOS version from the browser and see manual steps to confirm it from system settings.',
    },
    development_tools_list: [
      {
        tool: 'What Operating System do I have?',
        url: PATHS.WHAT_OPERATING_SYSTEM_DO_I_HAVE,
      },
      {
        tool: 'What version of Windows do I have?',
        url: PATHS.WHAT_VERSION_OF_WINDOWS_DO_I_HAVE,
      },
      { tool: 'What is my User Agent', url: PATHS.WHAT_IS_MY_USER_AGENT },
    ],
    development_tools_about_details: {
      about_title: 'What is this tool?',
      about_description: [
        {
          description:
            'A quick macOS version checker based on your browser’s user agent string.',
        },
        {
          description:
            'If masking prevents accurate detection, use the manual method: Apple menu → About This Mac.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'Manual check',
      guide_description: 'Follow these steps:',
      steps: [
        {
          step_key: '1.',
          step_title: 'Open Apple menu:',
          step_description: 'Top‑left Apple icon.',
        },
        {
          step_key: '2.',
          step_title: 'Choose About This Mac:',
          step_description: 'View the macOS name and version.',
        },
      ],
    },
    development_tools_how_use: {
      how_use_title: 'Why it matters',
      how_use_description: 'Typical reasons:',
      point: [
        {
          title: 'Compatibility',
          description: 'Ensure apps and drivers support your macOS version.',
        },
        {
          title: 'Security',
          description: 'Keep up with Apple’s security and stability updates.',
        },
      ],
    },
    meta_data: {
      meta_title: 'What version of macOS do I have? – Quick Check',
      meta_description:
        'Detect your macOS version via browser and learn manual steps to verify in system settings.',
      og_title: 'What version of macOS do I have?',
      og_description:
        'Find your macOS version instantly and confirm via About This Mac.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
