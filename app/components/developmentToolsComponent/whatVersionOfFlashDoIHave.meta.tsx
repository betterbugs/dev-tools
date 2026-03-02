import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'what-version-of-flash-do-i-have',
  category: 'Category157',
  route: PATHS.WHAT_VERSION_OF_FLASH,
  ...{
    hero_section: {
      title: 'What version of Flash do I have?',
      description:
        'Flash Player is discontinued and blocked by modern browsers. This page explains detection limits and safe verification steps for legacy systems.',
    },
    development_tools_list: [
      { tool: 'What is my browser?', url: PATHS.WHAT_IS_MY_BROWSER },
      { tool: 'What is my user agent?', url: PATHS.WHAT_IS_MY_USER_AGENT },
      {
        tool: 'What version of Chrome do I have?',
        url: PATHS.WHAT_VERSION_OF_CHROME_DO_I_HAVE,
      },
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
      about_title: 'About Flash Player status',
      about_description: [
        {
          description:
            'Adobe Flash Player reached End of Life on December 31, 2020. Browser vendors removed support and actively block Flash content for security.',
        },
        {
          description:
            'Websites cannot reliably detect a Flash version in modern browsers. Any detection is limited to legacy environments where plugins are still exposed.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'How to verify on legacy systems',
      guide_description: 'If you must check a legacy machine:',
      steps: [
        {
          step_key: 'Windows:',
          step_title: 'Control Panel',
          step_description:
            'Open Control Panel → Programs and Features → search for Adobe Flash Player and note the version.',
        },
        {
          step_key: 'macOS:',
          step_title: 'System Preferences',
          step_description:
            'Open System Preferences → Flash Player (if present) → Updates tab shows the version.',
        },
      ],
    },
    development_tools_how_use: {
      how_use_title: 'Recommendations',
      how_use_description:
        'Do not install Flash. Use modern, HTML5-based solutions for video and interactive media.',
      point: [
        {
          title: 'Security first',
          description:
            'Legacy Flash exposes severe security risks. Modern OS and browsers block it by default.',
        },
        {
          title: 'Enterprise environments',
          description:
            'If a legacy app still requires Flash, consult IT for a contained, offline environment.',
        },
      ],
    },
    meta_data: {
      meta_title: 'What version of Flash do I have? - Developer Tools',
      meta_description:
        "Flash is discontinued. Learn why browsers can't detect Flash versions and how to verify safely on legacy systems.",
      og_title: 'What version of Flash do I have?',
      og_description:
        'Understand Flash EOL, detection limits, and secure alternatives.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
