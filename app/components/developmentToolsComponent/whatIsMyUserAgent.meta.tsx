import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'what-is-my-user-agent',
  category: 'Category42',
  route: PATHS.WHAT_IS_MY_USER_AGENT,
  ...{
    hero_section: {
      title: 'What is My User Agent',
      description:
        'What is my user agent is a free-to-use dev utility tool on BetterBugs.io that automatically grabs and displays info about your user agent, including browser and OS details in a string format.',
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
      about_title: 'What is a User Agent?',
      about_description: [
        {
          description:
            'A user agent is the identifier your web browser (or device) sends to other websites so they can know which browser, version, OS, and device is making the request. This info travels in the HTTP User-Agent header as a readable text string.',
        },
        {
          description:
            "The What is My User Agent tool is an absolutely free-to-use dev utility on BetterBugs.io. This tool instantly reads the User-Agent header your browser is already sending and shows it in a clean, copyable format. Using it, you can get the full user agent string along with key browser and OS details. Plus, it's super useful when you need to quickly share environment details in bug reports or validate compatibility checks across browsers.",
        },
      ],
    },
    development_tools_user_agent_info: {
      info_title: 'What info does the User Agent include?',
      intro_text: 'For this example string',
      example_string:
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36',
      example_string_description:
        'Here’re the info that it carries in an encoded format:',
      info_items: [
        {
          part: 'Mozilla/5.0:',
          description:
            'Historical compatibility token that many modern browsers still include. This enables other sites to treat as a Mozilla-compatible browser.',
        },
        {
          part: '(Windows NT 10.0; Win64; x64):',
          description:
            ' OS family and version (Windows 10/11) plus 64‑bit architecture (Win64, x64).',
        },
        {
          part: 'AppleWebKit/537.36:',
          description:
            'Rendering engine (WebKit-based). This is used as a base identifier for Chromium-based browsers.',
        },
        {
          part: '(KHTML, like Gecko):',
          description:
            'Additional compatibility that indicates behavior similar to Gecko-based browsers.',
        },
        {
          part: 'Chrome/143.0.0.0:',
          description:
            'Browser name and detailed version. This is used heavily for feature targeting and debugging issues specific to a release.',
        },
        {
          part: 'Safari/537.36:',
          description:
            'Another compatibility token signalling Safari/WebKit-style behavior that some sites still expect.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'How to use the tool',
      guide_description:
        'Once you open the tool on BetterBugs.io, you do not have to do anything to get results. The tool automatically detects your user agent info and instantly displays it in a text string format.',
      steps: [
        {
          step_description:
            'To use the result, you can copy it or download it to your system as a text file. You can also reset the result using the “Reset to current UA” button.',
        },
        {
          step_description:
            'Apart from the exact user agent text string, you can directly see the following info:',
        },
        {
          steps_points: [
            {
              steps_points_title: 'Browser',
            },
            {
              steps_points_title: 'Operating System',
            },
            {
              steps_points_title: 'Device Type',
            },
            {
              steps_points_title: 'Platform ',
            },
          ],
        },
      ],
    },
    development_tools_how_use: {
      how_use_title: 'What are the use cases for the tool',
      how_use_description:
        'You can use the What is My User Agent tool for various purposes in software, such as:',
      point: [
        {
          title: 'Faster Bug Reporting and Triage: ',
          description:
            'QA engineers, support teams , and users can copy the user agent from the tool directly into tickets, so devs immediately know the browser and OS involved. This reduces back-and-forth (“Which browser version are you on?”) and speeds up reproducing and fixing front-end issues.',
        },
        {
          title: 'Cross-Browser and Cross-Device Testing: ',
          description:
            'Developers and testers validating responsive layouts or browser-specific behavior can use the tool to confirm exactly which UA they are testing against.',
        },
        {
          title: 'Compatibility and Feature Support Checks: ',
          description:
            'Product and QA teams can correlate reported glitches (e.g., CSS issues, unsupported APIs, video playback failures) to a particular browser engine or version indicated in the UA. This helps make decisions such as deprecating support for older browsers or implementing targeted fallbacks.',
        },
        {
          title: 'Analytics and Traffic Segmentation Support: ',
          description:
            'While analytics platforms collect user agent data themselves, having a quick “What is my user agent” reference helps teams interpret segments like “Chrome 143 on Windows 10 desktop” more accurately.',
        },
        {
          title: 'Automation, Bots, and Monitoring: ',
          description:
            'When setting up automated monitoring, synthetic checks, or scrapers, engineers often configure specific user agent strings; a human-readable breakdown helps verify those strings before deploying. ​The tool serves as a handy way to know what a “real” browser UA looks like. This can reduce the chance of misconfigured or suspicious strings that might be blocked.',
        },
      ],
    },
    meta_data: {
      meta_title: 'What is My User Agent - Developer Utility Tools',
      meta_description:
        'Use the tool on BetterBugs.io to instantly get your browser user agent info; perfect for automatically getting the OS, browser, rendering engine, and other info as a text string.',
      og_title: 'What is My User Agent - Developer Utility Tools',
      og_description:
        'This post describes usage steps and the use cases of the what is my user agent free online tool on BetterBugs.io.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
