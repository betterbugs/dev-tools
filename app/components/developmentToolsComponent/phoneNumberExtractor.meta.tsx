import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'phone-number-extractor',
  category: 'Category30',
  route: PATHS.PHONE_NUMBER_EXTRACTOR,
  ...{
    hero_section: {
      title: 'Phone Number Extractor Online',
      description:
        'The phone number extractor tool is a simple utility tool on BetterBugs.io that enables you to instantly grab all the phone numbers from a text string.',
    },
    development_tools_list: [
      { tool: 'Email Extractor', url: PATHS.RANDOM_COLOR_GENERATOR },
      { tool: 'Text Cleaner', url: PATHS.RANDOM_CLOCK_TIME_GENERATOR },
      { tool: 'Word Counter', url: PATHS.RANDOM_DATE_GENERATOR },
      { tool: 'JavaScript Minifier', url: PATHS.JAVASCRIPT_MINIFIER },
      { tool: 'Line Count Tool', url: PATHS.LINE_COUNTER_TOOL },
      { tool: 'JS Obfuscator', url: PATHS.JS_OBFUSCATOR },
    ],
    development_tools_about_details: {
      about_title: 'What is the Phone Number Extractor Tool?',
      about_description: [
        {
          description:
            'The phone number extractor is an online dev utility tool that enables you to get all the phone numbers from text content, documents, or web content. You can use the tool to grab phone numbers (or just numbers) in multiple formats (Raw, Digits only, International). Plus, it comes with a few filter options too.',
        },
        {
          description:
            'The tool is free-to-use on the BetterBugs.io website. You can use it for various purposes, such as for marketing and outreach activities, data organization, and research and analytical works.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'How to use the phone number extractor tool',
      guide_description: 'Here’s how to use the tool:',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: 'Add Any String',
          step_description:
            'Add the text content in the input box from which you want to grab all the numbers. Or, you can upload a text file using the “Upload” button. For clearing up the input, you can use the “Clear” button.',
        },
        {
          step_description:
            'Before kicking things off, you can use the “Add Sample” button to automatically add a text string to test how it works.',
        },
        {
          step_key: 'Step 2:',
          step_title: 'Select Filters',
        },
        {
          step_description:
            'Next, tweak the filters for the extractor as required:',
        },
        {
          steps_points: [
            {
              steps_points_title: 'Number: ',
              steps_points_description:
                'Select this filter to extract only numbers in a list format (without any symbols, such as +, -). Using this option also considers the symbols as a separator while creating the list.',
            },
            {
              steps_points_title: 'Phone Number: ',
              steps_points_description:
                'Choose this option to grab all phone numbers along with all the symbols.',
            },
            {
              steps_points_title: 'Format ',
              steps_points_description:
                ' (this option only appears when you select the “Phone Number” filter): Select the output format from:',
              steps_subpoint: [
                {
                  title: 'Raw: ',
                  description:
                    'Example: if the text has //+1-415-555-0198//, the output would be the exact same //+1-415-555-0198//',
                },
                {
                  title: 'Digits only: ',
                  description:
                    'Example: if the text has //+1-415-555-0198//, the output would be //14155550198//',
                },
                {
                  title: 'International (+...): ',
                  description:
                    'Example: if the text has //+1-415-555-0198//, the output would be //+14155550198//',
                },
              ],
            },
            {
              steps_points_title: 'Unique only: ',
              steps_points_description:
                'Use this option to remove any duplicate entries from the output.',
            },
          ],
        },
        {
          step_key: 'Step 3:',
          step_title: 'Get output',
        },
        {
          step_description:
            'Once you’re good with the filters, click “Extract” for the output.',
        },
        {
          step_description:
            'You can copy the result directly from the output box. Or, to download the result in a text file, use the “Download” button. To clear output and restart, use the nearby “Clear” button.',
        },
      ],
    },
    development_tools_how_use: {
      how_use_title: 'What are the use cases for the tool',
      how_use_description:
        'You can use the phone number extractor tool for various purposes, such as:',
      point: [
        {
          description:
            'Extract contact information from large datasets, customer databases, or CRM exports to create clean contact lists for sales and marketing campaigns.',
        },
        {
          description:
            'Organize phone numbers from unstructured text sources like emails, documents, or web pages into structured formats for easier data management.',
        },
        {
          description:
            'Clean up contact lists by removing duplicate phone numbers using the "Unique only" filter to maintain accurate customer databases.',
        },
        {
          description:
            'Convert phone number formats from various styles (with symbols, dashes, or country codes) into standardized formats for import into different systems.',
        },
        {
          description:
            'Gather research data by extracting phone numbers from surveys, forms, or public records for analysis and reporting purposes.',
        },
        {
          description:
            'Prepare outreach lists for marketing campaigns by quickly pulling phone numbers from multiple sources and exporting them in your preferred format.',
        },
        {
          description:
            'Process customer support tickets by extracting phone numbers from support conversations or feedback forms for follow-up communication.',
        },
        {
          description:
            'Parse web-scraped data to isolate phone numbers from raw text content collected from websites or online directories.',
        },
        {
          description:
            'Validate data entries by extracting and reviewing phone numbers from forms or submissions to ensure completeness before importing into your systems.',
        },
      ],
    },
    meta_data: {
      meta_title: 'Phone Number Extractor - Developer Utility Tools',
      meta_description:
        'Use the phone number extractor free tool on BetterBugs.io to grab all the phone numbers from a text; perfect for marketing, data extraction, and analytical purposes.',
      og_title: 'Phone Number Extractor - Developer Utility Tools',
      og_description:
        'This post describes usage steps and the use cases of the phone number extractor free online tool on BetterBugs.io.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
