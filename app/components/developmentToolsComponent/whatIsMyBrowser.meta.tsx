import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'what-is-my-browser',
  category: 'Category83',
  route: PATHS.WHAT_IS_MY_BROWSER,
  ...{
    hero_section: {
      title: 'What is My Browser',
      description:
        'Detect your browser, engine, platform, user agent, features, and more — instantly.',
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
      about_title: 'What is the What is My Browser tool?',
      about_description: [
        {
          description:
            'This tool inspects the client environment and reports details like browser name and version, rendering engine, platform, language(s), online status, cookies, Do Not Track, screen/viewport, pixel ratio, timezone, and supported features (localStorage, service worker, WebGL, WebAssembly, etc.).',
        },
        {
          description:
            'Use it to quickly share environment diagnostics, reproduce issues, or verify client capabilities without installing anything.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'Using the What is My Browser tool',
      guide_description: 'Check details in a few steps:',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: 'Open the tool:',
          step_description: 'The page auto-detects your environment on load.',
        },
        {
          step_key: 'Step 2:',
          step_title: 'Review summary:',
          step_description:
            'See browser, engine, platform, language, cookies, and online status.',
        },
        {
          step_key: 'Step 3:',
          step_title: 'View JSON:',
          step_description:
            'Scroll to the full JSON section for all detected fields.',
        },
        {
          step_key: 'Step 4:',
          step_title: 'Copy/Refresh:',
          step_description:
            'Copy details to clipboard or refresh to re-detect.',
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
            'Share precise browser/environment details when filing issues.',
        },
        {
          title: 'Capability checks',
          description:
            'Verify feature support (WebGL, service worker, clipboard) before using APIs.',
        },
        {
          title: 'Cross-device diagnostics',
          description:
            'Compare environments across devices and networks to reproduce problems.',
        },
      ],
    },
    meta_data: {
      meta_title: 'What is My Browser – Detect Browser, Platform and Features',
      meta_description:
        'Detect your browser name/version, engine, platform, languages, screen, timezone and supported features. Copy JSON details.',
      og_title: 'What is My Browser – Online Detector',
      og_description:
        'Instantly view your browser and environment details with copy-ready JSON output.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
