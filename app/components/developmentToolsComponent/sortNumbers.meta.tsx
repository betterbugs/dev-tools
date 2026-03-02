import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'sort-number',
  category: 'Category28',
  route: PATHS.SORT_NUMBER,
  ...{
    hero_section: {
      title: 'Sort Numbers Online',
      description:
        'The sort numbers online tool is a free-to-use utility on BetterBugs.io website. You can use it for data organization, sorting large number datasets, and mathematical and statistical purposes.',
    },
    development_tools_list: [
      { tool: 'Character Counter', url: PATHS.CHARACTER_COUNT_TOOL },
      {
        tool: 'Random Password Generator',
        url: PATHS.RANDOM_PASSWORD_GENERATOR,
      },
      { tool: 'Word Count Tool', url: PATHS.WORD_COUNT_TOOL },
      { tool: 'Random String Generator', url: PATHS.RANDOM_STRING_GENERATOR },
      { tool: 'Word Count Tool', url: PATHS.WORD_COUNT_TOOL },
    ],
    development_tools_about_details: {
      about_title: 'What is the Sort Numbers Online Tool?',
      about_description: [
        {
          description:
            'The sort numbers tool is a simple utility tool that you can use for sorting numbers in ascending or descending orders. The tool also enables you to set preferences for the sorting logic. You can tweak the sorter to include/ignore unique numbers, decimals, and negative numbers (from the given list of inputs) for the final output. If you’ve a text file with number data, you can upload it to get the sorted list instantly.',
        },
        {
          description:
            'The sort numbers tool is absolutely free to use on the BetterBugs.io website. You can use it for data organization, mathematical or statistical purposes, and for general purposes too.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'How to use the sort numbers tool',
      guide_description: 'Using the tool is pretty straightforward:',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: 'Set preferences for the sorting logic:',
        },
        {
          steps_points: [
            {
              steps_points_title: 'Order: ',
              steps_points_description: 'Ascending or Descending',
            },
            {
              steps_points_title: 'Unique only: ',
              steps_points_description:
                'Selecting this option ignores repeated numbers to be included in the output. It will just consider including the repeated number once in the output list. ',
            },
            {
              steps_points_title: 'Allow decimals: ',
              steps_points_description:
                'Use decimal numbers as they are in the sorted list. If you turn it off, the decimal dot (.) will be considered as a separator. For example, if the number is 1.4, the sorter will consider 1 and 4 as different numbers, and not as one. ',
            },
            {
              steps_points_title: 'Allow negative: ',
              steps_points_description:
                'Select this one to consider negative numbers in the sorting logic. If you unselect, the negative sign (-) with the numbers will be ignored by the sorter.',
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
          step_title: 'Add numbers to sort',
          step_description:
            'Once you’re good with the preferences, you can paste the number list in the input box. Or, if you have a text file with the number data, use the “Upload” button for adding it.',
        },
        {
          step_key: 'Step 3:',
          step_title: 'Get output',
          step_description:
            'Click “Sort” to get the output. You can directly copy the output. Or, use the “Download” button to get the sorted list as a text file. Use the “Clear” button to start over.',
        },
      ],
    },
    development_tools_how_use: {
      how_use_title: 'What are the use cases for the tool',
      how_use_description:
        'You can use the number sorter tool for various purposes, such as:',
      point: [
        {
          title: 'Data Organization and Analysis',
          description:
            'Sort large datasets of numbers to organize information for quick analysis. Use this when you need to arrange numerical values in ascending or descending order for reports, spreadsheets, or data review without manually reorganizing entries.',
        },
        {
          title: 'Mathematical and Statistical Purposes',
          description:
            'Prepare numerical data for calculations by sorting values to identify patterns, find median values, and spot outliers. This simplifies statistical analysis and helps verify computations in your work.',
        },
        {
          title: 'Batch Number Processing',
          description:
            'Upload text files containing hundreds or thousands of numbers and get them sorted instantly. This saves time when dealing with bulk numerical data from various sources like logs, exports, or datasets.',
        },
        {
          title: 'Removing Duplicates and Cleaning Data',
          description:
            'Use the “unique only” option to eliminate duplicate numbers from your list. This helps clean datasets and identify distinct values within your numerical collection.',
        },
        {
          title: 'Quick Data Verification and Comparison',
          description:
            'Sort numbers to verify they match expected sequences, check if values fall within acceptable ranges, or compare sorted outputs against baseline data. This is useful for quality checks and validation tasks.',
        },
      ],
    },
    meta_data: {
      meta_title: 'Sort Numbers Online - Developer Utility Tools',
      meta_description:
        'Use the sort numbers free tool on BetterBugs.io to sort numbers in ascending or descending order; perfect for data organization and mathematical purposes.',
      og_title: 'Sort Numbers Online - Developer Utility Tools',
      og_description:
        'This post describes usage steps and the use cases of the sort numbers free online tool on BetterBugs.io.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
