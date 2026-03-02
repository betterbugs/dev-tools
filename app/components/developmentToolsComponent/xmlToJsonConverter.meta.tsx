import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'xml-to-json-converter',
  category: 'Category171',
  route: PATHS.XML_TO_JSON_CONVERTER,
  ...{
    hero_section: {
      title: 'XML to JSON Converter',
      description:
        'Convert XML into clean, structured JSON instantly – ideal for APIs, config, and data exchange.',
    },
    development_tools_list: [
      {
        tool: 'JSON to XML Converter',
        url: '/development-tools/json-to-xml-converter',
      },
      { tool: 'XML Prettify', url: '/development-tools/xml-prettify' },
      { tool: 'XML Minify', url: '/development-tools/xml-minify' },
    ],
    development_tools_about_details: {
      about_title: 'What is the XML to JSON Converter?',
      about_description: [
        {
          description:
            'The XML to JSON Converter transforms XML documents into JSON, keeping attributes, text nodes, and nested elements intact.',
        },
        {
          description:
            'Use it for integrating XML-based systems with JSON-first APIs, migrating configs, or transforming payloads.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'How to Use the XML to JSON Converter',
      guide_description: 'Convert XML into formatted JSON in a few steps:',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: 'Paste or upload XML:',
          step_description:
            'Insert your XML into the input area or upload a .xml file.',
        },
        {
          step_key: 'Step 2:',
          step_title: 'Configure options:',
          step_description:
            'Choose indent size, attribute prefix, text key, and whether to wrap multiple roots.',
        },
        {
          step_key: 'Step 3:',
          step_title: 'Convert:',
          step_description: 'Click Convert to generate JSON output.',
        },
        {
          step_key: 'Step 4:',
          step_title: 'Copy or download:',
          step_description: 'Copy the result or download a .json file.',
        },
      ],
    },
    development_tools_how_use: {
      how_use_title: 'Common Uses',
      how_use_description:
        'Great for API integration, config transforms, and data pipelines.',
      point: [
        {
          title: 'API Gateways',
          description: 'Convert XML payloads into JSON for modern services.',
        },
        {
          title: 'Configuration Migration',
          description: 'Transform legacy XML configs to JSON.',
        },
        {
          title: 'Testing & Mocking',
          description: 'Produce JSON fixtures from XML samples.',
        },
      ],
    },
    meta_data: {
      meta_title: 'XML to JSON Converter – Convert XML Data to JSON Online',
      meta_description:
        'Convert XML to JSON online. Preserve attributes and text nodes, choose indentation, and copy or download instantly.',
      og_title: 'XML to JSON Converter – Free Online Tool',
      og_description:
        'Turn XML into readable JSON for APIs, configs, and integrations.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
