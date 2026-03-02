import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'crontab-generator',
  category: 'Category168',
  route: PATHS.CRONTAB_GENERATOR,
  ...{
    hero_section: {
      title: 'Crontab Generator',
      description:
        'Interactively build cron expressions with presets and human-readable summaries.',
    },
    development_tools_list: [
      { tool: 'Regex Tester', url: PATHS.JAVASCRIPT_REGEX_TESTER },
    ],
    development_tools_about_details: {
      about_title: 'About Crontab Generator',
      about_description: [
        {
          description:
            'Cron expressions define schedules using five fields: minute, hour, day-of-month, month, and day-of-week. This tool helps compose valid expressions with ranges, lists, and intervals.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'How to Use',
      guide_description: 'Generate a cron expression:',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: 'Configure fields',
          step_description:
            'Choose Every, Specific, Range or Every N for each field.',
        },
        {
          step_key: 'Step 2:',
          step_title: 'Use presets',
          step_description: 'Apply common schedules with one click.',
        },
        {
          step_key: 'Step 3:',
          step_title: 'Copy expression',
          step_description: 'Copy the cron string and add it to your crontab.',
        },
      ],
    },
    development_tools_how_use: {
      how_use_title: 'Use Cases',
      how_use_description: 'When this tool helps:',
      point: [
        {
          title: 'Server jobs',
          description: 'Create schedules for backups or maintenance.',
        },
        { title: 'Data pipelines', description: 'Configure ETL job timings.' },
        {
          title: 'Reminders',
          description: 'Generate cron for notification services.',
        },
      ],
    },
    meta_data: {
      meta_title: 'Crontab Generator - Build Cron Expressions',
      meta_description:
        'Create cron expressions with an interactive UI, presets, and readable summaries.',
      og_title: 'Crontab Generator - Developer Utility',
      og_description: 'Build and copy cron expressions quickly.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
