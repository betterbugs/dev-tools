import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'jwt-decoder',
  category: 'Category133',
  route: PATHS.JWT_DECODER,
  ...{
    hero_section: {
      title: 'JWT Decoder',
      description:
        'Decode JSON Web Tokens (JWT) instantly to view header, payload, and signature. Perfect for developers, security analysts, and learners.',
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
      about_title: 'What is the JWT Decoder?',
      about_description: [
        {
          description:
            'A JWT Decoder is a tool that extracts and displays the contents of a JSON Web Token, including its header, payload, and signature.',
        },
        {
          description:
            'It’s useful for developers debugging authentication tokens, security experts analyzing claims, and learners understanding how JWTs work.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'How to Use the JWT Decoder',
      guide_description: 'Follow these simple steps:',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: 'Paste JWT:',
          step_description:
            'Enter or paste your JWT string into the input box.',
        },
        {
          step_key: 'Step 2:',
          step_title: 'Decode:',
          step_description:
            'Click the decode button to parse the token into its components.',
        },
        {
          step_key: 'Step 3:',
          step_title: 'View details:',
          step_description:
            'See the header, payload (claims), and signature separated clearly.',
        },
        {
          step_key: 'Step 4:',
          step_title: 'Analyze or copy:',
          step_description:
            'Use the decoded data for debugging, verification, or documentation.',
        },
      ],
    },
    development_tools_how_use: {
      how_use_title: 'Common Uses',
      how_use_description: 'Why you might use this tool:',
      point: [
        {
          title: 'Debugging',
          description:
            'Easily inspect JWT contents during authentication and API testing.',
        },
        {
          title: 'Security',
          description:
            'Analyze claims, expiration, and signing details for token verification.',
        },
        {
          title: 'Learning',
          description:
            'Understand the structure of JWTs and how they are used in modern authentication.',
        },
      ],
    },
    meta_data: {
      meta_title: 'JWT Decoder – Decode JSON Web Tokens Online',
      meta_description:
        'Instantly decode JWT tokens to view header, payload, and signature. Useful for developers, security experts, and students.',
      og_title: 'JWT Decoder – Free Online Tool',
      og_description:
        'Quickly decode JWTs to understand their structure and claims. Perfect for debugging and learning.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
