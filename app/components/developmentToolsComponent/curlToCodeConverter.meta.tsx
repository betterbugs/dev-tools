import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'curl-to-code-converter',
  category: 'Category176',
  route: PATHS.CURL_TO_CODE_CONVERTER,
  ...{
    hero_section: {
      title: 'cURL to Code Converter',
      description:
        'Paste any cURL command and instantly convert it to JavaScript (Fetch or Axios), Python Requests, Go, or Node.js code — ready to copy and use.',
    },
    development_tools_list: [
      { tool: 'JSON to TypeScript', url: PATHS.JSON_TO_TYPESCRIPT },
      { tool: 'Base64 Encoder', url: PATHS.BASE64_ENCODER },
      { tool: 'Base64 Decoder', url: PATHS.BASE64_DECODER },
      { tool: 'JWT Decoder', url: PATHS.JWT_DECODER },
      { tool: 'API Key Generator', url: PATHS.API_KEY_GENERATOR },
      { tool: 'URL Encode', url: PATHS.URL_ENCODE },
    ],
    development_tools_about_details: {
      about_title: 'What is the cURL to Code Converter?',
      about_description: [
        {
          description:
            'The cURL to Code Converter is a free online developer tool on BetterBugs.io that translates cURL commands into ready-to-run code snippets for popular programming languages and HTTP libraries.',
        },
        {
          description:
            'It supports JavaScript Fetch, JavaScript Axios, Python Requests, Go net/http, and Node.js — covering the most common HTTP clients used in modern development.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'Step-by-Step Guide',
      guide_description: 'Converting a cURL command is quick and simple:',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: 'Paste Your cURL Command:',
          step_description:
            'Copy a cURL command (e.g., from browser DevTools or API docs) and paste it into the input area on the left.',
        },
        {
          step_key: 'Step 2:',
          step_title: 'Select a Target Language:',
          step_description:
            'Choose the programming language or HTTP library you want to convert to from the dropdown (Fetch, Axios, Python, Go, or Node.js).',
        },
        {
          step_key: 'Step 3:',
          step_title: 'Copy the Generated Code:',
          step_description:
            'The equivalent code appears on the right instantly. Use the Copy button to grab it and paste it directly into your project.',
        },
      ],
    },
    development_tools_how_use: {
      how_use_title: 'Common Use Cases',
      how_use_description:
        'The cURL to Code Converter is useful in many developer workflows:',
      point: [
        {
          title: 'API Integration',
          description:
            'Quickly turn curl examples from API documentation into real code for your language of choice.',
        },
        {
          title: 'Debugging & Testing',
          description:
            'Convert browser-copied curl commands into testable code snippets without manual translation.',
        },
        {
          title: 'Language Migration',
          description:
            'Reuse existing curl-based scripts in a different language when migrating or refactoring a project.',
        },
        {
          title: 'Learning HTTP Clients',
          description:
            'Compare how the same request looks across different HTTP libraries to understand their APIs.',
        },
        {
          title: 'CI/CD & Automation',
          description:
            'Convert one-off curl calls into structured code blocks that can be embedded in automated pipelines.',
        },
      ],
    },
    meta_data: {
      meta_title: 'cURL to Code Converter — JavaScript, Python, Go | BetterBugs.io',
      meta_description:
        'Convert cURL commands to JavaScript Fetch, Axios, Python Requests, Go, or Node.js code instantly. Free online tool on BetterBugs.io.',
      og_title: 'cURL to Code Converter — BetterBugs.io',
      og_description:
        'Paste a cURL command and get the equivalent JavaScript, Python, Go, or Node.js code in one click.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
