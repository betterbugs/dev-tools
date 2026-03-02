import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'json-to-xml-converter',
  category: 'Category119',
  route: PATHS.JSON_TO_XML_CONVERTER,
  ...{
    hero_section: {
      title: 'JSON to XML Converter',
      description:
        'Convert JSON data into properly formatted XML instantly – perfect for data integration, APIs, and configuration files.',
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
      about_title: 'What is the JSON to XML Converter?',
      about_description: [
        {
          description:
            'The JSON to XML Converter transforms structured JSON objects into clean, readable XML format.',
        },
        {
          description:
            'This is useful for developers, analysts, and integration workflows where XML is required for APIs, config files, or data exchange.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'How to Use the JSON to XML Converter',
      guide_description: 'Follow these simple steps:',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: 'Paste JSON data:',
          step_description:
            'Enter or paste the JSON object you want to convert into the input box.',
        },
        {
          step_key: 'Step 2:',
          step_title: 'Convert to XML:',
          step_description:
            'Click the convert button to transform the JSON into properly formatted XML.',
        },
        {
          step_key: 'Step 3:',
          step_title: 'View results:',
          step_description:
            'The tool will display the XML output in a clean and readable structure.',
        },
        {
          step_key: 'Step 4:',
          step_title: 'Copy or download:',
          step_description:
            'Copy the XML or download it for use in APIs, applications, or configuration files.',
        },
      ],
    },
    development_tools_how_use: {
      how_use_title: 'Common Uses',
      how_use_description: 'Why you might use this tool:',
      point: [
        {
          title: 'API integration',
          description:
            'Convert JSON responses into XML format for systems or services that require XML input.',
        },
        {
          title: 'Configuration files',
          description:
            'Transform JSON-based configuration into XML for software or hardware setups.',
        },
        {
          title: 'Data exchange',
          description:
            'Easily share structured data between JSON- and XML-based systems.',
        },
      ],
    },
    meta_data: {
      meta_title: 'JSON to XML Converter – Convert JSON Data to XML Online',
      meta_description:
        'Convert JSON data into XML format online. Perfect for APIs, configuration files, and system integration.',
      og_title: 'JSON to XML Converter – Free Online Tool',
      og_description:
        'Easily transform JSON into clean, readable XML for integration, development, or data exchange.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
