import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'json-prettifier',
  category: 'Category9',
  route: PATHS.JSON_PRETTIFIER,
  ...{
    hero_section: {
      title: 'JSON Prettifier Tool',
      description:
        'The JSON prettifier is a free online utility tool on BetterBugs.io that formats your JSON data, making it human-readable and easier to work with.',
    },
    development_tools_list: [
      { tool: 'Text Upper Case', url: PATHS.TEXT_UPPERCASE_CONVERTER },
      { tool: 'Text Lower Case', url: PATHS.TEXT_LOWERCASE_CONVERTER },
      { tool: 'Java Script Minifier', url: PATHS.JAVASCRIPT_MINIFIER },
      { tool: 'Character Count Tool', url: PATHS.CHARACTER_COUNT_TOOL },
      { tool: 'Line Count Tool', url: PATHS.LINE_COUNTER_TOOL },
      { tool: 'Sentence Count Tool', url: PATHS.SENTENCE_COUNTER_TOOL },
    ],
    development_tools_about_details: {
      about_title: 'What is the JSON Prettifier Tool?',
      about_description: [
        {
          description:
            'The JSON prettifier tool allows you to nicely format your JSON code by adding proper indentation, line breaks, and spaces. This makes the JSON data more readable, usable, and easier to work with while writing and testing apps.',
        },
        {
          description:
            "Developers and QA testers working with JSON data files can clearly benefit from this tool, as it changes unformatted data into a human-readable format, making it easier to spot errors and make modifications. It doesn't affect your JSON data or syntax at all; you simply get a more organized and aesthetically pleasing format.",
        },
        {
          description:
            'You can use the JSON prettifier here on BetterBugs.io completely free. Just copy-paste code or upload your JSON file and instantly get the prettier version of it.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'Step-By-Step Guide',
      guide_description: 'To use the prettifier tool,',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: 'Add your JSON code: ',
          step_description: 'To add code:',
        },
        {
          steps_points: [
            {
              steps_points_description:
                'Copy and paste the JSON code in the input JSON area.',
            },
            {
              steps_points_description:
                'You can also upload a minified or unformatted JSON file and get the formatted version of it. For this, you have the “Choose File” button.',
            },
          ],
        },
        {
          step_key: 'Step 2:',
          step_title: 'Prettify the Code:',
          step_description:
            'Hit the “Prettify” button to instantly format your JSON code. You can also specify the number of indentations for your JSON data with the Indentation dropdown. You have four options for it: 1, 2, 3, and 4 spaces.',
        },
        {
          step_title: 'NOTE: ',
          step_description:
            'If there’s any syntax error with the JSON, make sure to fix it before adding it to the prettifier or you will end up getting the “Invalid JSON input” error.',
        },
        {
          step_key: 'Step 3:',
          step_title: 'Use Prettified Code:',
          step_description: 'To use the formatted code:',
        },
        {
          steps_points: [
            {
              steps_points_description:
                'Hit the “Copy to Clipboard” button and paste wherever you want to.',
            },
            {
              steps_points_description:
                'You can also download it as a JSON file using the “Download Prettified JSON” button.',
            },
          ],
        },
        {
          step_description: 'To clear all code, you have the “Clean” button.',
        },
      ],
    },
    development_tools_how_use: {
      how_use_title: "Why It's Used",
      how_use_description: 'You can use the JSON prettier tool to:',
      point: [
        {
          description: 'Keep JSON code well-organized and properly formatted.',
        },
        {
          description: 'Make JSON data easier to understand and work with.',
        },
        {
          description:
            'Easily spot errors or issues in the code while debugging.',
        },
        {
          description:
            'Make it easier for team members to review and edit JSON data.',
        },
      ],
    },
    meta_data: {
      meta_title: 'JSON Prettifier - Developer Utility Tools',
      meta_description:
        'Format your JSON data for better readability with the BetterBugs online JSON Prettifier. It’s perfect for keeping your JSON data well organized and makes it easier to work with while debugging.',
      og_title: 'JSON Prettifier - Developer Utility Tools',
      og_description:
        'This article covers the JSON prettifier dev utility tool on BetterBugs.io with steps for using it.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
