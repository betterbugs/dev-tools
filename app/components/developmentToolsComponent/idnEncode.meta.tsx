import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'idn-encode',
  category: 'Category117',
  route: PATHS.IDN_ENCODE,
  ...{
    hero_section: {
      title: 'IDN Encode',
      description:
        'Convert Internationalized Domain Names (IDN) into ASCII-compatible Punycode format for safe use in DNS and URLs.',
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
      about_title: 'What is the IDN Encode Tool?',
      about_description: [
        {
          description:
            'The IDN Encode tool converts domain names with non-ASCII characters (like Chinese, Arabic, Hindi, etc.) into Punycode format.',
        },
        {
          description:
            'This ensures domains can be safely used in DNS systems, web browsers, and applications that only support ASCII.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'How to Use the IDN Encode Tool',
      guide_description: 'Follow these simple steps:',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: 'Enter domain name:',
          step_description:
            'Type or paste the internationalized domain name (IDN) into the input box.',
        },
        {
          step_key: 'Step 2:',
          step_title: 'Run encoding:',
          step_description:
            'Click the encode button to convert the domain into Punycode.',
        },
        {
          step_key: 'Step 3:',
          step_title: 'View results:',
          step_description:
            'The tool will display the ASCII-compatible Punycode version of the domain.',
        },
        {
          step_key: 'Step 4:',
          step_title: 'Copy or use:',
          step_description:
            'Copy the encoded domain and use it in DNS, browsers, or server configurations.',
        },
      ],
    },
    development_tools_how_use: {
      how_use_title: 'Common Uses',
      how_use_description: 'Why you might use this tool:',
      point: [
        {
          title: 'Domain registration',
          description:
            'Register non-English domains by converting them into Punycode format.',
        },
        {
          title: 'Web compatibility',
          description:
            'Ensure internationalized domains work across browsers, DNS, and hosting services.',
        },
        {
          title: 'Security & validation',
          description:
            'Prevent misconfigurations by checking the exact ASCII version of an IDN.',
        },
      ],
    },
    meta_data: {
      meta_title: 'IDN Encode – Convert Domain Names to Punycode Online',
      meta_description:
        'Convert internationalized domain names (IDN) into ASCII-compatible Punycode format. Useful for DNS, browsers, and domain registration.',
      og_title: 'IDN Encode – Free Online Tool',
      og_description:
        'Easily encode IDN domain names into Punycode. Perfect for DNS, hosting, and international domain registration.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
