import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'csv-to-excel-file-convertor',
  category: 'Category67',
  route: PATHS.CSV_TO_EXCEL_FILE_CONVERTOR,
  ...{
    hero_section: {
      title: 'CSV to Excel File Converter',
      description:
        'Convert CSV files to Excel (.xlsx) with delimiter and encoding options.',
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
      about_title: 'What is a CSV to Excel Converter?',
      about_description: [
        {
          description:
            'Transforms CSV data into a formatted Excel workbook for better review and sharing.',
        },
        {
          description:
            'Supports custom delimiters, headers, and encoding selection.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'Using the CSV to Excel Converter',
      guide_description: 'Convert in a few quick steps:',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: 'Upload CSV:',
          step_description: 'Select file and delimiter/encoding if needed.',
        },
        {
          step_key: 'Step 2:',
          step_title: 'Preview:',
          step_description: 'Verify columns and headers.',
        },
        {
          step_key: 'Step 3:',
          step_title: 'Download:',
          step_description: 'Export as .xlsx.',
        },
      ],
    },
    development_tools_how_use: {
      how_use_title: 'How It’s Used',
      how_use_description: 'Common use cases:',
      point: [
        {
          title: 'Reporting',
          description: 'Turn CSV exports into Excel for stakeholders.',
        },
        {
          title: 'Cleanup',
          description: 'Open CSV in Excel while keeping data types intact.',
        },
        {
          title: 'Migration',
          description: 'Normalize CSVs into worksheets for review.',
        },
      ],
    },
    meta_data: {
      meta_title: 'CSV to Excel Converter – Convert CSV to XLSX',
      meta_description:
        'Convert CSV files to Excel online with delimiter and encoding controls.',
      og_title: 'CSV to Excel – BetterBugs Tools',
      og_description: 'Upload CSV, preview, and download as .xlsx.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
