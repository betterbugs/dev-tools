import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'what-version-of-windows-do-i-have',
  category: 'Category84',
  route: PATHS.WHAT_VERSION_OF_WINDOWS_DO_I_HAVE,
  ...{
    hero_section: {
      title: 'What Version of Windows Do I Have',
      description:
        "Detect if you're on Windows 10 or 11, see Windows NT version, architecture, and more — instantly.",
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
      about_title: "What is the 'What Version of Windows Do I Have' tool?",
      about_description: [
        {
          description:
            "This tool detects your Windows version using User-Agent Client Hints (platformVersion) and User-Agent (Windows NT x.y). It shows whether you're on Windows 10 or 11, the Windows NT version, and CPU architecture (x64/ARM64).",
        },
        {
          description:
            'If high‑entropy UA hints are available (Chromium), it distinguishes Windows 10 vs 11 accurately. Otherwise, it provides the best guess based on NT version (10.0 ⇒ Windows 10/11).',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'Using the Windows Version Detector',
      guide_description: 'Check your Windows version in a few steps:',
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
            'See Detected Windows (10 or 11), UA-CH platformVersion, Windows NT version, and architecture.',
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
            'Confirm whether a user is on Windows 10 or 11 to apply the right fix or policy.',
        },
        {
          title: 'App compatibility',
          description:
            'Check OS version and architecture before installing drivers or software.',
        },
        {
          title: 'Cross-device verification',
          description:
            'Compare results across machines to reproduce environment-specific issues.',
        },
      ],
    },
    meta_data: {
      meta_title:
        'What Version of Windows Do I Have – Windows 10 or 11 Detector',
      meta_description:
        'Find out if you have Windows 10 or Windows 11. See Windows NT version, UA-CH platformVersion, architecture, and more.',
      og_title: 'Windows Version Detector – Windows 10 vs 11',
      og_description:
        'Quickly detect your Windows version and related details. Copy results for support.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
