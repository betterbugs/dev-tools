import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'json-to-yaml-converter',
  category: 'Category120',
  route: PATHS.JSON_TO_YAML_CONVERTER,
  ...{
    hero_section: {
      title: 'JSON to YAML Converter',
      description:
        'Convert JSON data into properly formatted YAML instantly – perfect for configuration files, APIs, and readable data representation.',
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
      about_title: 'What is the JSON to YAML Converter?',
      about_description: [
        {
          description:
            'The JSON to YAML Converter transforms structured JSON objects into human-readable YAML format.',
        },
        {
          description:
            'It’s ideal for developers, system administrators, and DevOps engineers who need YAML for configuration files, API definitions, or infrastructure as code.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'How to Use the JSON to YAML Converter',
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
          step_title: 'Convert to YAML:',
          step_description:
            'Click the convert button to transform the JSON into properly formatted YAML.',
        },
        {
          step_key: 'Step 3:',
          step_title: 'View results:',
          step_description:
            'The tool will display the YAML output in a clean and readable structure.',
        },
        {
          step_key: 'Step 4:',
          step_title: 'Copy or download:',
          step_description:
            'Copy the YAML or download it for use in configuration files, APIs, or projects.',
        },
      ],
    },
    development_tools_how_use: {
      how_use_title: 'Common Uses',
      how_use_description: 'Why you might use this tool:',
      point: [
        {
          title: 'Configuration files',
          description:
            'Convert JSON configurations into YAML for tools like Kubernetes, Docker Compose, or Ansible.',
        },
        {
          title: 'API definitions',
          description:
            'Transform JSON API responses or schemas into readable YAML for documentation or integration.',
        },
        {
          title: 'Readable data format',
          description:
            'Easily share and maintain structured data in YAML instead of verbose JSON.',
        },
      ],
    },
    meta_data: {
      meta_title: 'JSON to YAML Converter – Convert JSON Data to YAML Online',
      meta_description:
        'Convert JSON data into readable YAML online. Perfect for configuration files, APIs, and human-readable data representation.',
      og_title: 'JSON to YAML Converter – Free Online Tool',
      og_description:
        'Easily transform JSON into clean, readable YAML. Ideal for developers, DevOps, and system administrators.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
