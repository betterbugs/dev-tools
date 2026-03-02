import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'what-operating-system-do-i-have',
  category: 'Category85',
  route: PATHS.WHAT_OPERATING_SYSTEM_DO_I_HAVE,
  ...{
    hero_section: {
      title: 'What Operating System Do I Have',
      description:
        'Detect your Operating System and version (Windows, macOS, Linux, Android, iOS, ChromeOS), platform, and architecture — instantly.',
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
      about_title: 'What is the Operating System Detector?',
      about_description: [
        {
          description:
            'This tool identifies your OS (Windows, macOS, Linux, Android, iOS, ChromeOS) and version by combining User‑Agent parsing with modern User‑Agent Client Hints (platform/platformVersion/architecture).',
        },
        {
          description:
            'When high‑entropy UA hints are available (Chromium), it reports precise platform version and architecture (x64/ARM64). Otherwise, it provides the best‑effort result from the User‑Agent string.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'Using the Operating System Detector',
      guide_description: 'Check your OS in a few steps:',
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
            'See detected OS and version, platform/platformVersion, and architecture.',
        },
        {
          step_key: 'Step 3:',
          step_title: 'View JSON:',
          step_description:
            'Open the All Details section for the complete JSON payload.',
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
          title: 'IT support & triage',
          description:
            "Identify a user's OS and version quickly for accurate troubleshooting.",
        },
        {
          title: 'App compatibility',
          description:
            'Check OS and architecture before installing drivers or software.',
        },
        {
          title: 'Testing & analytics',
          description:
            'Understand OS distribution across users for QA and product decisions.',
        },
      ],
    },
    meta_data: {
      meta_title: 'What Operating System Do I Have – OS & Version Detector',
      meta_description:
        'Detect your Operating System (Windows, macOS, Linux, Android, iOS, ChromeOS), version, platform and architecture online.',
      og_title: 'Operating System Detector – OS & Version',
      og_description:
        'Instantly view your OS, version, platformVersion and architecture. Copy results for support.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
