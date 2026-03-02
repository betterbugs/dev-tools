import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'hours-to-seconds',
  category: 'Category61',
  route: PATHS.HOURS_TO_SECONDS,
  ...{
    hero_section: {
      title: 'Hours to Seconds',
      description:
        'Convert hours, minutes, and seconds into total seconds instantly.',
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
      about_title: 'What is Hours to Seconds Converter?',
      about_description: [
        {
          description:
            'A quick utility that converts time values provided in hours, minutes, and seconds into a single total seconds value.',
        },
        {
          description:
            'Supports mixed inputs (e.g., 1 hour 30 minutes 15 seconds) and is helpful for timestamps, logs, and duration math.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'Using the Hours to Seconds Converter',
      guide_description: 'Convert in a few steps:',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: 'Enter time:',
          step_description:
            'Provide hours, minutes, and seconds (any can be zero).',
        },
        {
          step_key: 'Step 2:',
          step_title: 'Calculate:',
          step_description: 'Click Convert to get total seconds.',
        },
        {
          step_key: 'Step 3:',
          step_title: 'Copy or Clear:',
          step_description: 'Copy the result or clear to start again.',
        },
      ],
    },
    development_tools_how_use: {
      how_use_title: 'How It’s Used',
      how_use_description: 'Common use cases:',
      point: [
        {
          title: 'Video & audio timing',
          description:
            'Convert clip durations to seconds for editing, scrubbing, or scripting.',
        },
        {
          title: 'Logging & analytics',
          description:
            'Normalize time spans in logs to a single numeric value for storage and queries.',
        },
        {
          title: 'APIs & automation',
          description:
            'Provide total seconds to APIs, schedulers, and cron‑like workflows.',
        },
      ],
    },
    meta_data: {
      meta_title: 'Hours to Seconds – Time Converter | Developer Tools',
      meta_description:
        'Convert hours, minutes, and seconds to total seconds online. Fast and accurate time conversion.',
      og_title: 'Hours to Seconds Converter – Free Online Tool',
      og_description:
        'Enter hours/minutes/seconds and get total seconds instantly. Ideal for logs, APIs, and automations.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
