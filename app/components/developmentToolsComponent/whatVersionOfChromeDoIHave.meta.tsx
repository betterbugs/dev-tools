import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'what-version-of-chrome-do-i-have',
  category: 'Category86',
  route: PATHS.WHAT_VERSION_OF_CHROME_DO_I_HAVE,
  ...{
    hero_section: {
      title: 'What Version of Chrome Do I Have',
      description:
        'Detect your Chrome browser version, engine, mobile status, and ChromeOS — instantly.',
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
      about_title: 'What is the Chrome Version Detector?',
      about_description: [
        {
          description:
            'This tool detects your Google Chrome (or Chromium-based browser) version using the User‑Agent string and, when available, User‑Agent Client Hints.',
        },
        {
          description:
            'It also shows engine and mobile/ChromeOS context so you can share accurate browser details for support or QA.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'Using the Chrome Version Detector',
      guide_description: 'Check your Chrome version in a few steps:',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: 'Open the tool:',
          step_description: 'Detection runs automatically on page load.',
        },
        {
          step_key: 'Step 2:',
          step_title: 'Review summary:',
          step_description:
            'See detected Chrome version, engine, and mobile/ChromeOS status.',
        },
        {
          step_key: 'Step 3:',
          step_title: 'View JSON:',
          step_description:
            'Open the All Details section for the full JSON payload.',
        },
        {
          step_key: 'Step 4:',
          step_title: 'Copy/Refresh:',
          step_description:
            'Copy the details to clipboard or refresh to re-run detection.',
        },
      ],
    },
    development_tools_how_use: {
      how_use_title: 'How It’s Used',
      how_use_description: 'Common use cases:',
      point: [
        {
          title: 'Bug reports & support',
          description:
            'Share your Chrome version when reporting issues or contacting support.',
        },
        {
          title: 'Compatibility checks',
          description:
            'Confirm Chrome version for extensions, features, or polyfills.',
        },
        {
          title: 'Testing & analytics',
          description:
            'Understand Chrome version distribution for QA and product decisions.',
        },
      ],
    },
    meta_data: {
      meta_title: 'What Version of Chrome Do I Have – Chrome Version Detector',
      meta_description:
        'Detect your Google Chrome browser version instantly. See engine, mobile status, and ChromeOS context.',
      og_title: 'Chrome Version Detector – Free Online Tool',
      og_description:
        'Instantly view your Chrome version and related details. Copy results for support.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
