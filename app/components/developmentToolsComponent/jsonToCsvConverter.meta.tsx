import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'json-to-csv',
  category: 'Category109_1',
  route: PATHS.JSON_TO_CSV_CONVERTOR,
  ...{
    hero_section: {
      title: 'JSON to CSV Converter',
      description:
        'Convert JSON data into CSV format instantly – perfect for exporting data to spreadsheets, business reports, and data analysis tools.',
    },
    development_tools_list: [
      { tool: 'CSV to JSON', url: PATHS.CSV_TO_JSON },
      { tool: 'JSON to XML Converter', url: PATHS.JSON_TO_XML_CONVERTER },
      { tool: 'JSON to YAML Converter', url: PATHS.JSON_TO_YAML_CONVERTER },
      { tool: 'JSON Prettifier', url: PATHS.JSON_PRETTIFIER },
      { tool: 'JSON Minifier', url: PATHS.JSON_MINIFIER },
      { tool: 'Text to CSV', url: PATHS.TEXT_TO_CSV },
      { tool: 'CSV to Text Converter', url: PATHS.CSV_TO_TEXT_CONVERTER },
    ],
    development_tools_about_details: {
      about_title: 'What is the JSON to CSV Converter?',
      about_description: [
        {
          description:
            'The JSON to CSV Converter transforms structured JSON arrays into CSV (Comma-Separated Values) format, making it easy to export data for use in spreadsheet applications like Excel, Google Sheets, or data analysis tools.',
        },
        {
          description:
            'It\'s ideal for developers, data analysts, and business professionals who need to convert API responses, database exports, or JSON files into a format that\'s compatible with spreadsheet software and reporting tools.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'How to Use the JSON to CSV Converter',
      guide_description: 'Follow these simple steps:',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: 'Paste JSON data:',
          step_description:
            'Enter or paste the JSON array you want to convert into the input box, or upload a JSON file.',
        },
        {
          step_key: 'Step 2:',
          step_title: 'Configure options:',
          step_description:
            'Choose your delimiter (comma, semicolon, or tab), decide whether to include headers, and enable nested object flattening if needed.',
        },
        {
          step_key: 'Step 3:',
          step_title: 'Convert to CSV:',
          step_description:
            'Click the convert button to transform the JSON into properly formatted CSV.',
        },
        {
          step_key: 'Step 4:',
          step_title: 'Copy or download:',
          step_description:
            'Copy the CSV output or download it as a .csv file for use in Excel, Google Sheets, or other applications.',
        },
      ],
    },
    development_tools_how_use: {
      how_use_title: 'Common Uses',
      how_use_description: 'Why you might use this tool:',
      point: [
        {
          title: 'Export API data',
          description:
            'Convert JSON responses from APIs into CSV format for analysis in spreadsheet applications.',
        },
        {
          title: 'Business reports',
          description:
            'Transform JSON data into CSV for creating business reports, dashboards, and presentations.',
        },
        {
          title: 'Data migration',
          description:
            'Export JSON data from databases or applications into CSV format for importing into other systems.',
        },
        {
          title: 'Data analysis',
          description:
            'Convert JSON datasets into CSV for statistical analysis, data visualization, or machine learning workflows.',
        },
        {
          title: 'Nested object handling',
          description:
            'Flatten complex nested JSON structures into a tabular CSV format with dot notation (e.g., user.name).',
        },
      ],
    },
    meta_data: {
      meta_title: 'JSON to CSV Converter – Convert JSON Data to CSV Online',
      meta_description:
        'Convert JSON data into CSV format online for free. Perfect for exporting data to Excel, Google Sheets, business reports, and data analysis. Supports nested objects and custom delimiters.',
      og_title: 'JSON to CSV Converter – Free Online Tool',
      og_description:
        'Easily transform JSON into CSV format with support for nested objects, custom delimiters, and large files up to 5MB. Ideal for developers and data analysts.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
