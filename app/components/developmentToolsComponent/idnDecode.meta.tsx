import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'idn-decode',
  category: 'Category118',
  route: PATHS.IDN_DECODE,
  ...{
    hero_section: {
      title: 'IDN Decode',
      description:
        'Convert ASCII-compatible Punycode back into human-readable Internationalized Domain Names (IDN) for easy display and verification.',
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
      about_title: 'What is the IDN Decode Tool?',
      about_description: [
        {
          description:
            'The IDN Decode tool converts ASCII-compatible Punycode domains back into their original internationalized form.',
        },
        {
          description:
            'This is useful for displaying non-English domain names correctly in browsers, applications, or documentation.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'How to Use the IDN Decode Tool',
      guide_description: 'Follow these simple steps:',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: 'Enter Punycode domain:',
          step_description:
            'Type or paste the ASCII-compatible Punycode domain into the input box.',
        },
        {
          step_key: 'Step 2:',
          step_title: 'Run decoding:',
          step_description:
            'Click the decode button to convert the Punycode into a readable IDN.',
        },
        {
          step_key: 'Step 3:',
          step_title: 'View results:',
          step_description:
            'The tool will display the original internationalized domain name.',
        },
        {
          step_key: 'Step 4:',
          step_title: 'Copy or use:',
          step_description:
            'Copy the decoded domain for display, documentation, or browser use.',
        },
      ],
    },
    development_tools_how_use: {
      how_use_title: 'Common Uses',
      how_use_description: 'Why you might use this tool:',
      point: [
        {
          title: 'Domain verification',
          description:
            'Check the readable version of Punycode domains to confirm correctness.',
        },
        {
          title: 'Web display',
          description:
            'Show non-English domains correctly in websites, emails, or applications.',
        },
        {
          title: 'Documentation & support',
          description:
            'Provide human-readable domain names for manuals, guides, or client support.',
        },
      ],
    },
    meta_data: {
      meta_title:
        'IDN Decode – Convert Punycode to International Domain Names Online',
      meta_description:
        'Decode Punycode domains back into readable Internationalized Domain Names (IDN). Useful for browsers, documentation, and domain verification.',
      og_title: 'IDN Decode – Free Online Tool',
      og_description:
        'Easily decode Punycode into human-readable international domain names. Perfect for web display, verification, and documentation.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
