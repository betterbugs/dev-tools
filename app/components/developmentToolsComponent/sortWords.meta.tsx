import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'sort-word',
  category: 'Category29',
  route: PATHS.SORT_WORD,
  ...{
    hero_section: {
      title: 'Online Alphabetizer: Sort Words Alphabetically',
      description:
        'The online alphabetizer is a simple utility tool on BetterBugs.io that enables you to sort words in ascending or descending order and in three other modes. You can also set preferences for the sorting order.',
    },
    development_tools_list: [
      { tool: 'Text Repeater', url: PATHS.RANDOM_CLOCK_TIME_GENERATOR },
      { tool: 'Text Cleaner', url: PATHS.WORD_COUNT_TOOL },
      { tool: 'Word Counter', url: PATHS.RANDOM_COLOR_GENERATOR },
      { tool: 'JavaScript Minifier', url: PATHS.JAVASCRIPT_MINIFIER },
      { tool: 'Line Count Tool', url: PATHS.LINE_COUNTER_TOOL },
      { tool: 'JS Obfuscator', url: PATHS.JS_OBFUSCATOR },
    ],
    development_tools_about_details: {
      about_title: 'What is the Online Alphabetizer Tool ?',
      about_description: [
        {
          description:
            'The online alphabetizer is a free-to-use online tool on BetterBugs.io that enables you to sort words instantly. You can set your preferences for the sorting outputs. The settings include options to choose for sorting modes, order, case sensitivity, uniqueness, keeping punctuation, and joining characters (separator to use for the sorted result list). The alphabetizer works well for data organization and cleaning purposes, educational and other general purposes.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'How to use the alphabetizer tool',
      guide_description: 'Here’re the usage steps:',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: 'Set preferences for the sorting logic:',
        },
        {
          steps_points: [
            {
              steps_points_title: 'Mode: ',
              steps_points_description: 'Alphabetic, By Length, Numeric',
            },
            {
              steps_points_title: 'Order: ',
              steps_points_description: 'Ascending, Descending',
            },
            {
              steps_points_title: 'Case sensitive: ',
              steps_points_description:
                'Select this option for the sorter to consider casing of the input while running the sorting process.',
            },
            {
              steps_points_title: 'Unique only: ',
              steps_points_description:
                'Select this option to avoid duplicate entries in the output',
            },
            {
              steps_points_title: 'Keep punctuation: ',
              steps_points_description:
                'Select this option for the sorter to consider the punctuation characters as it is while running the sorting operation.',
            },
            {
              steps_points_title: 'Join with: ',
              steps_points_description:
                'Select the separator for the outputs: Options —> New line, Comma ,Space, Semicolon',
            },
          ],
        },
        {
          step_key: 'Step 2:',
          step_title: 'Add words to sort',
          step_description:
            'Once you’ve set your preferences, paste the word list in the input box. You can also upload a text file for sorting.',
        },
        {
          step_key: 'Step 3:',
          step_title: 'Get output',
          step_description:
            'Click “Sort” to generate the output list. You’ve the “Copy” button to use the output directly. Or, to download output to your system as a text file, use the “Download” button. ',
        },
        {
          step_description: 'To start fresh, use the “Clear” button.',
        },
      ],
    },
    development_tools_how_use: {
      how_use_title: 'What are the use cases for the tool',
      how_use_description: 'You can use the alphabetizer tool for:',
      point: [
        {
          title: 'Data Organization and Cleaning',
          description:
            'Sort word lists to organize information for quick reference and review. Use this when you need to arrange text data in alphabetical or length-based order for reports, inventories, or datasets without manually reorganizing entries.',
        },
        {
          title: 'Educational and Learning Purposes',
          description:
            'Help students learn alphabetization by sorting vocabulary lists, spelling words, and language concepts in alphabetical order. This tool reinforces proper sequencing and makes it easier to study organized word collections.',
        },
        {
          title: 'Content Organization and SEO',
          description:
            'Arrange keyword lists, tag collections, and category names alphabetically to maintain consistency across your website or documentation. This improves content structure and makes navigation easier for users searching through organized lists.',
        },
        {
          title: 'Removing Duplicates and Deduplication',
          description:
            'Use the "unique only" option to eliminate duplicate words from your list. This helps clean datasets, identify distinct terms within your collection, and prepare data for analysis or publication.',
        },
        {
          title: 'Batch Word Processing and Text Cleanup',
          description:
            'Upload text files containing hundreds of words and get them sorted instantly by alphabetical order, length, or numeric values. This saves time when dealing with bulk text data from various sources like lists, exports, or content collections.',
        },
      ],
    },
    meta_data: {
      meta_title:
        'Online Alphabetizer: Sort Words Alphabetically - Developer Utility Tools',
      meta_description:
        'Use the sort words alphabetizer free tool on BetterBugs.io to sort words in ascending or descending order; great for data organization, cleaning and educational purposes.',
      og_title:
        'Online Alphabetizer: Sort Words Alphabetically - Developer Utility Tools',
      og_description:
        'This post describes usage steps and the use cases of the alphabetizer free online tool on BetterBugs.io.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
