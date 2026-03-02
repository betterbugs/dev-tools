import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'internet-speed-test',
  category: 'Category113',
  route: PATHS.INTERNET_SPEED_TEST,
  ...{
    hero_section: {
      title: 'Internet Speed Test',
      description:
        'Check your internet speed instantly – measure download, upload, and ping for accurate performance insights.',
    },
    development_tools_list: [
      { tool: 'Character Count Tool', url: PATHS.CHARACTER_COUNT_TOOL },
      { tool: 'Text Repeater', url: PATHS.TEXT_REPEATER },
      { tool: 'Text Cleaner', url: PATHS.TEXT_COMPARE },
      { tool: 'Word Counter', url: PATHS.WORD_COUNT_TOOL },
      { tool: 'Sort Words', url: PATHS.SORT_WORD },
      { tool: 'JavaScript Minifier', url: PATHS.JAVASCRIPT_MINIFIER },
      { tool: 'Line Count Tool', url: PATHS.LINE_COUNTER_TOOL },
    ],
    development_tools_about_details: {
      about_title: 'What is the Internet Speed Test Tool?',
      about_description: [
        {
          description:
            'The Internet Speed Test tool helps you check your network’s download speed, upload speed, and latency (ping) in real-time.',
        },
        {
          description:
            'It’s useful for diagnosing slow connections, verifying ISP speed promises, and ensuring smooth online gaming, streaming, or video calls.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'How to Use the Internet Speed Test Tool',
      guide_description: 'Follow these simple steps:',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: 'Start the test:',
          step_description:
            'Click the start button to begin checking your internet speed.',
        },
        {
          step_key: 'Step 2:',
          step_title: 'Measure performance:',
          step_description:
            'The tool will test your download speed, upload speed, and ping automatically.',
        },
        {
          step_key: 'Step 3:',
          step_title: 'View results:',
          step_description:
            'Check the real-time results to understand your network’s performance.',
        },
        {
          step_key: 'Step 4:',
          step_title: 'Optimize if needed:',
          step_description:
            'Use results to troubleshoot issues, upgrade plans, or improve connectivity.',
        },
      ],
    },
    development_tools_how_use: {
      how_use_title: 'Common Uses',
      how_use_description: 'Why you might use this tool:',
      point: [
        {
          title: 'Streaming & gaming',
          description:
            'Ensure your internet is fast enough for HD streaming, online games, or video calls.',
        },
        {
          title: 'Work from home',
          description:
            'Check if your connection can handle video conferences and cloud-based work tools.',
        },
        {
          title: 'ISP verification',
          description:
            'Confirm that your internet provider delivers the promised speed.',
        },
      ],
    },
    meta_data: {
      meta_title:
        'Internet Speed Test – Check Your Download & Upload Speed Online',
      meta_description:
        'Run a free internet speed test online. Measure your download, upload, and ping instantly for accurate network performance insights.',
      og_title: 'Free Internet Speed Test Tool',
      og_description:
        'Check your internet connection speed in seconds. Get real-time download, upload, and ping results.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
