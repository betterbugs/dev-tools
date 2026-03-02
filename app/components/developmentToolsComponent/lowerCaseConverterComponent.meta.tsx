import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'text-lowercase-converter',
  category: 'Category2',
  route: PATHS.TEXT_LOWERCASE_CONVERTER,
  ...{
    hero_section: {
      title: 'Text to Lowercase Converter',
      description:
        'The text to lowercase converter helps instantly change your entire text into a lowercase format. It’s a free utility tool here on BetterBugs.io',
    },
    development_tools_list: [
      { tool: 'Text Upper Case', url: PATHS.TEXT_UPPERCASE_CONVERTER },
      { tool: 'Word Count', url: PATHS.WORD_COUNT_TOOL },
      { tool: 'Character Count Tool', url: PATHS.CHARACTER_COUNT_TOOL },
      { tool: 'Line Count Tool', url: PATHS.LINE_COUNTER_TOOL },
      { tool: 'Sentence Count Tool', url: PATHS.SENTENCE_COUNTER_TOOL },
      { tool: 'JS Minify Tool', url: PATHS.JAVASCRIPT_MINIFIER },
    ],
    development_tools_about_details: {
      about_title: 'What is the Text to Lowercase Converter?',
      about_description: [
        {
          description:
            'The text to lowercase converter on BetterBugs io is a free-to-use utility tool that lets you change any text into all lowercase format.',
        },
        {
          description:
            'The converter changes all uppercase alphabet characters (A-Z) into their lowercase counterparts (a-z) while leaving numbers, punctuation, and other characters unchanged. It comes in handy when you want to standardize the format of your text to all lowercase.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'Step-by-Step Guide',
      guide_description: 'For using the text to lowercase converter,',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: 'Type or Paste Your Text:',
          step_description:
            ' In the input box, put the text that you want to convert to all lowercase.',
        },
        {
          step_key: 'Step 2:',
          step_title: 'Click Convert to Lowercase:',
          step_description:
            ' Hit the “Convert” button below the input box and Voila!',
          step_description2:
            'To reset the text input, you have the “Clear” button put beside the “Convert” button.',
        },
        {
          step_key: 'Step 3:',
          step_title: 'Copy the Converted Text:',
          step_description:
            'Click the “Copy” button to copy text to your clipboard. You can paste it wherever required.',
        },
      ],
    },
    development_tools_how_use: {
      how_use_title: 'Here’s How it’s Used:',
      how_use_description: 'With the text to the lowercase converter, you can:',
      point: [
        {
          title: 'Generate All Lowercase URLs',
          description:
            'Converts URLs or paths to lowercase format, which is useful while creating links that are case-sensitive.',
        },
        {
          title: 'Standardize API Endpoint Testing',
          description:
            'Converts endpoint names or query params to lowercase before testing APIs, so that they match the expected format and case-related bugs can be avoided.',
        },
        {
          title: 'Prepare User Input Samples',
          description:
            'Quickly generate sample data by converting strings to lowercase while creating test cases that involve user input to be used in all lowercase formats.',
        },
        {
          title: 'Format Import Data',
          description:
            'Ensures that the import data can be formatted to lowercase when required and prevents issues arising due to duplicate entries with case differences.',
        },
        {
          title: 'Search Functionality Testing',
          description:
            'Converts search queries to lowercase before executing tests on search functionalities to ensure that the tests are conducted without issues, regardless of user input casing.',
        },
        {
          title: 'Create Uniform Tags and Labels',
          description:
            'Ensures that the tags and labels are created with uniform casing while writing applications and to prevent issues or confusion during filter or search operations.',
        },
        {
          title: 'Normalize Data While Testing',
          description:
            'Normalizes data inputs (like test case descriptions or expected results) to lowercase for easy comparison against outputs without case sensitivity issues.',
        },
        {
          title: 'String Matching while Writing Code',
          description:
            'Ensures string-matching operations function correctly while writing code.',
        },
      ],
    },
    meta_data: {
      meta_title: 'Text to Lowercase Converter - Developer Utility Tools',
      meta_description:
        'Convert your text to all lowercase format with the BetterBugs online free converter. Use it for standardizing API endpoint testing, string matching while writing code, and other purposes.',
      og_title: 'Text to Lowercase Converter - Developer Utility Tools',
      og_description:
        'This article covers the text to lowercase converter dev utility tool on BetterBugs.io with steps for using it.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
