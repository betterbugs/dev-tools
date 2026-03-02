import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'json-generator',
  category: 'Category16',
  route: PATHS.RANDOM_JSON_DATA_GENERATOR,
  ...{
    hero_section: {
      title: 'JSON Generator Online',
      description:
        'The JSON Generator is a free online utility tool on BetterBugs.io that instantly generates dummy JSON data perfect for your testing and development needs.',
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
      about_title: 'What is the JSON Generator?',
      about_description: [
        {
          description:
            'The JSON Generator instantly generates dummy data as per your defined schema fields for types, ranges, and counts.',
        },
        {
          description:
            'This tool is perfect for day-to-day software testing and development work. In the tool, you can set the number of items in the complete JSON object, add the required fields, and get the formatted version of the JSON data. You can also generate the minified version of the data with no formatting.',
        },
        {
          description: 'It’s a free utility tool on the BetterBugs.io website.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'How to use the tool?',
      guide_description: 'Using the tool is fairly simple:',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: 'Define schema:',
          step_description:
            'Add the number of items required in the JSON data and set the format (formatted or minified)',
        },
        {
          step_key: 'Step 2:',
          step_title: 'Set quantity:',
          step_description:
            'Use the “+ Add Fields” button to set the key value pairs with type.',
          step_description2:
            'For any Field name, here are the Types supported:',
        },
        {
          steps_points: [
            {
              steps_points_description: 'String  —> Specify the length/words',
            },
            {
              steps_points_description:
                'Lorem (sentence) —> Specify the length/words for it',
            },
            {
              steps_points_description:
                'Number —> Specify Min, Max, and Decimals',
            },
            {
              steps_points_description: 'Boolean',
            },
            {
              steps_points_description: 'Date (ISO)',
            },
            {
              steps_points_description: 'UUID',
            },
            {
              steps_points_description: 'Email',
            },
            {
              steps_points_description: 'URL',
            },
            {
              steps_points_description: 'Color (hex)',
            },
          ],
        },
        {
          step_key: 'Step 3:',
          step_title: 'Generate:',
          step_description:
            'Once you’re good with creating the schema, hit “Generate” to get output. You can copy the output or download it as a file on your local system.',
        },
      ],
    },
    development_tools_how_use: {
      how_use_title: 'What are the use cases for it',
      how_use_description: 'You can use the JSON Generator for:',
      point: [
        {
          title: 'Generating mock data for frontend development',
          description:
            'Using it, you can populate UI components with realistic-looking data and avoid waiting for backend APIs to be ready. Plus you can test edge cases like empty fields, long strings, or invalid formats.',
        },
        {
          title: 'API testing  and simulation',
          description:
            'You can simulate API responses for integration testing, validate how services handle various data combinations, and stress test endpoints with large payloads or randomized inputs.',
        },
        {
          title: 'Seeding database',
          description:
            'Use it to populate dev or test databases with realistic mock data. Also works for local development, demos, and automated test environments.',
        },
        {
          title: 'Contract testing',
          description:
            'Generate request/response payloads that conform to API contracts, validate consumer-provider expectations using tools like Postman, and catch mismatches early by simulating real-world data variations.',
        },
        {
          title: 'Unit Testing',
          description:
            'You can generate varied inputs to test function behavior and make sure its resilience against unexpected or malformed data.',
        },
        {
          title: 'Load and performance testing',
          description:
            'You can create bulk JSON payloads to test system scalability and also measure response times under high data volume.',
        },
        {
          title: 'Schema validation',
          description:
            "With the tool, you can get dummy data to confirm that your JSON schema validators correctly accept or reject generated data. It's also useful for testing OpenAPI, GraphQL, or custom validation logic.",
        },
        {
          title: 'Testing data privacy and compliance',
          description:
            'You can replace sensitive production data with synthetic equivalents and maintain realistic JSON structure without exposing real user info.',
        },
      ],
    },
    meta_data: {
      meta_title: 'JSON Generator - Developer Utility Tools',
      meta_description:
        'Use the JSON Generator online free tool on BetterBugs.io to get dummy JSON data; perfect for mock data, seeding database, and overall testing purposes.',
      og_title: 'JSON Generator - Developer Utility Tools',
      og_description:
        'This article covers the random JSON data generator dev utility tool on BetterBugs.io with steps for using it.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
