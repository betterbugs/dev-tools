import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'text-to-csv',
  category: 'Category112',
  route: PATHS.TEXT_TO_CSV,
  ...{
    hero_section: {
      title: 'Text to CSV',
      description:
        'Convert plain text into CSV format instantly – perfect for data analysis, spreadsheets, or structured reporting.',
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
      about_title: 'What is the Text to CSV Tool?',
      about_description: [
        {
          description:
            'The Text to CSV tool allows you to convert unstructured or line-based text into properly formatted CSV files.',
        },
        {
          description:
            'It’s especially useful for preparing data for Excel, Google Sheets, databases, and data analysis workflows.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'How to Use the Text to CSV Tool',
      guide_description: 'Follow these simple steps:',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: 'Paste your text:',
          step_description:
            'Enter or paste the text data you want to convert into the input box.',
        },
        {
          step_key: 'Step 2:',
          step_title: 'Set CSV delimiters:',
          step_description:
            'Choose the delimiter (comma, semicolon, tab, etc.) for formatting.',
        },
        {
          step_key: 'Step 3:',
          step_title: 'Convert to CSV:',
          step_description:
            'Click the convert button to instantly generate structured CSV output.',
        },
        {
          step_key: 'Step 4:',
          step_title: 'Copy or download:',
          step_description:
            'Copy the CSV data or download it as a `.csv` file for use in spreadsheets or databases.',
        },
      ],
    },
    development_tools_how_use: {
      how_use_title: 'Common Uses',
      how_use_description: 'Why you might use this tool:',
      point: [
        {
          title: 'Data preparation',
          description:
            'Quickly transform text logs, lists, or reports into CSV format for analysis.',
        },
        {
          title: 'Spreadsheet integration',
          description:
            'Easily import text data into Excel or Google Sheets by converting it into CSV.',
        },
        {
          title: 'Database import',
          description:
            'Prepare CSV files for uploading structured data into databases or applications.',
        },
      ],
    },
    meta_data: {
      meta_title: 'Text to CSV – Convert Text Data into CSV Online',
      meta_description:
        'Easily convert plain text into structured CSV format. Perfect for spreadsheets, database imports, and data analysis.',
      og_title: 'Text to CSV – Free Online Converter',
      og_description:
        'Convert plain text into CSV format instantly. Useful for Excel, Google Sheets, databases, and reporting.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
