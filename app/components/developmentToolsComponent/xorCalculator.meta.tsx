import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'xor-calculator',
  category: 'Category123',
  route: PATHS.XOR_CALCULATOR,
  ...{
    hero_section: {
      title: 'XOR Calculator',
      description:
        'Perform XOR operations on text, numbers, or binary data instantly – useful for cryptography, encoding, and data manipulation.',
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
      about_title: 'What is the XOR Calculator?',
      about_description: [
        {
          description:
            'The XOR Calculator performs bitwise XOR operations between two inputs, allowing you to encode, decode, or manipulate data.',
        },
        {
          description:
            'It’s useful for cryptography, data obfuscation, error detection, and testing algorithms that rely on XOR logic.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'How to Use the XOR Calculator',
      guide_description: 'Follow these simple steps:',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: 'Enter values:',
          step_description:
            'Input the two values (text, numbers, or binary) you want to XOR.',
        },
        {
          step_key: 'Step 2:',
          step_title: 'Run XOR operation:',
          step_description:
            'Click the calculate button to perform the XOR operation on the inputs.',
        },
        {
          step_key: 'Step 3:',
          step_title: 'View results:',
          step_description:
            'The tool will display the XOR result in the chosen format (text or binary).',
        },
        {
          step_key: 'Step 4:',
          step_title: 'Copy or use:',
          step_description:
            'Copy the XOR result for use in encryption, coding, or data analysis.',
        },
      ],
    },
    development_tools_how_use: {
      how_use_title: 'Common Uses',
      how_use_description: 'Why you might use this tool:',
      point: [
        {
          title: 'Cryptography',
          description:
            'Encode or decode data using XOR-based encryption techniques.',
        },
        {
          title: 'Data manipulation',
          description:
            'Perform bitwise operations for testing algorithms or creating obfuscated data.',
        },
        {
          title: 'Binary calculations',
          description:
            'Easily XOR binary sequences for programming, debugging, or educational purposes.',
        },
      ],
    },
    meta_data: {
      meta_title: 'XOR Calculator – Perform Bitwise XOR Online',
      meta_description:
        'Perform XOR operations on text, numbers, or binary data online. Useful for cryptography, encoding, and algorithm testing.',
      og_title: 'XOR Calculator – Free Online Tool',
      og_description:
        'Easily calculate XOR between two inputs. Ideal for developers, cryptographers, and data analysts.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
