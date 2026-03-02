import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'graphql-formatter',
  category: 'Category139',
  route: PATHS.GRAPHQL_FORMATTER,
  ...{
    hero_section: {
      title: 'GraphQL Formatter',
      description:
        'Format, beautify, and validate GraphQL queries instantly – perfect for developers, API testers, and learners.',
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
      about_title: 'What is the GraphQL Formatter?',
      about_description: [
        {
          description:
            'The GraphQL Formatter helps you clean, beautify, and structure GraphQL queries and mutations for better readability.',
        },
        {
          description:
            'It’s useful for developers working with GraphQL APIs, learners practicing queries, and teams maintaining clean API documentation.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'How to Use the GraphQL Formatter',
      guide_description: 'Follow these simple steps:',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: 'Paste your GraphQL query:',
          step_description:
            'Insert your raw or minified GraphQL query/mutation into the input box.',
        },
        {
          step_key: 'Step 2:',
          step_title: 'Click format:',
          step_description:
            'Use the format button to automatically beautify and indent your GraphQL code.',
        },
        {
          step_key: 'Step 3:',
          step_title: 'Validate & review:',
          step_description:
            'Check if your query syntax is valid and easy to read.',
        },
        {
          step_key: 'Step 4:',
          step_title: 'Copy or export:',
          step_description:
            'Copy the formatted query for your project or save it for documentation.',
        },
      ],
    },
    development_tools_how_use: {
      how_use_title: 'Common Uses',
      how_use_description: 'Why you might use this tool:',
      point: [
        {
          title: 'API Development',
          description: 'Format GraphQL queries for testing and debugging APIs.',
        },
        {
          title: 'Team Collaboration',
          description:
            'Maintain clean and consistent GraphQL queries across projects.',
        },
        {
          title: 'Learning',
          description:
            'Help beginners understand GraphQL structure through proper formatting.',
        },
      ],
    },
    meta_data: {
      meta_title: 'GraphQL Formatter – Beautify & Validate Queries Online',
      meta_description:
        'Instantly format and validate GraphQL queries and mutations online. Improve readability for developers, testers, and learners.',
      og_title: 'GraphQL Formatter – Free Online Tool',
      og_description:
        'Beautify, validate, and structure GraphQL queries instantly. Perfect for API developers, testers, and students.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
